<?php

namespace App\DataFixtures;

use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class UserFixtures extends Fixture
{
    private $passwordHasher;

    public function __construct(UserPasswordHasherInterface $passwordHasher)
    {
        $this->passwordHasher = $passwordHasher;
    }

    public function load(ObjectManager $manager): void
    {
        for ($i = 1; $i <= 10; $i++) {
            $client = new User();
            $client->setFirstname('PrenomClient'.$i);
            $client->setLastname('NomClient'.$i);
            $client->setRoles(["ROLE_USER"]);
            $client->setEmail('client'.($i+2).'@mail.com');
            $client->setPassword($this->passwordHasher->hashPassword(
                $client,
                'password'
            ));
            $client->setPhone("1234567890");
            $client->setAddress("text");
            $client->setZipCode("text");
            $client->setCity("text");
            $client->setImageUrl("text");
            $manager->persist($client);
        }

        for ($i = 1; $i <= 10; $i++) {
            $coach = new User();
            $coach->setFirstname('PrenomCoach'.$i);
            $coach->setLastname('NomCoach'.$i);
            $coach->setRoles(["ROLE_COACH"]);
            $coach->setEmail('coach'.($i+2).'@mail.com');
            $coach->setPassword($this->passwordHasher->hashPassword(
                $coach,
                'password'
            ));
            $coach->setPhone("1234567890");
            $coach->setAddress("text");
            $coach->setZipCode("text");
            $coach->setCity("text");
            $coach->setImageUrl("text");
            $manager->persist($coach);
        }

        $manager->flush();
    }
}
