<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Berlet;
use Illuminate\Support\Facades\Schema;
class BerletekController extends Controller
{
    public function index(Request $request)
    { $sort=$request->query ('_sort');
        $order=$request->query ('_order');
        $q=$request->query('q');
        $berletek=Berlet::selectRaw("*");
        if($sort&&$order){
            $berletek->orderBy($sort,$order);
        }
        if($q){
            
            foreach ( Schema::getColumnListing("berlets") as $column) {
               // dd(Schema::getColumnType("szemelies",$column));
                $berletek->orWhere($column,'like','%'.$q.'%');
                $berletek->orWhere($column,$q);
            };
        }
        //$szemelyek= ($sort&&$order) ? Szemely::orderBy($sort,$order)->get(): Szemely::all();
      
       
        //dd($szemelyek->toSql());

        return response()->json($berletek->get());
    }
    public function update(Request $request,string $berletId)
    {
  $Berlet_tipus_id=$request->input("Berlet_tipus_id");
  $ugyfel=$request->input("ugyfel");
  $datum_tol=$request->input("datum_tol");
  $datum_ig=$request->input("datum_ig");
 
        $eszkoz=Berlet::find($berletId);
        $Berlet_tipus_id->eszkoz_neve=$Berlet_tipus_id;
        $eszkoz->ugyfel=$ugyfel;
        $eszkoz->datum_tol=$datum_tol;
        $eszkoz->datum_ig=$datum_ig;
       
        $eszkoz->save();
      

        return response()->json(true);
        
    }
    public function destroy(string $eszkozId){
        $eszkoz=berlet::find($eszkozId);
       
        $eszkoz->delete();
        return response()->json(true);
    }
       
    
   
}
