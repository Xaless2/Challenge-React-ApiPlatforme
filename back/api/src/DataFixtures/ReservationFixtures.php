<?php

namespace App\DataFixtures;

use App\Entity\Reservation;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;

class ReservationFixtures extends Fixture implements DependentFixtureInterface
{
    public function load(ObjectManager $manager): void
    {
        // Récupérer les références de Slot et User
        $slot = $this->getReference(SlotFixtures::SLOT_REFERENCE);
        // $user = $this->getReference(UserFixtures::USER_REFERENCE);
        $user = $this->getReference(UserFixtures::USER_REFERENCE . '1'); // Accès au premier utilisateur
        // Créer une nouvelle réservation
        $reservation = new Reservation();
        $reservation->setSlotId($slot);
        $reservation->setClientId($user);
        $reservation->setStatus('pending');

        $manager->persist($reservation);
        $manager->flush();
    }

    public function getDependencies()
    {
        return [
            SlotFixtures::class,
            UserFixtures::class,
        ];
    }
}
