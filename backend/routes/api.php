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

// USER:

//register user
Route::post('register', 'App\Http\Controllers\UserController@register');

Route::post('image/{id}', 'App\Http\Controllers\UserController@storePicture');

//login
Route::post('login', 'App\Http\Controllers\UserController@login');

//get all users
Route::get('users', 'App\Http\Controllers\UserController@getUsers');

//get active users
Route::get('activeUsers', 'App\Http\Controllers\UserController@getActiveUsers');

//get specific user
Route::get('user/{id}', 'App\Http\Controllers\UserController@getUserById');

//update User
Route::put('updateUser/{id}', 'App\Http\Controllers\UserController@updateUser');

// delete User
Route::delete('deleteUser/{id}', 'App\Http\Controllers\UserController@deleteUser');

//soft delete user
Route::put('softDeleteUser/{id}', 'App\Http\Controllers\UserController@softDeleteUser');




// ROLE:

Route::get('role/{id}', 'App\Http\Controllers\RoleController@getRoleById');


//DOCUMENT:

Route::post('document/{id}', 'App\Http\Controllers\DocumentController@store');

Route::get('getUserDocuments/{id}', 'App\Http\Controllers\DocumentController@getUserDocuments');

Route::delete('deleteUserDocument/{id}', 'App\Http\Controllers\DocumentController@delete');


// CAR

Route::post('addCar', 'App\Http\Controllers\CarController@store');

Route::post('editCar/{id}', 'App\Http\Controllers\CarController@editCar');

Route::delete('deleteCar/{id}', 'App\Http\Controllers\CarController@delete');

// COMPANY

Route::post('addCompany', 'App\Http\Controllers\CompanyController@store');

Route::delete('deleteCompany/{id}', 'App\Http\Controllers\CompanyController@delete');

Route::delete('destroyCompany/{id}', 'App\Http\Controllers\CompanyController@destroy');


