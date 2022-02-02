$(function(){
    
    const myAjax = new MyAjax();
    const eszkozokTomb = [];
    let apiVegpont = "";

    myAjax.adatbeolvas(apiVegpont, eszkozokTomb, adatokMegjelenitese);

    function adatokMegjelenitese() {
        const szuloElem = $("#allomany");
        const sablon = $(".sablon");
        szuloElem.empty();
        sablon.show();
        eszkozokTomb.forEach(function(elem, index) {
            const gep = sablon.clone().appendTo(szuloElem);
            const beolvasottGep = new Gep(gep, elem, index); 
        });
        sablon.hide();
    };

});

