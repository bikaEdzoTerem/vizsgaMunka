<?php

use App\Http\Controllers\api\BerletTipusController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\api\GepekController;
use App\Http\Controllers\api\EdzesekController;
use App\Http\Controllers\api\EszkozController;
use App\Http\Controllers\api\gyakorlatokController;
use App\Http\Controllers\api\MunkaidoController;
use App\Http\Controllers\api\OltozofoglalasokController;
use App\Http\Controllers\api\SzekrenyekController;
use App\Http\Controllers\api\SzemelyController;
use App\Http\Controllers\api\TermekController;
use App\Http\Controllers\api\EdzoIdopontokController;
use App\Http\Controllers\api\IzomcsoportController;
use App\Http\Controllers\api\jogosultsagController;
use App\Http\Controllers\api\BerletekController;
use App\Models\Oltozofoglalas;

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
Route::apiResource('berletTipus', BerletTipusController::class);
Route::get("szemely/ugyfelek",[SzemelyController::class,'ugyfelek']);
Route::get("szemely/edzok",[SzemelyController::class,'edzok']);
Route::get("szemely/dolgozok",[SzemelyController::class,'dolgozok']);
Route::apiResource('szemely', SzemelyController::class);
Route::apiResource('eszkoz', EszkozController::class);
Route::apiResource('edzesek', EdzesekController::class);
Route::apiResource('gyakorlat', gyakorlatokController::class);
Route::apiResource('munkaido', MunkaidoController::class);
Route::get("oltozofoglalas/letszam/napi",[OltozofoglalasokController::class,"letszamNaponta"]);
Route::apiResource('oltozofoglalas', OltozofoglalasokController::class);
Route::apiResource('szekreny', SzekrenyekController::class);
Route::apiResource('terem', TermekController::class);
Route::apiResource('izomcsoport', IzomcsoportController::class);
Route::apiResource('jogosultsag', jogosultsagController::class);
Route::get("proba",[BerletTipusController::class,"getAr"]);
Route::apiResource('edzoIdopont', EdzoIdopontokController::class);
Route::apiResource('berletek', BerletekController::class);

Route::apiResource('ugyfelEdzesek', UgyfelEdzesController::class);//majd torolheto
Route::apiResource('ugyfelEdzesek2', ugyfelEdzesSzemellyel::class);

//Route::put()
