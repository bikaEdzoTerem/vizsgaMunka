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
}
