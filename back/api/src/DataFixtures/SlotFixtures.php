<?php

namespace App\DataFixtures;

use App\Entity\Performance;
use App\Entity\Slot;
use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;

class SlotFixtures extends Fixture implements DependentFixtureInterface
{
    public function load(ObjectManager $manager)
    {
        for ($i = 0; $i < 10; $i++) {
            $slot = new Slot();

            // Vous pouvez obtenir une référence à une entité Performance créée dans une autre fixture
            $performance = $this->getReference(PerformanceFixtures::Performance . $i);
            $slot->setPerformance($performance);

            // Ajouter des entraîneurs à la slot
            for ($j = 0; $j < 3; $j++) {
                $coach = $this->getReference(UserFixtures::USER_REFERENCE . $j);
                $slot->addCoach($coach);
            }

            $slot->setNumberOfClients(mt_rand(1, 20));
            $slot->setWeekDay('lundi');
            $slot->setDayStartAt(new \DateTime());
            $slot->setDayEndAt(new \DateTime());
            $slot->setTimeStartAt(new \DateTime());
            $slot->setTimeEndAt(new \DateTime());
            $slot->setDurationMinutes(mt_rand(30, 120));

            $manager->persist($slot);
        }

        $manager->flush();
    }

    public function getDependencies()
    {
        return [
            PerformanceFixtures::class,
            UserFixtures::class,
        ];
    }
}