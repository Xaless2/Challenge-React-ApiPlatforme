<?php

namespace App\Entity;

use App\Repository\SportRepository;
use Doctrine\ORM\Mapping as ORM;
#[ORM\Entity(repositoryClass: SportRepository::class)]
class Sport
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $nameSport = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getNameSport(): ?string
    {
        return $this->nameSport;
    }

    public function setNameSport(string $nameSport): static
    {
        $this->nameSport = $nameSport;

        return $this;
    }
}
