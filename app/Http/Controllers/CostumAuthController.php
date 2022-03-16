<?php

namespace App\Http\Controllers;
use App\Models\Szemely;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Session;

class CostumAuthController extends Controller
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
            'nev' => 'required',                          //név
            'email_cim' => 'required|email|unique:szemelies',     //email
            'jelszo' => 'required|min:5|max:20',          //jelszó
        //    'jelszo_ujra' => 'required|min:5|max:20',     //jelszó űjra
            'neme' => 'required',                          //neme, true-false -> 1-0, checkbox ötlet
            'szul_datum' => 'required',     //születési dátum
            'tel_szam' => 'integer'         //telefonszám
        ]);
        $szemely = new Szemely();
        $szemely->nev = $request->nev;
        $szemely->email_cim = $request->email_cim;
        $szemely->jelszo = Hash::make($request->jelszo);         //hash titkosítás
        //$szemely->jelszo_ujra = Hash::make($request->password);    //hash titkosítás
        $szemely->neme = $request->neme;
        $szemely->szul_datum = $request->szul_datum;
        $szemely->tel_szam = $request->tel_szam;
        $szemely->jogosultsag_id = 1;
        $szemely->igazolvany_szam = "";
        $szemely->igazolvany_tipusa = "";
        $szemely->kep = "alap";
        $res = $szemely->save();

        //if ($szemely->jelszo ==  $szemely->jelszo_ujra) {
            if ($res) {
                return back()->with('success', 'Sikeres regisztráció');
            } else {
                return back()->with('fail', 'Valami baj van.');
            }
        //} else {
        //    return back()->with('fail', 'A jelszavak nem egyeznek.');
        //}
    }

    public function loginUser(Request $request)
    {
        $request->validate([
            'email_cim' => 'required|email',
            'jelszo' => 'required|min:5|max:20'
        ]);
        $szemely = Szemely::where('email_cim', '=', $request->email_cim)->first();
        //$szemelyjog = Szemely::where('jogosultsag_id', "=",$request->jogosultsag_id)->get();      //nem biztos hogy kell
        if ($szemely) {
            //if (Hash::check($request->jelszo, $szemely->jelszo)) { 
            //    $request->session()->put('loginId', $szemely->id);
            //    //return redirect('/');
            //   return redirect('dashboard');
            if(Hash::check($request->jelszo, $szemely->jelszo) && $szemely->jogosultsag_id == 1){ //alap felhasználó
                $data = array();
                if (Session::has('loginId')) {
                    $data = Szemely::where('id', '=', Session::get('loginId'))->first();
                }
                return view('pages.index', compact('data'));
            } else if(Hash::check($request->jelszo, $szemely->jelszo) && $szemely->jogosultsag_id == 2){ //$szemelyjog vagy $szemely->jogosultsag_id    dolgozó
                return redirect('/dolgozo'); 
            } else if(Hash::check($request->jelszo, $szemely->jelszo) && $szemely->jogosultsag_id == 3){ //edző
                return redirect('/edzo'); 
            } else if(Hash::check($request->jelszo, $szemely->jelszo) && $szemely->jogosultsag_id == 4){ //admin
                return redirect('/admin'); 
            } else {
                return back()->with('fail', 'A jelszó nem jó.');
            }
        } else {
            return back()->with('fail', 'Ez az email nincs regisztrálva.');
        }
    }

    /*public function dashboard()
    {
        $data = array();
        if (Session::has('loginId')) {
            $data = Szemely::where('id', '=', Session::get('loginId'))->first();
        }
        //return view('auth.dashboard', compact('data'));
        return view('pages.index', compact('data'));
    }*/

    public function logout()
    {
        if (!Session::has('loginId')) {
            Session::pull('loginId');
            return redirect('login');
        }
    }
}
