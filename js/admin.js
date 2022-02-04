$(function () {
  const myAjax = new MyAjax();

  const termek = [];
  let tomb = [];
  let apivegpont = "http://localhost:3000/adat";


  const xhttp = new XMLHttpRequest();
  xhttp.onload = function () {
    
    tomb = JSON.parse(this.responseText).emberek;
    
  };
  xhttp.open("GET", "../json/alapnevek.json",false);
  xhttp.send();
  //let rendezes = "?_sort=ar&_order=desc";
  myAjax.adatbeolvas(apivegpont, termek, termekLista);

  /*$("#keresSzoveg").on("keyup", () => {

    let apivegpont = "http://localhost:3000/adat";
    apivegpont += "?q=" + $("#keresSzoveg").val();
    console.log(apivegpont);
*/
  // myAjax.getAdat(apivegpont,termek,termekekMegjelintese);
  //  });


function termekLista(termekek) {
  
 
  const szuloElem = $(".elemek");
  const sablonElem = $(".elem");
  //  myAjax.getjson("alapnevek.json", tomb);
 
  
 

  sablonElem.show();
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
});