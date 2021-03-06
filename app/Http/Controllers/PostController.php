<?php

namespace App\Http\Controllers;

use App\Comment;
use App\Follow;
use App\Like;
use App\Post;
use App\Retweet;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Collection;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $follower = Follow::where('user_id', auth()->id())->pluck('follow_id');
        $follower = $follower->push(auth()->id());
        // var_dump($follower);
        $post = Post::whereIn("user_id", $follower)->latest()->get();
        // $user = User::find($post[0]->user_id);
        // return $user;
        for ($i = 0; $i < $post->count(); $i++) {
            $user = User::find($post[$i]->user_id);
            $likes = Like::where('post_id', $post[$i]->id)->count();
            $liked = Like::where('post_id', $post[$i]->id)->where('user_id', auth()->id())->exists();
            $retweeted = Retweet::where('post_id', $post[$i]->id)->where('user_id', auth()->id())->exists();
            $retweets = Retweet::where('post_id', $post[$i]->id)->where('user_id', auth()->id())->count();
            $comments = Comment::where('post_id', $post[$i]->id)->count();
            if ($liked) {
                $liked = true;
            } else {
                $liked = false;
            }
            $post[$i] = new Collection([
                "tweet" => $post[$i],
                "user" => $user,
                "likes" => $likes,
                "liked" => $liked,
                "retweeted" => $retweeted,
                "retweet" => $retweets,
                "comments" => $comments

            ]);
            // $post[$i]->push("user", $user);
            // return $post[$i];
        }
        // $i=0;
        return ($post);
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
        // return ($request->avatar);
        if ($request->avatar) {

            $exploded = explode(',', $request->avatar);
            $decode = base64_decode($exploded[1]);
            if (str_contains($exploded[0], 'jpeg')) {
                $extension = 'jpg';
            } else {
                $extension = 'png';
            };
            $filename = str_random() . '.' . $extension;
            $path = public_path() . '\tweet/' . $filename;
            file_put_contents($path, $decode);
        } else {
            $filename = null;
        }

        Post::create([
            'tweet' => request('tweet'),
            'tweetpicture' => $filename,
            'user_id' => auth()->user()->id,
        ]);
        return public_path();
        // return ['Success' => 'Post Created Successfully'];
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function show(Post $post)
    {
        // return $post;   

        $user = User::find($post->user_id);
        $likes = Like::where('post_id', $post->id)->count();
        $liked = Like::where('post_id', $post->id)->where('user_id', auth()->id())->exists();
        $retweeted = Retweet::where('post_id', $post->id)->where('user_id', auth()->id())->exists();
        $retweets = Retweet::where('post_id', $post->id)->where('user_id', auth()->id())->count();
        $comments = Comment::where('post_id', $post->id)->get();
        for ($i = 0; $i < $comments->count(); $i++) {
            $user = User::find($comments[$i]->user_id);
            $comments[$i] = new Collection([
                'user' => $user,
                'comment' => $comments[$i]
            ]);
        };
        $post = new Collection([
            "tweet" => $post,
            "user" => $user,
            "likes" => $likes,
            "liked" => $liked,
            "retweeted" => $retweeted,
            "retweet" => $retweets,
            "comments" => $comments

        ]);

        return $post;
    }
    public function showposts($username)
    {
        // return $post;   

        $user = User::where('username', $username)->first();
        $posts = Post::where('user_id', $user->id)->latest()->get();
        $likes = [];
        $liked = [];
        $comments = [];
        for ($i = 0; $i < $posts->count(); $i++) {
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
        // $post = new Collection([
        //     "tweet" => $posts,
        //     "user" => $user,
        //     "likes" => $likes,
        //     "liked" => $liked,
        //     "comments" => $comments

        // ]);

        return $posts;
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function edit(Post $post)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Post $post)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function destroy(Post $post)
    {
        $post->delete();
        return ('Successfuly Delete');
    }
}
