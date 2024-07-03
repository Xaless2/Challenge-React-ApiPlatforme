<?php

namespace App\Controller;

use App\Entity\Brand;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;

class BrandImageEndPdfController extends AbstractController
{
    public function __invoke(Request $request, Brand $brand): Brand
    {
        if (!$brand instanceof Brand) {
            throw new BadRequestHttpException('Invalid data');
        }

        $imageFile = $request->files->get('imageFile');
        if ($imageFile) {
            $brand->setImageFile($imageFile);
        }

        $pdfFile = $request->files->get('pdfFile');
        if ($pdfFile) {
            $brand->setPdfFile($pdfFile);
        }

        $brand->setUpdatedAt(new \DateTimeImmutable());

        return $brand;
    }
}
