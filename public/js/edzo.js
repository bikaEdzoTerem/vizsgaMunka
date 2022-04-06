$(function () {
  var idopontokTomb=[];
  const myAjax = new MyAjax();
  /* idopontok.megjelenit(idopontokTomb,jelenlegiDatum); */
  var munkaoratol=8;
  var munkaoraig=22;
  var szemelyKeres=[];
  var elorefoglalas=100;
  var apiSzemelyek="/api/szemely";


//-----------------------------------------------------------------------------------------------------------------------
//hibaüzenetek 2 ms után eltűnik lassan
$(document).on("click", () => {//rákattintás az oldalon
  $(".alert-sikeres").fadeOut(1000);
  $(".alert-sikertelen").fadeOut(1000);
});
setTimeout(function() {
  $(".alert-sikeres").fadeOut(3000);
  $(".alert-sikertelen").fadeOut(3000);
}, 2000);
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

  function idopontLista(idopontokT){//időpontokat belerakja a táblázatba
    const szuloElem = $('.Foglalasok');
    const sablonElem = $('footer .idopont');
    sablonElem.show();
    szuloElem.empty();
      idopontokT.forEach(function (elem) {
        let datum1=elem.datum.slice(0,10);
          let node = sablonElem.clone().appendTo(szuloElem);
          const obj = new Idopont(node, elem);
          if(new Date(elem.datum)<new Date()){//ha régebbi foglalásokat nézünk akkor ne lehessen feloldani
            obj.feloldas.hide();
            obj.modosit.hide();
          } 
      });
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
      return jelenlegiDatumSzerkesztes;
  }
//-----------------------------------------------------------------------------------------------------------------------
//Szűrés dátum input tól és ig re
$(".datumKeresTol").val(jelenlegiDatum(-3).slice(0, 10));//input erteket automatikusan a jelenlegi datum -3 napra allítja
$(".datumKeresIg").val(jelenlegiDatum(3).slice(0, 10));//input erteket automatikusan a jelenlegi datum +3 napra allítja
minMax();
function minMax(){//minimum és maximum értéket ne lehessen választani az adott inputnal
  $(".datumKeresTol").attr("max",$(".datumKeresIg").val());
  $(".datumKeresIg").attr("min",$(".datumKeresTol").val());
}
$(".BalraCsokkentTol").on("click ", () => {//Időpont szőrés tól
  lehetE(".datumKeresTol","--");
  minMax();
});
$(".JobbraNovelTol").on("click ", () => {//Időpont szőrés tól
  lehetE(".datumKeresTol","++");
  minMax();
});
$(".BalraCsokkentIg").on("click ", () => {//Időpont szőrés ig
  lehetE(".datumKeresIg","--");
  minMax();
});
$(".JobbraNovelIg").on("click ", () => {//Időpont szőrés ig
  lehetE(".datumKeresIg","++");
  minMax();
});
function lehetE(mit,merre){//lehet e emelni vagy csökkenteni
  let tol=new Date($(".datumKeresTol").val());
  /* $(".datumKeresTol").max=$(".datumKeresIg").val(); */
  
  let ig=new Date($(".datumKeresIg").val());
  /* $(".datumKeresIg").min=$(".datumKeresTol").val(); */
  if(tol<ig){//tol lehet emelni, ig lehet csokkentteni
    IdopontKereses(mit,merre);
  }else if(+tol=== +ig){//tol nem lehet emelni, ig nem lehet csokkentteni, ugyanakkora
    if(mit===".datumKeresTol"&&merre==="--"){
      IdopontKereses(mit,merre);
    }else if(mit===".datumKeresIg"&&merre==="++"){
      IdopontKereses(mit,merre);
    }
  }else if(tol<ig){//tol nem lehet emelni, ig nem lehet csokkentteni 
    if(mit===".datumKeresTol"&&merre==="--"){
      IdopontKereses(mit,merre);
    }else if(mit===".datumKeresIg"&&merre==="++"){
      IdopontKereses(mit,merre);
    }
  }

  function IdopontKereses(mit,merre){
    let datumkeres=$(mit).val();
    const datum = new Date(datumkeres);
    if(merre==="--"){
      datum.setDate(datum.getDate()-1);
    }else if(merre==="++"){
      datum.setDate(datum.getDate()+1);
    }
    $(mit).val(datum.toJSON().slice(0, 10));
    szures();
  }
  }
  function szures(){//szűrés ami az inputokban van
    let datum = new Date($(".datumKeresIg").val());//azert kell mert a controllerben ha összehasonlítjuk a 2 dátumot akkor 2022-04-10 10:00:00-percet  2022-04-11 10:00:00 nek veszi
    datum.setDate(datum.getDate()+1);//azert kell
    datum=datum.toJSON().slice(0, 10);//azert kell
    apiVegpont="/api/ugyfelEdzes?datumTolIgSzemellyel=";
    apiVegpont+=$(".datumKeresTol").val()+"T"+datum+"T"+$(".SzemelySzuro").val();
    myAjax.adatbeolvas(apiVegpont, false,idopontLista);
  }
  $(".datumKeresTol").on("change ", () => {
    szures();
  });
  $(".datumKeresIg").on("change ", () => {
    szures();
  });
  szures();//inputban lévő adatok szerint szűri
  //-----------------------------------------------------------------------------------------------------------------------
  //Személy szűrés
  $(".SzemelySzuro").on("change ", () => {
    let datum = new Date($(".datumKeresIg").val());//azert kell mert a controllerben ha összehasonlítjuk a 2 dátumot akkor 2022-04-10 10:00:00-percet  2022-04-11 10:00:00 nek veszi
    datum.setDate(datum.getDate()+1);//azert kell
    datum=datum.toJSON().slice(0, 10);//azert kell
    apiVegpont="/api/ugyfelEdzes?datumTolIgSzemellyel=";
    apiVegpont+=$(".datumKeresTol").val()+"T"+datum+"T"+$(".SzemelySzuro").val();
    console.log(apiVegpont);
    myAjax.adatbeolvas(apiVegpont, false,idopontLista);
  });
  //-----------------------------------------------------------------------------------------------------------------------
    $(".szemelyKereso").on("keyup", () => {//ha lenyomja a szememely beirasa kozben a billentyut
      if($(".szemelyKereso").val()==""){
        console.log("nincs megadva szemely");
        /* Elrejt(".datum"); */
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
        /* Elrejt(".datum");
        Elrejt(".orara");
        Elrejt(".ora");
        Elrejt(".lefoglal"); */
      }else if(tomb.length===1){
        console.log("van ilyen név");
        console.log(tomb);
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
      myAjax.adatkuldes(apiVegpont, event.detail.adat);
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
//-----------------------------------------------------------------------------------------------------------------------

      $(".modosit").hide();//alapértelmezetten elrejtve a módosítás
      $(".megjelenites").show();//alapértelmezetten megjelenítve a alap nézet
    $(window).on('modosit', (event) => {//ha rányomok a módosítra megjeleníti a módosítás nézetet és elrejti a alap nézetet, itt lehet szerkeszteni a foglalást
      /* console.log(event.detail.div.children()[1].style="display: contents"); */
      event.detail.div.children().children()[9].textContent="Módosít";
      event.detail.div.children()[1].style="display: block";
      event.detail.div.children()[0].style="display: none";
    });
    $(window).on('modositFelvitel', (event) => {//módosítás véglegesítése ha rányomok felviszi a megadott adatokat az adatbázisba
        apiVegpont = "api/ugyfelEdzes/update";
        console.log(event.detail.div.children().children());
        szoveg = {
          nevUj:event.detail.div.children().children()[17].value,//adott divnek az értékét megkapjuk
          datumUj: event.detail.div.children().children()[11].value+" "+event.detail.div.children().children()[14].value+":00",
          oraUj: event.detail.div.children().children()[20].value+":00",

          nevR:event.detail.adat.nev,
          datumR: event.detail.adat.datum,
          oraR: event.detail.adat.ora,
          ugyfelR: event.detail.adat.ugyfel,
          edzo:event.detail.adat.edzo
        };
        myAjax.adatkuldes(apiVegpont,szoveg);
        window.location.reload();
    });
    $(window).on('megseModositas', (event) => {//ha mégse akarjuk módosítani a foglalást akkor elrejti a módosítás nézetet és megjeleníti a alap nézetet
      event.detail.div.children()[1].style="display: none";
      event.detail.div.children()[0].style="display: block";
    });
});