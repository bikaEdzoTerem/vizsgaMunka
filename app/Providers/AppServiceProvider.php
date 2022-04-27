<?php

namespace App\Providers;
use App\Charts\ArvaltozasokChart;

use App\Charts\BerleteladasokChart;
use App\Charts\DiagramChart;
use App\Charts\EdzotevekenysegChart;
use App\Charts\EszkozokChart;
use App\Charts\LetszamChart;
use App\Charts\NapiletszamChart;
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
            EszkozokChart::class,
           BerleteladasokChart::class,
           ArvaltozasokChart::class,
           EdzotevekenysegChart::class,
           LetszamChart::class,
           NapiletszamChart::class

            
        ]);
    }
}
