<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;


class UgyfelEdzesSzemellyel extends Controller
{
    public function index()
    {

        /* $result1=Ugyfel_edzes::all();
        $result2=Szemely::all();
        return $result2; */
        $tabla= DB::table('ugyfel_edzes')
            ->join('szemelies','szemelies.szemely_id','ugyfel_edzes.ugyfel')
            ->select('ugyfel_edzes.id','ugyfel_edzes.edzo','ugyfel_edzes.ugyfel','szemelies.nev','ugyfel_edzes.datum','ugyfel_edzes.ora',)
            ->get();
            
        $rendez=$tabla->sortBy('datum');
        /* echo"hopp"; */
        $rendez->all();
        return $rendez->values()->all();
    }
    public function osszekapcsol()
    {
        $tabla= DB::table('szemelies')
            ->join('berlets','berlets.ugyfel','szemelies.szemely_id')
            ->join('berlet_tipuses','berlet_tipuses.berlet_tipus_id','berlets.berlet_tipus_id')
            ->select('szemelies.szemely_id','szemelies.nev','szemelies.kep','szemelies.neme','berlets.datum_tol')
            ->get();
         
        /* echo"hopp"; */
        $tabla->all();
        return $tabla->values()->all();
    }
}
