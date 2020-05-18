<?php

namespace App;

use App\Events\BroadcastNotification;
use Illuminate\Database\Eloquent\Model;

class Notification extends Model
{
    protected $dispatchesEvents = ([
        "created" => BroadcastNotification::class
    ]);
    protected $guarded = [];
}
