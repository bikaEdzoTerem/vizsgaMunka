@extends('layouts.gepekapp')
    @section('content')
@if(Route::has('login'))
    @include('includes.bejelentkezettkeresoheader')
@else
    @include('includes.keresoheader') 
@endif
@include('includes.kepvaltas')
        @include('includes.kozosnav')
        <article id="allomany">
            <div class="klonja">
                <h3 class="cim">Cím</h3>
                <img class="kep" src="" alt="kep">
                <p class="leiras">Leírás</p>
            </div>
        </article>

        @endsection