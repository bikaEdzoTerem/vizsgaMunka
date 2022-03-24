<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Szekeny;

class szekrenyListazController extends Controller{
    public function index(Request $request){
        dd("hopp");
     /* return view('pages/recepcio'); */
     $adat=Szekeny::all();
     dd($adat);
       /*  return view('pages/recepcio',['szekenies'=>$adat]); */
       return $adat->values()->all();
    }
    function felold($szekreny_id){

        /* dd($szekreny_id); */
        Szekeny::find($szekreny_id)
            ->update(['ures_e' => "Ü"]);


        return redirect('list');
    }
    function elront($szekreny_id){
        Szekeny::find($szekreny_id)
            ->update(['ures_e' => "R"]);
        return redirect('list');
    }
    function elronts2(Request $request){
        dd($request);
    }
}
