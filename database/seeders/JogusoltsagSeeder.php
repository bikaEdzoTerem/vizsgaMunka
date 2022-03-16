<?php

namespace Database\Seeders;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Seeder;

class JogusoltsagSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('jogosultasgs')->insert([[
            'nev' => 'ugyfel',
           
        ],[
            'nev' => 'dolgozo',
        ],[
            'nev' => 'edzo',
        ],[
            'nev' => 'admin',
        ]]
    );
    }
}
