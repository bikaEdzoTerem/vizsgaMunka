<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\Gyakorlat;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Schema;
class gyakorlatokController extends Controller
{
    public function index(Request $request)
    { $sort=$request->query ('_sort');
        $order=$request->query ('_order');
        $q=$request->query('q');
        $gyakorlatok=Gyakorlat::selectRaw("*");
        if($sort&&$order){
            $gyakorlatok->orderBy($sort,$order);
        }
        if($q){
            
            foreach ( Schema::getColumnListing("gyakorlats") as $column) {
               // dd(Schema::getColumnType("szemelies",$column));
                $gyakorlatok->orWhere($column,'like','%'.$q.'%');
                $gyakorlatok->orWhere($column,$q);
            };
        }
        //$szemelyek= ($sort&&$order) ? Szemely::orderBy($sort,$order)->get(): Szemely::all();
      
       
        //dd($szemelyek->toSql());

        return response()->json($gyakorlatok->get());
    } public function store(Request $request){
        $izomcsopotId=$request->input("izomcsopor_id");
  $megnevezes=$request->input("megnevezes");
  $video=$request->input("video");
  $leiras=$request->input("leiras");
  $szint=$request->input("szint");

 
        $gyakorlat=new Gyakorlat;
        $gyakorlat->izomcsopor_id=$izomcsopotId;
        $gyakorlat->megnevezes=$megnevezes;
        $gyakorlat->video=$video;
        $gyakorlat->leiras=$leiras;
        $gyakorlat->szint=$szint;
    
        $gyakorlat->save();
      

        return response()->json(true);}
        
        public function update(Request $request,string $gyakorlatId)
    {
  $izomcsopotId=$request->input("izomcsopor_id");
  $megnevezes=$request->input("megnevezes");
  $video=$request->input("video");
  $leiras=$request->input("leiras");
  $szint=$request->input("szint");

 
        $gyakorlat=Gyakorlat::find($gyakorlatId);
        $gyakorlat->izomcsopor_id=$izomcsopotId;
        $gyakorlat->megnevezes=$megnevezes;
        $gyakorlat->video=$video;
        $gyakorlat->leiras=$leiras;
        $gyakorlat->szint=$szint;
    
        $gyakorlat->save();
      

        return response()->json(true);
        
    }
    public function destroy(string $gyakorlatid){
        $gyakorlat=Gyakorlat::find($gyakorlatid);
       
        $gyakorlat->delete();
        return response()->json(true);
    }
}
