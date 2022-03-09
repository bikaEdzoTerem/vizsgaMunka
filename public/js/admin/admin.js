//const { map } = require("lodash");

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
  $(window).on("torol",function(event){
 const id= event.detail[tomb[0]];
myAjax.adattorles(`api/${adat}`,id)

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
    kicsiE(true,adat);
    const seged=[];
    tomb.forEach((element) => {
      console.log(element)
            switch (element) {
              case "jogosultsag_id":
              keresetTabla="jogosultsag";
                keresetErtek="jogosultsag_id";
                console.log("jogosultsag_id");
                eldont=true;
                break;
                case "eszkoz_neve":
                  keresetTabla="eszkoz";
                  keresetErtek="eszkoz_neve";
                  eldont=true;
                  console.log("eszkoz_neve");
                break;
                case "ugyfel":
                  keresetTabla="szemely";
                  keresetErtek="szemely_id";
                  eldont=true;
                  console.log("szemely_id");
                break;
                case "izomcsoport_id":
                  keresetTabla="izomcsoport"
                  keresetErtek="izomcsoport_id";
                  eldont=true;
                  console.log("izomcsoport_id");
                break;
            
              default:
                break;
            };
          });

            myAjax.adatbeolvas("api/"+keresetTabla,seged,(tomb)=>{ 
              beviteliMezoGeneralas(seged);
              $("#kuld").click(()=>{
                const inputs={};
              for (element of $("#javitas select,#javitas input")){
                const name=$(element).attr("name");
                const value=$(element).val();
                inputs[name]=value;
              }
              console.log($("#javitas input"));
                myAjax.adatmodosit("api/"+adat,inputs,$("#javitas input").val());
              });
              
              adatbeilleszt(eseny.detail, seged);
              apiOsszealitas();});
           
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

    let id=["szemely","eszkoz","gepek","munkaido","edzesek","szekrenyek","gyakorlat","termek","berletVasarlas"]
    id.forEach(element => {

      $("#"+element+"").on("click",()=>{
        adat=element
        console.log(element);
      superapivegponto= "api/"+element;
      kezdes(adat);
      })
    });
    
  }


  function adatbeilleszt(adatok, seged) {
    tomb.forEach((element) => {
      if (element == "eszkoz_neve") {
       // console.log(adatok)
         seged=adatok[element].split(" ");
        nev="";
        seged.forEach(neve => {
          nev+=neve;
        });
            //$("#" + segetelem[element] + " ").text(segetelem[element]);
            $('#' + nev+  '').attr({'selected':true});
            console.log(adatok[element]);     
      } else {
        $("#" + element + " ").val(adatok[element]);
        console.log(adatok[element]);
      }
    });
  }





  function beviteliMezoGeneralas(seged) {
    $("#javitas").remove();
    $("#fo").append('<form id="javitas"></form>');
    
   
    console.log(seged);
    let txt = "";
   
    tomb.forEach((element) => {
console.log(element)
      
     
        
     
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
        }
       else if (element === "eszkoz_neve") {
       

        txt += '<select id="eszozneve" name="eszkoz_neve">';
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
    $("#javitas").append(`<button type="button" id="kuld" >küld</button`);
    
   
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
      txt += "  <h4 >" + element + ":</h4>";
      txt += "<h3 class=" + element + ">Lorem ipsum dolor</h3>";
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