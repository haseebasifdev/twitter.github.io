<?php

namespace App\Http\Controllers;

use App\Follow;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Collection;
use Image;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        $user = User::find(auth()->id());
        return view('home', compact('user'));
    }
    public function show($username)

    {
        $user = User::where('username', $username)->first();
        $user = new Collection([
            "user" => $user,
            "following" => Follow::where('user_id', $user->id)->count(),
            "follower" => Follow::where('follow_id', $user->id)->count(),
            "follow" => Follow::where('user_id', auth()->id())->where('follow_id', $user->id)->exists(),

        ]);
        return $user;
    }
    public function alluser()
    {
        $users = User::where('id', "!=", auth()->id())->get();
        for ($i = 0; $i < $users->count(); $i++) {

            $users[$i] = new Collection([
                "user" => $users[$i],
                "following" => Follow::where('user_id', auth()->id())->where('follow_id', $users[$i]->id)->exists(),
                "follower" => Follow::where('user_id', $users[$i]->id)->where('follow_id', auth()->id())->exists(),
            ]);
        }
        return $users;
    }
    public function user()
    {
        $user = User::find(auth()->id());
        return $user;
    }
    public function store(Request $request)
    {
        $user = User::find($request->id);
        $user->name = $request->name;
        $user->bio = $request->bio;
        $user->location = $request->location;
        $user->website = $request->website;
        $user->save();
    }
    public function storeprofile(Request $request)
    {
        // return ($request->avatar);

        $exploded = explode(',', $request->avatar);
        $decode = base64_decode($exploded[1]);
        if (str_contains($exploded[0], 'jpeg')) {
            $extension = 'jpg';
        } else {
            $extension = 'png';
        };
        // $filename = str_random() . '.' . $extension;
        // $path = public_path() . '\profiles/' . $filename;
        // file_put_contents($path, $decode);
        $user = User::find(auth()->id());
        if ($request->type == 0) {

            $filename = str_random() . '.' . $extension;
            $path = public_path() . '\profiles/' . $filename;
            file_put_contents($path, $decode);
            $user->profile = $filename;
        } else {
            // $decode;
            $filename = str_random() . '.' . $extension;
            $path = public_path() . '\cover/' . $filename;
            file_put_contents($path, $decode);

            // $img = Image::make($image->path());
            $user->cover = $filename;

            // $path->resize(200, 200, function ($constraint) {
            //     $constraint->aspectRatio();
            // });
        }
        $user->save();
    }
}
