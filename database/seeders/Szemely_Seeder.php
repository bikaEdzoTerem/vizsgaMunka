<?php

namespace Database\Seeders;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Seeder;

class Szemely_Seeder extends Seeder
{
    public function run(){
        DB::table('szemelies')->insert([
		    ['jogosultsag_id' => '1','email_cim' => 'felhasznalo111111111111@gmail.com','jelszo' => 'Aa123456','nev' => 'Hecz Kaludia','szul_datum' => '1982-06-03','neme' => 'Nő','igazolvany_szam' => '17593716491','igazolvany_tipusa' => 'diák','tel_szam'=>'0620400598','kep' => 'alap_ert'],
            ['jogosultsag_id' => '3','email_cim' => 'edzo1@gmail.com','jelszo' => 'Bb123456','nev' => 'Szabó Anett','szul_datum' => '2000-01-21','neme' => 'Nő','igazolvany_szam' => '572962SA','igazolvany_tipusa' => 'felnőtt','tel_szam'=>'0620400598','kep' => 'alap_ert'],
            ['jogosultsag_id' => '1','email_cim' => 'felhasznalo2@gmail.com','jelszo' => 'Cc123456','nev' => 'Szántai Barna','szul_datum' => '1982-06-03','neme' => 'Férfi','igazolvany_szam' => '16592711111','igazolvany_tipusa' => 'diak','tel_szam'=>'0620400598','kep' => 'alap_ert'],
            ['jogosultsag_id' => '2','email_cim' => 'dolgozo1@gmail.com','jelszo' => 'Dd123456','nev' => 'Bartucz Petra','szul_datum' => '1999-02-14','neme' => 'Nő','igazolvany_szam' => '112233SA','igazolvany_tipusa' => 'felnőtt','tel_szam'=>'0620400598','kep' => 'alap_ert'],
            ['jogosultsag_id' => '2','email_cim' => 'dolgozo2@gmail.com','jelszo' => 'Ee123456','nev' => 'Balogh Bíborka','szul_datum' => '1928-12-10','neme' => 'Nő','igazolvany_szam' => '365123SA','igazolvany_tipusa' => 'felnőtt','tel_szam'=>'0620400598','kep' => 'alap_ert'],
            ['jogosultsag_id' => '1','email_cim' => 'felhasznalo4@gmail.com','jelszo' => 'Ff123456','nev' => 'Nagy Domonkos','szul_datum' => '1991-02-20','neme' => 'Férfi','igazolvany_szam' => '512333SA','igazolvany_tipusa' => 'felnőtt','tel_szam'=>'0620400598','kep' => 'alap_ert'],
            ['jogosultsag_id' => '1','email_cim' => 'felhasznalo5@gmail.com','jelszo' => 'Gg123456','nev' => 'Joó Edvárd','szul_datum' => '1988-01-01','neme' => 'Férfi','igazolvany_szam' => '223223SA','igazolvany_tipusa' => 'felnőtt','tel_szam'=>'0620400598','kep' => 'alap_ert'],
            ['jogosultsag_id' => '4','email_cim' => 'admin1@gmail.com','jelszo' => 'Hh123456','nev' => 'Bogdán Gábor','szul_datum' => '1988-01-01','neme' => 'Férfi','igazolvany_szam' => '423432SA','igazolvany_tipusa' => 'felnőtt','tel_szam'=>'0620400598','kep' => 'alap_ert'],
            ['jogosultsag_id' => '1','email_cim' => 'felhasznalo6@gmail.com','jelszo' => 'Ii123456','nev' => 'Simon Gergely','szul_datum' => '1988-01-01','neme' => 'Férfi','igazolvany_szam' => '37333216292','igazolvany_tipusa' => 'diák','tel_szam'=>'0620400598','kep' => 'alap_ert'],
            ['jogosultsag_id' => '4','email_cim' => 'admin2@gmail.com','jelszo' => 'Jj123456','nev' => 'Gutyina András','szul_datum' => '1969-06-09','neme' => 'Férfi','igazolvany_szam' => '111131SA','igazolvany_tipusa' => 'felnőtt','tel_szam'=>'0620400598','kep' => 'alap_ert'],
            ['jogosultsag_id' => '1','email_cim' => 'felhasznalo7@gmail.com','jelszo' => 'Kk123456','nev' => 'Somoskői Gábor','szul_datum' => '1969-06-09','neme' => 'Férfi','igazolvany_szam' => '92562611133','igazolvany_tipusa' => 'diák','tel_szam'=>'0620400598','kep' => 'alap_ert'],
            ['jogosultsag_id' => '1','email_cim' => 'felhasznalo8@gmail.com','jelszo' => 'Ll123456','nev' => 'Kelemen Kevin','szul_datum' => '1961-01-19','neme' => 'Férfi','igazolvany_szam' => '166622SA','igazolvany_tipusa' => 'felnőtt','tel_szam'=>'0620400598','kep' => 'alap_ert'],
            ['jogosultsag_id' => '3','email_cim' => 'edzo2@gmail.com','jelszo' => 'Mm123456','nev' => 'Kiss Niki','szul_datum' => '1991-11-11','neme' => 'Nő','igazolvany_szam' => '653544SA','igazolvany_tipusa' => 'felnőtt','tel_szam'=>'0620400598','kep' => 'alap_ert'],
            ['jogosultsag_id' => '1','email_cim' => 'felhasznalo9@gmail.com','jelszo' => 'Nn123456','nev' => 'Illés Lejla','szul_datum' => '1991-11-11','neme' => 'Nő','igazolvany_szam' => '888444SA','igazolvany_tipusa' => 'felnőtt','tel_szam'=>'0620400598','kep' => 'alap_ert'],
            ['jogosultsag_id' => '1','email_cim' => 'felhasznalo10@gmail.com','jelszo' => 'Oo123456','nev' => 'Helyes Márton','szul_datum' => '1991-11-11','neme' => 'Férfi','igazolvany_szam' => '584354SA','igazolvany_tipusa' => 'felnőtt','tel_szam'=>'0620400598','kep' => 'alap_ert'],
            ['jogosultsag_id' => '3','email_cim' => 'edzo3@gmail.com','jelszo' => 'Pp123456','nev' => 'Ménesi Csaba','szul_datum' => '1990-10-21','neme' => 'Férfi','igazolvany_szam' => '548375SA','igazolvany_tipusa' => 'felnőtt','tel_szam'=>'0620400598','kep' => 'alap_ert'],
            ['jogosultsag_id' => '4','email_cim' => 'admin3@gmail.com','jelszo' => 'Qq123456','nev' => 'Szűcs Richárd','szul_datum' => '1960-12-21','neme' => 'Férfi','igazolvany_szam' => '999999SA','igazolvany_tipusa' => 'felnőtt','tel_szam'=>'0620400598','kep' => 'alap_ert'],
            ['jogosultsag_id' => '1','email_cim' => 'felhasznalo11@gmail.com','jelszo' => 'Rr123456','nev' => 'Li Richárd Alex','szul_datum' => '1988-02-01','neme' => 'Férfi','igazolvany_szam' => '99515244133','igazolvany_tipusa' => 'diák','tel_szam'=>'0620400598','kep' => 'alap_ert'],
            ['jogosultsag_id' => '1','email_cim' => 'felhasznalo12@gmail.com','jelszo' => 'Ss123456','nev' => 'Bartók Rolad','szul_datum' => '1982-08-11','neme' => 'Férfi','igazolvany_szam' => 'RK12345678','igazolvany_tipusa' => 'rendőr','tel_szam'=>'0620400598','kep' => 'alap_ert'],
            ['jogosultsag_id' => '1','email_cim' => 'felhasznalo13@gmail.com','jelszo' => 'Tt123456','nev' => 'Szabó Gergő','szul_datum' => '1977-07-21','neme' => 'Férfi','igazolvany_szam' => 'RK87654321','igazolvany_tipusa' => 'rendőr','tel_szam'=>'0620400598','kep' => 'alap_ert'],
            ['jogosultsag_id' => '1','email_cim' => 'felhasznalo14@gmail.com','jelszo' => 'Uu123456','nev' => 'SZabó Milán','szul_datum' => '1927-11-11','neme' => 'Férfi','igazolvany_szam' => '77123155311','igazolvany_tipusa' => 'diák','tel_szam'=>'0620400598','kep' => 'alap_ert'],
            ['jogosultsag_id' => '2','email_cim' => 'dolgozo3@gmail.com','jelszo' => 'Vv123456','nev' => 'Szikora Melinda','szul_datum' => '1999-02-16','neme' => 'Nő','igazolvany_szam' => '882513SA','igazolvany_tipusa' => 'felnőtt','tel_szam'=>'0620400598','kep' => 'alap_ert'],
            ['jogosultsag_id' => '1','email_cim' => 'felhasznalo15@gmail.com','jelszo' => 'Ww123456','nev' => 'Tellér Ádám','szul_datum' => '1966-07-11','neme' => 'Férfi','igazolvany_szam' => '88712499455','igazolvany_tipusa' => 'diák','tel_szam'=>'0620400598','kep' => 'alap_ert'],
            ['jogosultsag_id' => '3','email_cim' => 'edzo4@gmail.com','jelszo' => 'Xx123456','nev' => 'Tóth Virág','szul_datum' => '1977-11-22','neme' => 'Nő','igazolvany_szam' => '777777SA','igazolvany_tipusa' => 'felnptt','tel_szam'=>'0620400598','kep' => 'alap_ert'],
            ['jogosultsag_id' => '1','email_cim' => 'felhasznalo16@gmail.com','jelszo' => 'Yy123456','nev' => 'Váradi Ákos','szul_datum' => '1987-12-29','neme' => 'Férfi','igazolvany_szam' => '666666SA','igazolvany_tipusa' => 'félnőtt','tel_szam'=>'0620400598','kep' => 'alap_ert'],
            ['jogosultsag_id' => '3','email_cim' => 'edzo5@gmail.com','jelszo' => 'Zz123456','nev' => 'Labancz Dániel','szul_datum' => '1972-01-30','neme' => 'Férfi','igazolvany_szam' => '77234851233','igazolvany_tipusa' => 'diák','tel_szam'=>'0620400598','kep' => 'alap_ert']
        ]);
    }
}