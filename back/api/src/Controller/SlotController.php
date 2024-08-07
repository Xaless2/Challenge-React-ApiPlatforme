<?php

namespace App\Controller;

use App\Entity\Slot;
use App\Repository\SlotRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Symfony\Component\Serializer\SerializerInterface;
use App\Entity\User;
use Symfony\Component\HttpFoundation\JsonResponse;

class SlotController extends AbstractController
{
    private $entityManager;
    private $validator;
    private $serializer;

    public function __construct(EntityManagerInterface $entityManager, ValidatorInterface $validator, SerializerInterface $serializer)
    {
        $this->entityManager = $entityManager;
        $this->validator = $validator;
        $this->serializer = $serializer;
    }

 
    #[Route('/api/slots', name: 'get_slots', methods: ['GET'])]
    public function getSlots(Request $request, SlotRepository $slotRepository): JsonResponse
    {
        $name = trim($request->query->get('name', ''));
        if ($name) {
            $slots = $slotRepository->findByName($name);
        } else {
            $slots = $slotRepository->findAll();
        }

        $result = [];

        foreach($slots as $slot){
            $result[] = [
                'id' => $slot->getId(),
                'performance_id' => $slot->getPerformanceId(),
                'number_of_clients' => $slot->getNumberOfClients(),
                'week_day' => $slot->getWeekDay(),
                'day_start_at' => $slot->getDayStartAt(),
                'day_end_at' => $slot->getDayEndAt(),
                'time_start_at' => $slot->getTimeStartAt(),
                'time_end_at' => $slot->getTimeEndAt(),
                'duration_minutes' => $slot->getDurationMinutes(),
            ];
        }
        return new JsonResponse($result);
    }

    #[Route('/api/slots/{id}', name: 'get_slot', methods: ['GET'])]
    public function getSlot(Slot $slot): Response
    {
        $data = $this->serializer->serialize($slot, 'json', ['groups' => 'slot:read']);

        return new Response($data, 200, ['Content-Type' => 'application/json']);
    }

    #[Route('/api/slots', name: 'create_slot', methods: ['POST'])]
    public function createSlot(Request $request): Response
    {
        $data = json_decode($request->getContent(), true);

        $slot = new Slot();
        $slot->setPerformance($data['performance_id'])
             ->setNumberOfClients($data['number_of_clients'])
             ->setWeekDay($data['week_day'])
             ->setDayStartAt(new \DateTime($data['day_start_at']))
             ->setDayEndAt(new \DateTime($data['day_end_at']))
             ->setTimeStartAt(new \DateTime($data['time_start_at']))
             ->setTimeEndAt(new \DateTime($data['time_end_at']))
             ->setDurationMinutes($data['duration_minutes']);

        // Add coaches
        foreach ($data['coach_id'] as $coachId) {
            $coach = $this->getDoctrine()->getRepository(User::class)->find($coachId);
            if ($coach) {
                $slot->addCoachId($coach);
            }
        }

        $errors = $this->validator->validate($slot);
        if (count($errors) > 0) {
            return new Response($this->serializer->serialize($errors, 'json'), 400, ['Content-Type' => 'application/json']);
        }

        $this->entityManager->persist($slot);
        $this->entityManager->flush();

        return new Response($this->serializer->serialize($slot, 'json', ['groups' => 'slot:read']), 201, ['Content-Type' => 'application/json']);
    }

    #[Route('/api/slots/{id}', name: 'update_slot', methods: ['PUT'])]
    public function updateSlot(Request $request, Slot $slot): Response
    {
        $data = json_decode($request->getContent(), true);

        $slot->setPerformance($data['performance_id'])
             ->setNumberOfClients($data['number_of_clients'])
             ->setWeekDay($data['week_day'])
             ->setDayStartAt(new \DateTime($data['day_start_at']))
             ->setDayEndAt(new \DateTime($data['day_end_at']))
             ->setTimeStartAt(new \DateTime($data['time_start_at']))
             ->setTimeEndAt(new \DateTime($data['time_end_at']))
             ->setDurationMinutes($data['duration_minutes']);

        // Update coaches
        $slot->getCoachId()->clear();
        foreach ($data['coach_id'] as $coachId) {
            $coach = $this->getDoctrine()->getRepository(User::class)->find($coachId);
            if ($coach) {
                $slot->addCoachId($coach);
            }
        }

        $errors = $this->validator->validate($slot);
        if (count($errors) > 0) {
            return new Response($this->serializer->serialize($errors, 'json'), 400, ['Content-Type' => 'application/json']);
        }

        $this->entityManager->flush();

        return new Response($this->serializer->serialize($slot, 'json', ['groups' => 'slot:read']), 200, ['Content-Type' => 'application/json']);
    }

    #[Route('/api/slots/{id}', name: 'delete_slot', methods: ['DELETE'])]
    public function deleteSlot(Slot $slot): Response
    {
        $this->entityManager->remove($slot);
        $this->entityManager->flush();

        return new Response(null, 204);
    }
}
