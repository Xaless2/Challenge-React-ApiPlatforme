<?php

namespace App\Form;

use App\Entity\Review;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\IntegerType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class ReviewType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('number_of_stars', IntegerType::class, [
                'label' => 'Number of Stars',
                'required' => true,
            ])
            ->add('comment', TextareaType::class, [
                'label' => 'Comment',
                'required' => false,
            ])
            ->add('coach', EntityType::class, [
                'class' => User::class,
                'choice_label' => 'id',
                'label' => 'Coach',
                'required' => true,
            ])
            ->add('client', EntityType::class, [
                'class' => User::class,
                'choice_label' => 'id',
                'label' => 'Client',
                'required' => true,
            ]);
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => Review::class,
        ]);
    }
}
