<?php

namespace App\Controller;

use app;
use App\Repository\BrandRepository;
use App\Repository\EstablishmentRepository;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;

class BrandController extends AbstractController
{
    #[Route('api/brands', name: 'api_brand', methods: ['GET'])]
    public function brand(BrandRepository $brandRepository): Response
    {
        $brand = $brandRepository->findAll();
        return $this->json($brand);
    }

    #[Route('/api/brands/establishments', name: 'brand_establishment', methods: ['GET'])]
    #[IsGranted('ROLE_ADMIN')]
    public function getUsersByEstablishment(
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
   
}