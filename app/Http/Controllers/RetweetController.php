<?php

namespace App\Http\Controllers;

use App\Notification;
use App\Post;
use App\Retweet;
use Illuminate\Http\Request;

class RetweetController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
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
        $like = Retweet::where('post_id', $request->post_id)->where('user_id', auth()->id());

        if ($like->exists()) {
            $like->delete();
        } else {
            Retweet::create([
                'user_id' => auth()->id(),
                'post_id' => $request->post_id,
            ]);
            $Post = Post::find($request->post_id);
            Notification::create([
                'from' => auth()->id(),
                'to' => $Post->user_id,
                'type' => 'Like your tweet',
            ]);
        }

        // $likes = Like::where('user_id', auth()->id())->get();
        return (["Retweet" => 'Completed']);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Retweet  $retweet
     * @return \Illuminate\Http\Response
     */
    public function show(Retweet $retweet)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Retweet  $retweet
     * @return \Illuminate\Http\Response
     */
    public function edit(Retweet $retweet)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Retweet  $retweet
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Retweet $retweet)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Retweet  $retweet
     * @return \Illuminate\Http\Response
     */
    public function destroy(Retweet $retweet)
    {
        //
    }
}
