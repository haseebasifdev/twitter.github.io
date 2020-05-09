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
Route::post('/post', 'PostController@store')->name('post');
Route::post('/like', 'LikeController@store')->name('like');
Route::get('/post', 'PostController@index')->name('getpost');                                                                                                                                                                                                                                           
