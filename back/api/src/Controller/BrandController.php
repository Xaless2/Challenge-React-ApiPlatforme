<?php

namespace App\Controller;

use app;
use App\Repository\BrandRepository;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class BrandController extends AbstractController
{
    #[Route('/brand', name: 'api_brand', methods: ['GET'])]
    public function brand(BrandRepository $brandRepository): Response
    {
        $brand = $brandRepository->findAll();
        return $this->json($brand);
    }
   
}