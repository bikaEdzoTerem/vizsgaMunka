<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\Gyakorlat;
use Illuminate\Http\Request;

class gyakorlatokController extends Controller
{
    public function index()
    {
        return response()->json(Gyakorlat::all());
    }
}
