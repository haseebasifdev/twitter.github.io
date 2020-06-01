<?php

namespace App\Http\Controllers;

use App\Explore;
use App\Post;
use Illuminate\Http\Request;

use Illuminate\Support\Collection;

use App\Comment;
use App\Like;
use App\Retweet;
use App\User;

class ExploreController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Explore::all()->groupBy('hashtag');
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // return($request);
        Explore::create([
            'post_id' => Post::latest()->first()->id,
            'hashtag' => $request->tag
        ]);
        return 'Success';
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Explore  $explore
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request)
    {
        // return ($request);
        $postid = Explore::where('hashtag', $request->tag)->pluck('post_id');
        $posts = Post::whereIn('id', $postid)->get();
        $likes = [];
        $liked = [];
        $comments = [];
        for ($i = 0; $i < $posts->count(); $i++) {
            $user = User::find($posts[$i]->user_id);
            $likes = Like::where('post_id', $posts[$i]->id)->count();
            $liked = Like::where('post_id', $posts[$i]->id)->where('user_id', auth()->id())->exists();
            $retweeted = Retweet::where('post_id', $posts[$i]->id)->where('user_id', auth()->id())->exists();
            $retweets = Retweet::where('post_id', $posts[$i]->id)->where('user_id', auth()->id())->count();
            $comments = Comment::where('post_id', $posts[$i]->id)->count();
            $posts[$i] = new Collection([
                "tweet" => $posts[$i],
                "user" => $user,
                "likes" => $likes,
                "liked" => $liked,
                "retweeted" => $retweeted,
                "retweet" => $retweets,
                "comments" => $comments

            ]);
        };
        return $posts;
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Explore  $explore
     * @return \Illuminate\Http\Response
     */
    public function edit(Explore $explore)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Explore  $explore
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Explore $explore)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Explore  $explore
     * @return \Illuminate\Http\Response
     */
    public function destroy(Explore $explore)
    {
        //
    }
}
