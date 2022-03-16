<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\Jogosultsag;
use Illuminate\Http\Request;

class jogosultsagController extends Controller
{
    public function index()
    {
        return response()->json(Jogosultsag::all());
    }
}
