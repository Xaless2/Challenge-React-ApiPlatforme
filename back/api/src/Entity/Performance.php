<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\PerformanceRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

#[ApiResource(mercure: true)]
#[ORM\Entity(repositoryClass: PerformanceRepository::class)]
class Performance
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne(targetEntity: Establishment::class)]
    #[ORM\JoinColumn(name: "establishment_id", referencedColumnName: "id", nullable: false)]
    private ?Establishment $establishment = null;

    #[ORM\Column(length: 255)]
    private ?string $performance_name = null;

    #[ORM\ManyToMany(targetEntity: Sport::class)]
    private Collection $sport_id;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $description = null;

    #[ORM\Column]
    private ?int $number_of_clients_max = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $stripe_price_id = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Assert\Choice(["pending", "confirmed", "refused", "canceled"])]
    private ?string $status = null;

    public function __construct()
    {
        $this->sport_id = new ArrayCollection();
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

    public function getEstablishment(): ?Establishment
    {
        return $this->establishment;
    }

    public function setEstablishment(?Establishment $establishment): static
    {
        $this->establishment = $establishment;

        return $this;
    }

    public function getPerformanceName(): ?string
    {
        return $this->performance_name;
    }

    public function setPerformanceName(?string $performance_name): static
    {
        $this->performance_name = $performance_name;

        return $this;
    }

    /**
     * @return Collection<int, Sport>
     */
    public function getSportId(): Collection
    {
        return $this->sport_id;
    }

    public function addSportId(Sport $sport_id): static
    {
        if (!$this->sport_id->contains($sport_id)) {
            $this->sport_id->add($sport_id);
        }

        return $this;
    }

    public function removeSportId(Sport $sport_id): static
    {
        $this->sport_id->removeElement($sport_id);

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): static
    {
        $this->description = $description;

        return $this;
    }

    public function getNumberOfClientsMax(): ?int
    {
        return $this->number_of_clients_max;
    }

    public function setNumberOfClientsMax(int $number_of_clients_max): static
    {
        $this->number_of_clients_max = $number_of_clients_max;

        return $this;
    }

    public function getStripePriceId(): ?string
    {
        return $this->stripe_price_id;
    }

    public function setStripePriceId(?string $stripe_price_id): static
    {
        $this->stripe_price_id = $stripe_price_id;

        return $this;
    }

    public function getStatus(): ?string
    {
        return $this->status;
    }

    public function setStatus(?string $status): static
    {
        $this->status = $status;

        return $this;
    }
}