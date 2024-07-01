<?php

namespace App\DataFixtures;

use App\Entity\SlotCoach;
use App\Entity\Slot;
use App\Entity\User;
use App\Enum\SlotStatus;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Bundle\FixturesBundle\FixtureGroupInterface;

class SlotCoachFixtures extends Fixture implements DependentFixtureInterface, FixtureGroupInterface
{
    public function load(ObjectManager $manager): void
    {
        $slot = $this->getReference('slot_1'); 
        $coach = $this->getReference('coach_1'); 

        $slotCoach = new SlotCoach();
        $slotCoach->setSlotId($slot);
        $slotCoach->setCoachId($coach);
        $slotCoach->setStatus('confirmed');
        $slotCoach->setCreatedAt(new \DateTimeImmutable());

        $manager->persist($slotCoach);
        $manager->flush();
    }

    public function getDependencies()
    {
        return [
            AppFixtures::class,
        ];
    }

    public static function getGroups(): array
    {
        return ['slot_coach_group'];
    }
}
