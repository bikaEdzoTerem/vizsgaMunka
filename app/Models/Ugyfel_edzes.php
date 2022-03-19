<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ugyfel_edzes extends Model
{ protected $primaryKey = 'edzo';
    protected $foreignkey='ugyfel';
    protected $ugyfel_edzes = ['edzo', 'ugyfel', 'datum', 'ora'];

   
}
