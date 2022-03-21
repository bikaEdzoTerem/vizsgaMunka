<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\Ugyfel_edzes;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class UgyfelEdzesController extends Controller{
    public function index(){
        
        $result=Ugyfel_edzes::all();
        return $result;
        //vagy
        /* return response()->json(Ugyfel_edzes::all());  */
        //vagy
        /* return DB::table('ugyfel_edzes')->get(); */
    }
    public function felvisz(Request $request){
        $request->validate([
            'edzo'=>'required',
            'ugyfel'=>'required',
            'datum'=>'required',
            'ora'=>'required'
        ]);
        $ujfoglalas =new Ugyfel_edzes;
        $ujfoglalas->edzo=$request->edzo;
        $ujfoglalas->ugyfel=$request->ugyfel;
        $ujfoglalas->datum=$request->datum;
        $ujfoglalas->ora=$request->ora;
        $res =$ujfoglalas->save();
    }
}
