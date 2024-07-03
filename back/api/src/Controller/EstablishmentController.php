<?php

namespace App\Controller;

use App\Entity\Establishment;
use App\Repository\SlotRepository;
use App\Repository\UserRepository;
use App\Repository\BrandRepository;
use App\Repository\SlotCoachRepository;
use Doctrine\ORM\EntityManagerInterface;
use App\Repository\PerformanceRepository;
use App\Repository\ReservationRepository;
use App\Repository\EstablishmentRepository;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Security\Http\Attribute\IsGranted;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

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
                'display_name' => $establishment->getDisplayName(),
                'address' => $establishment->getAddress(),
                'zip_code' => $establishment->getZipCode(),
                'city' => $establishment->getCity(),
                'phone' => $establishment->getPhone(),
                // 'brand_id' => $establishment->getBrandId()->getId()
                
            ];
        }
        return new JsonResponse($result);
    }


    #[Route('/api/establishments', name: 'establishment_create', methods: ['POST'])]
    public function create(Request $request, EntityManagerInterface $em, BrandRepository $brandRepository): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
    
       
        $brandId = $data['brand_id'];
        $brand = $brandRepository->find($brandId);
        if (!$brand) {
            return new JsonResponse(['error' => 'Brand not found'], Response::HTTP_BAD_REQUEST);
        }
    
        $establishment = new Establishment();
        $establishment->setDisplayName($data['name']);
        $establishment->setAddress($data['address']);
        $establishment->setZipCode($data['postal_code']);
        $establishment->setCity($data['city']);
        $establishment->setPhone($data['phone']);
        $establishment->setBrandId($brand);
    
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
        $establishment->setZipCode($data['postal_code']);
        $establishment->setCity($data['city']);
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