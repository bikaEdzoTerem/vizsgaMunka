@extends('layouts.admin') 

@section('javascript')
<script src="https://unpkg.com/echarts@^4.9.0/dist/echarts.min.js"></script>

<script src="https://unpkg.com/@chartisan/echarts@^2.2.3/dist/chartisan_echarts.js"></script>
@endsection
@section('css')
    <link rel="stylesheet" href="../css/chart.css">
@endsection
@section('content')
    <div id="chart" ></div>
    <div id="chart2" ></div>
    <div id="chart3" ></div>
    <div id="chart4" ></div>
<script>
    const chart=new Chartisan({
        el:'#chart',
        url:"@chart('diagram_chart') ",
        hooks:new ChartisanHooks()
        .datasets([
            {type:"line"}
        ])
        .custom(({data,merge})=>{
        const dataZoom=[{
            type:"slider",
            start:1,
            end:2
        },
        {
            type:"inside",
            start:1,
            end:2
        }
        ];
        return merge(data,{dataZoom});
        })
        
    });
    const chart2=new Chartisan({
        el:'#chart2',
        url:"@chart('eszkozok_chart') ",
        hooks:new ChartisanHooks()
        .datasets([
            {type:"line"}
        ])
        .custom(({data,merge})=>{
        const dataZoom=[{
            type:"slider",
            start:1,
            end:2
        },
        {
            type:"inside",
            start:1,
            end:2
        }
        ];
        return merge(data,{dataZoom});
        })
        
    });
    const chart3=new Chartisan({
        el:'#chart3',
        url:"@chart('berleteladasok_chart') ",
        hooks:new ChartisanHooks()
        .datasets([
            {type:"line"}
        ])
        .custom(({data,merge})=>{
        const dataZoom=[{
            type:"slider",
            start:1,
            end:2
        },
        {
            type:"inside",
            start:1,
            end:2
        }
        ];
        return merge(data,{dataZoom});
        })
        
    });
    const chart4=new Chartisan({
        el:'#chart4',
        url:"@chart('arvaltozasok_chart') ",
        hooks:new ChartisanHooks()
        .datasets([
            {type:"line"}
        ])
        .custom(({data,merge})=>{
        const dataZoom=[{
            type:"slider",
            start:1,
            end:2
        },
        {
            type:"inside",
            start:1,
            end:2
        }
        ];
        return merge(data,{dataZoom});
        })
        
    });
</script>
@endsection