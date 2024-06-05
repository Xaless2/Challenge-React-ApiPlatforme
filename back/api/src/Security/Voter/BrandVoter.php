<?php

namespace App\Security\Voter;

use App\Entity\Brand;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Authorization\Voter\Voter;
use Symfony\Component\Security\Core\User\UserInterface;

class BrandVoter extends Voter
{
    // Define supported attributes
    private const EDIT = 'edit';
    private const VIEW = 'view';

    protected function supports(string $attribute, $subject): bool
    {
        // Check if the attribute is supported and if the subject is an instance of Brand
        return in_array($attribute, [self::EDIT, self::VIEW]) && $subject instanceof \App\Entity\Brand;
    }

    protected function voteOnAttribute(string $attribute, $subject, TokenInterface $token): bool
    {
        $user = $token->getUser();

        if (!$user instanceof UserInterface) {
            return false;
        }

        // Custom logic to determine if the user can perform the action
        switch ($attribute) {
            case self::EDIT:
                // logic to determine if the user can EDIT
                return $this->canEdit($subject, $user);
            case self::VIEW:
                // logic to determine if the user can VIEW
                return $this->canView($subject, $user);
        }

        return false;
    }

    private function canEdit(Brand $brand, UserInterface $user): bool
    {
        // Allow edit if the user is an admin or the owner of the brand
        return in_array('ROLE_ADMIN', $user->getRoles()) || $user === $brand->getOwner();
    }

    private function canView(Brand $brand, UserInterface $user): bool
    {
        // Allow view if the user is an admin or the owner of the brand
        return in_array('ROLE_ADMIN', $user->getRoles()) || $user === $brand->getOwner();
    }
}
