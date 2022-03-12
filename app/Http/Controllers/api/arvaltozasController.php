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
}
