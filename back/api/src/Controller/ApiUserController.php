<?php

namespace App\Controller;

use App\Repository\UserRepository;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Http\Attribute\IsGranted;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class ApiUserController extends AbstractController
{
    #[Route('/api/me', name: 'api_me', methods: ['GET'])]
    #[IsGranted('ROLE_USER')]
    public function me()
    {
        $user = $this->getUser();
        return $this->json($user);
    }

    #[Route('/api/users/admin', name: 'api_users_admin', methods: ['GET'])]
    #[IsGranted('ROLE_SUPER_ADMIN')]
    public function getUsersRoleAdmin(UserRepository $userRepository): JsonResponse
    {
        $admins = $userRepository->findByRole('ROLE_ADMIN');
        return $this->json($admins);
    }
}
