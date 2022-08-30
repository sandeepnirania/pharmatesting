<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\LoginController ;
use App\Http\Controllers\JobResearchController ;
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
Route::get('/', [LoginController::class, 'index']);
Route::get('/login', [LoginController::class, 'index']);

Route::post('/validateLogin', [LoginController::class, 'validateLogin']);

Route::group(['middleware' => ['auth']], function(){
    Route::match(['get', 'post'],'/new-research/{step}', [JobResearchController::class, 'addResearch']);
    Route::match(['get'],'/research-results', [JobResearchController::class, 'researchResults']);
});