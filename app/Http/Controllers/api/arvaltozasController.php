<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\Arvaltozas;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Schema;
class arvaltozasController extends Controller
{
    public function index(Request $request)
    { $sort=$request->query ('_sort');
        $order=$request->query ('_order');
        $q=$request->query('q');
        $arvaltozasok=Arvaltozas::selectRaw("*");
        if($sort&&$order){
            $arvaltozasok->orderBy($sort,$order);
        }
        if($q){
            
            foreach ( Schema::getColumnListing("arvaltozas") as $column) {
               // dd(Schema::getColumnType("szemelies",$column));
                $arvaltozasok->orWhere($column,'like','%'.$q.'%');
                $arvaltozasok->orWhere($column,$q);
            };
        }
        //$szemelyek= ($sort&&$order) ? Szemely::orderBy($sort,$order)->get(): Szemely::all();
      
       
        //dd($szemelyek->toSql());

        return response()->json($arvaltozasok->get());
    }
    public function update(Request $request,string $berletId)
    {
  $Berlet_tipus_id=$request->input("Berlet_tipus_id");
  $regi_ar=$request->input("regi_ar");
  $uj_ar=$request->input("uj_ar");
  $mettol=$request->input("mettol");
  $meddig=$request->input("meddig");
 
        $eszkoz=Arvaltozas::find($berletId);
        $Berlet_tipus_id->eszkoz_neve=$Berlet_tipus_id;
        $eszkoz->regi_ar=$regi_ar;
        $eszkoz->uj_ar=$uj_ar;
        $eszkoz->mettol=$mettol;
        $eszkoz->meddig=$meddig;
       
        $eszkoz->save();
      

        return response()->json(true);
        
    }
    public function destroy(string $eszkozId){
        $eszkoz=Arvaltozas::find($eszkozId);
       
        $eszkoz->delete();
        return response()->json(true);
    }
}
