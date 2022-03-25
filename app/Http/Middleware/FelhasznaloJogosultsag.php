<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use App\Models\Szemely;
use Illuminate\Support\Facades\Auth;

class FelhasznaloJogosultsag
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        $szemelyjog = Szemely::where('jogosultsag_id', '=', $request->jogosultsag_id)->first();

        /*
        $felhasznalo = Szemely::where('jogosultsag_id', '=', 1)->first();
        $dolgozo = Szemely::where('jogosultsag_id', '=', 2)->first();
        $edzo = Szemely::where('jogosultsag_id', '=', 3)->first();
        $admin = Szemely::where('jogosultsag_id', '=', 4)->first();
        */

        if($szemelyjog == 1 /*$felhasznalo*/){
            return redirect('/berletVasarlas'); 
        }else if($szemelyjog == 2 /*$dolgozo*/){
            return redirect('/dolgozo'); 
        }else if($szemelyjog == 3 /*$edzo*/){
            return redirect('/edzo'); 
        }else if($szemelyjog == 4 /*$admin*/){
            return redirect('/admin'); 
        }else{
            return redirect('/login'); 
        }
        return $next($request);
    }
}
