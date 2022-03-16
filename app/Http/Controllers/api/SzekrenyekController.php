<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\Szekeny;
use Illuminate\Http\Request;

class SzekrenyekController extends Controller
{
    public function index()
    {
        return response()->json(Szekeny::all());
    }
}
