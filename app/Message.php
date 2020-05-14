<?php

namespace App;

use App\Events\Chat;
use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    protected $dispatchesEvents = ([
        'created' => Chat::class
    ]);
    protected $guarded = [];
}
