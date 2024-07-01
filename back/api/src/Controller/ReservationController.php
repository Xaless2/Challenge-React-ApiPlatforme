<?php

namespace App\Controller;

use App\Repository\ReservationRepository;
use App\Repository\EstablishmentRepository;
use App\Repository\PerformanceRepository;
use App\Repository\BrandRepository;
use App\Repository\SlotRepository;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class ReservationController extends AbstractController
{
    #[Route('/api/reservations/count-by-admin', name: 'reservation_count_by_admin', methods: ['GET'])]
    public function countByAdmin(
        PerformanceRepository $performanceRepository,
        ReservationRepository $reservationRepository, 
        EstablishmentRepository $establishmentRepository,
        BrandRepository $brandRepository,
        SlotRepository $slotRepository,
        ): JsonResponse
    {
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
}
