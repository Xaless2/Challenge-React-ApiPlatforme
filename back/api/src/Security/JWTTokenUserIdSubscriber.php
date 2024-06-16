<?php 

namespace App\Security;

use App\Entity\User;
use Lexik\Bundle\JWTAuthenticationBundle\Event\JWTCreatedEvent;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

class JWTTokenUserIdSubscriber implements EventSubscriberInterface
{
    public static function getSubscribedEvents()
    {
        return [
            'lexik_jwt_authentication.on_jwt_created' => 'onJWTCreated',
        ];
    }

    public function onJWTCreated(JWTCreatedEvent  $event)
    {
        $user = $event->getUser();
   
    if(!$user instanceof User){
             return;
       }

        $payload = $event->getData();
       
        $payload['id'] = $user->getId();    
         
        $event->setData($payload);
    }
}