<?php

namespace App\Serializer;

use App\Entity\Brand;
use Vich\UploaderBundle\Storage\StorageInterface;
use Symfony\Component\Serializer\Normalizer\NormalizerInterface;
use Symfony\Component\Serializer\Normalizer\NormalizerAwareTrait;
use Symfony\Component\Serializer\Normalizer\NormalizerAwareInterface;

class BrandSerializer implements NormalizerInterface, NormalizerAwareInterface
{
    use NormalizerAwareTrait;

    private const ALREADY_CALLED = 'AppBrandNormalizerAlreadyCalled';

    private StorageInterface $storage;

    public function __construct(StorageInterface $storage)
    {
        $this->storage = $storage;
    }

    public function normalize(mixed $object, ?string $format = null, array $context = [])
    {
        if (!$object instanceof Brand) {
            throw new \InvalidArgumentException('The object to be normalized must be an instance of Brand');
        }

        // Résolution de l'URI des fichiers
        $imagePath = $this->storage->resolveUri($object, 'imageFile');
        $pdfPath = $this->storage->resolveUri($object, 'pdfFile');

        $object->setImageUrl($imagePath);
        $object->setKbisPdf($pdfPath);

        // Marquer le contexte pour éviter la récursion infinie
        $context[self::ALREADY_CALLED] = true;

        // Utiliser le normalizer pour normaliser l'objet Brand
        return $this->normalizer->normalize($object, $format, $context);
    }

    public function supportsNormalization(mixed $data, ?string $format = null, array $context = []): bool
    {
        return !isset($context[self::ALREADY_CALLED]) && $data instanceof Brand;
    }

    public function getSupportedTypes(): array
    {
        return [Brand::class];
    }
}