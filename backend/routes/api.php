<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

//register user
Route::post('register', 'App\Http\Controllers\UserController@register');

//login
Route::post('login', 'App\Http\Controllers\UserController@login');

//get all users
Route::get('users', 'App\Http\Controllers\UserController@getUsers');

//get specific user
Route::get('user/{id}', 'App\Http\Controllers\UserController@getUserById');

//update User
Route::put('updateUser/{id}', 'App\Http\Controllers\UserController@updateUser');

// delete User
Route::delete('deleteUser/{id}', 'App\Http\Controllers\UserController@deleteUser');

//soft delete user
Route::put('softDeleteUser/{id}', 'App\Http\Controllers\UserController@softDeleteUser');

