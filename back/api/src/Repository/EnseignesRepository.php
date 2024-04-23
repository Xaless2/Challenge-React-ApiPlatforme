<?php

namespace App\Repository;

use App\Entity\Enseignes;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Enseignes>
 *
 * @method Enseignes|null find($id, $lockMode = null, $lockVersion = null)
 * @method Enseignes|null findOneBy(array $criteria, array $orderBy = null)
 * @method Enseignes[]    findAll()
 * @method Enseignes[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class EnseignesRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Enseignes::class);
    }

//    /**
//     * @return Enseignes[] Returns an array of Enseignes objects
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

//    public function findOneBySomeField($value): ?Enseignes
//    {
//        return $this->createQueryBuilder('e')
//            ->andWhere('e.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
