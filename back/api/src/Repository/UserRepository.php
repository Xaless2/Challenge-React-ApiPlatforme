<?php

namespace App\Repository;

use App\Entity\User;
use App\Entity\Establishment;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<User>
 *
 * @method User|null find($id, $lockMode = null, $lockVersion = null)
 * @method User|null findOneBy(array $criteria, array $orderBy = null)
 * @method User[]    findAll()
 * @method User[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class UserRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, User::class);
    }

    public function save(User $entity, bool $flush = false): void
    {
        $this->_em->persist($entity);
        if ($flush) {
            $this->_em->flush();
        }
    }

    public function remove(User $entity, bool $flush = false): void
    {
        $this->_em->remove($entity);
        if ($flush) {
            $this->_em->flush();
        }
    }

    public function findUsersWithReservationsForEstablishment(Establishment $establishment, User $user): array
    {
        return $this->createQueryBuilder('u')
            ->innerJoin('u.reservations', 'r')
            ->innerJoin('r.slot', 's')
            ->innerJoin('s.performance', 'p')
            ->innerJoin('p.establishment', 'e')
            ->innerJoin('e.brand', 'b')
            ->where('e = :establishment')
            ->andWhere('b.user = :user')
            ->setParameter('establishment', $establishment)
            ->setParameter('user', $user)
            ->getQuery()
            ->getResult();
    }

    public function findByRole(string $role): array
    {
        $conn = $this->getEntityManager()->getConnection();
        $sql = '
            SELECT *
            FROM "member"
            WHERE :role = ANY (SELECT jsonb_array_elements_text(roles::jsonb))
        ';
        $stmt = $conn->prepare($sql);
        $resultSet = $stmt->executeQuery(['role' => $role]);

        return $resultSet->fetchAllAssociative();
    }
}
