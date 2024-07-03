<?php

namespace App\Controller;

use App\Entity\Sport;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class SportController extends AbstractController
{
    private $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    #[Route('/sports', name: 'sport_index', methods: ['GET'])]
    public function index(): Response
    {
        $sports = $this->getDoctrine()->getRepository(Sport::class)->findAll();

        return $this->json($sports);
    }

    #[Route('/sports/{id}', name: 'sport_show', methods: ['GET'])]
    public function show(Sport $sport): Response
    {
        return $this->json($sport);
    }

    #[Route('/sports', name: 'sport_create', methods: ['POST'])]
    public function create(Request $request): Response
    {
        $data = json_decode($request->getContent(), true);

        $sport = new Sport();
        $sport->setNameSport($data['nameSport']);

        $this->entityManager->persist($sport);
        $this->entityManager->flush();

        return $this->json($sport);
    }

    #[Route('/sports/{id}', name: 'sport_update', methods: ['PUT'])]
    public function update(Request $request, Sport $sport): Response
    {
        $data = json_decode($request->getContent(), true);

        $sport->setNameSport($data['nameSport']);

        $this->entityManager->flush();

        return $this->json($sport);
    }

    #[Route('/sports/{id}', name: 'sport_delete', methods: ['DELETE'])]
    public function delete(Sport $sport): Response
    {
        $this->entityManager->remove($sport);
        $this->entityManager->flush();

        return new Response(null, Response::HTTP_NO_CONTENT);
    }
}
