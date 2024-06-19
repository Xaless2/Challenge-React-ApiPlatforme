<?php

namespace App\DataFixtures;

use App\Entity\Brand;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class BrandFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
       //ajouter 50 marques
        for ($i = 1; $i <= 50; $i++) {
            $brand = new Brand();
            $brand->setName("Marque $i");
            $brand->setLogo("logo_marque_$i.png");
            $manager->persist($brand);
            $this->addReference("brand_$i", $brand);
        }

        $manager->flush();
    }
}
