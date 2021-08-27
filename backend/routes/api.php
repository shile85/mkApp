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

Route::get('getCars', 'App\Http\Controllers\CarController@show');

Route::get('getUserCar/{id}', 'App\Http\Controllers\CarController@getUserCar');

Route::get('getCarById/{id}', 'App\Http\Controllers\CarController@getCarById');

Route::post('addCar', 'App\Http\Controllers\CarController@store');

Route::post('editCar/{id}', 'App\Http\Controllers\CarController@update');

Route::delete('deleteCar/{id}', 'App\Http\Controllers\CarController@delete');

// COMPANY

Route::post('addCompany', 'App\Http\Controllers\CompanyController@store');

Route::delete('deleteCompany/{id}', 'App\Http\Controllers\CompanyController@delete');

Route::delete('destroyCompany/{id}', 'App\Http\Controllers\CompanyController@destroy');


//PROJECT

Route::post('addProject', 'App\Http\Controllers\ProjectController@store');

Route::put('editProject/{id}', 'App\Http\Controllers\ProjectController@update');

Route::delete('deleteProject/{id}', 'App\Http\Controllers\ProjectController@delete');

Route::delete('destroyProject/{id}', 'App\Http\Controllers\ProjectController@destroy');

//TASK

Route::post('addTask', 'App\Http\Controllers\TaskController@store');

Route::put('editTask/{id}', 'App\Http\Controllers\TaskController@update');

Route::delete('destroyTask/{id}', 'App\Http\Controllers\TaskController@destroy');

