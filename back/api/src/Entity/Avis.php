<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\AvisRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

#[ApiResource(mercure: true)]
#[ORM\Entity(repositoryClass: AvisRepository::class)]
class Avis
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne]
    #[ORM\JoinColumn(nullable: false)]
    private ?Creneaux $creneauId = null;

    #[ORM\ManyToOne]
    #[ORM\JoinColumn(nullable: false)]
    private ?Clients $clientId = null;

    #[ORM\Column(nullable: true)]
    private ?int $nombreEtoiles = null;

    #[ORM\Column(length: 255)]
    private ?string $avis = null;

    #[ORM\Column(length: 255)]
    #[Assert\Choice(["validated", "suspended", "moderate"])]
    private ?string $status = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function setId(int $id): static
    {
        $this->id = $id;

        return $this;
    }

    public function getCreneauId(): ?Creneaux
    {
        return $this->creneauId;
    }

    public function setCreneauId(?Creneaux $creneauId): static
    {
        $this->creneauId = $creneauId;

        return $this;
    }

    public function getClientId(): ?Clients
    {
        return $this->clientId;
    }

    public function setClientId(?Clients $clientId): static
    {
        $this->clientId = $clientId;

        return $this;
    }

    public function getNombreEtoiles(): ?int
    {
        return $this->nombreEtoiles;
    }

    public function setNombreEtoiles(?int $nombreEtoiles): static
    {
        $this->nombreEtoiles = $nombreEtoiles;

        return $this;
    }

    public function getAvis(): ?string
    {
        return $this->avis;
    }

    public function setAvis(string $avis): static
    {
        $this->avis = $avis;

        return $this;
    }

    public function getStatus(): ?string
    {
        return $this->status;
    }

    public function setStatus(string $status): static
    {
        $this->status = $status;

        return $this;
    }
}
