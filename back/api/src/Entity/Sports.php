<?php

namespace App\Entity;

use App\Repository\SportsRepository;
use Doctrine\ORM\Mapping as ORM;

use ApiPlatform\Metadata\ApiResource;
#[ApiResource(mercure: true)]
#[ORM\Entity(repositoryClass: SportsRepository::class)]
class Sports
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $sportName = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function setId(int $id): static
    {
        $this->id = $id;

        return $this;
    }

    public function getSportName(): ?string
    {
        return $this->sportName;
    }

    public function setSportName(string $sportName): static
    {
        $this->sportName = $sportName;

        return $this;
    }
}
