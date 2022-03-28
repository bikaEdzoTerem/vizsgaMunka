<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\Ugyfel_edzes;
use Illuminate\Support\Facades\DB;

class UgyfeledzesFelviszController extends Controller
{
    public function index (Request $request){
        return "AAA";
    }
    public function felviszUgyfelFoglalas (Request $request){/* felviszUgyfelFoglalas */
        
        $request->validate([
            'ugyfelNev'=>'required',
            'edzo'=>'required|integer',
            'datum'=>'required',
            'orara'=>'required',
            'ora'=>'required'
        ]);
        $szemelyNev=$request -> ugyfelNev;
        $tabla= DB::table('szemelies')
        ->select('szemely_id')
        ->where('nev','like','%'.$szemelyNev.'%')
        ->pluck('szemely_id');
        $tabla = trim($tabla, '[]');
        
        $ujfoglalas =new Ugyfel_edzes;

        $seged=($request -> datum);
        $seged2=($request -> orara);
        $seged3=$seged." ".$seged2;
        $ujfoglalas->edzo=$request -> edzo;
        $ujfoglalas->ugyfel=$tabla;
        $ujfoglalas->datum=$seged3;
        $ujfoglalas->ora=$request -> ora;
        $res = $ujfoglalas -> save();
        if($res===1){
            return back()->with('sikeres','A foglalás sikeres volt'.$res);
        }else{
            return back()->with('sikertelen','A foglalás sikertelen volt');
        }
    }
}

