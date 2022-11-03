<?php

use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RegisterController;
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
Route::post('/authenticate', [LoginController::class, 'authenticate'])->name('authenticate');
Route::post('/register', [RegisterController::class, 'create'])->name('register');
Route::group(['middleware' => 'auth:sanctum'], function () {
  Route::get('/user', function (Request $request) {
    return $request->user();
  });
  Route::post('/logout', [LoginController::class, 'logout']);
});