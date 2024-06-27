<?php

namespace App\Enum;

enum SlotStatus: string
{
    case Pending = 'pending';
    case Confirmed = 'confirmed';
    case Refused = 'refused';
    case Canceled = 'canceled';
}
