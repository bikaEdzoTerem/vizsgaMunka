<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\Oltozofoglalas;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Schema;
class OltozofoglalasokController extends Controller
{
    public function index(Request $request)
    { $sort=$request->query ('_sort');
        $order=$request->query ('_order');
        $q=$request->query('q');
        $oltozofoglalasok=Oltozofoglalas::selectRaw("*");
        if($sort&&$order){
            $oltozofoglalasok->orderBy($sort,$order);
        }
        if($q){
            
            foreach ( Schema::getColumnListing("oltozofoglalas") as $column) {
               // dd(Schema::getColumnType("szemelies",$column));
                $oltozofoglalasok->orWhere($column,'like','%'.$q.'%');
                $oltozofoglalasok->orWhere($column,$q);
            };
        }
        //$szemelyek= ($sort&&$order) ? Szemely::orderBy($sort,$order)->get(): Szemely::all();
      
       
        //dd($szemelyek->toSql());

        return response()->json($oltozofoglalasok->get());
    }

    public function store(Request $request){
        $szekrenyId=$request->input("szekreny_id");
$ugyfel=$request->input("ugyfel");
$datum=$request->input("datum");


    $eszkoz=new Oltozofoglalas;
    $eszkoz->szekreny_id=$szekrenyId;
    $eszkoz->ugyfel=$ugyfel;
    $eszkoz->datum=$datum;
    $eszkoz->save();
  

    return response()->json(true);}
public function update(Request $request,string $oltozofoglalasId)
{
$szekrenyId=$request->input("szekreny_id");
$ugyfel=$request->input("ugyfel");
$datum=$request->input("datum");


    $oltozofoglalas=Oltozofoglalas::find($oltozofoglalasId);
    $oltozofoglalas->szekreny_id=$szekrenyId;
    $oltozofoglalas->ugyfel=$ugyfel;
    $oltozofoglalas->datum=$datum;
    $oltozofoglalas->save();
  

    return response()->json(true);
    
}
public function destroy(string $oltozofoglalasId){
    $oltozofoglalas=Oltozofoglalas::find($oltozofoglalasId);
   
    $oltozofoglalas->delete();
    return response()->json(true);
}
}
