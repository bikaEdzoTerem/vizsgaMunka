$(function () {
  console.log("hi");
  const szekrenyTomb = [];
  const objektumTomb =[];
  const segitestxt="";
  //console.log(szekrenyTomb);
  
 
  const myAjax = new MyAjax();
  let apiVegpont = "http://localhost:3000/szekrenies";
  myAjax.adatbeolvas(apiVegpont, szekrenyTomb, letrehoz);

    function letrehoz(tomb){
        //elmentjük egy tömbbe a szekrény objektumokat
        for (let index = 0; index < tomb.length; index++) {
            objektumTomb.push(new Szekreny(tomb[index]));
    }
        kiir(objektumTomb);
}
  function kiir(tomb) {
      //kiiratjuk a szekrenyobjektumokat egy táblázatba
    //console.log(tomb[3].adat);
    let segedSzoveg='<table><tr><th>Szekrény szám</th><th>Neme</th><th>Foglalt-e</th><th>Foglalás</th></tr>';
    for (let index = 0; index < tomb.length; index++) {
      segedSzoveg+=tomb[index].txt;
      //console.log(tomb[index]);
    }
    //console.log(tomb[0].adat.urese);
    //console.log(tomb[0].txt);
    segedSzoveg+='</table>';
    //console.log(segedSzoveg);
    $(".szekreny").html(segedSzoveg);
    
    $(".feloldasGomb").on("click", (event) => {
        //ha valamelyik feloldásgombra kattintunk akkor az urese értékét true ra állítjuk
        let id = $(event.target).attr("data-id");
        //console.log(tomb[id-1].adat);
        tomb[id-1].adat.urese=true;
        //console.log("katt");
        tomb[id-1].adatAtiras(tomb[id-1].adat);
        //console.log(tomb[id-1].adat);
        //myAjax.adatmodosit(apiVegpont,tomb,tomb.txt);
        kiir(tomb);
        console.log(tomb);
    });
        
  }
});
