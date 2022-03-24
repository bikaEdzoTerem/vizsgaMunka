$(function(){
    
    const myAjax = new MyAjax();
    const eszkozokTomb = [];
    let alapApiVegpont = "/api/gepek";
    /*let szamApiVegpont = "/api/gepek/";
    let szoApiVegpont = "/api/gepek/search?eszkoz_neve=";*/

    myAjax.adatbeolvasEredeti(alapApiVegpont, eszkozokTomb, adatokMegjelenitese);

    /*$(".k_mezo").on("keyup", ()=>{
        if(typeof ($(".k_mezo").val()) === Number){  //ez nem űködik
            let keresId = $(".k_mezo").val();
            myAjax.adatbeolvas(szamApiVegpont + keresId, eszkozokTomb, adatokMegjelenitese);
            console.log(szamApiVegpont);
        }else{
            let keresId = $(".k_mezo").val();
            myAjax.adatbeolvas(szoApiVegpont + keresId, eszkozokTomb, adatokMegjelenitese);
        }
    });*/

    /*$(".k_mezo").on("keyup", ()=>{
        let keresId = $(".k_mezo").val();
        myAjax.adatbeolvas(szamApiVegpont + keresId, eszkozokTomb, adatokMegjelenitese);
    });

    $(".k_mezo").on("keyup", ()=>{
        let keresId = $(".k_mezo").val();
        myAjax.adatbeolvas(szoApiVegpont + keresId, eszkozokTomb, adatokMegjelenitese);
    });*/
    
    function adatokMegjelenitese() {
        const szuloElem = $("#allomany");
        const sablon = $(".klonja");
        szuloElem.empty();
        sablon.show();
        eszkozokTomb.forEach(function(elem, index) {
            const gep = sablon.clone().appendTo(szuloElem);
            const beolvasottGep = new Gep(gep, elem, index); 
        });
        sablon.hide();
    };

});

