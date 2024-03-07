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

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});


Route::get('/contacts/{user_id}', 'App\Http\Controllers\ContactsController@index');
Route::post('/contact/create','App\Http\Controllers\ContactsController@create');
/* Route::get('/contact/{id}/edit','App\Http\Controllers\ContactsController@edit'); */
Route::put('/contact/{id}/update','App\Http\Controllers\ContactsController@update');
Route::delete('/contact/{id}/delete','App\Http\Controllers\ContactsController@delete');