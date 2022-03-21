<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Ugyfel_edzes;
use Illuminate\Support\Facades\DB;
use App\Models\Szemely;

class UgyfeledzesFelviszController extends Controller
{
    public function felviszUgyfelFoglalas(Request $request){
        
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
    public function torolUgyfelFoglalas($id){
        $article = Ugyfel_edzes::find($id);
        $article->delete();
        return ['message' => 'Törölve'];
    }
    
    

}
