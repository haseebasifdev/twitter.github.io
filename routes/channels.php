<?php

use Illuminate\Support\Facades\Broadcast;

/*
|--------------------------------------------------------------------------
| Broadcast Channels
|--------------------------------------------------------------------------
|
| Here you may register all of the event broadcasting channels that your
| application supports. The given channel authorization callbacks are
| used to check if an authenticated user can listen to the channel.
|
*/

Broadcast::routes();
Broadcast::channel('App.User.{id}', function ($user, $id) {
    return (int) $user->id === (int) $id;
});
Broadcast::channel('chat.{username}', function ($user, $username) {
    // return $user->id == $to;
    return auth()->user()->username == $username;
    // return true;
});
Broadcast::channel('notification.{id}', function ($user, $id) {
    // return $user->id == $to;
    return $user->id == $id;
    // return true;
});
