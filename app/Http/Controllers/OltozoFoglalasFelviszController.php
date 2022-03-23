<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Szemely;
use App\Models\Oltozofoglalas;
use App\Models\Berlet;
use Illuminate\Support\Facades\DB;
Use \Carbon\Carbon;


class OltozoFoglalasFelviszController extends Controller
{
    public function OltozoFoglalas(Request $request){
        $request->validate([
            'ugyfelNev'=>'required',
            'szekrenySzama'=>'required|integer'
        ]);
        $szemelyNev=$request -> ugyfelNev;
        $szekrenySzam=$request -> szekrenySzama;
        $szoveg="";
        $seged=false;
        $tabla= DB::table('szemelies')
            ->select('*')
            ->Where('nev','like','%'.$szemelyNev.'%')
            ->first();
        if ($tabla) {
            $szoveg.="Talált ilyen embert";

            $tabla2= DB::table('berlets')
            ->select('*')
            ->Where('ugyfel','=',$tabla->szemely_id)
            ->Where('datum_tol','<=',Now())
            ->Where('datum_ig','>=',Now())
            ->first();
            if($tabla2){
                $szoveg.=", van bérlete";

                $tabla3=DB::table('szekenies')
                ->select('*')
                ->Where('szekreny_id','=',$szekrenySzam)
                ->Where('ures_e','=','Ü')
                ->first();
                if($tabla3){
                    $szoveg.=", üres volt a szekrény";
                    $seged=true;
                    //Carbon::now('Europe/Stockholm'))
                    //$jelenlegiDatum = Carbon::now()->addHour(); 
                    $ujfoglalas =new Oltozofoglalas;
                    // $nap=date('Y-m-d H:i:s'); 
                    $ujfoglalas->szekreny_id=$szekrenySzam;
                    $ujfoglalas->ugyfel=$tabla->szemely_id;
                    // $ujfoglalas->datum=DB::RAW('NOW()'); //1 órával kevesebbet ad
                    // $ujfoglalas->datum=$jelenlegiDatum; 
                    $ujfoglalas->datum=Now();//1 órával kevesebbet ad
                    $ujfoglalas->save();
                    DB::table('szekenies')
                    ->orWhere('szekreny_id', $szekrenySzam)
                    ->update(['ures_e' => 'F']);
                    
                }else if(!$tabla3){
                    $szoveg.=",HIBA de nem  volt üres a szekrény";
                }
            }else if(!$tabla2){
                $szoveg.=",HIBA de nincs jelenleg bérlete";
            }
         }else if(!$tabla){
            $szoveg.=" HIBA,Nem talált ilyen embert";
         }
        
        
        if($seged){//ha igaz akkor
            return back()->with('sikeres','A foglalás sikeres volt '.$szoveg);
        }else{//ha hamis akkor
            return back()->with('sikertelen','A foglalás sikertelen volt '.$szoveg);
        }


    }
    public function OltozoFeloldas(Request $request){
        
    }
    

}