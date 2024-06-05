<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\BrandRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\UserInterface;

#[ApiResource(mercure: true)]
#[ORM\Entity(repositoryClass: BrandRepository::class)]
class Brand implements UserInterface, PasswordAuthenticatedUserInterface
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255, unique: true)]
    #[Assert\NotBlank]
    #[Assert\Email(message: "L'email '{{ value }}' n'est pas valide.")]
    private ?string $email = null;

    #[ORM\Column(length: 255)]
    private ?string $password = null;

    #[ORM\Column]
    private array $roles = [];

    #[ORM\Column(length: 255)]
    private ?string $display_name = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $kbis_pdf = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function setId(int $id): static
    {
        $this->id = $id;
        return $this;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): static
    {
        $this->email = $email;
        return $this;
    }

    public function getPassword(): ?string
    {
        return $this->password;
    }

    public function setPassword(string $password): static
    {
        $this->password = password_hash($password, PASSWORD_DEFAULT);
        return $this;
    }

    public function getRoles(): array
    {
        $roles = $this->roles;
        // guarantee every brand at least has ROLE_BRAND
        $roles[] = 'ROLE_BRAND';

        return array_unique($roles);
    }

    public function setRoles(array $roles): static
    {
        $this->roles = $roles;
        return $this;
    }

    public function getSalt(): ?string
    {
        // not needed when using bcrypt or argon
        return null;
    }

    public function eraseCredentials()
    {
        // If you store any temporary, sensitive data on the brand, clear it here
        // $this->plainPassword = null;
    }

    public function getUsername(): string
    {
        return (string) $this->email;
    }

    public function getDisplayName(): ?string
    {
        return $this->display_name;
    }

    public function setDisplayName(string $display_name): static
    {
        $this->display_name = $display_name;
        return $this;
    }

    public function getKbisPdf(): ?string
    {
        return $this->kbis_pdf;
    }

    public function setKbisPdf(?string $kbis_pdf): static
    {
        $this->kbis_pdf = $kbis_pdf;
        return $this;
    }

    public function getUserIdentifier(): string
    {
        return (string) $this->email;
    }
}
