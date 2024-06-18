<?php

namespace App\Repository;

use App\Entity\Review;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

class ReviewRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Review::class);
    }

    public function findAverageStarsByCoach(int $coachId): ?float
    {
        $qb = $this->createQueryBuilder('r')
            ->select('AVG(r.number_of_stars) as avg_stars')
            ->where('r.coach = :coachId')
            ->setParameter('coachId', $coachId)
            ->getQuery();

        return $qb->getSingleScalarResult();
    }

    public function hasUserReviewedCoach(int $clientId, int $coachId): bool
    {
        $qb = $this->createQueryBuilder('r')
            ->select('count(r.id)')
            ->where('r.client = :clientId')
            ->andWhere('r.coach = :coachId')
            ->setParameter('clientId', $clientId)
            ->setParameter('coachId', $coachId)
            ->getQuery();

        return $qb->getSingleScalarResult() > 0;
    }
}
