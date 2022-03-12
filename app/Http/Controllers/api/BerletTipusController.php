<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Berlet_tipus;
use Illuminate\Support\Facades\Schema;
class BerletTipusController extends Controller
{
    
    public function index(Request $request)
    { $sort=$request->query ('_sort');
        $order=$request->query ('_order');
        $q=$request->query('q');
        $berletek=Berlet_tipus::selectRaw("*");
        if($sort&&$order){
            $berletek->orderBy($sort,$order);
        }
        if($q){
            
            foreach ( Schema::getColumnListing("berlet_tipuses") as $column) {
               // dd(Schema::getColumnType("szemelies",$column));
                $berletek->orWhere($column,'like','%'.$q.'%');
                $berletek->orWhere($column,$q);
            };
        }
        //$szemelyek= ($sort&&$order) ? Szemely::orderBy($sort,$order)->get(): Szemely::all();
      
       
        //dd($szemelyek->toSql());

        return response()->json($berletek->get());
    }
   
    public function getAr()
    {
        dd(Berlet_tipus::find(5)->ara);
    }
}
