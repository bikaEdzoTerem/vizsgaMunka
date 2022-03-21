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
}
