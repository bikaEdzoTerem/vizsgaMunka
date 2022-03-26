@extends('layouts.gepekapp')
@section('content')

@include('includes.kozosnav')
<article id="allomany">
    <div class="klonja">
        <h3 class="cim">Cím</h3>
        <img class="kep" src="" alt="kep">
        <p class="leiras">Leírás</p>
    </div>
</article>
<aside id="k_mezo">
    <form>
        <label for="k_mezo">Keresés: </label>
        <input type="text" name="k_mezo" id="k_mezo" class="k_mezo" placeholder="Keresés:">
    </form>
</aside>

@endsection