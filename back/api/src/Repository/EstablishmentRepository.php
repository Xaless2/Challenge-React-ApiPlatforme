<?php

namespace App\Repository;

use App\Entity\Establishment;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Establishment>
 *
 * @method Establishment|null find($id, $lockMode = null, $lockVersion = null)
 * @method Establishment|null findOneBy(array $criteria, array $orderBy = null)
 * @method Establishment[]    findAll()
 * @method Establishment[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class EstablishmentRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Establishment::class);
    }

    public function findAll(): array
    {
        return $this->createQueryBuilder('e')
            ->orderBy('e.id', 'ASC')
            ->getQuery()
            ->getResult()
        ;
    }

    public function findByName(string $name)
    {
        return $this->createQueryBuilder('e')
            ->andWhere('LOWER(TRIM(e.display_name)) LIKE LOWER(TRIM(:name))')
            ->setParameter('name', '%' . $name . '%')
            ->getQuery()
            ->getResult();
    }

    public function findSlotsByEstablishment(int $establishmentId): array
    {
        return $this->createQueryBuilder('e')
            ->select('e, s')
            ->leftJoin('e.slots', 's')
            ->where('e.id = :establishmentId')
            ->setParameter('establishmentId', $establishmentId)
            ->getQuery()
            ->getResult();
    }



    public function countSlotsByEstablishment(): array
    {
        return $this->createQueryBuilder('e')
            ->select('e.id, e.display_name, COUNT(s.id) AS slot_count')
            ->leftJoin('e.slots', 's')
            ->groupBy('e.id')
            ->getQuery()
            ->getResult();
    }

//    /**
//     * @return Establishment[] Returns an array of Establishment objects
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