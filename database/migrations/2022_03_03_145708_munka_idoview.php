<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class MunkaIdoview extends Migration
{
    
    public function up()
    {
        DB::statement($this->munkaIdoView());
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::statement($this->dropView());
    }
    private function munkaIdoView() :string {
        return <<<SQL
        CREATE VIEW viewMunkaIdo AS
        SELECT szemelies.kep,
        szemelies.nev,
        munkaidos.dolgozo,
        munkaidos.mettol,
        munkaidos.meddig 
        from munkaidos ,szemelies 
        WHERE munkaidos.dolgozo=szemelies.szemely_id
        SQL;
        

        
    }
}
