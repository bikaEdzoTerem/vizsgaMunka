@extends('layouts.admin')
@section('javascript')
<script src="../js/admin/admin.js"></script>
<script src="../js/admin/sablon.js"></script>
<script src="../js/admin/megjelenites.js"></script>
<script src="../js/rendezeés.js"></script>

@endsection
@section('content')
<main>
    <header>
        <a href="/">Főoldal</a>
    </header>
    <aside> 
        @include('includes.adminNavigation')
    
    </aside>
    
    @include('includes.rendezés')
    
    <article>
       
        <button id="ujFelvetel">új</button>
        
        <section id="fo">
            
</section>
<nav id="navig">

</nav>
@endsection
