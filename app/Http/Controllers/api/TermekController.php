<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\Terem;
use Illuminate\Http\Request;

class TermekController extends Controller
{
    public function index()
    {
        return response()->json(Terem::all());
    }
}
