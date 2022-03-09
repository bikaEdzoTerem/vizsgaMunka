<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;


class EszkozDbController extends Controller
{
    public function show($id){
        Terem::find($id)->eszkozok->count();
        

    }
}
