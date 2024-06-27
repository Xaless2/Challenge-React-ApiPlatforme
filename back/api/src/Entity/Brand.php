<?php
namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\Put;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Delete;
use App\Repository\BrandRepository;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\GetCollection;
use App\Controller\BrandImageEndPdfController;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\Serializer\Annotation\Groups;

#[ApiResource(
    operations: [
    new Get(
        uriTemplate:
        'brands/{id}',
        // requirements:[
        //     'id' => 'd/'
        // ]
    ),
    new GetCollection(),
    new Post(
        controller:BrandImageEndPdfController::class,
        read:true,
        write:true,
        uriTemplate: 'brands/{id}/image_url',
        // requirements:[
        //     'image_url' => 'image_url/'
        // ] 
        ),
        
    new Put(),
    new Delete()
       
    
    ]
)]
#[ORM\Entity(repositoryClass: BrandRepository::class)]
class Brand
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column]
    private ?int $user_id = null;

    #[ORM\Column(length: 255)]
    private ?string $display_name = null;

    #[ORM\Column(type: 'blob', nullable: true)]
    private ?string $kbis_pdf = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $image_url = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function setId(int $id): static
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
}
