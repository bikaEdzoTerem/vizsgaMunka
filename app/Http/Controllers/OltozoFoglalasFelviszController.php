<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Ugyfel_edzes;
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
        $tabla= DB::table('szemelies')
        ->select('szemely_id')
        ->where('nev','like','%'.$szemelyNev.'%')
        ->pluck('szemely_id');
        $tabla = trim($tabla, '[]');
        $users = Berlet::select("*",
                    DB::raw('(CASE 
                        WHEN users.status = "0" THEN "User" 
                        WHEN users.status = "1" THEN "Admin" 
                        ELSE "SuperAdmin" 
                        END) AS status_lable'))
                ->get();
        $tabla= DB::table('berlets')
            ->select('datumIgaz')
            ->where('(datum_tol<Now() and Now() <datum_ig )as datumIgaz')
            ->get();
        /* $jelenlegiDatum = Carbon::now()->addHour(); */

        $ujfoglalas =new Oltozofoglalas;
        /* $nap=date('Y-m-d H:i:s'); */
        $ujfoglalas->szekreny_id=$request -> szekrenySzama;
        $ujfoglalas->ugyfel=$tabla;
        /* $ujfoglalas->datum=DB::RAW('NOW()'); *///1 órával kevesebbet ad
        /* $ujfoglalas->datum=$jelenlegiDatum; */
        $ujfoglalas->datum=Now();//1 órával kevesebbet ad
        $res = $ujfoglalas -> save();
        DB::table('szekenies')
            ->where('szekreny_id', $request -> szekrenySzama)
            ->update(['ures_e' => 'F']);
        
        if($res===1){
            return back()->with('sikeres','A foglalás sikeres volt'.$tabla);
        }else{
            return back()->with('sikertelen','A foglalás sikertelen volt');
        }


    }
    
    

}
