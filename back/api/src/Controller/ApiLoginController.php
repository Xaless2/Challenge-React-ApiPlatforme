<?php

namespace App\Controller;

use App\Entity\User;
use ApiPlatform\Metadata\ApiResource;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Security\Http\Attribute\IsGranted;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use App\Service\UserService;

class ApiLoginController extends AbstractController
{
    #[Route('/login', name: 'api_login')]
    public function index(?User $user): Response
    {
        return $this->render('api_login/index.html.twig', [
            'controller_name' => 'ApiLoginController',
        ]);
    }

    // private UserService $userService;

    // #[Route('/api/login', name: 'api_login', methods: ['POST'])]
    // public function signIn(Request $request): JsonResponse
    // {
    //     try {
    //         $data = json_decode($request->getContent(), true);
          

    //         $email = $data['email'];
    //         $password = $data['password'];

    //         // Call userService to sign in
    //         [$user, $token] = $this->userService->signIn($email, $password);

    //         return $this->json([
    //             'user' => $user,
    //             'token' => $token,
    //         ], 200);

    //     } catch (\Exception $e) {
    //         return $this->json([
    //             'message' => $e->getMessage(),
    //         ], $e->getCode() ?: 500);
    //     }
    // }


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
