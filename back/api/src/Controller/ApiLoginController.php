<?php

namespace App\Controller;

use App\Entity\User;
use ApiPlatform\Metadata\ApiResource;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Security\Http\Attribute\IsGranted;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class ApiLoginController extends AbstractController
{
    #[Route('/login', name: 'api_login')]
    public function index(?User $user): Response
    {
        return $this->render('api_login/index.html.twig', [
            'controller_name' => 'ApiLoginController',
        ]);
    }

    #[Route('/api/admin/home', name: 'api_toto')]
    #[IsGranted('ROLE_ADMIN')]
    public function adminDashboard(): Response
    {

        return $this->json([
            'message' => 'Welcome to your new controller!',
            'path' => 'src/Controller/ApiLoginController.php',
        ]);
    }

}