//const { map } = require("lodash");
const queryParams=new URLSearchParams();
let keres="";
let rendezes="";
let superapivegponto = "api/proba";
let tomb = [];
let megjelenit = 0;
const termek = [];

let myAjax;
let rend;

$(function () {
    var mindenadat = [];
    myAjax = new MyAjax();
    rend = new AdminRend();
    let adat = "gepek";

    gombok();
    kezdes(adat);

    $("#listaz").on("change", () => {
        console.log($("#listaz").val());

        apiOsszealitas();
    });
    $("#keresSzoveg").on("keyup", () => {
        rend.keresoMezo();
        console.log(rendezes);
    });
    $("#rendezes").on("change", () => {
        rend.rendezesTabla();
    });
    $(window).on("torol", function (event) {
        const id = event.detail[tomb[0]];
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
        const seged = [];
        let eldont = false;

        switch (adat) {
            case "szemely":
                keresetTabla = "jogosultsag";
                keresetErtek = "jogosultsag_id";
                console.log("jogosultsag_id");
                eldont = true;
                break;
            case "eszkoz":
                keresetTabla = "eszkoz";
                keresetErtek = "eszkoz_neve";
                eldont = true;
                console.log("eszkoz_neve");
                break;
            case "edzesek":
                keresetTabla = "szemely";
                keresetErtek = "";
                eldont = true;
                console.log("szemely_id");
                break;
            case "gyakorlat":
                keresetTabla = "izomcsoport";
                keresetErtek = "izomcsoport_id";
                eldont = true;
                console.log("izomcsoport_id");
                break;

            default:
              keresetTabla="szemely";
              keresetErtek="nincs";
                break;
        }

        myAjax.adatbeolvas("api/" + keresetTabla, seged, () => {
            beviteliMezoGeneralas(seged, keresetErtek, eldont);
            $("#kuld").click(() => {
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
            });

            adatbeilleszt(eseny.detail, keresetErtek, eldont);
            apiOsszealitas();
        });
    });

    function kezdes(adat) {
        $(".elemek").remove();
        $("#fo").empty();
        $("#fo").append(
            '<section class="elemek row" ><div class="elem" ></div></section>'
        );
        myAjax.adatbeolvas(superapivegponto, mindenadat, rend.oldalakSzama);
        tomb = myAjax.adatBeolvasasElore("../json/alapnevek.json", tomb, adat);
        
        kicsiE(false, " ");
        rendezes = "";
        rend.rendezoMezoLetreHozas(tomb);

        rend.oldalakSzama(mindenadat);
        apiOsszealitas();
    }

    function kicsiE(ertek, adat) {
        if (ertek == true) {
            tomb = myAjax.adatBeolvasasElore(
                "../json/alapnevek.json",
                tomb,
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
            "gyakorlat",
            "terem",
            "berletTipus",
        ];
        id.forEach((element) => {
            $("#" + element + "").on("click", () => {
                adat = element;
                megjelenit=0;
                console.log(element);
                superapivegponto = "api/" + element;
                console.log({superapivegponto});
                kezdes(adat);
            });
        });
    }

    function adatbeilleszt(adatok, keresetErtek, eldont) {
        tomb.forEach((element) => {
            if (element == keresetErtek) {
                if (eldont == true) {
                    // console.log(adatok)
                    console.log(adatok[element]);
                    nev = "";
                    try {
                      let nevek = element[keresetErtek].split(" ");
                      
                      nevek.forEach((neve) => {
                          nev += neve;
                      });
                    } catch (error) {
                      nev=element[keresetErtek];
                    }
                    //$("#" + segetelem[element] + " ").text(segetelem[element]);
                    $("#" + nev + "").attr({ selected: true });

                    eldont = false;
                }
                else {
                  $("#" + element + " ").val(adatok[element]);
                  console.log(adatok[element]);
              }
            } else {
                $("#" + element + " ").val(adatok[element]);
                console.log(adatok[element]);
            }
        });
    }

    function beviteliMezoGeneralas(seged, keresetErtek, eldont) {
        $("#javitas").remove();
        $("#fo").append('<form id="javitas"></form>');

        console.log(seged);
        let txt = "";

        tomb.forEach((element) => {
            console.log(element);

            txt += '<label for="' + element + '">' + element + ":</label>";

            if (tomb[0] == element) {
                txt +=
                    '<input type="text" id="' +
                    element +
                    '" name="' +
                    element +
                    '" autofocus placeholder="' +
                    element +
                    '" disabled>';
            } else if (eldont == true) {
                eldont = false;
                txt += '<select id="eszozneve" name="' + keresetErtek + '">';
                seged.forEach((element) => {
                  nev = "";
                  try {
                    let nevek = element[keresetErtek].split(" ");
                    
                    nevek.forEach((neve) => {
                        nev += neve;
                    });
                  } catch (error) {
                    nev=element[keresetErtek];
                  }
                  
                    txt +=
                        '<option value="' +
                        element[keresetErtek] +
                        '"id="' +
                        nev +
                        '">' +
                        element[keresetErtek] +
                        "</option>";
                });
                txt += "</select>";
            } else {
                txt +=
                    '<input type="text" id="' +
                    element +
                    '" name="' +
                    element +
                    '" autofocus placeholder="' +
                    element +
                    '" required>';
            }
        });

        $("#javitas").append(txt);
        $("#javitas").append(`<button type="button" id="kuld" >küld</button`);
    }
});

function apiOsszealitas() {
    vegApi = superapivegponto +"?"+queryParams.toString();
    console.log(vegApi);
    myAjax.adatbeolvas(vegApi, termek, termekLista, tomb);
}

function termekLista(termekek, tomb) {
    Alap(tomb);
    rend.oldalakSzama(termekek);
    const szuloElem = $(".elemek");
    const sablonElem = $(".elem");
    //  myAjax.getjson("alapnevek.json", tomb);

    szuloElem.empty();
    termekek.forEach(function (elem, index) {
        if (
            (megjelenit <= index) &
            (megjelenit + parseInt($("#listaz").val()) > index)
        ) {
            let node = sablonElem.clone().appendTo(szuloElem);
            const obj = new Kartya(node, elem, tomb);
        }
    });
    sablonElem.hide(); //sablonelem eltávolítása
}

function Alap(tomb) {
    $(".elemek").empty();
    $(".elemek").append('<div class="elem  id"leftmenuinnerinner" ></div>');
    let txt = "";
    let index = 0;

    tomb.forEach((element) => {
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
