<?php

namespace App\DataFixtures;

use App\Entity\User;
use App\Entity\Brand;
use App\Entity\Establishment;
use App\Entity\Performance;
use App\Entity\Slot;
use App\Entity\Reservation;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Doctrine\Bundle\FixturesBundle\FixtureGroupInterface;

class AppFixtures extends Fixture implements FixtureGroupInterface
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
        $this->addReference('user_admin', $admin);

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
        $this->addReference('user_admin2', $admin2);

        $brand1 = new Brand();
        // $brand1->setUser($admin->getId());
        $brand1->setUser($admin);
        $brand1->setDisplayName("Fitness");
        $manager->persist($brand1);

        $brand2 = new Brand();
        // $brand2->setUser($admin->getId());
        $brand2->setUser($admin);
        $brand2->setDisplayName("Basic");
        $manager->persist($brand2);

        $brand3 = new Brand();
        // $brand3->setUser($admin2->getId());
        $brand3->setUser($admin);
        $brand3->setDisplayName("Neoness");
        $manager->persist($brand3);

        $brands = [
            $brand1,
            $brand2,
            $brand3
        ];

        $establishments = [];
        for ($i = 1; $i <= 10; $i++) {
            $random = mt_rand(0, 2);
            $establishment = new Establishment();
            $establishment->setDisplayName($brands[$random]->getDisplayName().$i);
            $establishment->setPhone('123-456-789'.$i);
            $establishment->setAddress('123 Main St '.$i);
            $establishment->setZipCode('12345');
            $establishment->setCity('City '.$i);
            $establishment->setBrand($brands[$random]); 

            $manager->persist($establishment);
            $establishments[] = $establishment;
        }

        $clients = [];
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

            $clients[] = $client;
        }

        $coachs = [];
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
            $this->addReference('coach_' . $i, $coach);
            $coachs[] = $coach;
        }

        $performances = [];
        for ($i = 1; $i <= 10; $i++) {
            $randomEstablishment = $establishments[array_rand($establishments)];
            $performance = new Performance();
            $performance->setPerformanceName('Performance'.$i);
            $performance->setEstablishment($randomEstablishment);
            $performance->setDescription('Description for Performance'.$i);
            $performance->setNumberOfClientsMax(mt_rand(10, 50));
            $performance->setStatus('pending');

            $manager->persist($performance);
            $performances[] = $performance;
        }

        $slots = [];
        foreach ($performances as $performance) {
            for ($i = 1; $i <= 5; $i++) {
                $slot = new Slot();
                $slot->setPerformance($performance);
                $slot->setWeekDay('lundi');  
                $slot->setDayStartAt(new \DateTime('2024-06-01'));
                $slot->setDayEndAt(new \DateTime('2024-12-31'));
                $slot->setTimeStartAt(new \DateTime('08:00'));
                $slot->setTimeEndAt(new \DateTime('09:00'));
                $slot->setDurationMinutes(60);
                $slot->setNumberOfClients(mt_rand(5, 20));
                $randomCoach = $coachs[array_rand($coachs)];
                $slot->addCoach($randomCoach);

                $manager->persist($slot);
                $this->setReference('slot_' . $i, $slot);
            }
        }

        foreach ($slots as $slot) {
            for ($i = 1; $i <= 3; $i++) {
                $randomClient = $clients[array_rand($clients)];
                $reservation = new Reservation();
                $reservation->setSlot($slot);
                $reservation->setClientId($randomClient);
                $reservation->setStatus('pending');

                $manager->persist($reservation);
            }
        }

        $manager->flush();
    }

    public static function getGroups(): array
    {
        return ['app_group'];
    }
}
