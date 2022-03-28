<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use App\Models\Szemely;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

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

        /*if (url('berletVasarlas')==$request->url()){
            return $next($request);
        }else if(url('edzo')==$request->url()){
            return redirect('/berletVasarlas');
        }*/

        /*
        $felhasznalo = Szemely::where('jogosultsag_id', '=', 1)->first();
        $dolgozo = Szemely::where('jogosultsag_id', '=', 2)->first();
        $edzo = Szemely::where('jogosultsag_id', '=', 3)->first();
        $admin = Szemely::where('jogosultsag_id', '=', 4)->first();
        */

        if($szemelyjog == 1){
            return redirect('/berletVasarlas'); 
        }else if($szemelyjog == 2){
            return redirect('/dolgozo'); 
        }else if($szemelyjog == 3){
            return redirect('/edzo'); 
        }else if($szemelyjog == 4){
            return redirect('/admin'); 
        }else{
            return redirect('/login'); 
        }

        return $next($request);


        
    }
}
