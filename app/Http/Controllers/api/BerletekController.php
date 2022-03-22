<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Berlet;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;
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
    }public function store(Request $request){
        $Berlet_tipus_id=$request->input("Berlet_tipus_id");
        $ugyfel=$request->input("ugyfel");
        $datum_tol=$request->input("datum_tol");
        $datum_ig=$request->input("datum_ig");
       
              $Berlet_tipus=new Berlet;
              $Berlet_tipus->Berlet_tipus_id=$Berlet_tipus_id;
              $Berlet_tipus->ugyfel=$ugyfel;
              $Berlet_tipus->datum_tol=$datum_tol;
              $Berlet_tipus->datum_ig=$datum_ig;
             
              $Berlet_tipus->save();
            
      
              return response()->json(true);
    }      
    public function update(Request $request)
    {

  $original=$request->input('originalInputs');
  $new=$request->input('newInputs');
 DB::Table('berlets')
 ->where([
     ['berlet_tipus_id',$original['berlet_tipus_id']],
     ['ugyfel',$original['ugyfel']],
     ['datum_tol',$original['datum_tol']],
     ['datum_ig',$original['datum_ig']],
 ])
 ->update([
 'berlet_tipus_id' => $new['berlet_tipus_id'],
 'ugyfel' => $new['ugyfel'],
 'datum_tol' => $new['datum_tol'],
 'datum_ig' => $new['datum_ig'],
 ]);

 
  return response()->json(true);

    }
    public function destroy(string $Berlet_tipusId){
        $Berlet_tipus=berlet::find($Berlet_tipusId);
       
        $Berlet_tipus->delete();
        return response()->json(true);
    }
       
    
   
}
