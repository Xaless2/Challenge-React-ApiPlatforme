<?php

namespace App\Controller;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class ApiRegistrationController extends AbstractController
{
    #[Route('/register', name: 'api_registration', methods: ['POST'])]
    public function index(Request $request, UserPasswordHasherInterface $hasher, EntityManagerInterface $entityManager, ValidatorInterface $validator): Response
    {
        $data = json_decode($request->getContent(), true);

        if (!isset($data['firstname']) || !isset($data['lastname'])) {
            return $this->json([
                'message' => 'Firstname and lastname are required',
                'path' => 'src/Controller/ApiRegistrationController.php',
            ], Response::HTTP_BAD_REQUEST);
        }

        $allowedRoles = ['ROLE_USER', 'ROLE_ADMIN', 'ROLE_SUPER_ADMIN'];

        if (!isset($data['roles']) || empty($data['roles'])) {
            $data['roles'] = ['ROLE_USER'];
        } else {
            foreach ($data['roles'] as $role) {
                if (!in_array($role, $allowedRoles)) {
                    return $this->json([
                        'message' => 'Invalid role',
                        'path' => 'src/Controller/ApiRegistrationController.php',
                    ], Response::HTTP_BAD_REQUEST);
                }
            }
        }

        $user = new User();
        $user->setEmail($data['email']);
        $user->setPassword($hasher->hashPassword($user, $data['password']));
        $user->setRoles($data['roles']);
        $user->setFirstname($data['firstname']);
        $user->setLastname($data['lastname']);
        $user->setPhone($data['phone'] ?? "");
        $user->setAddress($data['address'] ?? "");
        $user->setZipCode($data['zip_code'] ?? "");
        $user->setCity($data['city'] ?? "");
        $user->setImageUrl($data['image_url'] ?? "");

        $errors = $validator->validate($user);

        if (count($errors) > 0) {
            $errorsString = (string) $errors;

            return $this->json([
                'message' => $errorsString,
                'path' => 'src/Controller/ApiRegistrationController.php',
            ]);
        }

        $entityManager->persist($user);
        $entityManager->flush();

        return $this->json([
            'message' => 'User created',
            'path' => 'src/Controller/ApiRegistrationController.php',
        ]);
    }
}