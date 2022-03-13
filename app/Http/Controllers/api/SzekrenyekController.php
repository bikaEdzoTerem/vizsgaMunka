<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\Szekeny;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Schema;
class SzekrenyekController extends Controller
{
    public function index(Request $request)
    { $sort=$request->query ('_sort');
        $order=$request->query ('_order');
        $q=$request->query('q');
        $szekrenyek=Szekeny::selectRaw("*");
        if($sort&&$order){
            $szekrenyek->orderBy($sort,$order);
        }
        if($q){
            
            foreach ( Schema::getColumnListing("szekenies") as $column) {
               // dd(Schema::getColumnType("szemelies",$column));
                $szekrenyek->orWhere($column,'like','%'.$q.'%');
                $szekrenyek->orWhere($column,$q);
            };
        }
        //$szemelyek= ($sort&&$order) ? Szemely::orderBy($sort,$order)->get(): Szemely::all();
      
       
        //dd($szemelyek->toSql());

        return response()->json($szekrenyek->get());
    }public function update(Request $request,string $szekrenyId)
    {
  $urese=$request->input("ures_e");
  $tipusa=$request->input("tipusa");

 
        $eszkoz=Szekeny::find($szekrenyId);
        $eszkoz->ures_e=$urese;
        $eszkoz->tipusa=$tipusa;
        $eszkoz->save();
      

        return response()->json(true);
        
    }
    public function destroy(string $eszkozId){
        $eszkoz=Szekeny::find($eszkozId);
       
        $eszkoz->delete();
        return response()->json(true);
    }
}
