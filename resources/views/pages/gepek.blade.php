@extends('layouts.gepekapp')
    @section('content')
    @include('includes.keresoheader')
    <header class="kepvaltas">
        <div id="demo" class="carousel slide" data-ride="carousel">

            <!-- Indicators -->
            <ul class="carousel-indicators">
              <li data-target="#demo" data-slide-to="0" class="active"></li>
              <li data-target="#demo" data-slide-to="1"></li>
              <li data-target="#demo" data-slide-to="2"></li>
            </ul>
          
            <!-- The slideshow -->
            <div class="carousel-inner">
              <div class="carousel-item active">
                <img src="../kepek/hh1.jpg" alt="Los Angeles">
              </div>
              <div class="carousel-item">
                <img src="../kepek/hh2.jpg" alt="Chicago">
              </div>
              <div class="carousel-item">
                <img src="../kepek/hh3.jpg" alt="New York">
              </div>
            </div>
          
            <!-- Left and right controls -->
            <a class="carousel-control-prev" href="#demo" data-slide="prev">
              <span class="carousel-control-prev-icon"></span>
            </a>
            <a class="carousel-control-next" href="#demo" data-slide="next">
              <span class="carousel-control-next-icon"></span>
            </a>
          </div>
        </header>
        @include('includes.gepeknav')
        <article id="allomany">
            <div class="klonja">
                <h3 class="cim">Cím</h3>
                <img class="kep" src="" alt="kep">
                <p class="leiras">Leírás</p>
            </div>
        </article>

        @endsection