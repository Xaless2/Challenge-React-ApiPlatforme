<?php

namespace App\Controller;

use App\Entity\Brand;
use App\Repository\BrandRepository;
use App\Repository\EstablishmentRepository;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Security\Http\Attribute\IsGranted;


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

    #[Route('/api/brands/establishments', name: 'brands_establishment', methods: ['GET'])]
    #[IsGranted('ROLE_ADMIN')]
    public function getEstablishmentsByBrand(
        BrandRepository $brandRepository, 
        EstablishmentRepository $establishmentRepository, 
    ): JsonResponse {

        $user = $this->getUser();
        $brands = $brandRepository->findBy(['user_id' => $user->getId()]);
        if (!$brands) {
            return new JsonResponse([], JsonResponse::HTTP_NO_CONTENT);
        }

        $result = [];

        foreach ($brands as $brand) {
            $establishments = $establishmentRepository->findBy(['brand_id' => $brand->getId()]); 

            foreach ($establishments as $establishment) {
                $result[] = [
                    'id' => $establishment->getId(),
                    'brand' => $establishment->getBrandId(),
                    'display_name' => $establishment->getDisplayName()
                ];
            };
        }

        return new JsonResponse($result);
    }

    #[Route('/api/brands/brands_by_admin', name: 'brand_by_admin', methods: ['GET'])]
    #[IsGranted('ROLE_ADMIN')]
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
