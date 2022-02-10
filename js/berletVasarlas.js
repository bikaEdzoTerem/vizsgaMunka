$(function () {

    const myajax = new MyAjax();
    const berletek = [];
    let apiVegpont = "http://localhost:3000/berletek";

    myajax.adatbeolvas(apiVegpont, berletek, berletekMegjelenitese);

    function berletekMegjelenitese(){
        const szuloElem = $("#taroloSzulo");
        const sablon = $(".taroloGyerek");
        szuloElem.empty();
        sablon.show();
        berletek.forEach(function(elem, index) {
            const berlet = sablon.clone().appendTo(szuloElem);
            const beolvasottGep = new Berlet(berlet, elem, index); 
        });
        sablon.hide();
    }

});