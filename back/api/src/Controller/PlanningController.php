<?php

namespace App\Controller;

use App\Entity\Planning;
use App\Repository\PlanningRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/api/plannings")
 */
class PlanningController extends AbstractController
{
    /**
     * @Route("/", name="planning_index", methods={"GET"})
     */
    public function index(PlanningRepository $planningRepository): Response
    {
        $plannings = $planningRepository->findAll();

        return $this->json($plannings);
    }

    /**
     * @Route("/{id}", name="planning_show", methods={"GET"})
     */
    public function show(Planning $planning): Response
    {
        return $this->json($planning);
    }

    /**
     * @Route("/", name="planning_create", methods={"POST"})
     */
    public function create(Request $request): Response
    {
        $data = json_decode($request->getContent(), true);

        $planning = new Planning();
        $planning->setDayStartAt(new \DateTimeImmutable($data['dayStartAt']));
        $planning->setDayEndAt(new \DateTimeImmutable($data['dayEndAt']));
        $planning->setDuration($data['duration']);
        $planning->setTimeStart(new \DateTime($data['timeStartAt'])); 
        $planning->setTimeEndAt(new \DateTime($data['timeEndAt']));

        $entityManager = $this->getDoctrine()->getManager();
        $entityManager->persist($planning);
        $entityManager->flush();

        return $this->json($planning, Response::HTTP_CREATED);
    }

    /**
     * @Route("/{id}", name="planning_update", methods={"PUT"})
     */
    public function update(Request $request, Planning $planning): Response
    {
        $data = json_decode($request->getContent(), true);

        $planning->setDayStartAt(new \DateTimeImmutable($data['dayStartAt']));
        $planning->setDayEndAt(new \DateTimeImmutable($data['dayEndAt']));
        $planning->setDuration($data['duration']);
        $planning->setTimeStart(new \DateTime($data['timeStartAt']));
        $planning->setTimeEndAt(new \DateTime($data['timeEndAt']));

        $entityManager = $this->getDoctrine()->getManager();
        $entityManager->flush();

        return $this->json($planning);
    }

    /**
     * @Route("/{id}", name="planning_delete", methods={"DELETE"})
     */
    public function delete(Planning $planning): Response
    {
        $entityManager = $this->getDoctrine()->getManager();
        $entityManager->remove($planning);
        $entityManager->flush();

        return $this->json(null, Response::HTTP_NO_CONTENT);
    }
}
