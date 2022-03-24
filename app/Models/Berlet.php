<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Berlet extends Model
{protected $primaryKey = 'berlet_tipus_id';
    protected $foreignkey='ugyfel';
    protected $berlet = ['berlet_tipus_id', 'ugyfel', 'datum_tol', 'datum_ig'];
}
