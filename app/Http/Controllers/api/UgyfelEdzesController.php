<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\Ugyfel_edzes;
use Illuminate\Support\Facades\DB;

class UgyfelEdzesController extends Controller
{
    public function index()
    {
        
        $result=Ugyfel_edzes::all();
        return $result;
        //vagy
        /* return response()->json(Ugyfel_edzes::all());  */
        //vagy
        /* return DB::table('ugyfel_edzes')->get(); */
    }
    
}
