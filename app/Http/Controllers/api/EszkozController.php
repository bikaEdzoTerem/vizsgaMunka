<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\EszkozView;
use App\Models\Eszkoz;
use App\Models\Eszkoz_tipus;

class EszkozController extends Controller
{
    /*public function index(){
        return response()->json(EszkozView::all());
    }*/

    public function index(){
        $result=EszkozView::all();
        return $result;
        //return response()->json(EszkozView::all());
     }
     public function update(Request $request,string $eszkozId)
    {
  $eszkozNeve=$request->input("eszkoz_neve");
  $teremId=$request->input("terem_id");
 $eszkozTipusSzamlalo=Eszkoz_tipus::firstWhere("eszkoz_neve",$eszkozNeve)->eszkoz_tipus_szamlalo;
 
        $eszkoz=Eszkoz::find($eszkozId);
        $eszkoz->terem_id=$teremId;
        $eszkoz->eszkoz_tipus_szamlalo=$eszkozTipusSzamlalo;
        $eszkoz->save();
      

        return response()->json(true);
        
    }
    public function destroy(string $eszkozId){
        $eszkoz=Eszkoz::find($eszkozId);
       
        $eszkoz->delete();
        return response()->json(true);
    }
}
