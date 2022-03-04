let rendezes;
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
let adat="gepek";
 

  
 
  gombok();
kezdes(adat);
  
/*$("#emberek").on("click",()=>{
  adat="emberek"
superapivegponto= "api/szemely";
kezdes(adat);
})
$("#gepek").on("click",()=>{
  adat="gepek"
superapivegponto= "api/gepek";
kezdes(adat);
})
$("#munkaido").on("click",()=>{
  adat="munkaido"
superapivegponto= "api/munkaido";
kezdes(adat);
})
$("#edzések").on("click",()=>{
  adat="edzések"
superapivegponto= "api/edzések";
kezdes(adat);
})
$("#szekrenyek").on("click",()=>{
  adat="szekrenyek"
superapivegponto= "api/szekrenyek";
kezdes(adat);
})
$("#gyakorlatok").on("click",()=>{
  adat="gyakorlatok"
superapivegponto= "api/gyakorlatok";
kezdes(adat);
})
$("#termek").on("click",()=>{
  adat="termek"
superapivegponto= "api/termek";
kezdes(adat);
})
$("#berletek").on("click",()=>{
  adat="berletek"
superapivegponto= "api/berletek";
kezdes(adat);
})*/
  
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
  $(window).on("modosit", function (eseny) {
    $(".elemek").remove();
    $("main").append(
      '<section class="elemek row" style="border:1px solid black;width:400px;height:550px;overflow:auto" ><div class="elem" >'
    );
    $("main").css(
      "grid-template-areas",
      '"he he he he he he""as ar ar ar ar el"'
    );
    kicsiE(true,adat);
    seged = beviteliMezoGeneralas();
    console.log(eseny.detail);
    adatbeilleszt(eseny.detail, seged);
    apiOsszealitas();
  });
  function kezdes(adat){
    $(".elemek").remove();
    $("#fo").empty();
    $("#fo").append('<section class="elemek row" ><div class="elem" ></div></section>')
    myAjax.adatbeolvas(superapivegponto, mindenadat, rend.oldalakSzama);
    tomb = myAjax.adatBeolvasasElore("../json/alapnevek.json", tomb, adat);
  kicsiE(false," ")
    rendezes = "";
    rend.rendezoMezoLetreHozas(tomb);
    
    rend.oldalakSzama(mindenadat);
    apiOsszealitas();
  }
  function kicsiE(ertek,adat){
    if(ertek==true){tomb = myAjax.adatBeolvasasElore(
    "../json/alapnevek.json",
    tomb,
    adat+"Kicsik"
  );}}
  function gombok(){

    let id=["szemely","eszkoz","munkaido","edzések","szekrenyek","gyakorlatok","termek","berletek"]
    id.forEach(element => {
      $("#"+element+"").on("click",()=>{
        adat=element
      superapivegponto= "api/"+element;
      kezdes(adat);
      })
    });
    
  }
  function adatbeilleszt(adatok, seged) {
    tomb.forEach((element) => {
      if (element == "eszkoz_neve") {
        console.log(adatok)
       
          
          
        seged=adatok[element].split(" ");
        nev="";
        seged.forEach(neve => {
          nev+=neve;
        });
            //$("#" + segetelem[element] + " ").text(segetelem[element]);
            $('#' + nev+  '').attr({'selected':true});
            console.log(adatok[element])
          
         
        ;
        
       
      } else {
        $("#" + element + " ").val(adatok[element]);
        console.log(adatok[element]);
      }
    });
  }

  function beviteliMezoGeneralas() {
    $("#javitas").remove();
    $("#fo").append('<form id="javitas"></form>');
    let seged = [];
    seged = myAjax.adatBeolvasasElore(
      "../json/eszkoz_tipuses.json",
      seged,
      "eszkoztipus"
    );
    let txt = "";
    tomb.forEach((element) => {
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
      } else if (element === "eszkoz_neve") {
       

        txt += '<select id="eszozneve">';
        seged.forEach((element) => {
          seged=element.eszkoz_neve.split(" ");
          nev="";
          seged.forEach(neve => {
            nev+=neve;
          });
          txt +=
            '<option value="' +
            element.eszkoz_neve +
            '"id="'+nev +
            '">' +
            element.eszkoz_neve +
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
    $("#javitas").append('<input type="button" id="kuld" value="kld">');
    return seged;
  }
 
});

function apiOsszealitas() {
  
  vegApi = superapivegponto + rendezes ;
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
  termekek.forEach(function (elem,index) {
    if(megjelenit<=index &megjelenit+parseInt($("#listaz").val())>index){
      console.log(megjelenit+parseInt($("#listaz").val())+"  "+index);
    
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
      txt += "  <h6 >" + element + ":</h4>";
      txt += "<h5 class=" + element + ">Lorem ipsum dolor</h3>";
    } else {
      txt += "  <h6 >" + element + ":</h4>";
      txt += "  <p class=" + element + "></p>";
    }
    index++;
  });
  txt +=
    '<button class="torol">torol</button> <button class="modosit">modosit</button>';
  $(".elem").append(txt);
}
