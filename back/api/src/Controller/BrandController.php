<?php

namespace App\Controller;

use App\Entity\Brand;
use App\Repository\BrandRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/api/brands")
 */
class BrandController extends AbstractController
{
    /**
     * @Route("/", name="brand_index", methods={"GET"})
     */
    public function index(BrandRepository $brandRepository): Response
    {
        $brands = $brandRepository->findAll();

        return $this->json($brands);
    }

    /**
     * @Route("/{id}", name="brand_show", methods={"GET"})
     */
    public function show(Brand $brand): Response
    {
        return $this->json($brand);
    }

    /**
     * @Route("/", name="brand_create", methods={"POST"})
     */
    public function create(Request $request): Response
    {
        $data = json_decode($request->getContent(), true);

        $brand = new Brand();
        $brand->setUserId($data['user_id']);
        $brand->setDisplayName($data['display_name']);
        // Handle file uploads if needed
        // $brand->setKbisPdf($data['kbis_pdf']);
        // $brand->setImageUrl($data['image_url']);

        $entityManager = $this->getDoctrine()->getManager();
        $entityManager->persist($brand);
        $entityManager->flush();

        return $this->json($brand, Response::HTTP_CREATED);
    }

    /**
     * @Route("/{id}", name="brand_update", methods={"PUT"})
     */
    public function update(Request $request, Brand $brand): Response
    {
        $data = json_decode($request->getContent(), true);

        $brand->setUserId($data['user_id']);
        $brand->setDisplayName($data['display_name']);
        // Handle file uploads if needed
        // $brand->setKbisPdf($data['kbis_pdf']);
        // $brand->setImageUrl($data['image_url']);

        $entityManager = $this->getDoctrine()->getManager();
        $entityManager->flush();

        return $this->json($brand);
    }

    /**
     * @Route("/{id}", name="brand_delete", methods={"DELETE"})
     */
    public function delete(Brand $brand): Response
    {
        $entityManager = $this->getDoctrine()->getManager();
        $entityManager->remove($brand);
        $entityManager->flush();

        return $this->json(null, Response::HTTP_NO_CONTENT);
    }
}
