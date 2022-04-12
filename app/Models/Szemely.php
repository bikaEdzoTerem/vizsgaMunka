<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Szemely extends Model
{
    protected $primaryKey = 'szemely_id';
    protected $fillable = ['szemely_id', 'jogosultsag_id', 'email_cim', 'jelszo', 'nev', 'szul_datum', 'neme', 'igazolvany_szam', 'igazolvany_tipusa', 'tel_szam', 'kep'];
    public function eszkozok(){
        return $this->hasMany(Ugyfel_edzes::class,"edzo","szemely_id");
    }
}
