<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\SlotRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

#[ApiResource(mercure: true)]
#[ORM\Entity(repositoryClass: SlotRepository::class)]
class Slot
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne]
    #[ORM\JoinColumn(nullable: false)]
    private ?Performance $performance_id = null;

    #[ORM\ManyToMany(targetEntity: User::class, inversedBy: "slots")]
    #[ORM\JoinTable(name: "slot_user")]
    #[ORM\JoinColumn(name: "slot_id", referencedColumnName: "id")]
    #[ORM\InverseJoinColumn(name: "coach_id", referencedColumnName: "id")]
    private Collection $coach_id;

    #[ORM\Column(nullable: true)]
    private ?int $number_of_clients = null;

    #[ORM\Column(length: 255)]
    #[Assert\Choice(["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi", "dimanche"])]
    private ?string $week_day = null;

    #[ORM\Column(type: Types::DATE_MUTABLE)]
    private ?\DateTimeInterface $day_start_at = null;

    #[ORM\Column(type: Types::DATE_MUTABLE)]
    private ?\DateTimeInterface $day_end_at = null;

    #[ORM\Column(type: Types::TIME_MUTABLE)]
    private ?\DateTimeInterface $time_start_at = null;

    #[ORM\Column(type: Types::TIME_MUTABLE)]
    private ?\DateTimeInterface $time_end_at = null;

    #[ORM\Column(nullable: true)]
    private ?int $duration_minutes = null;

    public function __construct()
    {
        $this->coach_id = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function setId(int $id): static
    {
        $this->id = $id;

        return $this;
    }

    public function getPerformanceId(): ?Performance
    {
        return $this->performance_id;
    }

    public function setPerformanceId(?Performance $performanceId): static
    {
        $this->performance_id = $performanceId;

        return $this;
    }

    /**
     * @return Collection<int, User>
     */
    public function getCoachId(): Collection
    {
        return $this->coach_id;
    }

    public function addCoachId(User $coach_id): static
    {
        if (!$this->coach_id->contains($coach_id)) {
            $this->coach_id->add($coach_id);
        }

        return $this;
    }

    public function removeCoachId(User $coach_id): static
    {
        $this->coach_id->removeElement($coach_id);

        return $this;
    }

    public function getNumberOfClients(): ?int
    {
        return $this->number_of_clients;
    }

    public function setNumberOfClients(?int $number_of_clients): static
    {
        $this->number_of_clients = $number_of_clients;

        return $this;
    }

    public function getWeekDay(): ?string
    {
        return $this->week_day;
    }

    public function setWeekDay(string $week_day): static
    {
        $this->week_day = $week_day;

        return $this;
    }

    public function getDayStartAt(): ?\DateTimeInterface
    {
        return $this->day_start_at;
    }

    public function setDayStartAt(\DateTimeInterface $day_start_at): static
    {
        $this->day_start_at = $day_start_at;

        return $this;
    }

    public function getDayEndAt(): ?\DateTimeInterface
    {
        return $this->day_end_at;
    }

    public function setDayEndAt(\DateTimeInterface $day_end_at): static
    {
        $this->day_end_at = $day_end_at;

        return $this;
    }

    public function getTimeStartAt(): ?\DateTimeInterface
    {
        return $this->time_start_at;
    }

    public function setTimeStartAt(\DateTimeInterface $time_start_at): static
    {
        $this->time_start_at = $time_start_at;

        return $this;
    }

    public function getTimeEndAt(): ?\DateTimeInterface
    {
        return $this->time_end_at;
    }

    public function setTimeEndAt(\DateTimeInterface $time_end_at): static
    {
        $this->time_end_at = $time_end_at;

        return $this;
    }

    public function getDurationMinutes(): ?int
    {
        return $this->duration_minutes;
    }

    public function setDurationMinutes(int $duration_minutes): static
    {
        $this->duration_minutes = $duration_minutes;

        return $this;
    }
}
