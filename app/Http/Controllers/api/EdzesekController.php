<?php

namespace App\Http\Controllers\api;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Edzesek;
use Illuminate\Support\Facades\Schema;

class EdzesekController extends Controller
{
    public function index(Request $request)
    { $sort=$request->query ('_sort');
        $order=$request->query ('_order');
        $q=$request->query('q');
        $edzesek=Edzesek::selectRaw("*");
        if($sort&&$order){
            $edzesek->orderBy($sort,$order);
        }
        if($q){
            
            foreach ( Schema::getColumnListing("berlet_tipuses") as $column) {
               // dd(Schema::getColumnType("szemelies",$column));
                $edzesek->orWhere($column,'like','%'.$q.'%');
                $edzesek->orWhere($column,$q);
            };
        }
        //$szemelyek= ($sort&&$order) ? Szemely::orderBy($sort,$order)->get(): Szemely::all();
      
       
        //dd($szemelyek->toSql());

        return response()->json($edzesek->get());
    }
    
}
