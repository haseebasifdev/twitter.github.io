<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;

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
        $filename = str_random() . '.' . $extension;
        $path = public_path() . '\profiles/' . $filename;
        file_put_contents($path, $decode);
        $user = User::find(auth()->id());
        $user->profile = $filename;
        $user->save();
    }
}
