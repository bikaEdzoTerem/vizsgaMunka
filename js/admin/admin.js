let rendezes;
let superapivegponto="http://localhost:3000/adat";
let tomb = []
let megjelenit = 0;
const termek = [];
let mutat;
let myAjax ;
let rend ;

$(function () {
  var mindenadat=[];
  myAjax = new MyAjax();
   rend = new AdminRend();
  
   myAjax.adatbeolvas(superapivegponto, mindenadat, rend.oldalakSzama);
  let apivegpont = "http://localhost:3000/adat";
   mutat =
    "?_start=" + megjelenit/*+ ($("#listaz").val()*(aktualisgomberteke-1))*/+ "&_limit=" + megjelenit + $("#listaz").val()
    /*+($("#listaz").val()*(aktualisgomberteke-1))*/;
  let adat = "gepek";

  const xhttp = new XMLHttpRequest();
  xhttp.onload = function () {
    tomb = JSON.parse(this.responseText)[adat];
  };
  xhttp.open("GET", "../json/alapnevek.json", false);
  xhttp.send();
  rendezes = "";
  rend.rendezoMezoLetreHozas(tomb);
  //rend.keresoMezo(tomb,myAjax);
  console.log($("#listaz").val());
  apiOsszealitas();
  
  $("#listaz").on("change", () => {
    console.log($("#listaz").val());
    mutat = "?_start=" + megjelenit + "&_end=" + (megjelenit + $("#listaz").val());
    rend.oldalakSzama(mindenadat);
    apiOsszealitas();
  });
  $("#keresSzoveg").on("keyup", () => {
    rendezes = "?q=" + $("#keresSzoveg").val();
    
    apiOsszealitas();
  });
  $("#rendezes").on("change", () => {
    rend.rendezesTabla();
  }); $(window).on("modosit", function(eseny) {
    console.log(eseny)
    beviteliMezoGeneralas(eseny.detail[tomb[0]]);
    
  });

  function beviteliMezoGeneralas(id){
    
    $(".elem").eq(id).after('<form id="javitas"></form>');
   // $('<form id="javitas"></form>').insertafter(".elemek");
  //  var p = document.createElement('form');
   // var i=dokument.getElementsById("javitas")
//var i = document.getElementsByClassName("elem")[4];
//i.parentNode.insertBefore(p, i.nextSibling);
    let txt="";
    tomb.forEach(element => {
      txt+='<label for="'+element+'">'+element+':</label>';
      if (tomb[0]==element){
        txt+='<input type="text" id="'+element+'" name="'+element+'" autofocus placeholder="'+element+'" disabled><br>'
      }else{
      txt+='<input type="text" id="'+element+'" name="'+element+'" autofocus placeholder="'+element+'" required><br>'
    }});
    $("#javitas").append(txt);
   
  }
 
});

function apiOsszealitas() {
  
vegApi=superapivegponto + rendezes + mutat;
;
myAjax.adatbeolvas(vegApi, termek, termekLista, tomb);}

function termekLista(termekek, tomb) {
  Alap(tomb);

  const szuloElem = $(".elemek");
  const sablonElem = $(".elem");
  //  myAjax.getjson("alapnevek.json", tomb);

  szuloElem.empty();
  termekek.forEach(function (elem,id) {
    let node = sablonElem.clone().appendTo(szuloElem);
    const obj = new Kartya(node, elem, tomb,id);
  });
  sablonElem.hide(); //sablonelem eltávolítása

  
}
function Alap(tomb) {
  $(".elemek").empty();
  $(".elemek").append('<div class="elem"></div>');
  let txt = "";
  let index = 0;
  tomb.forEach((element) => {
    if (index == 0) {
      txt += "<h3 class=" + element + ">Lorem ipsum dolor</h3>";
    } else if (element === "kep") {
      txt += '<img id="' + element + '" src="" alt="" class="kep" />';
    } else {
      txt += "  <h4 >" + element + ":</h4>";
      txt += "  <p class=" + element + "></p>";
    }
    index++;
  });
  txt +=
    '<button class="torol">torol</button> <button class="modosit">modosit</button>';
  $(".elem").append(txt);
}
