<?php

namespace App\Controller;

use App\Entity\Reservation;
use App\Repository\ReservationRepository;
use App\Repository\EstablishmentRepository;
use App\Repository\PerformanceRepository;
use App\Repository\BrandRepository;
use App\Repository\SlotRepository;
use App\Repository\UserRepository; // Add this line
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Doctrine\ORM\EntityManagerInterface;

class ReservationController extends AbstractController
{
    private $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    #[Route('/api/reservations/count-by-admin', name: 'reservation_count_by_admin', methods: ['GET'])]
    public function countByAdmin(
        PerformanceRepository $performanceRepository,
        ReservationRepository $reservationRepository, 
        EstablishmentRepository $establishmentRepository,
        BrandRepository $brandRepository,
        SlotRepository $slotRepository
    ): JsonResponse {
        $user = $this->getUser();
        $brands = $brandRepository->findBy(['user_id' => $user->getId()]);
        $brandId = !empty($brands) ? end($brands)->getId() : null;

        if (!$brandId) {
            return new JsonResponse([], JsonResponse::HTTP_NO_CONTENT);
        }

        $establishments = $establishmentRepository->findBy(['brand_id' => $brandId]);

        $result = [];

        foreach ($establishments as $establishment) {
            $performances = $performanceRepository->findBy(['establishment_id' => $establishment->getId()]);
            foreach ($performances as $performance) {
                $slots = $slotRepository->findBy(['performance_id' => $performance->getId()]);
                foreach ($slots as $slot) {
                    $reservations = $reservationRepository->findBy(['slot_id' => $slot->getId()]);
                    foreach ($reservations as $reservation) {
                        $result[] = [
                            'reservation_id' => $reservation->getId()
                        ];
                    }
                }
            }
        }

        return new JsonResponse($result);
    }

    #[Route('api/reservations', name: 'create_reservation', methods: ['POST'])]
    public function createReservation(Request $request, SlotRepository $slotRepository, UserRepository $userRepository): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        // Validate the incoming request data
        if (!isset($data['slot_id'], $data['client_id'], $data['status'])) {
            return new JsonResponse(['message' => 'Missing required fields'], JsonResponse::HTTP_BAD_REQUEST);
        }

        // Retrieve the Slot entity from the repository
        $slot = $slotRepository->find($data['slot_id']);
        if (!$slot) {
            return new JsonResponse(['message' => 'Invalid slot ID'], JsonResponse::HTTP_BAD_REQUEST);
        }

        // Retrieve the User entity (client) from the repository
        $client = $userRepository->find($data['client_id']);
        if (!$client) {
            return new JsonResponse(['message' => 'Invalid client ID'], JsonResponse::HTTP_BAD_REQUEST);
        }

        $reservation = new Reservation();
        $reservation->setSlot($slot);
        $reservation->setClientId($client);
        $reservation->setStatus($data['status']);

        $this->entityManager->persist($reservation);
        $this->entityManager->flush();

        return new JsonResponse(['id' => $reservation->getId()], JsonResponse::HTTP_CREATED);
    }

    #[Route('api/reservations/{id}', name: 'get_reservation', methods: ['GET'])]
    public function getReservation(int $id, ReservationRepository $reservationRepository): JsonResponse
    {
        $reservation = $reservationRepository->find($id);

        if (!$reservation) {
            return new JsonResponse(['message' => 'Réservation non trouvée'], JsonResponse::HTTP_NOT_FOUND);
        }

        return new JsonResponse($reservation->toArray());
    }

    #[Route('api/reservations', name: 'get_all_reservations', methods: ['GET'])]
    public function getAllReservations(ReservationRepository $reservationRepository): JsonResponse
    {
        $reservations = $reservationRepository->findAll();

        $reservationsArray = [];
        foreach ($reservations as $reservation) {
            $reservationsArray[] = $reservation->toArray();
        }

        return new JsonResponse($reservationsArray);
    }

    #[Route('api/reservations/{id}', name: 'delete_reservation', methods: ['DELETE'])]
    public function deleteReservation(int $id, ReservationRepository $reservationRepository): JsonResponse
    {
        $reservation = $reservationRepository->find($id);

        if (!$reservation) {
            return new JsonResponse(['message' => 'Réservation non trouvée'], JsonResponse::HTTP_NOT_FOUND);
        }

        $this->entityManager->remove($reservation);
        $this->entityManager->flush();

        return new JsonResponse(['message' => 'Réservation supprimée avec succès']);
    }
}
