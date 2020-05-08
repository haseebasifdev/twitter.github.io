<?php

namespace App\Http\Controllers;

use App\Post;
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
        $post = Post::where("user_id", auth()->user()->id)->latest()->get();
        // $user = User::find($post[0]->user_id);
        // return $user;
        for ($i = 0; $i < $post->count(); $i++) {
            $user = User::find($post[$i]->user_id);
            $post[$i] = new Collection([
                "tweet" => $post[$i],
                "user" => $user
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
        //
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
        //
    }
}
