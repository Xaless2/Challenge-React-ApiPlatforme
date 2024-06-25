<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\PlanningRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: PlanningRepository::class)]
#[ApiResource]
class Planning
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column]
    private ?\DateTimeImmutable $dayStartAt = null;

    #[ORM\Column]
    private ?\DateTimeImmutable $dayEndAt = null;

    #[ORM\Column]
    private ?int $Duration = null;

    #[ORM\Column(type: Types::TIME_MUTABLE)]
    private ?\DateTimeInterface $timeStartAt = null;

    #[ORM\Column(type: Types::TIME_MUTABLE)]
    private ?\DateTimeInterface $timeEndAt = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getDayStartAt(): ?\DateTimeImmutable
    {
        return $this->dayStartAt;
    }

    public function setDayStartAt(\DateTimeImmutable $dayStartAt): static
    {
        $this->dayStartAt = $dayStartAt;

        return $this;
    }

    public function getDayEndAt(): ?\DateTimeImmutable
    {
        return $this->dayEndAt;
    }

    public function setDayEndAt(\DateTimeImmutable $dayEndAt): static
    {
        $this->dayEndAt = $dayEndAt;

        return $this;
    }

    public function getDuration(): ?int
    {
        return $this->Duration;
    }

    public function setDuration(int $Duration): static
    {
        $this->Duration = $Duration;

        return $this;
    }

    public function getTimeStartAt(): ?\DateTimeInterface
    {
        return $this->timeStartAt;
    }

    public function setTimeStart(\DateTimeInterface $timeStartAt): static
    {
        $this->timeStartAt = $timeStartAt;

        return $this;
    }

    public function getTimeEndAt(): ?\DateTimeInterface
    {
        return $this->timeEndAt;
    }

    public function setTimeEndAt(\DateTimeInterface $timeEndAt): static
    {
        $this->TimeEndAt = $timeEndAt;

        return $this;
    }
}
