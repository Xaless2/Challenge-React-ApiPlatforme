<?php

namespace App\DataFixtures;

use App\Entity\User;
use App\Entity\Brand;
use App\Entity\Establishment;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class Fixtures extends Fixture
{
    private $passwordHasher;

    public function __construct(UserPasswordHasherInterface $passwordHasher)
    {
        $this->passwordHasher = $passwordHasher;
    }

    public function load(ObjectManager $manager): void
    {
        $admin = new User();
        $admin->setFirstname('PrenomAdmin');
        $admin->setLastname('NomAdmin');
        $admin->setRoles(["ROLE_ADMIN"]);
        $admin->setEmail('admin@mail.com');
        $admin->setPassword($this->passwordHasher->hashPassword(
            $admin,
            'password'
        ));
        $admin->setPhone("1234567890");
        $admin->setAddress("text");
        $admin->setZipCode("text");
        $admin->setCity("text");
        $admin->setImageUrl("text");
        $manager->persist($admin);

        $admin2 = new User();
        $admin2->setFirstname('PrenomAdmin2');
        $admin2->setLastname('NomAdmin2');
        $admin2->setRoles(["ROLE_ADMIN"]);
        $admin2->setEmail('admin2@mail.com');
        $admin2->setPassword($this->passwordHasher->hashPassword(
            $admin2,
            'password'
        ));
        $admin2->setPhone("1234567890");
        $admin2->setAddress("text");
        $admin2->setZipCode("text");
        $admin2->setCity("text");
        $admin2->setImageUrl("text");
        $manager->persist($admin2);

        $brand1 = new Brand();
        $brand1->setUserId($admin->getId());
        $brand1->setDisplayName("Fitness");
        $manager->persist($brand1);

        $brand2 = new Brand();
        $brand2->setUserId($admin->getId());
        $brand2->setDisplayName("Basic");
        $manager->persist($brand2);

        $brand3 = new Brand();
        $brand3->setUserId($admin2->getId());
        $brand3->setDisplayName("Neoness");
        $manager->persist($brand3);

        $brands = [
            $brand1,
            $brand2,
            $brand3
        ];

        for ($i = 1; $i <= 10; $i++) {
            $random = mt_rand(0, 2);
            $establishment = new Establishment();
            $establishment->setDisplayName($brands[$random]->getDisplayName().$i);
            $establishment->setPhone('123-456-789'.$i);
            $establishment->setAddress('123 Main St '.$i);
            $establishment->setZipCode('12345');
            $establishment->setCity('City '.$i);
            $establishment->setBrandId($brands[$random]); 

            $manager->persist($establishment);
        }

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
