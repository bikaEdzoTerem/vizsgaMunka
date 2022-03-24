<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\Ugyfel_edzes;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class UgyfelEdzesController extends Controller{
    public function index(){//összekapcsolja a szemelies táblával és visszaadja azokat az elemeket amiket a selectbe vannak
        //$result=Ugyfel_edzes::all();
        //return $result;
        //vagy
        /* return response()->json(Ugyfel_edzes::all());  */
        //vagy
        /* return DB::table('ugyfel_edzes')->get(); */
        $tabla= DB::table('ugyfel_edzes')
            ->join('szemelies','szemelies.szemely_id','ugyfel_edzes.ugyfel')
            ->select('ugyfel_edzes.id','ugyfel_edzes.edzo','ugyfel_edzes.ugyfel','szemelies.nev','ugyfel_edzes.datum','ugyfel_edzes.ora',)
            ->get();
            
        $rendez=$tabla->sortBy('datum');
        $rendez->all();
        return $rendez->values()->all();
    }
    /* public function store(Request $request){//felvisz együgyfél edzés foglalást
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
    } */
    
    public function destroy(string $id){//töröl egy ügyfél edzés foglalást
        $article = Ugyfel_edzes::find($id);
        $article->delete();
    }
}
