@extends('layouts.vasarlasapp')
@section('content')


@include('includes.kozosnav')
<article id="valasztek">
    <div>
        <div class="berlet">
            <img src="../kepek/berlet2.jpg" alt="avatar" class="image" style="width: 400px; height: 400px;">
            <div class="rahuzas">
                <div class="szoveg"><a href="/berletVasarlas">Bérlet</a></div>
            </div>
        </div>
    </div>
    <div></div>
    <div>
        <div class="termek">
            <div class="berlet">
                <img src="../kepek/termek.jpg" alt="avatar" class="image" style="width: 400px; height: 400px;">
                <div class="rahuzas">
                    <div class="szoveg"><a href="#">Termék</a></div>
                </div>
            </div>
        </div>
    </div>
</article>
@endsection