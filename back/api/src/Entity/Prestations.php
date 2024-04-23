<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\PrestationsRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

#[ApiResource(mercure: true)]
#[ORM\Entity(repositoryClass: PrestationsRepository::class)]
class Prestations
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne]
    #[ORM\JoinColumn(nullable: false)]
    private ?Etablissements $etablissementId = null;

    #[ORM\Column(length: 255)]
    private ?string $pisplayName = null;

    #[ORM\ManyToMany(targetEntity: Sports::class)]
    private Collection $sportId;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $description = null;

    #[ORM\Column]
    private ?int $nombreClientMax = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $stripePriceId = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Assert\Choice(["pending", "confirmed", "canceled"])]
    private ?string $status = null;

    public function __construct()
    {
        $this->sportId = new ArrayCollection();
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

    public function getEtablissementId(): ?Etablissements
    {
        return $this->etablissementId;
    }

    public function setEtablissementId(?Etablissements $etablissementId): static
    {
        $this->etablissementId = $etablissementId;

        return $this;
    }

    public function getPisplayName(): ?string
    {
        return $this->pisplayName;
    }

    public function setPisplayName(string $pisplayName): static
    {
        $this->pisplayName = $pisplayName;

        return $this;
    }

    /**
     * @return Collection<int, Sports>
     */
    public function getSportId(): Collection
    {
        return $this->sportId;
    }

    public function addSportId(Sports $sportId): static
    {
        if (!$this->sportId->contains($sportId)) {
            $this->sportId->add($sportId);
        }

        return $this;
    }

    public function removeSportId(Sports $sportId): static
    {
        $this->sportId->removeElement($sportId);

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

    public function getNombreClientMax(): ?int
    {
        return $this->nombreClientMax;
    }

    public function setNombreClientMax(int $nombreClientMax): static
    {
        $this->nombreClientMax = $nombreClientMax;

        return $this;
    }

    public function getStripePriceId(): ?string
    {
        return $this->stripePriceId;
    }

    public function setStripePriceId(?string $stripePriceId): static
    {
        $this->stripePriceId = $stripePriceId;

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
