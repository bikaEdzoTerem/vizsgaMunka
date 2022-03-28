@extends('layouts.admin') 

@section('javascript')
<script src="https://unpkg.com/echarts@^4.9.0/dist/echarts.min.js"></script>

<script src="https://unpkg.com/@chartisan/echarts@^2.2.3/dist/chartisan_echarts.js"></script>
@endsection
@section('css')
    <link rel="stylesheet" href="../css/chart.css">
    <link rel="stylesheet" href="../css/admin.css">
@endsection
@section('content')
<aside> 
    @include('includes.adminNavigation')

</aside>
<article>

    <div id="chart" ></div>
    <div id="chart2" ></div>
    <div id="chart3" ></div>
    <div id="chart4" ></div>
    <div id="chart5" ></div>
    <div id="chart6" ></div>
    <select id="napok"></select>
    <script> const urls={
        diagram:"@chart('diagram_chart') ",
        eszkozok:"@chart('eszkozok_chart') ",
        berleteladasok:"@chart('berleteladasok_chart') ",
        arvaltozasok:"@chart('arvaltozasok_chart') ",
        edzotevekenyseg:"@chart('edzotevekenyseg_chart') ",
        napiletszam:"@chart('napiletszam_chart')"
    } </script>
</article>
<script src="/js/admin/chart.js"></script>
@endsection