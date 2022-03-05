<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Eszkoz_tipus;

class GepekController extends Controller
{
    public function index() 
    { 
        return response()->json(Eszkoz_tipus::all());
    }
    
}
