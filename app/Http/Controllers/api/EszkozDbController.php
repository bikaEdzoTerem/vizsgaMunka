<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;


class EszkozDbController extends Controller
{
    public function show(){
        //dd(Terem::find(1)->eszkozok->count());
        return view("pages.admin.chart");

    }
}
