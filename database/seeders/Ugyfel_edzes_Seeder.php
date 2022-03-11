<?php

namespace Database\Seeders;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Seeder;

class Ugyfel_edzes_Seeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('ugyfel_edzes')->insert([
                ['edzo' => '3','ugyfel' => '1','datum' => '2022-03-02 00:00:00','ora' => '01:00:00'],
                ['edzo' => '2','ugyfel' => '1','datum' => '2022-03-02 00:00:00','ora' => '01:30:00'],
                ['edzo' => '2','ugyfel' => '3','datum' => '2022-03-02 00:00:00','ora' => '02:00:00'],
                ['edzo' => '2','ugyfel' => '6','datum' => '2022-03-02 00:00:00','ora' => '03:30:00'],
                ['edzo' => '2','ugyfel' => '1','datum' => '2022-03-02 00:00:00','ora' => '01:15:00'],
                ['edzo' => '13','ugyfel' => '3','datum' => '2022-03-03 00:00:00','ora' => '01:00:00'],
                ['edzo' => '13','ugyfel' => '7','datum' => '2022-03-04 00:00:00','ora' => '01:45:00'],
                ['edzo' => '13','ugyfel' => '9','datum' => '2022-03-05 00:00:00','ora' => '02:00:00']
        ]);
    }
}