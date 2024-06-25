<?php

namespace App\DataFixtures;

use App\Entity\Performance;
use App\Entity\Sport;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class PerformanceFixtures extends Fixture 
{
    public const PERFORMANCE_REF  = 'performance-ref';

    public function load(ObjectManager $manager): void
    {
        // Création d'un nouveau sport pour l'exemple
        $sport = new Sport();
        $sport->setNameSport('Football');
        $manager->persist($sport);

        // Création d'une nouvelle performance
        $performance = new Performance();
        $performance->setPerformanceName('Entraînement Intensif');
        $performance->setDescription('Un entraînement intensif pour les joueurs avancés.');
        $performance->setNumberOfClientsMax(20);
        $performance->setStripePriceId('price_1HJKLmJNcmPZQX4P3lKjY5B9');
        $performance->setStatus('confirmed');
        $performance->addSportId($sport); // Associer le sport créé à la performance

        $manager->persist($performance);

        $manager->flush();

        $this->addReference('performance-ref0', $performance);

    }

    public function getDependencies()
    {
        return [
            SportFixtures::class,
        ];
    }


}