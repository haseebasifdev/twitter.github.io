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

Route::get('/home', 'HomeController@index')->name('home');
Route::post('/saveprofile', 'HomeController@store')->name('profile');
Route::post('/saveprofilepicture', 'HomeController@storeprofile')->name('profile');
Route::get('/user', 'HomeController@user')->name('user');
Route::get('/users', 'HomeController@alluser')->name('user');
Route::post('/post', 'PostController@store')->name('post');
Route::post('/like', 'LikeController@store')->name('like');
Route::post('/comment', 'CommentController@store')->name('comment');
Route::post('/follow', 'FollowController@store')->name('follow');
Route::post('/unfollow', 'FollowController@destroy')->name('unfollow');
Route::post('/allmessage', 'MessageController@show')->name('allmessage');
Route::post('/savemessage', 'MessageController@store')->name('allmessage');
Route::get('/post', 'PostController@index')->name('getpost');
