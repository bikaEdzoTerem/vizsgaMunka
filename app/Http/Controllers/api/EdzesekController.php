<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\Edzesek;


class EdzesekController extends Controller
{
    public function index()
    {
        return response()->json(Edzesek::all());
    }
}
