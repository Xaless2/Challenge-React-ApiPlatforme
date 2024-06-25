<?php

namespace App\DataFixtures;

use App\Entity\Institute;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class InstituteFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
       
      //ajouter 50 établissements
        for ($i = 2; $i <= 50; $i++) {
            $institute = new Institute();
            $institute->setName("Etablissement $i");
            $institute->setPhoneNumber("0123456789");
            $institute->setAddress("Adresse $i");
            $institute->setZipcode("75000");
            $institute->setCity("Paris");
            $manager->persist($institute);
        }
        $manager->flush();
    }

    public function getDependencies()
    {
        return [
            BrandFixtures::class,
        ];
    }
}
