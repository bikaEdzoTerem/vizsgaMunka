<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\Oltozofoglalas;
use Illuminate\Http\Request;

class OltozofoglalasokController extends Controller
{
    public function index()
    {
        return response()->json(Oltozofoglalas::all());
    }
}
