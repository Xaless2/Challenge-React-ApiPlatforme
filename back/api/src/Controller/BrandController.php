<?php

namespace App\Controller;

use App\Entity\Brand;
use App\Repository\BrandRepository;
use App\Repository\EstablishmentRepository;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Security\Http\Attribute\IsGranted;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use App\Repository\PerformanceRepository;
use App\Repository\SlotRepository;
use App\Repository\ReservationRepository;
use App\Repository\UserRepository;
use App\Repository\SlotCoachRepository;
use Symfony\Component\HttpFoundation\Request;



/**
 * @Route("/api/brands")
 */
class BrandController extends AbstractController
{
    #[Route('api/brands', name: 'api_brand', methods: ['GET'])]
    public function brand(BrandRepository $brandRepository): Response
    {
        return $this->json($brand);
    }

    #[IsGranted("ROLE_ADMIN")]
    #[Route('/api/brands/{brandId}/establishments', name: 'brands_establishment', methods: ['GET'])]
    public function getEstablishmentsByBrand(
        BrandRepository $brandRepository,
        EstablishmentRepository $establishmentRepository,
        Request $request,
        int $brandId
    ): JsonResponse {
        $user = $this->getUser();
        $brand = $brandRepository->findOneBy(['id' => $brandId, 'user' => $user]);
        
        if (!$brand) {
            return new JsonResponse(['error' => 'Brand not found'], JsonResponse::HTTP_NOT_FOUND);
        }
    
        $establishments = $establishmentRepository->findBy(['brand' => $brand]);
    
        $result = [];
        foreach ($establishments as $establishment) {
            $result[] = [
                'id' => $establishment->getId(),
                'brand' => $establishment->getBrand()->getId(),
                'display_name' => $establishment->getDisplayName()
            ];
        }
    
        return new JsonResponse($result);
    }
    
    

    #[IsGranted("ROLE_ADMIN")]
    #[Route('/api/brands/brands_by_admin', name: 'brand_by_admin', methods: ['GET'])]
    public function getBrandsByAdmin(
        BrandRepository $brandRepository
    ): JsonResponse {

        $user = $this->getUser();
        $brands = $brandRepository->findBy(['user_id' => $user->getId()]);

        if (!$brands) {
            return new JsonResponse([], JsonResponse::HTTP_NO_CONTENT);
        }

        $result = [];

        foreach ($brands as $brand) {
            $result[] = [
                'id' => $brand->getId(),
                'name' => $brand->getDisplayName(),
                'image' => $brand->getImageUrl()
            ];
        }

        return new JsonResponse($result);
    }
   
    
}