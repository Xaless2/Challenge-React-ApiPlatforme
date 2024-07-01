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

class EstablishmentController extends AbstractController
{
    #[Route('/api/establishments', name: 'establishment_list', methods: ['GET'])]
    public function list(EstablishmentRepository $establishmentRepository): JsonResponse
    {
        return new JsonResponse($establishmentRepository->findAll());
    }

    #[Route('/api/establishments', name: 'establishment_create', methods: ['POST'])]
    public function create(Request $request, EntityManagerInterface $em): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $establishment = new Establishment();
        $establishment->setName($data['name']);
        $establishment->setAddress($data['address']);
        $establishment->setPostalCode($data['postal_code']);
        $establishment->setCity($data['city']);
        $establishment->setCountry($data['country']);
        $establishment->setDescription($data['description']);
        $establishment->setEmail($data['email']);
        $establishment->setPhone($data['phone']);

        $em->persist($establishment);
        $em->flush();

        return new JsonResponse(['status' => 'Establishment created!'], Response::HTTP_CREATED);
    }

    #[Route('/api/establishments/{id}', name: 'establishment_update', methods: ['PUT'])]
    public function update(Request $request, Establishment $establishment, EntityManagerInterface $em): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $establishment->setName($data['name']);
        $establishment->setAddress($data['address']);
        $establishment->setPostalCode($data['postal_code']);
        $establishment->setCity($data['city']);
        $establishment->setCountry($data['country']);
        $establishment->setDescription($data['description']);
        $establishment->setEmail($data['email']);
        $establishment->setPhone($data['phone']);

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
}
