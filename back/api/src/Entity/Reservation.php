<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\ReservationRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

#[ApiResource(mercure: true)]
#[ORM\Entity(repositoryClass: ReservationRepository::class)]
class Reservation
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne(targetEntity: Slot::class)]
    #[ORM\JoinColumn(name: 'slot_id', referencedColumnName: 'id')]
    private ?Slot $slot;

    #[ORM\ManyToOne]
    #[ORM\JoinColumn(nullable: false)]
    private ?User $client_id = null;

    #[ORM\Column(length: 255)]
    #[Assert\Choice(["pending", "confirmed", "refused", "canceled"])]
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

    public function getSlot(): ?Slot
    {
        return $this->slot;
    }

    public function setSlot(?Slot $slot): static
    {
        $this->slot = $slot;

        return $this;
    }

    public function getClientId(): ?User
    {
        return $this->client_id;
    }

    public function setClientId(?User $clientId): static
    {
        $this->client_id = $clientId;

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

    public function toArray(): array
{
    return [
        'id' => $this->getId(),
        'slot_id' => $this->getSlot() ? $this->getSlot()->getId() : null,
        'client_id' => $this->getClientId() ? $this->getClientId()->getId() : null,
        'status' => $this->getStatus(),
    ];
}

}
