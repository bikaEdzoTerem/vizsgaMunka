<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\Ugyfel_edzes;
use App\Models\Szemely;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class UgyfelEdzesController extends Controller{
    public function index(Request $request){//összekapcsolja a users táblával és visszaadja azokat az elemeket amiket a selectbe vannak
        $datumSzemelyel=$request->query('datumTolIgSzemellyel');
        if($datumSzemelyel){
            $tabla= DB::table('ugyfel_edzes')
                ->join('users','users.id','ugyfel_edzes.ugyfel')
                ->select('ugyfel_edzes.edzo','ugyfel_edzes.ugyfel','users.name','ugyfel_edzes.datum','ugyfel_edzes.ora',)
                ->Where('datum','>=',substr($datumSzemelyel,0,10))
                ->Where('datum','<=',substr($datumSzemelyel,11,22))
                ->Where('name','like','%'.substr($datumSzemelyel,22).'%')
                ->get();
        }else{
            $tabla= DB::table('ugyfel_edzes')
                ->join('users','users.id','ugyfel_edzes.ugyfel')
                ->select('ugyfel_edzes.edzo','ugyfel_edzes.ugyfel','users.name','ugyfel_edzes.datum','ugyfel_edzes.ora',)
                ->get();
        }
        $rendez=$tabla->sortBy('datum');
        $rendez->all();
        return $rendez->values()->all();
    }
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
        $szemely=DB::Table('users')
            ->select("id")
            ->where('name','like','%'.$request -> nevUj.'%')
            ->pluck('id');
        $szemely = trim($szemely, '[]');
        /* $ugyfelEdzes= */DB::Table('ugyfel_edzes')
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
}
