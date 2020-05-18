<?php

namespace App\Http\Controllers;

use App\Like;
use App\Notification;
use App\Post;
use Illuminate\Http\Request;

class LikeController extends Controller
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
        $like = Like::where('post_id', $request->post_id)->where('user_id', auth()->id());

        if ($like->exists()) {
            $like->delete();
        } else {
            Like::create([
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
        return (["Like" => 'Completed']);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Like  $like
     * @return \Illuminate\Http\Response
     */
    public function show(Like $like)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Like  $like
     * @return \Illuminate\Http\Response
     */
    public function edit(Like $like)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Like  $like
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Like $like)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Like  $like
     * @return \Illuminate\Http\Response
     */
    public function destroy(Like $like)
    {
        //
    }
}
