<?php

namespace Database\Seeders;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Seeder;

class Eszkoz_tipus_Seeder extends Seeder

{
    public function run(){
        DB::table('eszkoz_tipuses')->insert([
            ['eszkoz_neve' => 'Kézisúlyzó','suly' => '1','kep' => 'Kép1','leiras' => 'majd ki lesz toltve'],
            ['eszkoz_neve' => 'Fekvenyomó Pad Vízszintes','suly' => '1','kep' => 'Kép2','leiras' => 'majd ki lesz toltve'],
            ['eszkoz_neve' => 'Fekvenyomó Pad Ferde','suly' => '1','kep' => 'Kép3','leiras' => 'majd ki lesz toltve'],
            ['eszkoz_neve' => 'Pillangó Mellgép','suly' => '1','kep' => 'Kép4','leiras' => 'majd ki lesz toltve'],
            ['eszkoz_neve' => 'Keresztcsiga','suly' => '1','kep' => 'Kép5','leiras' => 'majd ki lesz toltve'],
            ['eszkoz_neve' => 'Mellnyomó Gép','suly' => '1','kep' => 'Kép6','leiras' => 'majd ki lesz toltve'],
            ['eszkoz_neve' => 'pec-deck Gép','suly' => '1','kep' => 'Kép7','leiras' => 'majd ki lesz toltve'],
            ['eszkoz_neve' => 'Smith Keret','suly' => '1','kep' => 'Kép8','leiras' => 'majd ki lesz toltve'],
            ['eszkoz_neve' => 'Húzódzkodó Rúd','suly' => '1','kep' => 'Kép9','leiras' => 'majd ki lesz toltve'],
            ['eszkoz_neve' => 'Csigás Hátgép','suly' => '1','kep' => 'Kép10','leiras' => 'majd ki lesz toltve'],
            ['eszkoz_neve' => 'Evezőgép','suly' => '1','kep' => 'Kép11','leiras' => 'majd ki lesz toltve'],
            ['eszkoz_neve' => 'Kábeles Evezőgép','suly' => '1','kep' => 'Kép12','leiras' => 'majd ki lesz toltve'],
            ['eszkoz_neve' => 'T-rudas Evezőgép','suly' => '1','kep' => 'Kép13','leiras' => 'majd ki lesz toltve'],
            ['eszkoz_neve' => 'Hiperextenzív pad','suly' => '1','kep' => 'Kép14','leiras' => 'majd ki lesz toltve'],
            ['eszkoz_neve' => 'Ülő Oldalemelő Gép','suly' => '2','kep' => 'Kép15','leiras' => 'majd ki lesz toltve'],
            ['eszkoz_neve' => 'Hátsóváll Gép','suly' => '2','kep' => 'Kép16','leiras' => 'majd ki lesz toltve'],
            ['eszkoz_neve' => 'Vállból Nyomó Gép','suly' => '2','kep' => 'Kép17','leiras' => 'majd ki lesz toltve'],
            ['eszkoz_neve' => 'Lábtoló Gép','suly' => '2','kep' => 'Kép18','leiras' => 'majd ki lesz toltve'],
            ['eszkoz_neve' => 'Lábfeszítő Gép','suly' => '2','kep' => 'Kép19','leiras' => 'majd ki lesz toltve'],
            ['eszkoz_neve' => 'Lábhajlító Gép','suly' => '2','kep' => 'Kép20','leiras' => 'majd ki lesz toltve'],
            ['eszkoz_neve' => 'Hack Guggoló Gép','suly' => '2','kep' => 'Kép21','leiras' => 'majd ki lesz toltve'],
            ['eszkoz_neve' => 'Álló Lábhajlító Gép','suly' => '2','kep' => 'Kép22','leiras' => 'majd ki lesz toltve'],
            ['eszkoz_neve' => 'Comb Távolító Gép','suly' => '2','kep' => 'Kép23','leiras' => 'majd ki lesz toltve'],
            ['eszkoz_neve' => 'Comb Összenyomó Gép','suly' => '2','kep' => 'Kép24','leiras' => 'majd ki lesz toltve'],
            ['eszkoz_neve' => 'Vízszintes Lábtoló Gép','suly' => '2','kep' => 'Kép25','leiras' => 'majd ki lesz toltve'],
            ['eszkoz_neve' => 'Csípőemelő Gép','suly' => '2','kep' => 'Kép26','leiras' => 'majd ki lesz toltve'],
            ['eszkoz_neve' => 'Bicepsz Rúd','suly' => '2','kep' => 'Kép27','leiras' => 'majd ki lesz toltve'],
            ['eszkoz_neve' => 'Franciarúd','suly' => '2','kep' => 'Kép28','leiras' => 'majd ki lesz toltve'],
            ['eszkoz_neve' => 'Csigás Bicepszgép','suly' => '2','kep' => 'Kép29','leiras' => 'majd ki lesz toltve'],
            ['eszkoz_neve' => 'Scott Pad','suly' => '2','kep' => 'Kép30','leiras' => 'majd ki lesz toltve']
	]);
    }
}