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
        $(".elemek").remove();
        $("main").append(
            '<section class="elemek row clicked" style="border:1px solid black;width:400px;height:550px;overflow:auto" ><div class="elem" >'
        );

        $("main").css(
            "grid-template-areas",
            '"he he he he he he""as ar ar ar ar el"'
        );
       
        adatMeg.apiOsszealitas(termek,Oszlopnev);
        kicsiE(true, adat);
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
            
            $("#fo").empty();
            $(".elemek").remove();
            $("#fo").append('<section class="elemek row"><div class="elem" ></section>');
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
        const hasPrimarykey=["edzesek","gyakorlat","munkaido","arvaltozas","berletek"].includes(adat)
        console.log(event.detail)
         hasPrimarykey 
         ? myAjax.adatkuldes(`api/${adat}/delete`,event.detail)
         :myAjax.adattorles(`api/${adat}`, id);
         adatMeg.apiOsszealitas(termek,Oszlopnev);
        
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
        vizsgal(adat,(keresetErtek,eldont,keresetErtek2,eldont2)=>{
            adatMeg.adatbeilleszt(eseny.detail,Oszlopnev);
            adatMeg.apiOsszealitas(termek,Oszlopnev);
      
            const originalInputs=getinpits();

             $("#kuld").click(() => {
                const newInputs=getinpits();
           
            console.log($("#javitas input"));
            myAjax.adatmodosit(
                "api/" + adat,
                ["edzesek","gyakorlat","munkaido","arvaltozas","berletek"].includes(adat) ? { originalInputs, newInputs } : newInputs,
                $("#javitas input").val()
            );
            $("#fo").empty();
            $(".elemek").remove();
            $("#fo").append('<section class="elemek row"><div class="elem" ></section>');
            adatMeg.apiOsszealitas(termek,Oszlopnev);
        });

       
    });

       
           
    });
    function getinpits(){
        const inputs = {};
         for (element of $("#javitas select,#javitas input")) {
        const name = $(element).attr("name");
        const value = $(element).val();
        inputs[name] = value;

    }
        return inputs
    }
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
            "berletek",
            "arvaltozas",
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
    let keresetErtek="",keresetErtek2="",eldont=false,eldont2=false;
        let seged=[];
    let nemModosithato=0;
console.log(adat);
    switch (adat) {
        case "szemely":
            keresetTabla = "jogosultsag";
            keresetErtek = "megnevezes";
            console.log("jogosultsag_id");
            eldont = true;
            nemModosithato=0;
            break;
        case "eszkoz":
            keresetTabla = "eszkoz";
            keresetErtek = "eszkoz_neve";
            keresetTabla2="terem"
            keresetErtek2="terem_id"
            eldont = true;
            eldont2=true;
            console.log("eszkoz_neve");
            nemModosithato=0;
            break;
        case "edzesek":
            keresetTabla = "szemely/edzok";
            keresetTabla2 = "szemely/ugyfelek";
            keresetErtek = "szemely_id";
            keresetErtek2 = "szemely_id";
            eldont = true;
            eldont2 = true;

            console.log("szemely_id");
            nemModosithato=10;
            break;
        case "gyakorlat":
            keresetTabla = "gepek";
            keresetTabla2 = "izomcsoport";
            keresetErtek = "eszkoz_tipus_szamlalo";
            keresetErtek2 = "izomcsoport_id";
            eldont = true;
            eldont2 = true;
            console.log("izomcsoport_id");
            nemModosithato=9;
            break;
        case "munkaido":
            keresetTabla="szemely/dolgozok";
            keresetErtek = "szemely_id";
            eldont=true;
            nemModosithato=9;
            break
        case "oltozofoglalas":
            keresetTabla = "szekreny";
            keresetTabla2 = "szemely/ugyfelek";
            keresetErtek = "szekreny_id";
            keresetErtek2 = "szemely_id";
            eldont = true;
            eldont2 = true;
            console.log("izomcsoport_id");
            nemModosithato=0;

        break
        case "arvaltozas":
            keresetTabla="berletTipus";
            keresetErtek="berlet_tipus_id";
            eldont =true;
            nemModosithato=9
            break;
            case "berletek":
                keresetTabla = "berletTipus";
            keresetTabla2 = "szemely/ugyfelek";
            keresetErtek = "berlet_tipus_id";
            keresetErtek2 = "szemely_id";
            eldont = true;
            eldont2 = true;
            console.log("izomcsoport_id");
            nemModosithato=3;
                break
        default:
          
         
            break;
    }
try {
    myAjax.adatbeolvas("api/" + keresetTabla, seged, (tomb) => {
        console.log(tomb);
        try {
            console.log("try 1")
            myAjax.adatbeolvas("api/" + keresetTabla2, seged, (tomb2) => {
                console.log(tomb2)
                adatMeg.beviteliMezoGeneralas(tomb, keresetErtek, eldont,Oszlopnev,nemModosithato,tomb2,keresetErtek2,eldont2);
        
        myCallback(keresetErtek,eldont,keresetErtek2,eldont2);
        });} catch (error) {
            adatMeg.beviteliMezoGeneralas(tomb, keresetErtek, eldont,Oszlopnev,nemModosithato);
        
        myCallback();
        }
        
        });
} catch (error) {
    adatMeg.beviteliMezoGeneralas(seged, keresetErtek, eldont,Oszlopnev,nemModosithato);
    myCallback();
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
