<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\Terem;
use Illuminate\Http\Request;

class EszkozDb extends Controller
{
    public function show(){
        dd(Terem::find(1)->eszkozok->count());
    }
}
