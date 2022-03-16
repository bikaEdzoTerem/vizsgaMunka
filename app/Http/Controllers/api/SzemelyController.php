<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\Berlet;
use App\Models\Edzotorles;
use App\Models\Jogosultsag;
use App\Models\Munkaido;
use Illuminate\Http\Request;
use App\Models\Szemely;
use App\Models\Ugyfel_edzes;
use Illuminate\Support\Facades\Schema;

class SzemelyController extends Controller
{
    public function index(Request $request) 
    { 
        $sort=$request->query ('_sort');
        $order=$request->query ('_order');
        $q=$request->query('q');
        $nev=$request->query('nev');
        $szemelyek=Szemely::selectRaw("*");
        if($sort&&$order){
            $szemelyek->orderBy($sort,$order);
        }
        if($q){
            
            foreach ( Schema::getColumnListing("szemelies") as $column) {
               // dd(Schema::getColumnType("szemelies",$column));
                $szemelyek->orWhere($column,'like','%'.$q.'%');
                $szemelyek->orWhere($column,$q);
            };
        }
        if($nev){
            $szemelyek->where('nev','like','%'.$nev.'%');
        }
        //$szemelyek= ($sort&&$order) ? Szemely::orderBy($sort,$order)->get(): Szemely::all();
      
       
        //dd($szemelyek->toSql());

        return response()->json($szemelyek->get());
    } public function store(Request $request){
        $emailCim=$request->input("email_cim");
        $jelszo="jelszo";
        $nev=$request->input("nev");
        $szulDatum=$request->input("szul_datum");
        $neme=$request->input("neme");
        $igazolvanySzam=$request->input("igazolvany_szam");
        $igazolvanyTipusa=$request->input("igazolvany_tipusa");
        $tel_szam=$request->input("tel_szam");
        $kep="alap";
       // $telSzam=$request->input("tel_szam");
       // $kep=$request->input("kep");
        $jogosultsagId=$request->input("jogosultsag_id");
        $szemely=new Szemely;
        $szemely->jogosultsag_id=$jogosultsagId;
        $szemely->email_cim=$emailCim;
        $szemely->jelszo=$$jelszo;
        $szemely->nev=$nev;
        $szemely->szul_datum=$szulDatum;
        $szemely->neme=$neme;
        $szemely->igazolvany_szam=$igazolvanySzam;
        $szemely->igazolvany_tipusa=$igazolvanyTipusa;
        $szemely->tel_szam=$tel_szam;
        $szemely->kep=$kep;
       // $szemely->tel_szam=$telSzam;
        //$szemely->kep=$kep;
        $szemely->save();
    }
    public function update(Request $request,string $szemelyId)
    {
        $emailCim=$request->input("email_cim");
        $nev=$request->input("nev");
        $szulDatum=$request->input("szul_datum");
        $neme=$request->input("neme");
        $igazolvanySzam=$request->input("igazolvany_szam");
        $igazolvanyTipusa=$request->input("igazolvany_tipusa");
       // $telSzam=$request->input("tel_szam");
       // $kep=$request->input("kep");
        $jogosultsagId=$request->input("jogosultsag_id");
//$eszkozTipusSzamlalo=Jogosultsag::firstWhere("jogosultsag_id",$jogosultsagId)->jogosultsag_id;
 
        $szemely=Szemely::find($szemelyId);
        $szemely->jogosultsag_id=$jogosultsagId;
        $szemely->email_cim=$emailCim;
        $szemely->nev=$nev;
        $szemely->szul_datum=$szulDatum;
        $szemely->neme=$neme;
        $szemely->igazolvany_szam=$igazolvanySzam;
        $szemely->igazolvany_tipusa=$igazolvanyTipusa;
       // $szemely->tel_szam=$telSzam;
        //$szemely->kep=$kep;
        $szemely->save();
      

        return response()->json(true);
        
    }
    public function destroy(string $szemelyId){
        $szemely=Szemely::find($szemelyId);
        $szemely->delete();
       
        
        return response()->json(true);
    }
}
