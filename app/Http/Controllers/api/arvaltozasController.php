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
    }public function store(Request $request){  $Berlet_tipus_id=$request->input("Berlet_tipus_id");
        $regi_ar=$request->input("regi_ar");
        $uj_ar=$request->input("uj_ar");
        $mettol=$request->input("mettol");
        $meddig=$request->input("meddig");
       
              $arvaltozas=new Arvaltozas;
              $arvaltozas->eszkoz_neve=$Berlet_tipus_id;
              $arvaltozas->regi_ar=$regi_ar;
              $arvaltozas->uj_ar=$uj_ar;
              $arvaltozas->mettol=$mettol;
              $arvaltozas->meddig=$meddig;
             
              $arvaltozas->save();
            
      
              return response()->json(true);}
    public function update(Request $request,string $arvaltozasId)
    {
  $Berlet_tipus_id=$request->input("Berlet_tipus_id");
  $regi_ar=$request->input("regi_ar");
  $uj_ar=$request->input("uj_ar");
  $mettol=$request->input("mettol");
  $meddig=$request->input("meddig");
 
        $arvaltozas=Arvaltozas::find($arvaltozasId);
        $arvaltozas->Berlet_tipus_id=$Berlet_tipus_id;
        $arvaltozas->regi_ar=$regi_ar;
        $arvaltozas->uj_ar=$uj_ar;
        $arvaltozas->mettol=$mettol;
        $arvaltozas->meddig=$meddig;
       
        $arvaltozas->save();
      

        return response()->json(true);
        
    }
    public function destroy(string $arvaltozasId){
        $arvaltozas=Arvaltozas::find($arvaltozasId);
       
        $arvaltozas->delete();
        return response()->json(true);
    }
}
