<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\Munkaido;
use Illuminate\Http\Request;

class MunkaidoController extends Controller
{
    public function index()
    {
        return response()->json(Munkaido::all());
    }
}
