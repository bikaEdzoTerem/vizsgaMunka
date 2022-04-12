<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\Ugyfel_edzes;
use App\Models\Szemely;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class UgyfelEdzesController extends Controller{
    public function index(Request $request){//összekapcsolja a szemelies táblával és visszaadja azokat az elemeket amiket a selectbe vannak
        //$result=Ugyfel_edzes::all();
        //return $result;
        //vagy
        /* return response()->json(Ugyfel_edzes::all());  */
        //vagy
        /* return DB::table('ugyfel_edzes')->get(); */
        $datumSzemelyel=$request->query('datumTolIgSzemellyel');
        if($datumSzemelyel){
            $tabla= DB::table('ugyfel_edzes')
                ->join('szemelies','szemelies.szemely_id','ugyfel_edzes.ugyfel')
                ->select('ugyfel_edzes.edzo','ugyfel_edzes.ugyfel','szemelies.nev','ugyfel_edzes.datum','ugyfel_edzes.ora',)
                ->Where('datum','>=',substr($datumSzemelyel,0,10))
                ->Where('datum','<=',substr($datumSzemelyel,11,22))
                ->Where('nev','like','%'.substr($datumSzemelyel,22).'%')
                ->get();
        }else{
            $tabla= DB::table('ugyfel_edzes')
                ->join('szemelies','szemelies.szemely_id','ugyfel_edzes.ugyfel')
                ->select('ugyfel_edzes.edzo','ugyfel_edzes.ugyfel','szemelies.nev','ugyfel_edzes.datum','ugyfel_edzes.ora',)
                ->get();
        }
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
    
    /* public function destroy(string $id){//töröl egy ügyfél edzés foglalást
        $article = Ugyfel_edzes::find($id);
        $article->delete();
    } */
    public function delete(Request $request){
        $original=$request->all();
        DB::Table('ugyfel_edzes')
       ->where([
           ['edzo',$original['edzo']],
           ['ugyfel',$original['ugyfel']],
           ['datum',$original['datum']],
           ['ora',$original['ora']],
       ])->delete();
       
        return response()->json(true);
     }
     public function update(Request $request){
        $request->validate([
            'nevUj'=>'required',
            'datumUj'=>'required',
            'oraUj'=>'required',
            'nevR'=>'required',
            'datumR'=>'required',
            'oraR'=>'required',
            'ugyfelR'=>'required',
            'edzo'=>'required',
        ]);
        $original=$request->all();
        $szemely=DB::Table('szemelies')
            ->select("szemely_id")
            ->where('nev','like','%'.$request -> nevUj.'%')
            ->pluck('szemely_id');
        $szemely = trim($szemely, '[]');
        $ugyfelEdzes=DB::Table('ugyfel_edzes')
        ->where([
            ['edzo',$original['edzo']],
            ['ugyfel',$original['ugyfelR']],
            ['datum',$original['datumR']],
            ['ora',$original['oraR']],
        ])->update(['ugyfel' => $szemely,
            'datum' => $request -> datumUj,
            'ora' => $request -> oraUj,]);

        return response()->json(true);
    }
    public function datumTolIg(Request $request){
        $original=$request->all();
       
        return $original;
     }
}
