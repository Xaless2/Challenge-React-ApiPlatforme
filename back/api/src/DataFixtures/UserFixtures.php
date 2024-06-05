<?php

namespace App\DataFixtures;

use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class UserFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        $user = new User();
        $user->setEmail("test@gmail.com");
        $user->setPassword("test");
        $user->setRole("client");
        $user->setFirstName("Jean");
        $user->setLastName("Dupont");
        $user->setPhone("0606060606");
        $user->setAddress("1 rue de la Paix");
        $user->setZipCode("75000");
        $user->setCity("Paris");
      
        $manager->persist($user);
        $manager->flush();
    }
}
