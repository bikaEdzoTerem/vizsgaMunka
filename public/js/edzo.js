$(function () {
  var idopontokTomb=[];
  const idopontok = new Idopontok(idopontokTomb);
  const myAjax = new MyAjax();
  /* idopontok.megjelenit(idopontokTomb,jelenlegiDatum); */
  var munkaoratol=8;
  var munkaoraig=22;
  var szemelyKeres=[];
  var elorefoglalas=100;
  var eltolas=0;
  var hanyOszlopos=3;
  var apiSzemelyek="/api/szemely";
  var szamol=0;
//-----------------------------------------------------------------------------------------------------------------------
//Inputok elrejtése
  Elrejt(".datum");
  Elrejt(".orara");
  Elrejt(".ora");
  Elrejt(".lefoglal");
  function Elrejt(mit){//elrejt
    $(mit)[0].style.display = "none";
  }
  function Megjelenit(mit){//megjelenit
    $(mit)[0].style.display = "block";
  }
  //-----------------------------------------------------------------------------------------------------------------------
  function idopontLista(idopontokT,myCallback){//időpontokat belerakja a táblázatba
    if(szamol==0){
      idopontokTomb=idopontokT;
    }
    szamol++;
    idopontok.megjelenit(myCallback,eltolas,(hanyOszlopos));
    const szuloElem = $('.tablaadat');
    const sablonElem = $('footer .idopont');
    sablonElem.show();
    szuloElem.empty();
    for (let index = 0; index < hanyOszlopos; index++) {
      idopontokT.forEach(function (elem) {
        let datum1=elem.datum.slice(0,10);
        let datum2=myCallback(index+eltolas).slice(0,10);
        if(datum2===datum1){
          let node = sablonElem.clone().appendTo($('.tablaadat'+index));
          const obj = new Idopont(node, elem);
          if(new Date(elem.datum)<new Date()){//ha régebbi foglalásokat nézünk akkor ne lehessen feloldani
            obj.feloldas.hide();
          }
        }
      });
    }
    sablonElem.hide(); 
  }
//-----------------------------------------------------------------------------------------------------------------------
function jelenlegiDatum(napvaltoztat) {//függvény paramétereként megadhatjuk hogy a jelenlegi dátumhoz hány napot adjon hozzá(formátum:2022-03-10 06:14:58)
      var jelenlegiDatum = new Date();
      jelenlegiDatum.setDate(jelenlegiDatum.getDate() + napvaltoztat);
      let jelenlegiDatumSzerkesztes = "";
      jelenlegiDatumSzerkesztes = jelenlegiDatum.getFullYear().toString();
      jelenlegiDatumSzerkesztes += "-";
      
      if (jelenlegiDatum.getMonth().toString().length === 1) {
        jelenlegiDatumSzerkesztes += "0";
        jelenlegiDatumSzerkesztes += (jelenlegiDatum.getMonth()+1).toString();
      } else {
        jelenlegiDatumSzerkesztes += (jelenlegiDatum.getMonth()+1).toString();
      }
      jelenlegiDatumSzerkesztes += "-";
      if (jelenlegiDatum.getDate().toString().length === 1) {
        jelenlegiDatumSzerkesztes += "0";
        jelenlegiDatumSzerkesztes += jelenlegiDatum.getDate().toString();
      } else {
        jelenlegiDatumSzerkesztes += jelenlegiDatum.getDate().toString();
      }
      jelenlegiDatumSzerkesztes += " ";
      if (jelenlegiDatum.getHours().toString().length === 1) {
        jelenlegiDatumSzerkesztes += "0";
        jelenlegiDatumSzerkesztes += jelenlegiDatum.getHours().toString();
      } else {
        jelenlegiDatumSzerkesztes += jelenlegiDatum.getHours().toString();
      }
      jelenlegiDatumSzerkesztes += ":";
      if (jelenlegiDatum.getMinutes().toString().length === 1) {
        jelenlegiDatumSzerkesztes += "0";
        jelenlegiDatumSzerkesztes += jelenlegiDatum.getMinutes().toString();
      } else {
        jelenlegiDatumSzerkesztes += jelenlegiDatum.getMinutes().toString();
      }
      jelenlegiDatumSzerkesztes += ":";
      if (jelenlegiDatum.getSeconds().toString().length === 1) {
        jelenlegiDatumSzerkesztes += "0";
        jelenlegiDatumSzerkesztes += jelenlegiDatum.getSeconds().toString();
      } else {
        jelenlegiDatumSzerkesztes += jelenlegiDatum.getSeconds().toString();
      }
      console.log(jelenlegiDatumSzerkesztes); 
      return jelenlegiDatumSzerkesztes;
  }
//-----------------------------------------------------------------------------------------------------------------------
    
$(".JobbraNovel").on("click ", () => {//Táblázat nap növelés
  idopontok.kattintasTrigger("jobbra");
  console.log("jobbra");
  eltolas++;
  idopontLista(idopontokTomb,jelenlegiDatum);
});
$(".oszlopSzam").on("keyup", () => {
  oszlop();
});
$(".oszlopSzam").on("click", () => {
  oszlop();
});
function oszlop(){//hány oszlop legyen megjelenítve a táblázatból
  hanyOszlopos=parseInt($(".oszlopSzam").val());
  idopontLista(idopontokTomb,jelenlegiDatum);
}
$(".BalraCsokkent").on("click ", () => {//Táblázat nap csökkentés
    idopontok.kattintasTrigger("balra");
    /* idopontok.megjelenit(); */
    console.log("balra");
    eltolas--;
    idopontLista(idopontokTomb,jelenlegiDatum);
  });
  //-----------------------------------------------------------------------------------------------------------------------

  myAjax.adatbeolvas("/api/ugyfelEdzes", idopontokTomb, idopontLista,jelenlegiDatum);
  
  function datumKereses(){//beirt dátom megkeresése táblázatban
    let datumkeres=$(".datumKeres").val();
    let c= (Math.floor(new Date(datumkeres).getTime() - new Date().getTime()));
    eltolas=(Math.round(c/1000/60/60/24));
    idopontLista(idopontokTomb,jelenlegiDatum);
  }
  
  $(".datumKeres").on("input", () => {// viszek be adatot a dátum keresésnél
    datumKereses();
  });
  //-----------------------------------------------------------------------------------------------------------------------
    $(".szemelyKereso").on("keyup", () => {//ha lenyomja a szememely beirasa kozben a billentyut
      if($(".szemelyKereso").val()==""){
        console.log("nincs megadva szemely");
      }else{
      let szemelyfoglall = $(".szemelyKereso").val();
      let apiVegpont2 = apiSzemelyek;
      apiVegpont2 += "?nev=" + szemelyfoglall;
      myAjax.adatbeolvas(apiVegpont2, szemelyKeres, szemlyFunction);
    }
    });
    function szemlyFunction(tomb){
      console.log(tomb);
      if(tomb[0]===undefined ||tomb.length>1){
        console.log("nincs ilyen nev");
        talaltNev=false;
        Elrejt(".datum");
        Elrejt(".orara");
        Elrejt(".ora");
        Elrejt(".lefoglal");
      }else if(tomb.length===1){
        console.log("van ilyen név");
        console.log(tomb[0]);
        szemelyKeres=tomb;
        talaltNev=true;
        Megjelenit(".datum");
      }
    }
//-----------------------------------------------------------------------------------------------------------------------
    function oraBeallitas(){//edzéshossz
      if(!($(".ora").val()==="")){//ha megvan adva az edzéshossz 
        let oraBeallit=parseInt($(".ora").val().slice(2,4));
        if(oraBeallit<8){//időbeállítások csak 00 15 30 45 lehet a perc
          $(".ora")[0].value=$(".ora").val().slice(0,1)+":00";
        }else if(oraBeallit>7&&oraBeallit<23){
          $(".ora")[0].value=$(".ora").val().slice(0,1)+":15";
        }else if(oraBeallit>22&&oraBeallit<38){
          $(".ora")[0].value=$(".ora").val().slice(0,1)+":30";
        }else if(oraBeallit>37&&oraBeallit<53){
          $(".ora")[0].value=$(".ora").val().slice(0,1)+":45";
        }else if(oraBeallit<100){
          $(".ora")[0].value=$(".ora").val().slice(0,1)+":00";
        }
      }else{
        Elrejt(".lefoglal");
      }
    }
    $(document).on("click", () => {//rákattintás az oldalon
      oraBeallitas();
    });
//-----------------------------------------------------------------------------------------------------------------------
    //Dátum megadásánál min és max
    let jelenlegiDatumSeged=new Date().toISOString().split(".")[0].slice(0,10);
      $(".datum")[0].min=jelenlegiDatumSeged;//a jelenlegi idő a minimum, utólagos lefoglalás nem lehetséges
      let max=parseInt(jelenlegiDatumSeged.slice(0,4))+1;//jelenlegi datumnak az évét átalakítja számmá és hozzáad 1-et
      max=max.toString();//visszaalakítás string-é
      let seged=jelenlegiDatumSeged.replace(jelenlegiDatumSeged.slice(0,4),max);//a jelenlegi évet kicseréli a jelenlegi év +1 re
      $(".datum")[0].max=seged;//a jelenlegi idő +1 év a maximum
//---------------------------
    $(".datum").on("input", () => {//rákattintás a dátumra
      if(!($(".datum").val()==="")){//ha megvan adva dátum 
        let datumBeirt =new Date($(".datum").val()+" 00:00:00");//beirt datum
        let maiDatum=new Date();//jelenlegi datum
        maiDatum.setHours(00)
        maiDatum.setMinutes(00);
        maiDatum.setSeconds(00);
        console.log(maiDatum.toString()===datumBeirt.toString());
        console.log(maiDatum.toString());
        console.log(datumBeirt.toString());
        if(maiDatum.toString()===datumBeirt.toString()){//mai napot irt be
          console.log( "MAI NAP");
          oraraListaz(true);
          Megjelenit(".orara");
          let maiNapOraPerc=new Date();//jelenlegi datum
        }else if(maiDatum<datumBeirt){//jövőbeli datumot irt be
          oraraListaz(false);
          Megjelenit(".orara");
          console.log("nagyobb datum van beirva mint a jelenlegi");
        }else if(maiDatum>datumBeirt){
          /* oraraListaz(null); */
          console.log("kisebb datum van beirva mint a jelenlegi");
          console.log($(".datum").val());
         Elrejt(".orara");
         Elrejt(".ora");
         Elrejt(".lefoglal");
        }
      }else{
        Elrejt(".orara");
        Elrejt(".ora");
        Elrejt(".lefoglal");
      }
    });
    $(window).on('felold', (event) => {//ha rányomok a feloldra torli az adatot
      /* apiVegpont = "api/ugyfelEdzes"; */
      /* myAjax.adattorles(apiVegpont, event.detail.id); */
      apiVegpont = "api/ugyfelEdzes/delete";
      myAjax.adatkuldes(apiVegpont, event.detail);
      window.location.reload();
    });
//-----------------------------------------------------------------------------------------------------------------------
    function oraListaz(){//edzés hossza hozzá adja a valószínű lehettőségeket opciok nak
    const orak=["1:00","1:15","1:30","1:45","2:00","2:15","2:30","2:45","3:00"];
    const edzesekHossz=["Rövid edzés","Közepes edzés","Hosszú edzés"]
    var oravalasztasok=[];
    for (let index = 0; index < orak.length; index++) {//orak tomb vegigjarasa
      let i;
      if(index>-1&&index<3){//ha elso harom elem
        i=0;
      }else if(index>2&&index<6){// ha 4.-6.elem
        i=1;
      }else if(index>5&&index<9){//ha 7.-9.elem
        i=2;
      }
      oravalasztasok+='<option label="'+edzesekHossz[i]+'">'+orak[index]+'</option>'
    }
    $("#oraValasztasok").html(oravalasztasok);
    }
    oraListaz();
//-----------------------------------------------------------------------------------------------------------------------
    var utolsoElemhosszSeged1=0;
    $(".orara").on("keyup", () => {//ha az orara(Edzés időpont) viszunk be adatot
        let bevittErtek=$(".orara").val();//bevitt ertek
        if(!(bevittErtek.charAt(0)>-1)){//ha 1. nem szam torol mindent
          console.log("elso nem szam");
          bevittErtek="";
        }
        if(parseInt(bevittErtek.charAt(0))===1||parseInt(bevittErtek.charAt(0))===2){//ha egy vagy 2 vel kezdődik akkor biztos hogy 9 óránál nagyobb tehát 2 számjegyü
          console.log("kettö szamjegyu lesz");
          if(!(parseInt(bevittErtek.charAt(1))>-1&&(parseInt(bevittErtek.charAt(1)))<10)&&bevittErtek.length===2){//ha 2. nem szam torli a 2.at
            bevittErtek=bevittErtek.charAt(0);
            console.log("masodik nem szam");
          }else if(!(parseInt(bevittErtek.charAt(3))>-1&&(parseInt(bevittErtek.charAt(3)))<10)&&bevittErtek.length===4){//ha a 4. nem szam akkor törli a negyediket
            bevittErtek=bevittErtek.charAt(0)+bevittErtek.charAt(1)+bevittErtek.charAt(2);
            console.log("negyedik nem szam");
          }else if(!(parseInt(bevittErtek.charAt(4))>-1&&(parseInt(bevittErtek.charAt(4)))<10)&&bevittErtek.length===5){//ha 5. nem szam akkor torli az 5.et
            bevittErtek=bevittErtek.charAt(0)+bevittErtek.charAt(1)+bevittErtek.charAt(2)+bevittErtek.charAt(3);
            console.log("otodik nem szam");
          }
          if((parseInt(bevittErtek.charAt(1))>-1)&&(parseInt(bevittErtek.charAt(1))<10)&&utolsoElemhosszSeged1===1){//ha megvan adva a 2. karakter megvan adva valami akkor beallitjuk mögé a :
          //if(bevittErtek.length===2){
            bevittErtek+=":"
          }else if(!(bevittErtek.charAt(2)===":")&&bevittErtek.length===3){//ha a harmadik nem :
            console.log("masodik szam");
            bevittErtek=bevittErtek.charAt(0)+bevittErtek.charAt(1)+":";
          }
          if(bevittErtek.length===5){
            Megjelenit(".ora");
          }else{
            Elrejt(".ora");
            Elrejt(".lefoglal");
          }
        }else{
          console.log("egy szamjegyü lesz");
          console.log(bevittErtek.charAt(0));
          if(utolsoElemhosszSeged1===0){//ha megvan adva a 2. karakter megvan adva valami akkor beallitjuk mögé a :
            //if(bevittErtek.length===2){
              bevittErtek+=":"
            }else if(!(bevittErtek.charAt(1)===":")&&bevittErtek.length===2){//ha a masodik nem :
              console.log("masodik szam");
              bevittErtek=bevittErtek.charAt(0)+":";
            }
            if(!(parseInt(bevittErtek.charAt(2))>-1&&(parseInt(bevittErtek.charAt(2)))<10)&&bevittErtek.length===3){//ha a 3. nem szam akkor torli a 3.at
              bevittErtek=bevittErtek.charAt(0)+bevittErtek.charAt(1);
            }else if(!(parseInt(bevittErtek.charAt(3))>-1&&(parseInt(bevittErtek.charAt(3)))<10)&&bevittErtek.length===4){//ha a 4. nem szam akkor torli a 4.et
              bevittErtek=bevittErtek.charAt(0)+bevittErtek.charAt(1)+bevittErtek.charAt(2);
            }else if(!(bevittErtek.charAt(4)===NaN)){//ha 5. beirt valamit akkor torli az5.et
              bevittErtek=bevittErtek.charAt(0)+bevittErtek.charAt(1)+bevittErtek.charAt(2)+bevittErtek.charAt(3);
              console.log("otodik nem szabad kitolteni");
            }
            if(!(bevittErtek.charAt(0)>-1)){//ha 1. nem szam torol mindent
              console.log("elso nem szam");
              bevittErtek="";
            }
            if(bevittErtek.length===4){
              Megjelenit(".ora");
            }else{
              Elrejt(".lefoglal");
              Elrejt(".ora");
            }
        }
          utolsoElemhosszSeged1=bevittErtek.length; 
        $(".orara")[0].value=bevittErtek;
    });
//-----------------------------------------------------------------------------------------------------------------------
    function oraraListaz(maE){//órára választás segítségek
      let oraraValasztasokSzoveg;
      let oraraLista=[];
      let kiegeszit;
      for (let index = 0; index < 8; index++) {//8 segédlet
        let ora2Szamjegy;
        let datum = new Date();//mindig lenullázuk a jelenlegi dátumot
        if(maE){//ha true tehat ma akkor a jelenlegi ora ajanlastol kell indulnia, ha nem ma akkor meg 8 tol
        
          /* datum.setHours(20);///teszteléshez beállítja az időt
          datum.setMinutes(00);///teszteléshez beállítja az időt */
          if(datum.getHours()<munkaoratol){//8 ora elott van a jelenlegi datum akkor segitsegek 8 tol kezdodnek
            datum.setHours(8);
            datum.setMinutes(00);
            console.log("segitseg 8 tol kezdodik");
            ora2Szamjegy=false;
          }else if(datum.getHours()>munkaoraig-2){//21 ora utan mar nem lehet foglalni 1 oras edzesnel kevesebbet nem lehet szemelyedzovel lenni
            console.log("mara mar nem lehet foglalni");
          }else{//napkozben 
            console.log("normal");
          }
        }else if(!(maE)){//nem ma tehat 8 tol listazas
          console.log("holnap vagy masnap");
          ora2Szamjegy=false;
            datum.setHours(8);
            datum.setMinutes(00);
        }
        var hanyperccelNagyobb=index*15
        datum.setMinutes(datum.getMinutes()+hanyperccelNagyobb);
      var oraraBeallit=datum.getMinutes();
        if(oraraBeallit<1){//időbeállítások csak 00 15 30 45 lehet a perc
          datum.setMinutes(00);
          if(index===0){
            kiegeszit="Egyből kezdés";
          }else{
            kiegeszit="";
          }
        }else if(oraraBeallit>0&&oraraBeallit<16){
            datum.setMinutes(15);
            kiegeszit="";
          }else if(oraraBeallit>15&&oraraBeallit<31){
            datum.setMinutes(30);
            kiegeszit="";
          }else if(oraraBeallit>30&&oraraBeallit<46){
            datum.setMinutes(45);
            kiegeszit="";
          }else if(oraraBeallit>45&&oraraBeallit<61){
            datum.setHours(datum.getHours()+1, 00);
            kiegeszit="";
          }
          oraraLista.push(datum);
          if(datum.getHours()>=10){
            ora2Szamjegy=true;
          }else if(datum.getHours()<10){
            console.log("10");
            ora2Szamjegy=false;
          }
          if(ora2Szamjegy===true){
            oraraValasztasokSzoveg +='<option label="'+kiegeszit+'">'+(oraraLista[index]).toString().slice(16,21)+'</option>'
          }else if(ora2Szamjegy===false){
            oraraValasztasokSzoveg +='<option label="'+kiegeszit+'">'+(oraraLista[index]).toString().slice(17,21)+'</option>'
          }
          if(datum.getHours()>munkaoraig-2){//21 ora utan mar nem lehet foglalni 1 oras edzesnel kevesebbet nem lehet szemelyedzovel lenni
            console.log("mara mar nem lehet foglalni");
            $("#oraraValasztasok").append("");
          }else{
            $("#oraraValasztasok").html(oraraValasztasokSzoveg);
          }
      }
    }
//-----------------------------------------------------------------------------------------------------------------------
    function datumListaz(){//Datum lefoglalás időponthoz hozzá ad 7 nap választást
      const hetNapjai = ["Vasárnap","Hétfő","Kedd","Szerda","Csütörtök","Péntek","Szombat"];
    var datumok=[];
    for (let index = 0; index < elorefoglalas; index++) {//100 napra előre lehet foglalni
      datumok.push(jelenlegiDatum(index).slice(0,10));
    }
    let datumValasztasokSzoveg;
    let kiegeszit;
    for (let index = 0; index < 7; index++) {//7 segédet ír ki
      let datum = new Date(jelenlegiDatum(index));
      if(datumok[index]===jelenlegiDatum(0).slice(0,10)){//ma datum esaz elso elore foglalhato datum
        kiegeszit="(Ma)";
      }else if(datumok[index]===jelenlegiDatum(1).slice(0,10)){//holnapi datum 
        kiegeszit="(Holnap)";
      }else if(datumok[index]===jelenlegiDatum(2).slice(0,10)){//holnaputani datum
        kiegeszit="(Holnap után)";
      }else{
        kiegeszit="";
      }
      console.log(jelenlegiDatum(index));
      datumValasztasokSzoveg +='<option label="'+hetNapjai[datum.getDay()]+kiegeszit+'">'+datumok[index]+'</option>'
    }
    $("#datumValasztasok").html(datumValasztasokSzoveg);
    }
    datumListaz();
//-----------------------------------------------------------------------------------------------------------------------
    var utolsoElemhosszSeged=0;
    $(".ora").on("keyup", () => {//ha az edzeshossznál viszunk be adatot
      let k=$(".ora").val();//bevitt ertek
      console.log(k);
      if(!(k.charAt(1)===":")&&utolsoElemhosszSeged===1){//ha a második nem :
        console.log("masodik szam");
        k=k.charAt(0)+":";
      }
      if(!(parseInt(k.charAt(0))>-1&&(parseInt(k.charAt(0))<10))&&k.length===1){
        k="";
        console.log("elso nem szam");
      }else if(!(parseInt(k.charAt(2))>-1&&(parseInt(k.charAt(2)))<10)&&k.length===3){
        k="";
        console.log("harmadik nem szam");
      }else if(!(parseInt(k.charAt(3))>-1&&(parseInt(k.charAt(3)))<10)&&k.length===4){
        k="";
        console.log("negyedik nem szam");
      }
      console.log(k.length);
      utolsoElemhosszSeged=k.length;
      $(".ora")[0].value=k;
      if(k.length===4){
        console.log("meghiv");
        oraBeallitas();
        Megjelenit(".lefoglal")
      }else{
        Elrejt(".lefoglal");
      }
      }
    );
});