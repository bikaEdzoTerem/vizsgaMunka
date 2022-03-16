<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\Izomcsoport;
use Illuminate\Http\Request;

class IzomcsoportController extends Controller
{
    public function index()
    {
        return response()->json(Izomcsoport::all());
    }
}

