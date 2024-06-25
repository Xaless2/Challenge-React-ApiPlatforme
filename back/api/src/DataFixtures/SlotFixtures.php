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
    public const SLOT_REFERENCE = 'slot-ref';
    public function load(ObjectManager $manager)
    {
        for ($i = 0; $i < 10; $i++) {
            $slot = new Slot();

            // Get a reference to a Performance entity created in another fixture
            $performance = $this->getReference(PerformanceFixtures::PERFORMANCE_REF . '0');
            $slot->setPerformanceId($performance);

            // Add coaches to the slot
            for ($j = 0; $j < 3; $j++) {
                $coach = $this->getReference(UserFixtures::USER_REFERENCE . $j);
                $slot->addCoachId($coach);
            }

            $slot->setNumberOfClients(mt_rand(1, 20));
            $slot->setWeekDay('lundi');

            $startDateTime = new \DateTime();
            $endDateTime = (clone $startDateTime)->modify('+1 hour'); // Example of setting end time 1 hour after start time

            $slot->setDayStartAt($startDateTime);
            $slot->setDayEndAt($endDateTime);
            $slot->setTimeStartAt($startDateTime);
            $slot->setTimeEndAt($endDateTime);
            $slot->setDurationMinutes(mt_rand(30, 120));

            $manager->persist($slot);
        }

        $manager->flush();
        $this->addReference(self::SLOT_REFERENCE, $slot);

    }

    public function getDependencies()
    {
        return [
            PerformanceFixtures::class,
            UserFixtures::class,
        ];
    }
}