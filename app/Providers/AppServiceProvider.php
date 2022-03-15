<?php

namespace App\Providers;

use App\Charts\DiagramChart;
use App\Charts\EszkozokChart;
use ConsoleTVs\Charts\Registrar as Charts;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot(Charts $chart)
    {
        $chart->register([
            DiagramChart::class,
            EszkozokChart::class

            //charts.diagram_chart 
            //charts.eszkozok_chart 
        ]);
    }
}
