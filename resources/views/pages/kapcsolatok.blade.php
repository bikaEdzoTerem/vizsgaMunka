@extends('layouts.kapcsolatokapp')
    @section('content')
@if(Route::has('login'))
    @include('includes.bejelentkezettheader')
@else
    @include('includes.feluletheader') 
@endif
@include('includes.kepvaltas')
            @include('includes.kozosnav')
        <article id="szabalyzat">    
            <h1>Szabályzat:</h1>
            <ul>
                <li>A terembe belépés után, az öltözőben, át kell venni a váltó ruhát, legfontosabb a váltó cipő!</li>                            
                <li>Mindig hozz magaddal törölközőt!</li>
                <li>Edzés közben enni, tilos!</li>
                <li>A termben alkoholt vagy más kábító/ bódító szert fogyasztani tilos!</li>
                <li>Egy gyakrolat elvégzése után pakolj el magad után!</li>
                <li>Ha végeztél a gyakorlattal és megizzadtál, tödöld le fertőtlenítővel az eszközt vagy a gépet!</li>
                <li>Ha nem bíród el a súlyokat, csináld kissebbel!</li>
                <li>Ha nem tudod vissza tenni a súlyokat kérj segítséget, akár a bent lévőktől, akár az edzőktől vagy csak a dolgozóktól!</li>
                <li>Ha valakinek szüksége van segítségre, legyél kedves, törődj mással!</li>
                <li>Ha egyedül edzel és bármilyen kárt okozol magadban vagy másban, azért a terem nem felelős!</li>
                <li>Ha egyedül edzel és bármilyen kárt okozol a berendezésben, annak árát meg kell téríteni!</li>
                <li>Verekedni/ balhézni/ kötekedni szigorúan tilos!</li>
                <li>Érezd jól magad!</li>
            </ul>   
        </article>
        <aside id="kapcsolatok">
            <div id="leiras">
                <p>
                Fenntartó: Bika KFT<br>
                Terem neve: Bika edző és fittnes terem<br>
                Telefonszám: 06 30 994 8327<br>
                Fax: bikaterem@fax.com <br>
                Email: bikaterem@gmail.com <br>
                Irányítószám: 2462 <br>
                Város: Martonvásár <br>
                Utca: Arany János utca <br>
                Szám: 21 <br>
            </p>
            </div>
                <div id="terkep">

                </div>
                <div class="container">
                    <table class="table table-dark table-striped">
                        <tr>
                            <th>Nyitvatartás:</th>
                            <th>Időpont:</th>
                        </tr>
                        <tr>
                            <td>Hétfő:</td>
                            <td>6:00-22:00</td>
                        </tr>
                        <tr>
                            <td>Kedd:</td>
                            <td>6:00-22:00</td>
                        </tr>
                        <tr>
                            <td>Szerda</td>
                            <td>6:00-22:00</td>
                        </tr>
                        <tr>
                            <td>Csütörtök</td>
                            <td>6:00-22:00</td>
                        </tr>
                        <tr>
                            <td>Péntek</td>
                            <td>6:00-22:00</td>
                        </tr>
                        <tr>
                            <td>Szombat:</td>
                            <td>6:00-22:00</td>
                        </tr>
                        <tr>
                            <td>Vasárnap</td>
                            <td>6:00-22:00</td>
                        </tr>
                    </table>
                </div>
        </aside>
        @endsection