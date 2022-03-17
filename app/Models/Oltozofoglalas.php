<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Oltozofoglalas extends Model
{protected $primaryKey = 'oltozofog_id';
    protected $oltozofoglalas = ['oltozofog_id', 'szekreny_id', 'ugyfel', 'datum'];

    public function getLetszamAttribute(){
        $arvalt= DB::table("oltozofoglalas")->where("date(datum)","=","date(CURRENT_DATE())" )
        ->where("hour(datum)","=",DB::raw("hour(CURRENT_TIME)"))->count();
        
        return $arvalt;
    }
   
}
