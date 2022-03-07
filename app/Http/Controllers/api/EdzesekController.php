<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\Edzo_idopont;
use Illuminate\Http\Request;

class EdzesekController extends Controller
{
    public function index()
    {
        return response()->json(Edzo_idopont::all());
    }
}
