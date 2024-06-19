<?php

namespace App\DataFixtures;

use App\Entity\Brand;
use App\Entity\Establishment;
use App\Entity\Performance;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class PerformanceFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        
        $performance = new Performance();
        // Configuration de l'entité Performance avec les propriétés correctes
        $performance->setPerformanceName('Nom de la performance');
        $performance->setDescription('Description de la performance');
        $performance->setNumberOfClientsMax(100);
        $performance->setStripePriceId('prix_stripe_id');
        $performance->setStatus('pending');
        
        // Persister l'entité Performance
        $manager->persist($performance);
        // Enregistrer les changements dans la base de données
        $manager->flush();
    }
}
