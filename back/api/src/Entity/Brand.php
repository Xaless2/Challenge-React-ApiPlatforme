<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\Put;
use ApiPlatform\Metadata\Post;
use Doctrine\DBAL\Types\Types;
use ApiPlatform\Metadata\Delete;
use App\Repository\BrandRepository;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\GetCollection;
use App\Controller\BrandImageEndPdfController;
use Symfony\Component\HttpFoundation\File\File;
use Vich\UploaderBundle\Mapping\Annotation as Vich;
use Symfony\Component\Serializer\Annotation\Groups;

#[Vich\Uploadable]
#[ApiResource(
    operations: [
        new Get(
            uriTemplate: '/brands/{id}',
            normalizationContext: ['groups' => ['read:collection', 'read:item', 'read:collection:brand']],
            security: "is_granted('ROLE_ADMIN', 'ROLE_COACH')",
        ),
        new GetCollection(
            uriTemplate: '/brands',
            normalizationContext: ['groups' => ['read:collection', 'read:item', 'read:collection:brand']],
        ),
        new Post(
            uriTemplate: '/brands',
        ),
        new Post(
            uriTemplate: '/brands/{id}/image',
            controller: BrandImageEndPdfController::class,
            normalizationContext: ['groups' => ['read:collection', 'read:item', 'read:collection:brand']],
            deserialize: false,
        ),
        new Put(
            uriTemplate: '/brands/{id}',
        ),
        new Delete(
            uriTemplate: '/brands/{id}',
        ),
    ]
)]
#[ORM\Entity(repositoryClass: BrandRepository::class)]
#[ApiResource]
class Brand
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column]
    private ?int $user_id = null;

    #[Groups(['read:item'])]
    #[ORM\Column(length: 255)]
    private ?string $display_name = null;

    #[ORM\Column( type: Types::STRING, length: 255, nullable: true )]
    #[Groups(['read:item', 'read:collection'])]
    private ?string $kbis_pdf = null;

    #[Vich\UploadableField(mapping: 'brand_pdf', fileNameProperty: 'kbis_pdf')]
    private ?File $pdfFile = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['read:item', 'read:collection'])]
    private ?string $image_url = null;

    #[Vich\UploadableField(mapping: 'brand_image', fileNameProperty: 'image_url')]
    private ?File $imageFile = null;

    #[Groups(['read:item'])]
    #[ORM\Column]
    private ?\DateTimeImmutable $updatedAt = null;

    public function __construct()
    {
        $this->updatedAt = new \DateTimeImmutable();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        $this->id = $id;

        return $this;
    }

    public function getUserId(): ?int
    {
        return $this->user_id;
    }

    public function setUserId(int $user_id): static
    {
        $this->user_id = $user_id;

        return $this;
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

    public function getImageUrl(): ?string
    {
        return $this->image_url;
    }

    public function setImageUrl(?string $image_url): static
    {
        $this->image_url = $image_url;

        return $this;
    }

    public function getImageFile(): ?File
    {
        return $this->imageFile;
    }

    public function setImageFile(?File $imageFile): static
    {
        $this->imageFile = $imageFile;

        return $this;
    }

    public function getUpdatedAt(): ?\DateTimeImmutable
    {
        return $this->updatedAt;
    }

    public function setUpdatedAt(\DateTimeImmutable $updatedAt): static
    {
        $this->updatedAt = $updatedAt;

        return $this;
    }

    public function getPdfFile(): ?File
    {
        return $this->pdfFile;
    }

    public function setPdfFile(?File $pdfFile): static
    {
        $this->pdfFile = $pdfFile;

        return $this;
    }
}
