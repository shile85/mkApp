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

//get archived users
Route::get('getArchivedUsers', 'App\Http\Controllers\UserController@getArchivedUsers');

//get specific user
Route::get('user/{id}', 'App\Http\Controllers\UserController@getUserById');

//update User
Route::put('updateUser/{id}', 'App\Http\Controllers\UserController@updateUser');

// delete User
Route::delete('deleteUser/{id}', 'App\Http\Controllers\UserController@deleteUser');

//soft delete user
Route::put('softDeleteUser/{id}', 'App\Http\Controllers\UserController@softDeleteUser');

//soft activate User
Route::put('activateUser/{id}', 'App\Http\Controllers\UserController@activateUser');




// ROLE:

Route::get('role/{id}', 'App\Http\Controllers\RoleController@getRoleById');

Route::get('getRoles', 'App\Http\Controllers\RoleController@index');


//DOCUMENT:

Route::post('document/{id}', 'App\Http\Controllers\DocumentController@store');

Route::get('getUserDocuments/{id}', 'App\Http\Controllers\DocumentController@index');

Route::delete('deleteUserDocument/{id}', 'App\Http\Controllers\DocumentController@delete');


// CAR

Route::get('getCars', 'App\Http\Controllers\CarController@index');

Route::get('getUserCar/{id}', 'App\Http\Controllers\CarController@getUserCar');

Route::get('getCarById/{id}', 'App\Http\Controllers\CarController@getCarById');

Route::post('addCar', 'App\Http\Controllers\CarController@store');

Route::put('editCar/{id}', 'App\Http\Controllers\CarController@update');

Route::delete('deleteCar/{id}', 'App\Http\Controllers\CarController@delete');

Route::post('uploadCarImage/{id}', 'App\Http\Controllers\CarController@uploadCarImage');

Route::post('uploadCarDocument/{id}', 'App\Http\Controllers\CarController@uploadCarDocument');

// COMPANY

Route::get('getCompanies', 'App\Http\Controllers\CompanyController@index');

Route::get('getActiveCompanies', 'App\Http\Controllers\CompanyController@getActiveCompanies');

Route::get('getActiveCompanies', 'App\Http\Controllers\CompanyController@getActiveCompanies');

Route::get('getArchivedCompanies', 'App\Http\Controllers\CompanyController@getArchivedCompanies');

Route::get('getCompanyById/{id}', 'App\Http\Controllers\CompanyController@getCompanyById');

Route::post('addCompany', 'App\Http\Controllers\CompanyController@store');

Route::delete('deleteCompany/{id}', 'App\Http\Controllers\CompanyController@delete');

Route::delete('destroyCompany/{id}', 'App\Http\Controllers\CompanyController@destroy');

Route::put('activateCompany/{id}', 'App\Http\Controllers\CompanyController@activateCompany');


//PROJECT

Route::get('getProjects', 'App\Http\Controllers\ProjectController@index');

Route::get('getActiveProjects', 'App\Http\Controllers\ProjectController@getActiveProjects');

Route::get('getArchivedProjects', 'App\Http\Controllers\ProjectController@getArchivedProjects');

Route::get('getProjectById/{id}', 'App\Http\Controllers\ProjectController@getProjectById');

Route::post('addProject', 'App\Http\Controllers\ProjectController@store');

Route::put('editProject/{id}', 'App\Http\Controllers\ProjectController@update');

Route::delete('deleteProject/{id}', 'App\Http\Controllers\ProjectController@delete');

Route::delete('destroyProject/{id}', 'App\Http\Controllers\ProjectController@destroy');

Route::put('activateProject/{id}', 'App\Http\Controllers\ProjectController@activateProject');

Route::get('getMyProjects/{id}', 'App\Http\Controllers\ProjectController@getMyProjects');

//TASK

Route::get('getAllUserTasks/{id}', 'App\Http\Controllers\TaskController@getAllUserTasks');

Route::get('getAllProjectTasks/{id}', 'App\Http\Controllers\TaskController@getAllProjectTasks');

Route::post('addTask', 'App\Http\Controllers\TaskController@store');

Route::put('editTask/{id}', 'App\Http\Controllers\TaskController@update');

Route::delete('destroyTask/{id}', 'App\Http\Controllers\TaskController@destroy');

Route::delete('deleteTask/{id}', 'App\Http\Controllers\TaskController@delete');

Route::get('getTaskById/{id}', 'App\Http\Controllers\TaskController@getTaskById');

Route::put('changeTaskStatus/{id}', 'App\Http\Controllers\TaskController@changeTaskStatus');



