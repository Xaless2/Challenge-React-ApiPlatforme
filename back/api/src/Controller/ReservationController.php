<?php

namespace App\Controller;

use App\Entity\Reservation;
use App\Repository\ReservationRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class ReservationController extends AbstractController
{
    #[Route('/reservations', name: 'create_reservation', methods: ['POST'])]
    public function createReservation(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        // Récupérer les données de la requête et créer une nouvelle réservation
        $reservation = new Reservation();
        // Par exemple :
        // $reservation->setSlotId($data['slot_id']);
        // $reservation->setClientId($data['client_id']);
        // $reservation->setStatus($data['status']);

        // Enregistrer la réservation dans la base de données
        $entityManager = $this->getDoctrine()->getManager();
        $entityManager->persist($reservation);
        $entityManager->flush();

        // Retourner une réponse JSON avec l'ID de la nouvelle réservation
        return new JsonResponse(['id' => $reservation->getId()], JsonResponse::HTTP_CREATED);
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
