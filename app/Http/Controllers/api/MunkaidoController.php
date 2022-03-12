<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\Munkaido;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Schema;
class MunkaidoController extends Controller
{
    public function index(Request $request)
    { $sort=$request->query ('_sort');
        $order=$request->query ('_order');
        $q=$request->query('q');
        $munkaidok=Munkaido::selectRaw("*");
        if($sort&&$order){
            $munkaidok->orderBy($sort,$order);
        }
        if($q){
            
            foreach ( Schema::getColumnListing("munkaidos") as $column) {
               // dd(Schema::getColumnType("szemelies",$column));
                $munkaidok->orWhere($column,'like','%'.$q.'%');
                $munkaidok->orWhere($column,$q);
            };
        }
        //$szemelyek= ($sort&&$order) ? Szemely::orderBy($sort,$order)->get(): Szemely::all();
      
       
        //dd($szemelyek->toSql());

        return response()->json($munkaidok->get());
    }
}
