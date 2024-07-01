<?php

namespace App\Controller;

use App\Entity\Reservation;
use App\Repository\ReservationRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Serializer\SerializerInterface;
use App\Repository\SlotRepository;
use App\Repository\UserRepository;

class ReservationController extends AbstractController
{
    #[Route('/reservations', name: 'create_reservation', methods: ['POST'])]
    public function createReservation(Request $request): JsonResponse
    {
        #[Route('/api/reservations', name: 'create_reservation', methods: ['POST'])]
     function createReservation(Request $request, SlotRepository $slotRepository, UserRepository $userRepository, EntityManagerInterface $em, SerializerInterface $serializer): JsonResponse
        {
            $data = json_decode($request->getContent(), true);
    
            $slot = $slotRepository->find($data['slot']);
            $client = $userRepository->find($data['client']);
    
            if (!$slot || !$client) {
                return new JsonResponse(['error' => 'Slot or client not found'], JsonResponse::HTTP_NOT_FOUND);
            }
    
            $reservation = new Reservation();
            $reservation->setSlotId($slot);
            $reservation->setClientId($client);
            $reservation->setStatus($data['status']);
    
            $em->persist($reservation);
            $em->flush();
    
            return new JsonResponse($serializer->normalize($reservation), JsonResponse::HTTP_CREATED);
        }
    }

    #[Route('/reservations/{id}', name: 'get_reservation', methods: ['GET'])]
    public function getReservation(int $id, ReservationRepository $reservationRepository): JsonResponse
    {
        // Récupérer la réservation à partir de son ID
        $reservation = $reservationRepository->find($id);

        // Vérifier si la réservation existe
        if (!$reservation) {
            // Retourner une réponse JSON avec un message d'erreur
            return new JsonResponse(['message' => 'Réservation non trouvée'], JsonResponse::HTTP_NOT_FOUND);
        }

        // Retourner une réponse JSON avec les données de la réservation
        return new JsonResponse($reservation->toArray());
    }

    #[Route('/reservations', name: 'get_all_reservations', methods: ['GET'])]
    public function getAllReservations(ReservationRepository $reservationRepository): JsonResponse
    {
        // Récupérer toutes les réservations
        $reservations = $reservationRepository->findAll();

        // Convertir les réservations en tableau associatif
        $reservationsArray = [];
        foreach ($reservations as $reservation) {
            $reservationsArray[] = $reservation->toArray();
        }

        // Retourner une réponse JSON avec toutes les réservations
        return new JsonResponse($reservationsArray);
    }

    #[Route('/reservations/{id}', name: 'delete_reservation', methods: ['DELETE'])]
    public function deleteReservation(int $id, ReservationRepository $reservationRepository): JsonResponse
    {
        // Récupérer la réservation à partir de son ID
        $reservation = $reservationRepository->find($id);

        // Vérifier si la réservation existe
        if (!$reservation) {
            // Retourner une réponse JSON avec un message d'erreur
            return new JsonResponse(['message' => 'Réservation non trouvée'], JsonResponse::HTTP_NOT_FOUND);
        }

        // Supprimer la réservation de la base de données
        $entityManager = $this->getDoctrine()->getManager();
        $entityManager->remove($reservation);
        $entityManager->flush();

        // Retourner une réponse JSON avec un message de succès
        return new JsonResponse(['message' => 'Réservation supprimée avec succès']);
    }
}
