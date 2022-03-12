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
       
    
   
}
