<?php

namespace App\Controller;

use App\Entity\Establishment;
use App\Repository\UserRepository;
use App\Repository\EstablishmentRepository;
use App\Repository\BrandRepository;
use App\Repository\SlotRepository;
use App\Repository\PerformanceRepository;
use App\Repository\ReservationRepository;
use App\Repository\SlotCoachRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Security\Http\Attribute\IsGranted;


class EstablishmentController extends AbstractController
{
    #[Route('/api/establishments', name: 'establishment_list', methods: ['GET'])]
    public function list(Request $request, EstablishmentRepository $establishmentRepository): JsonResponse
    {
        $name = trim($request->query->get('name', ''));
        if ($name) {
            $establishments = $establishmentRepository->findByName($name);
        } else {
            $establishments = $establishmentRepository->findAll();
        }

        $result = [];

        foreach($establishments as $establishment){
            $result[] = [
                'id' => $establishment->getId(),
                'display_name' => $establishment->getDisplayName()
            ];
        }
        return new JsonResponse($result);
    }


    #[Route('/api/establishments', name: 'establishment_create', methods: ['POST'])]
    public function create(Request $request, EntityManagerInterface $em): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $establishment = new Establishment();
        $establishment->setDisplayName($data['name']);
        $establishment->setAddress($data['address']);
        $establishment->setCity($data['city']);
        $establishment->setPhone($data['phone']);
        $establishment->setZipCode($data['zip_code ']);

        $em->persist($establishment);
        $em->flush();

