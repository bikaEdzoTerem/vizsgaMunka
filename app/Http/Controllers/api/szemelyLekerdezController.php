<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use App\Models\User;
use Illuminate\Http\Request;

class szemelyLekerdezController extends Controller
{
    public function index(Request $request){//ha van jó bérlete azt irassa ki szemely adataival
        $nev=$request->query('name');
        if($nev){
            $tabla= DB::table('users')
            ->select('id')
            ->where('name','like','%'.$nev.'%')
            ->pluck('id');
            $tabla = trim($tabla, '[]');
            if($tabla){
                $ellenorzesVanEBerlete=DB::table('users')
                    ->join('berlets','berlets.ugyfel','users.id')
                    ->join('berlet_tipuses','berlet_tipuses.berlet_tipus_id','berlets.berlet_tipus_id')
                    ->where('name','like','%'.$nev.'%')
                    ->whereRaw("NOW() BETWEEN datum_tol AND datum_ig")
                    ->select('*',DB::raw("DATEDIFF(  datum_ig,now()) AS MegMeddigJo"))
                    ->first();
                if(!$ellenorzesVanEBerlete){
                    $seged=0;
                    $tabla=DB::table('users')
                    ->where('name','like','%'.$nev.'%')
                    /* ->select('*',$seged.' as MegMeddigJo') */
                    ->get();
                    return $tabla->values()->all();
                   /*  dd('nincs berlete'); */
                }else{
                    $tabla=DB::table('users')
                    ->join('berlets','berlets.ugyfel','users.id')
                    ->join('berlet_tipuses','berlet_tipuses.berlet_tipus_id','berlets.berlet_tipus_id')
                    ->where('name','like','%'.$nev.'%')
                    ->whereRaw("NOW() BETWEEN datum_tol AND datum_ig")
                    ->select('*',DB::raw("DATEDIFF(  datum_ig,now()) AS MegMeddigJo"));
                    /* dd('van berlete'); */
                }
            }
        }
        /* dd($tabla); */
        return response()->json($tabla->get());
    }
}