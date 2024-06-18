<?php

namespace App\Controller;

use App\Entity\Review;
use App\Entity\User;
use App\Form\ReviewType;
use App\Repository\ReviewRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api/reviews')]
class ReviewController extends AbstractController
{
    private $reviewRepository;

    public function __construct(ReviewRepository $reviewRepository)
    {
        $this->reviewRepository = $reviewRepository;
    }

    #[Route('/average-stars/{coachId}', name: 'average_stars', methods: ['GET'])]
    public function getAverageStars(int $coachId): JsonResponse
    {
        $averageStars = $this->reviewRepository->findAverageStarsByCoach($coachId);

        if ($averageStars === null) {
            return $this->json([
                'status' => 'error',
                'message' => 'No reviews found for this coach',
            ], JsonResponse::HTTP_NOT_FOUND);
        }

        return $this->json([
            'coach_id' => $coachId,
            'average_stars' => (float) $averageStars,
        ]);
    }

    #[Route('/new', name: 'review_new', methods: ['POST'])]
    public function new(Request $request, EntityManagerInterface $entityManager): Response
    {
        $this->denyAccessUnlessGranted('ROLE_USER');

        $data = json_decode($request->getContent(), true);
        $user = $this->getUser();
        
        if ($this->reviewRepository->hasUserReviewedCoach($user->getId(), $data['coach_id'])) {
            return $this->json([
                'status' => 'error',
                'message' => 'You have already reviewed this coach',
            ], Response::HTTP_BAD_REQUEST);
        }

        $coach = $entityManager->getRepository(User::class)->find($data['coach_id']);
        if (!$coach) {
            return $this->json([
                'status' => 'error',
                'message' => 'Coach not found',
            ], Response::HTTP_NOT_FOUND);
        }

        $review = new Review();
        $review->setNumberOfStars($data['number_of_stars']);
        $review->setComment($data['comment'] ?? null);
        $review->setCoach($coach);
        $review->setClient($user);

        $entityManager->persist($review);
        $entityManager->flush();

        return $this->json($review, Response::HTTP_CREATED);
    }
}
