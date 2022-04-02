<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Szekeny;
use Illuminate\Support\Facades\DB;

class szekrenyListazController extends Controller{
    public function index(Request $request){
        $mireSzures=$request->query('szuro');
        $szekrenyek=Szekeny::selectRaw("*");
        if($mireSzures){
            if($mireSzures==="osszes"){

            }else if($mireSzures==="osszesN"){
                $szekrenyek->where('tipusa','=','Nő');
            }else if($mireSzures==="osszesF"){
                $szekrenyek->where('tipusa','=','Férfi');
            }else if($mireSzures==="Üres"){//--
                $szekrenyek->where('ures_e','=','Ü');
            }else if($mireSzures==="ÜresNő"){
                $szekrenyek->where('tipusa','=','Nő');
                $szekrenyek->where('ures_e','=','Ü');
            }else if($mireSzures==="ÜresFérfi"){
                $szekrenyek->where('tipusa','=','Férfi');
                $szekrenyek->where('ures_e','=','Ü');
            }else if(($mireSzures==="Foglalt")){//--
                $szekrenyek->where('ures_e','=','F');
            }else if(($mireSzures==="FoglaltN")){
                $szekrenyek->where('tipusa','=','Nő');
                $szekrenyek->where('ures_e','=','F');
            }else if(($mireSzures==="FoglaltF")){
                $szekrenyek->where('tipusa','=','Férfi');
                $szekrenyek->where('ures_e','=','F');
            }else if(($mireSzures==="Rossz")){//--
                $szekrenyek->where('ures_e','=','R');
            }else if(($mireSzures==="RrosszN")){
                $szekrenyek->where('ures_e','=','R');
                $szekrenyek->where('tipusa','=','Nő');
            }else if(($mireSzures==="RrosszF")){
                $szekrenyek->where('ures_e','=','R');
                $szekrenyek->where('tipusa','=','Férfi');
            }
        }
        return response()->json($szekrenyek->get());
    }
    function felold(string $szekreny_id){
        Szekeny::find($szekreny_id)
        ->update(['ures_e' => "Ü"])
        ->save();
        return response()->json(true);
    }
    public function update(Request $request,string $szekrenyId){
        $szekreny=Szekeny::find($szekrenyId);
        $szekreny->ures_e=$request->ures_e;
        /* $szekreny->ures_e="Ü"; */
        $szekreny->save();
        return response()->json(true);
    }
    public function osszesOltozoFeloldas(){
        Szekeny::where('ures_e', '=','F')->update(['ures_e' => 'Ü']);
        return response()->json(true);
    }
    public function letszam(){
        /* $szekrenyekDb1 = DB::table('szekenies')
             ->select(DB::raw('count(*) as Üdb, tipusa'))
             ->where('ures_e','=','Ü')
             ->groupBy('tipusa')
             ->get(); */
        $szekrenyekDb2 = DB::table('szekenies')
            ->select(DB::raw('count(*) as db, ures_e, tipusa'))
            ->groupBy('ures_e')
            ->groupBy('tipusa')
            ->get();
        /* $szekrenyekDb3 = DB::table('szekenies')
        ->select(DB::raw('count(*) as osszesDb'))
        ->get(); */
        /* $array = array_merge($szekrenyekDb1->toArray(), $szekrenyekDb2->toArray(),$szekrenyekDb3->toArray());//1 objektumba rakás */
        return response()->json($szekrenyekDb2);
        
    }
    
}
