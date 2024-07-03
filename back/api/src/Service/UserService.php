<?php

namespace App\Service;

use App\Entity\User;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use App\Exception\AppError;


class UserService
{
    private UserRepository $userRepository;
    private EntityManagerInterface $entityManager;
    private UserPasswordEncoderInterface $passwordEncoder;

    public function __construct(
        UserRepository $userRepository,
        EntityManagerInterface $entityManager,
        UserPasswordEncoderInterface $passwordEncoder
    ) {
        $this->userRepository = $userRepository;
        $this->entityManager = $entityManager;
        $this->passwordEncoder = $passwordEncoder;
    }

    /**
     * Sign in user with email and password.
     *
     * @param string $email
     * @param string $password
     * @return array [User, string] User entity and JWT token
     * @throws \Exception If user is not found or password is invalid
     */
    public function signIn(string $email, string $password): array
    {
        $user = $this->userRepository->findOneBy(['email' => $email]);

        if (!$user) {
            throw new AppError(404, 'fail', 'User not found');
        }

        if (!$this->passwordEncoder->isPasswordValid($user, $password)) {
            throw new AppError(401, 'fail', 'Invalid credentials');
        }

        // Generate JWT token or perform any other login actions here

        return [$user, 'your_generated_jwt_token'];
    }
}
