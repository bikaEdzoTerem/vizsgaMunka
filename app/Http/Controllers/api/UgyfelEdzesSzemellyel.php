<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\Ugyfel_edzes;
use App\Models\Szemely;
use Illuminate\Support\Facades\DB;

use Illuminate\Http\Request;

class UgyfelEdzesSzemellyel extends Controller
{
    public function index(Request $request){//ha van jó bérlete azt irassa ki szemely adataival
        /* $tabla= DB::table('ugyfel_edzes')
            ->join('szemelies','szemelies.szemely_id','ugyfel_edzes.ugyfel')
            ->select('ugyfel_edzes.id','ugyfel_edzes.edzo','ugyfel_edzes.ugyfel','szemelies.nev','ugyfel_edzes.datum','ugyfel_edzes.ora',)
            ->get();
        $rendez=$tabla->sortBy('datum');
        /* echo"hopp"; */
        /*$rendez->all();
        return $rendez->values()->all(); */
        $nev=$request->query('nev');
        $szemelyek= DB::table('szemelies');
        /* if($nev){// fő lekerdezés viszont ha nincs a személynek bérlete akkor egy adatot se ad vissza
            $szemelyek
            ->join('berlets','berlets.ugyfel','szemelies.szemely_id')
            ->join('berlet_tipuses','berlet_tipuses.berlet_tipus_id','berlets.berlet_tipus_id')
            ->where('nev','like','%'.$nev.'%')
            //->Where('datum_tol','<=',Now(),'and','datum_ig','>=',Now());
            ->whereRaw("NOW() BETWEEN datum_tol AND datum_ig")
            ->select('*',DB::raw("DATEDIFF(  datum_ig,now()) AS MegMeddigJo")->isnull);

        } */
        if($nev){
            $tabla= DB::table('szemelies')
            ->select('szemely_id')
            ->where('nev','like','%'.$nev.'%')
            ->pluck('szemely_id');
            $tabla = trim($tabla, '[]');
            if($tabla){
                $ellenorzesVanEBerlete=DB::table('szemelies')
                    ->join('berlets','berlets.ugyfel','szemelies.szemely_id')
                    ->join('berlet_tipuses','berlet_tipuses.berlet_tipus_id','berlets.berlet_tipus_id')
                    ->where('nev','like','%'.$nev.'%')
                    ->whereRaw("NOW() BETWEEN datum_tol AND datum_ig")
                    ->select('*',DB::raw("DATEDIFF(  datum_ig,now()) AS MegMeddigJo"))
                    ->first();
                if(!$ellenorzesVanEBerlete){
                    $seged=0;
                    $tabla=DB::table('szemelies')
                    ->where('nev','like','%'.$nev.'%')
                    /* ->select('*',$seged.' as MegMeddigJo') */
                    ->get();
                    return $tabla->values()->all();
                   /*  dd('nincs berlete'); */
                }else{
                    $tabla=DB::table('szemelies')
                    ->join('berlets','berlets.ugyfel','szemelies.szemely_id')
                    ->join('berlet_tipuses','berlet_tipuses.berlet_tipus_id','berlets.berlet_tipus_id')
                    ->where('nev','like','%'.$nev.'%')
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
