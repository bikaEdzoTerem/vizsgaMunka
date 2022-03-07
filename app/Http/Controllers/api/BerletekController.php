<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Berlet;

class BerletekController extends Controller
{
    public function index()
    {
        return response()->json(Berlet::all());
    }
   
}
