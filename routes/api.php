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
  Route::get('/lists/{userId}', [\App\Http\Controllers\TaskListController::class, 'index']);
  Route::get('/list/{listId}', [\App\Http\Controllers\TaskListController::class, 'show']);
  Route::post('/list/create', [\App\Http\Controllers\TaskListController::class, 'store']);
  Route::put('/list/update/{listId}', [\App\Http\Controllers\TaskListController::class, 'update']);
  Route::get('/list-tasks/{listId}', [\App\Http\Controllers\TaskController::class, 'listTasks']);

  Route::post('/create-task', [\App\Http\Controllers\TaskController::class, 'store']);
  Route::post('/list-tasks/update', [\App\Http\Controllers\TaskController::class, 'update']);
  Route::post('/logout', [LoginController::class, 'logout']);
});