<?php
namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Szekeny;

class szekrenyListazController extends Controller{
    public function index(){
     /* return view('pages/recepcio'); */
     $adat=Szekeny::all();
       /*  return view('pages/recepcio',['szekenies'=>$adat]); */
       return $adat->values()->all();
    }
    function felold(/* string */ $szekreny_id){
        
 
        $szekreny=Szekeny::find($szekreny_id);
        $szekreny->ures_e="Ü";
        $szekreny->save();
      

        return response()->json(true);
        /* dd($szekreny_id); */
        /* Szekeny::find($szekreny_id)
            ->update(['ures_e' => "Ü"]);


        return redirect('list'); */
    }
    public function update(Request $request,string $szekrenyId){
        $szekreny=Szekeny::find($szekrenyId);
        $szekreny->ures_e=$request->ures_e;
        /* $szekreny->ures_e="Ü"; */
        $szekreny->save();
      

        return response()->json(true);
        
    }
    /* function elront($szekreny_id){
        Szekeny::find($szekreny_id)
            ->update(['ures_e' => "R"]);
        return redirect('list');
    }
    function elronts2(Request $request){
        dd($request);
    } */
}
