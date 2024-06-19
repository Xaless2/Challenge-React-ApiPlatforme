<?php

namespace App\Repository;

use App\Entity\Institute;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Institute>
 *
 * @method Institute|null find($id, $lockMode = null, $lockVersion = null)
 * @method Institute|null findOneBy(array $criteria, array $orderBy = null)
 * @method Institute[]    findAll()
 * @method Institute[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class InstituteRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Institute::class);
    }

//    /**
//     * @return Institute[] Returns an array of Institute objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('e')
//            ->andWhere('e.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('e.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?Establishment
//    {
//        return $this->createQueryBuilder('e')
//            ->andWhere('e.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
