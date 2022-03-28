<?php

namespace App\Http\Controllers;

use App\Models\Szemely;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Session;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Routing\Route;
use SebastianBergmann\Environment\Console;

class CostumAuthController extends BaseController
{
    public function login()
    {
        return view("auth.login");
    }

    public function registration()
    {
        return view("auth.registration");
    }

    public function registerUser(Request $request)
    {
        $request->validate([
            'nev' => 'required',                                    //név
            'email_cim' => 'required|email|unique:szemelies',       //email
            'jelszo' => 'required|min:5|max:20',                    //jelszó
            'neme' => 'required',                                   //neme, true-false -> 1-0, checkbox ötlet
            'szul_datum' => 'required',                             //születési dátum
            'tel_szam' => 'integer'                                 //telefonszám
        ]);
        $szemely = new Szemely();
        $szemely->nev = $request->nev;
        $szemely->email_cim = $request->email_cim;
        $szemely->jelszo = Hash::make($request->jelszo);            //hash titkosítás
        $szemely->neme = $request->neme;
        $szemely->szul_datum = $request->szul_datum;
        $szemely->tel_szam = $request->tel_szam;
        $szemely->jogosultsag_id = 1;
        $szemely->igazolvany_szam = "";
        $szemely->igazolvany_tipusa = "";
        $szemely->kep = "alap";

        $res = $szemely->save();
        if ($res) {
            return back()->with('success', 'Sikeres regisztráció');
        } else {
            return back()->with('fail', 'Valami baj van.');
        }
    }

    public function loginUser(Request $request)
    {
        $request->validate([
            'email_cim' => 'required|email',
            'jelszo' => 'required|min:5|max:20'
        ]);

        /*$routeName = Route::currentRouteName();
        $szemely = new Szemely();
        if (Hash::check($request->jelszo, $szemely->jelszo && $routeName == 'berletVasarlas')) {
            switch ($szemely->jogosultsag_id) {
                case 1:
                    return view('/berletVasarlas');
                    break;
                case 2:
                    return view('/');
                    break;
                case 3:
                    return view('/');
                    break;
                case 4:
                    return view('/');
                    break;
                default:
                    return view('/');
                    break;
            }
        }else{
            return view('/login');
        }
        if (Hash::check($request->jelszo, $szemely->jelszo && $routeName == 'dolgozo')) {
            switch ($szemely->jogosultsag_id) {
                case 1:
                    return view('/');
                    break;
                case 2:
                    return view('/dolgozo');
                    break;
                case 3:
                    return view('/');
                    break;
                case 4:
                    return view('/');
                    break;
                default:
                    return view('/');
                    break;
            }
        }
        if (Hash::check($request->jelszo, $szemely->jelszo && $routeName == 'edzo')) {
            switch ($szemely->jogosultsag_id) {
                case 1:
                    return view('/');
                    break;
                case 2:
                    return view('/');
                    break;
                case 3:
                    return view('/edzo');
                    break;
                case 4:
                    return view('/');
                    break;
                default:
                    return view('/');
                    break;
            }
        }
        if (Hash::check($request->jelszo, $szemely->jelszo && $routeName == 'admin')) {
            switch ($szemely->jogosultsag_id) {
                case 1:
                    return view('/');
                    break;
                case 2:
                    return view('/');
                    break;
                case 3:
                    return view('/');
                    break;
                case 4:
                    return view('/admin');
                    break;
                default:
                    return view('/');
                    break;
            }
        }*/

        
        $szemely = Szemely::where('email_cim', '=', $request->email_cim)->first();
        if ($szemely) {
            if (Hash::check($request->jelszo, $szemely->jelszo) && $szemely->jogosultsag_id == 1) {
                return view('pages.berletVasarlas');
            } else if (Hash::check($request->jelszo, $szemely->jelszo) && $szemely->jogosultsag_id==2) {
                return view('pages.dolgozo');
            } else if (Hash::check($request->jelszo, $szemely->jelszo) && $szemely->jogosultsag_id==3) {
                return view('pages.recepcio');
            } else if (Hash::check($request->jelszo, $szemely->jelszo) && $szemely->jogosultsag_id==4) {
                return view('pages.admin');
            } else {
                return back()->with('fail', 'A jelszó nem jó.');
            }
            //} else if(url('/edzo')==$request->url()) {
            //   if ($szemely && $szemely->jogosultsag_id == 3) {
            //        if (Hash::check($request->jelszo, $szemely->jelszo)) {
            //            return view('pages.edzo');
            //        }
            //    }
            //
        } else {
            return back()->with('fail', 'Ez az email nincs regisztrálva.');
        }
    }
}
