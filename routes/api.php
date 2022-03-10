<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\api\GepekController;
use App\Http\Controllers\api\BerletVasarlasController;
use App\Http\Controllers\api\EdzesekController;
use App\Http\Controllers\api\EszkozController;

use App\Http\Controllers\api\gyakorlatokController;
use App\Http\Controllers\api\MunkaidoController;
use App\Http\Controllers\api\OltozofoglalasokController;
use App\Http\Controllers\api\SzekrenyekController;
use App\Http\Controllers\api\SzemelyController;
use App\Http\Controllers\api\TermekController;
use App\Http\Controllers\api\EdzoIdopontokController;

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
Route::apiResource('edzesek', EdzesekController::class);
Route::apiResource('gyakorlat', gyakorlatokController::class);
Route::apiResource('munkaido', MunkaidoController::class);
Route::apiResource('oltozofoglalas', OltozofoglalasokController::class);
Route::apiResource('szekreny', SzekrenyekController::class);
Route::apiResource('terem', TermekController::class);
Route::get("proba",[BerletVasarlasController::class,"getAr"]);
Route::apiResource('edzoIdopont', EdzoIdopontokController::class);
//Route::put()
