<?php

namespace App\DataFixtures;

use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class UserFixtures extends Fixture
{
    public const USER_REFERENCE = 'user-ref';
    public function load(ObjectManager $manager): void
    {
        // User 1
        $user1 = new User();
        $user1->setEmail("client@gmail.com");
        $user1->setPassword("test");
        $user1->setRole("client");
        $user1->setFirstName("Jean");
        $user1->setLastName("Dupont");
        $user1->setUsername("client@gmail.com");
        $user1->setPhone("0606060606");
        $user1->setAddress("1 rue de la Paix");
        $user1->setZipCode("75000");
        $user1->setCity("Paris");
        $manager->persist($user1);

        // User 2
        $user2 = new User();
        $user2->setEmail("admin@gmail.com");
        $user2->setPassword("test");
        $user2->setRole("admin");
        $user2->setFirstName("Pierre");
        $user2->setLastName("Martin");
        $user2->setUsername("admin@gmail.com");
        $user2->setPhone("0707070707");
        $user2->setAddress("2 avenue des Champs");
        $user2->setZipCode("75000");
        $user2->setCity("Paris");
        $manager->persist($user2);

        // User 3
        $user3 = new User();
        $user3->setEmail("moderator@gmail.com");
        $user3->setPassword("test");
        $user3->setRole("client");
        $user3->setFirstName("Jacques");
        $user3->setLastName("Durand");
        $user3->setUsername("moderator@gmail.com");
        $user3->setPhone("0808080808");
        $user3->setAddress("3 boulevard de la République");
        $user3->setZipCode("75000");
        $user3->setCity("Paris");
        $manager->persist($user3);

        $manager->flush();

        $this->addReference(self::USER_REFERENCE . '0', $user1);
        $this->addReference('user-ref1', $user2);
        $this->addReference('user-ref2', $user3);
    }
}
