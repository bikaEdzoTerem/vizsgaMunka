$(function(){
    /*
    settimeout() kell
    */
    let index = 0;
    const kepTomb=["../kepek/hh1.jpg", "../kepek/hh2.jpg", "../kepek/hh3.jpg"];

    $(function(){
        $("#bal").eq(0).click(kepValtasBalra);
        $("#jobb").eq(0).click(kepValtasJobbra);
    });

    function kepValtasBalra(){
        index--;
        if(index<0){ index = kepTomb.length-1; }
        megjelenes(index);
    }

    function kepValtasJobbra(){
        index++;
        if(index>kepTomb.length-1){ index = 0; }
        megjelenes(index);
    }

    function megjelenes() { 
        $("header").css('background-image', 'url(' + kepTomb[index] + ')'); 
    }
});