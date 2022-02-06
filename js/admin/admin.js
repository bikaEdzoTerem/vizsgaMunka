$(function () {
  const myAjax = new MyAjax();
const rend=new AdminRend();
  const termek = [];
  let tomb = [];
  let megjelenit=1;
  let apivegpont = "http://localhost:3000/adat";
 // let mutat="?_start="+megjelenit+"&_end="+megjelenit+$("#listaz").val;
let adat="gepek";

  const xhttp = new XMLHttpRequest();
  xhttp.onload = function () {
    
    tomb = JSON.parse(this.responseText)[adat];
    
  };
  xhttp.open("GET", "../json/alapnevek.json",false);
  xhttp.send();
  let rendezes = "?_sort=ar&_order=desc";
  rend.rendezoMezoLetreHozas(tomb);
  //rend.keresoMezo(tomb,myAjax);
  ;
  console.log($("#listaz").val);
  myAjax.adatbeolvas(apivegpont, termek, termekLista,tomb);
/*$().on("change", () => {

  "?_start="+megjelenit+"&_end="+megjelenit
});*/
  $("#keresSzoveg").on("keyup", () => {

    let apivegpont = "http://localhost:3000/adat";
    apivegpont += "?q=" + $("#keresSzoveg").val();
    console.log(apivegpont);

    myAjax.adatbeolvas(apivegpont, termek, termekLista,tomb);
  });
   $("#rendezes").on("change", () => {
    
     let darabolas= $("#rendezes").val();
    let vegtemek= darabolas.split("!");
        console.log(vegtemek);
          rendezes = "?_sort="+vegtemek[0]+"&_order="+vegtemek[1]+"";
          console.log("?_sort="+vegtemek[0]+"&_order="+vegtemek[1]+"");
          apivegpont = "http://localhost:3000/adat";
          apivegpont += rendezes;
          console.log(apivegpont);
          myAjax.adatbeolvas(apivegpont, termek, termekLista,tomb);
       
    });
  



});


function termekLista(termekek,tomb) {
  Alap(tomb);
 
  const szuloElem = $(".elemek");
  const sablonElem = $(".elem");
  //  myAjax.getjson("alapnevek.json", tomb);
 
  
 

  
  szuloElem.empty();
  termekek.forEach(function (elem) {
    let node = sablonElem.clone().appendTo(szuloElem);
    const obj = new Kartya(node, elem, tomb);
  });
  sablonElem.hide(); //sablonelem eltávolítása

  //$(window).on('termekKosarba', (event) => {
  //itt hívjuk meg a kosarat és belepakoljuk a kosár tömbbe az
  //aktuális termék adatait
  // kosar.setKosar(event.detail)
  //})
}
function Alap(tomb){

  $(".elemek").empty();
  $(".elemek").append('<div class="elem"></div>');
  let txt="";
  let index=0;
  tomb.forEach(element => {
    if(index==0){
      txt+="<h3 class="+element+">Lorem ipsum dolor</h3>";
    }else if (element==="kep") {
      txt+='<img id="'+element+'" src="" alt="" class="kep" />'
      
    } else {
      txt+="  <h4 >"+element+":</h4>";
      txt+="  <p class="+element+"></p>";
    }
    index++;
  });
  txt+='<button class="torol">torol</button> <button class="modosit">modosit</button>';
   $(".elem").append(txt);


}

