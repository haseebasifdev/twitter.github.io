<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    protected $fillable = ['user_id', 'tweet', 'tweetpicture'];
    public function getTweetpictureAttribute($value)
    {
        if ($value) {
            return asset('tweet/' . $value);
        } else {
            return null;
        }
    }
}
