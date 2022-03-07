<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\api\GepekController;
use App\Http\Controllers\api\BerletVasarlasController;
use App\Http\Controllers\api\EszkozController;
use App\Http\Controllers\api\EszkozDb;
use App\Http\Controllers\api\SzemelyController;


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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::apiResource('gepek', GepekController::class);
Route::apiResource('berletVasarlas', BerletVasarlasController::class);
Route::apiResource('szemely', SzemelyController::class);
Route::apiResource('eszkoz', EszkozController::class);
Route::get("proba",[BerletVasarlasController::class,"getAr"]);
Route::get("eszkozDB",[EszkozDb::class,"show"]);