        return new JsonResponse(['status' => 'Establishment created!'], Response::HTTP_CREATED);
    }

    #[Route('/api/establishments/{id}', name: 'establishment_update', methods: ['PUT'])]
    public function update(Request $request, Establishment $establishment, EntityManagerInterface $em): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $establishment->setDisplayName($data['name']);
        $establishment->setAddress($data['address']);
        $establishment->setCity($data['city']);
        $establishment->setPhone($data['phone']);
        $establishment->setZipCode($data['zip_code ']);

        $em->flush();

        return new JsonResponse(['status' => 'Establishment updated!'], Response::HTTP_OK);
    }

    #[Route('/api/establishments/{id}', name: 'establishment_delete', methods: ['DELETE'])]
    public function delete(Establishment $establishment, EntityManagerInterface $em): JsonResponse
    {
        $em->remove($establishment);
        $em->flush();

        return new JsonResponse(['status' => 'Establishment deleted!'], Response::HTTP_NO_CONTENT);
    }

    #[Route('/api/establishments/users', name: 'establishment_users', methods: ['GET'])]
    #[IsGranted('ROLE_ADMIN')]
    public function getUsersByEstablishment(
        BrandRepository $brandRepository, 
        EstablishmentRepository $establishmentRepository, 
        PerformanceRepository $performanceRepository,
        SlotRepository $slotRepository,
        ReservationRepository $reservationRepository,
        UserRepository $userRepository,
        SlotCoachRepository $slotCoachRepository
    ): JsonResponse {
        $user = $this->getUser();
        $brands = $brandRepository->findBy(['user_id' => $user->getId()]);

        if (!$brands) {
            return new JsonResponse([], JsonResponse::HTTP_NO_CONTENT);
        }

        $clients = [];
        $coachs = [];

        foreach ($brands as $brand ) {
            $establishments = $establishmentRepository->findBy(['brand_id' => $brand->getId()]);

            foreach ($establishments as $es) {
                $performances = $performanceRepository->findBy(['establishment_id' => $es->getId()]);
                foreach ($performances as $performance) {
                    $slots = $slotRepository->findBy(['performance_id' => $performance->getId()]);
                    foreach ($slots as $slot) {
                        $reservations = $reservationRepository->findBy(['slot_id' => $slot->getId()]);
                        $slotCoachs = $slotCoachRepository->findBy(['slot_id' => $slot->getId()]);

                        foreach ($reservations as $reservation) {
                            $client = $reservation->getClientId();
                            if ($client && !isset($clients[$client->getId()])) {
                                $clients[$client->getId()] = [
                                    'id' => $client->getId(),
                                    'firstname' => $client->getFirstname(),
                                    'lastname' => $client->getLastname(),
                                    'email' => $client->getEmail()
                                ];
                            } 
                        }

                        foreach ($slotCoachs as $slotCoach) {
                            $coach = $slotCoach->getCoachId();
                            if ($coach && !isset($coachs[$coach->getId()])) {
                                $coachs[$coach->getId()] = [
                                    'id' => $coach->getId(),
                                    'firstname' => $coach->getFirstname(),
                                    'lastname' => $coach->getLastname(),
                                    'email' => $coach->getEmail()
                                ];
                            } 
                        }
                    }
                }
            }
        }

        $responseData = [
            'clients' => array_values($clients),
            'coachs' => array_values($coachs)
        ];

        return new JsonResponse($responseData);
    }

    #[IsGranted('ROLE_ADMIN')]
    #[Route('/api/establishments/{establishmentId}/slots', name: 'establishment_slots', methods: ['GET'])]
    public function getSlotsByEstablishment(
        EstablishmentRepository $establishmentRepository,
        PerformanceRepository $performanceRepository,
        SlotRepository $slotRepository,
        int $establishmentId 
    ): JsonResponse {
        $user = $this->getUser();
        $establishment = $establishmentRepository->findOneBy(['id' => $establishmentId]);

        if (!$establishment) {
            return new JsonResponse([], JsonResponse::HTTP_NO_CONTENT);
        }

        $result = [];
        $performances = $performanceRepository->findBy(['establishment' => $establishment]);


        foreach ($performances as $performance) {
            $slots = $slotRepository->findBy(['performance' => $performance]);
    
            foreach ($slots as $slot) {
                // Fetch coaches associated with the slot
                $coaches = $slot->getCoachId();                

                $coachesInfo = [];
                foreach ($coaches as $coach) {
                    $coachesInfo[] = [
                        'id' => $coach->getId(),
                        'coach_name' => $coach->getFirstname() . ' ' . $coach->getLastname()

                    ];
                }
    
                $result[] = [
                    'id' => $slot->getId(),
                    'establishment' => $slot->getPerformance()->getEstablishment()->getDisplayName(),
                    'performance' => $slot->getPerformance()->getId(),
                    'coach_ids' => $coachesInfo,
                    'number_of_clients' => $slot->getNumberOfClients(),
                    'day_start_at' => $slot->getDayStartAt()->format('Y-m-d H:i:s'),
                    'day_end_at' => $slot->getDayEndAt()->format('Y-m-d H:i:s'),
                    'duration_minutes' => $slot->getDurationMinutes()


                    
                ];
            }
        }
        return new JsonResponse($result);
    }


    #[IsGranted('ROLE_ADMIN')]
    #[Route('/api/establishments/{establishmentId}/slots/{date}', name: 'establishment_slots_by_date', methods: ['GET'])]
    public function getSlotsByEstablishmentAndDate(
        EstablishmentRepository $establishmentRepository,
        PerformanceRepository $performanceRepository,
        SlotRepository $slotRepository,
        int $establishmentId,
        string $date
    ): JsonResponse {
        $user = $this->getUser();
        $establishment = $establishmentRepository->findOneBy(['id' => $establishmentId]);
    
        if (!$establishment) {
            return new JsonResponse([], JsonResponse::HTTP_NO_CONTENT);
        }
    
        $result = [];
        $performances = $performanceRepository->findBy(['establishment' => $establishment]);
        
        // Parse the date string to a DateTime object
        $selectedDate = new \DateTime($date);
        $selectedDateStart = $selectedDate->setTime(0, 0, 0);
        $selectedDateEnd = clone $selectedDateStart;
        $selectedDateEnd->setTime(23, 59, 59);
    
        foreach ($performances as $performance) {
            $slots = $slotRepository->createQueryBuilder('s')
                ->where('s.performance = :performance')
                ->andWhere('s.dayStartAt BETWEEN :start AND :end')
                ->setParameter('performance', $performance)
                ->setParameter('start', $selectedDateStart)
                ->setParameter('end', $selectedDateEnd)
                ->getQuery()
                ->getResult();
    
            foreach ($slots as $slot) {
                $coaches = $slot->getCoachId();
                $coachIds = [];
                foreach ($coaches as $coach) {
                    $coachIds[] = $coach->getId();
                }
    
                $result[] = [
                    'id' => $slot->getId(),
                    'performance' => $slot->getPerformance()->getId(),
                    'coach_ids' => $coachIds,
                    'number_of_clients' => $slot->getNumberOfClients(),
                    'day_start_at' => $slot->getDayStartAt()->format('Y-m-d H:i:s'),
                    'day_end_at' => $slot->getDayEndAt()->format('Y-m-d H:i:s'),
                    'duration_minutes' => $slot->getDurationMinutes()
                ];
            }
        }
    
        return new JsonResponse($result);
    }
    


}