<?php

declare(strict_types = 1);

namespace App\Charts;

use App\Models\User;
use App\Models\Terem;
use Chartisan\PHP\Chartisan;
use ConsoleTVs\Charts\BaseChart;
use Illuminate\Http\Request;

class EdzotevekenysegChart extends BaseChart
{
    /**
     * Handles the HTTP request for the given chart.
     * It must always return an instance of Chartisan
     * and never a string or an array.
     */
    public function handler(Request $request): Chartisan
    {
        $result= $this->getEszkozByTerem();

        return Chartisan::build()
            ->labels($result['labels'])
            ->dataset('sample',$result['dataset']);
            
    }
    private function getEszkozByTerem()
    {
        $labels=[];
        $dataset=[];

        foreach(User::all() as $terem){
            
          
          if($terem->jogosultsag_id===3){
             
            $labels[]=$terem->id;
            $dataset[]=$terem->edzesek->count();
        }}
        return ['labels'=>$labels,'dataset'=>$dataset];
    }
}