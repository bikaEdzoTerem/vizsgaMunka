<?php

namespace App\Http\Controllers\api;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Models\EszkozView;




class EszkozController extends Controller
{
    public function index(){
       $result=EszkozView::all();
       
        return $result;
                            
                            
        
        //return response()->json(EszkozView::all());

    }
}
