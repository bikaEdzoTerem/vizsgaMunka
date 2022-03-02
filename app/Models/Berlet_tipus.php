<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Berlet_tipus extends Model
{
    protected $berlet_tipus = ['berlet_tipus_id', 'megnevezes', 'idotartam_nap', 'ar'];

    public function getArAttribute($value)
    {
        $arvalt= Arvaltozas::where("berlet_tipus_id",$this->attributes["berlet_tipus_id"])
        ->where("mettol","<=",DB::raw("CURRENT_DATE()"))
        ->where("meddig",">=",DB::raw("CURRENT_DATE()"))->first();

        return $arvalt ? $arvalt->uj_ar : $this->attributes["ar"];
    }
}