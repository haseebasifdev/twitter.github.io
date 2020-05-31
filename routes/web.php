<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});


Auth::routes();
// Home Controller
Route::get('/', 'HomeController@index')->name('home');
Route::post('/saveprofile', 'HomeController@store')->name('profile');
Route::post('/saveprofilepicture', 'HomeController@storeprofile')->name('profile');
Route::get('/user', 'HomeController@user')->name('user');
Route::get('/user/{username}', 'HomeController@show')->name('user');
Route::get('/users', 'HomeController@alluser')->name('user');


// Post Controller
Route::post('/post', 'PostController@store')->name('post');
Route::get('/deletepost/{post}', 'PostController@destroy')->name('destroy');
Route::get('/post', 'PostController@index')->name('getpost');
Route::get('/post/{post}', 'PostController@show')->name('getpost');
Route::get('/posts/{username}', 'PostController@showposts')->name('getposts');

// Like Controller
Route::post('/like', 'LikeController@store')->name('like');

// Comment Controller
Route::post('/comment', 'CommentController@store')->name('comment');

// Follow Controller
Route::post('/follow', 'FollowController@store')->name('follow');
Route::post('/unfollow', 'FollowController@destroy')->name('unfollow');

// Message Controller
Route::post('/allmessage', 'MessageController@show')->middleware('auth')->name('allmessage');
Route::post('/savemessage', 'MessageController@store')->middleware('auth')->name('allmessage');
// Retweet
Route::post('/retweet', 'RetweetController@store')->middleware('auth')->name('allmessage');

// Notification Controller
Route::get('/index', 'NotificationController@index')->name('getnotification');
Route::post('/explore', 'ExploreController@store')->name('explore');
