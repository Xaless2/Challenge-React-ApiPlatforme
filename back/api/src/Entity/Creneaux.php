<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\CreneauxRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

#[ApiResource(mercure: true)]
#[ORM\Entity(repositoryClass: CreneauxRepository::class)]
class Creneaux
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne]
    #[ORM\JoinColumn(nullable: false)]
    private ?Prestations $prestationId = null;

    #[ORM\ManyToMany(targetEntity: Coachs::class)]
    private Collection $coachId;

    #[ORM\Column(nullable: true)]
    private ?int $nombreClients = null;

    #[ORM\Column(length: 255)]
    #[Assert\Choice(["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi", "dimanche"])]
    private ?string $jourdesemaine = null;

    #[ORM\Column(type: Types::DATE_MUTABLE)]
    private ?\DateTimeInterface $dayStartAt = null;

    #[ORM\Column(type: Types::DATE_MUTABLE)]
    private ?\DateTimeInterface $dayEndAt = null;

    #[ORM\Column(type: Types::TIME_MUTABLE)]
    private ?\DateTimeInterface $timeStartAt = null;

    #[ORM\Column(type: Types::TIME_MUTABLE)]
    private ?\DateTimeInterface $timeEndAt = null;

    public function __construct()
    {
        $this->coachId = new ArrayCollection();
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

    public function getPrestationId(): ?Prestations
    {
        return $this->prestationId;
    }

    public function setPrestationId(?Prestations $prestationId): static
    {
        $this->prestationId = $prestationId;

        return $this;
    }

    /**
     * @return Collection<int, Coachs>
     */
    public function getCoachId(): Collection
    {
        return $this->coachId;
    }

    public function addCoachId(Coachs $coachId): static
    {
        if (!$this->coachId->contains($coachId)) {
            $this->coachId->add($coachId);
        }

        return $this;
    }

    public function removeCoachId(Coachs $coachId): static
    {
        $this->coachId->removeElement($coachId);

        return $this;
    }

    public function getNombreClients(): ?int
    {
        return $this->nombreClients;
    }

    public function setNombreClients(?int $nombreClients): static
    {
        $this->nombreClients = $nombreClients;

        return $this;
    }

    public function getJourdesemaine(): ?string
    {
        return $this->jourdesemaine;
    }

    public function setJourdesemaine(string $jourdesemaine): static
    {
        $this->jourdesemaine = $jourdesemaine;

        return $this;
    }

    public function getDayStartAt(): ?\DateTimeInterface
    {
        return $this->dayStartAt;
    }

    public function setDayStartAt(\DateTimeInterface $dayStartAt): static
    {
        $this->dayStartAt = $dayStartAt;

        return $this;
    }

    public function getDayEndAt(): ?\DateTimeInterface
    {
        return $this->dayEndAt;
    }

    public function setDayEndAt(\DateTimeInterface $dayEndAt): static
    {
        $this->dayEndAt = $dayEndAt;

        return $this;
    }

    public function getTimeStartAt(): ?\DateTimeInterface
    {
        return $this->timeStartAt;
    }

    public function setTimeStartAt(\DateTimeInterface $timeStartAt): static
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
        $this->timeEndAt = $timeEndAt;

        return $this;
    }
}
