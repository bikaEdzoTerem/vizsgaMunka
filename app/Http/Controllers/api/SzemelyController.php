<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Szemely;
use Illuminate\Support\Facades\Schema;

class SzemelyController extends Controller
{
    public function index(Request $request) 
    { 
        $sort=$request->query ('_sort');
        $order=$request->query ('_order');
        $q=$request->query('q');
        $szemelyek=Szemely::selectRaw("*");
        if($sort&&$order){
            $szemelyek->orderBy($sort,$order);
        }
        if($q){
            
            foreach ( Schema::getColumnListing("szemelies") as $column) {
               // dd(Schema::getColumnType("szemelies",$column));
                $szemelyek->orWhere($column,'like','%'.$q.'%');
                $szemelyek->orWhere($column,$q);
            };
        }
        //$szemelyek= ($sort&&$order) ? Szemely::orderBy($sort,$order)->get(): Szemely::all();
      
       
        //dd($szemelyek->toSql());

        return response()->json($szemelyek->get());
    }


}
