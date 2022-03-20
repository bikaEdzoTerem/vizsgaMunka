//const { map } = require("lodash");
const queryParams=new URLSearchParams();
let keres="";
let rendezes="";
let superapivegponto = "api/proba";
let Oszlopnev = [];

const termek = [];

let myAjax;
let rend;
let adatMeg;
$(function () {
     adatMeg=new AdatokMegjelenitese();
    var mindenadat = [];
    myAjax = new MyAjax();
    rend = new AdminRend();
    let adat = "gepek";

    gombok();
    kezdes(adat);
    $("#ujFelvetel").on("click", () => {
        adatMeg.apiOsszealitas(termek,Oszlopnev);
        
        vizsgal(adat,()=>{
            
            $("#kuld").click(() => {
                
            const inputs = {};
            for (element of $("#javitas select,#javitas input")) {
                const name = $(element).attr("name");
                const value = $(element).val();
                inputs[name] = value;
            }
            console.log($("#javitas input"));
            myAjax. adatkuldes("api/" + adat,
            inputs);
            
            
            adatMeg.apiOsszealitas(termek,Oszlopnev);
            
        });

        
        adatMeg.apiOsszealitas(termek,Oszlopnev);});
    });
    $("#listaz").on("change", () => {
        console.log($("#listaz").val());

        adatMeg.apiOsszealitas(termek,Oszlopnev);
    });
    $("#keresSzoveg").on("keyup", () => {
        rend.keresoMezo();
        console.log(rendezes);
    });
    $("#rendezes").on("change", () => {
        rend.rendezesTabla();
    });
    $(window).on("torol", function (event) {
        const id = event.detail[Oszlopnev[0]];
        myAjax.adattorles(`api/${adat}`, id);
    });
    $(window).on("modosit", function (eseny) {
        $(".elemek").remove();
        $("main").append(
            '<section class="elemek row clicked" style="border:1px solid black;width:400px;height:550px;overflow:auto" ><div class="elem" >'
        );

        $("main").css(
            "grid-template-areas",
            '"he he he he he he""as ar ar ar ar el"'
        );
        kicsiE(true, adat);
        
        vizsgal(adat,(keresetErtek,eldont)=>{ $("#kuld").click(() => {
                
            const inputs = {};
            for (element of $("#javitas select,#javitas input")) {
                const name = $(element).attr("name");
                const value = $(element).val();
                inputs[name] = value;
            }
            console.log($("#javitas input"));
            myAjax.adatmodosit(
                "api/" + adat,
                inputs,
                $("#javitas input").val()
            );
            adatMeg.adatbeilleszt(eseny.detail, keresetErtek, eldont ,Oszlopnev);
            adatMeg.apiOsszealitas(termek,Oszlopnev);
        });

        adatMeg.adatbeilleszt(eseny.detail, keresetErtek, eldont ,Oszlopnev);
        adatMeg.apiOsszealitas(termek,Oszlopnev);
    });

       
           
    });

    function kezdes(adat) {
        $(".elemek").remove();
        $("#fo").empty();
        $("#fo").append(
            '<section class="elemek row" ><div class="elem" ></div></section>'
        );
        myAjax.adatbeolvas(superapivegponto, mindenadat, rend.oldalakSzama);
        Oszlopnev = myAjax.adatBeolvasasElore("../json/alapnevek.json", Oszlopnev, adat);
        kicsiE(false, " ");
        
        rend.rendezoMezoLetreHozas(Oszlopnev);

        
        adatMeg.apiOsszealitas(termek,Oszlopnev);
    }

    function kicsiE(ertek, adat) {
        if (ertek == true) {
            Oszlopnev = myAjax.adatBeolvasasElore(
                "../json/alapnevek.json",
                Oszlopnev,
                adat + "Kicsik"
            );
        }
    }
    function gombok() {
        let id = [
            "szemely",
            "eszkoz",
            "gepek",
            "munkaido",
            "edzesek",
            "szekreny",
            "oltozofoglalas",
            "jogosultsag",
            "gyakorlat",
            "terem",
            "berletTipus"
            
        ];
        id.forEach((element) => {
            $("#" + element + "").on("click", () => {
                adat = element;
                megjelenit=0;
                queryParams.delete("_sort");
                queryParams.delete("_order");
                queryParams.delete("q");
                $("#keresSzoveg").val("");
                console.log(element);
                superapivegponto = "api/" + element;
                console.log({superapivegponto});
                kezdes(adat);
            });
        });
    }

    

    




});
function vizsgal(adat,myCallback=false){
    let keresetErtek,eldont=false;
        let seged=[];
    let nemModosithato=0;
console.log(adat);
    switch (adat) {
        case "szemely":
            keresetTabla = "jogosultsag";
            keresetErtek = "jogosultsag_id";
            console.log("jogosultsag_id");
            eldont = true;
            nemModosithato=0;
            break;
        case "eszkoz":
            keresetTabla = "eszkoz";
            keresetErtek = "eszkoz_neve";
            eldont = true;
            console.log("eszkoz_neve");
            nemModosithato=0;
            break;
        case "edzesek":
            keresetTabla = "szemely/ugyfelek";
            keresetErtek = "szemely_id";
            eldont = true;
            console.log("szemely_id");
            nemModosithato=0;
            break;
        case "gyakorlat":
            keresetTabla = "izomcsoport";
            keresetErtek = "izomcsoport_id";
            eldont = true;
            console.log("izomcsoport_id");
            nemModosithato=0;
            break;
        case "munkaido":
            keresetTabla="szemely";
            keresetErtek = "szemely_id";
            eldont=true;
            nemModosithato=9;

        default:
          
         
            break;
    }
try {
    myAjax.adatbeolvas("api/" + keresetTabla, seged, (tomb) => {
        adatMeg.beviteliMezoGeneralas(tomb, keresetErtek, eldont,Oszlopnev,nemModosithato);
        
        myCallback(keresetErtek,eldont);
        });
} catch (error) {
    adatMeg.beviteliMezoGeneralas(seged, keresetErtek, eldont,Oszlopnev,nemModosithato);
    myCallback(keresetErtek,eldont);
}
    
   
    
};

function Alap(nev) {
    $(".elemek").empty();
    $(".elemek").append('<div class="elem  id"leftmenuinnerinner" ></div>');
    let txt = "";
    let index = 0;

    nev.forEach((element) => {
        if (index == 0) {
            txt += "  <h6 >" + element + ":</h6>";
            txt += "<h5 class=" + element + ">Lorem ipsum dolor</h5>";
        } else {
            txt += "  <h6 >" + element + ":</h6>";
            txt += "  <p class=" + element + "></p>";
        }
        index++;
    });
    txt +=
        '<button class="torol">torol</button> <button class="modosit">modosit</button>';
    $(".elem").append(txt);
}
