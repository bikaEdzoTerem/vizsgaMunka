$(function () {
  const idopontokTomb=[];
  const idopontok = new Idopontok(idopontokTomb);
  const myAjax = new MyAjax();
  /* idopontok.megjelenit(idopontokTomb,jelenlegiDatum); */
  const adottEdzo=10;
  var munkaoratol=8;
  var munkaoraig=22;
  var talaltNev=false;
  var talaltDatum=false;
  var szemelyKeres=[];
  var elorefoglalas=100;
  var eltolas=0;
  var hanyOszlopos=3;

  function jelenlegiDatum(napvaltoztat) {
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
    console.log(jelenlegiDatum(0));
    let apiVegpont = "http://localhost:4005/szemelyiEdzesek";
    $(".JobbraNovel").on("click ", () => {
      idopontok.kattintasTrigger("jobbra");
      console.log("jobbra");
      eltolas++;
      idopontLista(idopontokTomb,jelenlegiDatum);
  });
  $(".oszlopSzam").on("keyup", () => {
    oszlop()
});
$(".oszlopSzam").on("click", () => {
  oszlop()
});
function oszlop(){
  console.log($(".oszlopSzam").val());
  hanyOszlopos=parseInt($(".oszlopSzam").val());
  idopontLista(idopontokTomb,jelenlegiDatum);
}
  $(".BalraCsokkent").on("click ", () => {
      idopontok.kattintasTrigger("balra");
    /* idopontok.megjelenit(); */
      console.log("balra");
      eltolas--;
      idopontLista(idopontokTomb,jelenlegiDatum);

  });
  myAjax.adatbeolvas(apiVegpont, idopontokTomb, idopontLista,jelenlegiDatum);
  function datumKereses(){
    let datumkeres=$(".datumKeres").val();
    
  }
  function idopontLista(idopontokT,myCallback){
    idopontok.megjelenit(myCallback,eltolas,(hanyOszlopos));
    const szuloElem = $('.tablaadat');
            const sablonElem = $('footer .idopont');
            sablonElem.show();
            szuloElem.empty();
    for (let index = 0; index < hanyOszlopos; index++) {
      idopontokT.forEach(function (elem) {
              let datum1=elem.datum.slice(0,10);
              let datum2=myCallback(index+eltolas).slice(0,10);
              console.log(myCallback(index+eltolas));
              if(datum2===datum1){
                console.log("kreal");
                  let node = sablonElem.clone().appendTo($('.tablaadat'+index));
                  const obj = new Idopont(node, elem);
                  if(new Date(elem.datum)<new Date()){//ha régebbi foglalásokat nézünk akkor ne lehessen feloldani
                    console.log(obj.feloldas.hide());
                  }
                  console.log(elem.datum);
              }
          });
        }
        sablonElem.hide(); 
  }
    Elrejt(".datum");
    Elrejt(".orara");
    Elrejt(".ora");
    Elrejt(".lefoglal");
    $(".szemelyKereso").on("keyup", () => {//ha lenyomja a szememely beirasa kozben a billentyut
      
      let szemelyfoglall = $(".szemelyKereso").val();
      let apiVegpont2 = "http://localhost:4001/adat";
      apiVegpont2 += "?nev=" + szemelyfoglall;
      myAjax.adatbeolvas(apiVegpont2, szemelyKeres, szemlyFunction);
    });
    function szemlyFunction(tomb){
      if(tomb[0]===undefined){
        console.log("nincs ilyen nev");
        talaltNev=false;
        Elrejt(".datum");
        Elrejt(".orara");
        Elrejt(".ora");
        Elrejt(".lefoglal");
      }else{
        console.log("van ilyen név");
        console.log(tomb[0]);
        talaltNev=true;
        Megjelenit(".datum");
        /* if(talaltDatum===true){
        }else{
          Elrejt(".datum")
        } */
      }
    }
    function Elrejt(mit){
      $(mit)[0].style.display = "none";
    }
    function Megjelenit(mit){
      $(mit)[0].style.display = "block";
    }
    $(".lefoglal").on("click", () => {// ha kattintunk a lefoglal gomb-ra
      oraBeallitas();
      let szemelySeged=$(".szemelyKereso").val();
      let datumSeged=$(".datum").val();
      let oraraSeged=$(".orara").val();
      let oraSeged=$(".ora").val();
      console.log(datumSeged);
      if(szemelySeged==="" && datumSeged===""){
        console.log("Nincs megadva név, és dátum");
      }else if(szemelySeged===""){
        console.log("Nincs megadva név");
      }else if(datumSeged===""){
        console.log("Nincs megadva dátum");
      }else if(talaltNev===true&&talaltDatum==true){
        console.log("jó");
        apiVegpont = "http://localhost:4005/szemelyiEdzesek";
        let szoveg = {
          id: 11,
          ugyfel_id: parseInt(szemelyKeres[0].szemely_id),
          ugyfel_nev: szemelyKeres[0].nev,
          datum: datumSeged+" "+oraraSeged,
          ora: oraSeged,
          edzo_id:adottEdzo,
        };
        console.log(szoveg);
        myAjax.adatkuldes(apiVegpont, szoveg);
      }else{
        console.log("hibás a dátum vagy a név");
      }
    });
    
    function oraBeallitas(){
      if(!($(".ora").val()==="")){//ha megvan adva dátum 
        //console.log($(".ora").val().slice(2,4));
        talaltDatum=true;
        if(talaltNev===true){
          /* Megjelenit(".lefoglal") */
        }else{
          /* Elrejt(".lefoglal") */
        }
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
    $(".datum").on("click", () => {//rákattintás a dátumra
      let jelenlegiDatumSeged=new Date().toISOString().split(".")[0].slice(0,10);
      $(".datum")[0].min=jelenlegiDatumSeged;//a jelenlegi idő a minimum, utólagos lefoglalás nem lehetséges
      let max=parseInt(jelenlegiDatumSeged.slice(0,4))+1;//jelenlegi datumnak az évét átalakítja számmá és hozzáad 1-et
      max=max.toString();//visszaalakítás string-é
      let seged=jelenlegiDatumSeged.replace(jelenlegiDatumSeged.slice(0,4),max);//a jelenlegi évet kicseréli a jelenlegi év +1 re
      $(".datum")[0].max=seged;//a jelenlegi idő +1 év a maximum
      if(!($(".datum").val()==="")){//ha megvan adva dátum 
        Megjelenit(".orara");
        console.log($(".datum").val());
        /* $(".datum")[0].value=$(".datum").val().slice(0,13);//levágja a másodpercet és hozzá adjuk a 00 így mindig ha megadunk másodpercet akkor 00 lesz */
      }else{
        Elrejt(".orara");
        Elrejt(".ora");
        Elrejt(".lefoglal");
      }
    });
    $(".datum").on("keyup", () => {
      if(!($(".datum").val()==="")){//ha megvan adva dátum 
        Megjelenit(".orara");
        console.log($(".datum").val().slice(0,13));
      }else{
        Elrejt(".orara");
        Elrejt(".ora");
        Elrejt(".lefoglal");
      }
    });
    function DatumKitoltottE(){
      if(!($(".datum").val()==="")){//ha megvan adva dátum 
        Megjelenit(".orara");
        console.log($(".datum").val().slice(0,13));
      }else{
        Elrejt(".orara");
      }
    }
    $(window).on('felold', (event) => {//ha rányomok a feloldra torli az adatot
      myAjax.adattorles(apiVegpont, event.detail.id);
      apiVegpont = "http://localhost:4005/szemelyiEdzesek";
    });

    function oraListaz(){//orakhoz hozzá adja a valószínű lehettőségeket opciok nak
      const orak=["1:00","1:15","1:30","1:45","2:00","2:15","2:30","2:45","3:00"];
    const edzesekHossz=["Rövid edzés","Közepes edzés","Hosszú edzés"]
    var oravalasztasok=[];
    for (let index = 0; index < orak.length; index++) {//orak tomb vegigjarasa
      if(index>-1&&index<3){//ha elso harom elem
        let i=0
        oravalasztasok+='<option label="'+edzesekHossz[i]+'">'+orak[index]+'</option>'//opciok letrehozasa
      }else if(index>2&&index<6){// ha 4.-6.elem
        i=1;
        oravalasztasok+='<option label="'+edzesekHossz[i]+'">'+orak[index]+'</option>'
      }else if(index>5&&index<9){//ha 7.-9.elem
        i=2;
        oravalasztasok+='<option label="'+edzesekHossz[i]+'">'+orak[index]+'</option>'
      }
    }
    $("#oraValasztasok").html(oravalasztasok);
    }
    oraListaz();
    var utolsoElemhosszSeged1=0;
    $(".orara").on("keyup", () => {//ha az orara viszunk be adatot
      //még kell egy olyat csinalni hogyha mára foglal akkor a jelenlegi órátol tudjon foglalni
        let k1=$(".orara").val();//bevitt ertek
        if(!(k1.charAt(0)>-1)){//ha 1. nem szam torol mindent
          console.log("elso nem szam");
          k1="";
        }
        if(parseInt(k1.charAt(0))===1||parseInt(k1.charAt(0))===2){//ha egy vagy 2 vel kezdődik akkor biztos hogy 9 óránál nagyobb tehát 2 számjegyü
          console.log("kettö szamjegyu lesz");
          if(!(parseInt(k1.charAt(1))>-1&&(parseInt(k1.charAt(1)))<10)&&k1.length===2){//ha 2. nem szam torli a 2.at
            k1=k1.charAt(0);
            console.log("masodik nem szam");
          }else if(!(parseInt(k1.charAt(3))>-1&&(parseInt(k1.charAt(3)))<10)&&k1.length===4){//ha a 4. nem szam akkor törli a negyediket
            k1=k1.charAt(0)+k1.charAt(1)+k1.charAt(2);
            console.log("negyedik nem szam");
          }else if(!(parseInt(k1.charAt(4))>-1&&(parseInt(k1.charAt(4)))<10)&&k1.length===5){//ha 5. nem szam akkor torli az 5.et
            k1=k1.charAt(0)+k1.charAt(1)+k1.charAt(2)+k1.charAt(3);
            console.log("otodik nem szam");
          }
          if((parseInt(k1.charAt(1))>-1)&&(parseInt(k1.charAt(1))<10)&&utolsoElemhosszSeged1===1){//ha megvan adva a 2. karakter megvan adva valami akkor beallitjuk mögé a :
          //if(k1.length===2){
            k1+=":"
          }else if(!(k1.charAt(2)===":")&&k1.length===3){//ha a harmadik nem :
            console.log("masodik szam");
            k1=k1.charAt(0)+k1.charAt(1)+":";
          }
          if(k1.length===5){
            Megjelenit(".ora");
          }else{
            Elrejt(".ora");
            Elrejt(".lefoglal");
          }
        }else{
          console.log("egy szamjegyü lesz");
          console.log(k1.charAt(0));
          if(utolsoElemhosszSeged1===0){//ha megvan adva a 2. karakter megvan adva valami akkor beallitjuk mögé a :
            //if(k1.length===2){
              k1+=":"
            }else if(!(k1.charAt(1)===":")&&k1.length===2){//ha a masodik nem :
              console.log("masodik szam");
              k1=k1.charAt(0)+":";
            }
            if(!(parseInt(k1.charAt(2))>-1&&(parseInt(k1.charAt(2)))<10)&&k1.length===3){//ha a 3. nem szam akkor torli a 3.at
              k1=k1.charAt(0)+k1.charAt(1);
            }else if(!(parseInt(k1.charAt(3))>-1&&(parseInt(k1.charAt(3)))<10)&&k1.length===4){//ha a 4. nem szam akkor torli a 4.et
              k1=k1.charAt(0)+k1.charAt(1)+k1.charAt(2);
            }else if(!(k1.charAt(4)===NaN)){//ha 5. beirt valamit akkor torli az5.et
              k1=k1.charAt(0)+k1.charAt(1)+k1.charAt(2)+k1.charAt(3);
              console.log("otodik nem szabad kitolteni");
            }
            if(!(k1.charAt(0)>-1)){//ha 1. nem szam torol mindent
              console.log("elso nem szam");
              k1="";
            }
            if(k1.length===4){
              Megjelenit(".ora");
            }else{
              Elrejt(".lefoglal");
              Elrejt(".ora");
            }
        }
          /* console.log(parseInt(k1));
          if(!(parseInt(k1.charAt(0))>-1&&(parseInt(k1.charAt(0))<10))&&k1.length===1){//ha 1. nem szam torol mindent
            k1="";
            console.log("elso nem szam2");
          }else if(!(parseInt(k1.charAt(1))>-1&&(parseInt(k1.charAt(1)))<10)&&k1.length===2){//ha 2. nem szam torli a 2.at
            k1=k1.charAt(0);
            console.log("masodik nem szam");
          }else if(!(parseInt(k1.charAt(3))>-1&&(parseInt(k1.charAt(3)))<10)&&k1.length===4){//ha a 4. nem szam akkor törli a negyediket
            k1=k1.charAt(0)+k1.charAt(1)+k1.charAt(2);
            console.log("negyedik nem szam");
          }else if(!(parseInt(k1.charAt(4))>-1&&(parseInt(k1.charAt(4)))<10)&&k1.length===5){//ha 5. nem szam akkor torli az 5.et
            k1=k1.charAt(0)+k1.charAt(1)+k1.charAt(2)+k1.charAt(3);
            console.log("otodik nem szam");
          } 
          */
      /* } */
        console.log(k1);
        /* if(!(k1.match(/[a-z]/)===null)){//ha betüt irunk be akkor töröljön mindent
          console.log("hop");
          k1="";
        }else if(parseInt(k1)>3){
          k1=3;
        }else if(k1.length===1&&utolsoElemhosszSeged1===0){//elso beirasnal fut le, beirt elem miatt 1 lessz a hossz es nem volt torles
          k1=1+":";
        }*/
        console.log(utolsoElemhosszSeged1);
          utolsoElemhosszSeged1=k1.length; 
        
        $(".orara")[0].value=k1;
        
      /* oraraListaz(); */
    });
    oraraListaz();
    function oraraListaz(){
      let oraraValasztasokSzoveg;
      let oraraLista=[];
     /*  if()//ha mai napra nézi */
     if($(".datum").val()===""){//ures a datum
       console.log("nincs kitoltve a datum");
     }else if($(".datum").val()===jelenlegiDatum(0).slice(0,10)){//ma
       for (let index = 0; index < 8; index++) {
        let datum = new Date();
         console.log(datum);
       }
     }else if(!($(".datum").val()===jelenlegiDatum(0).slice(0,10))){//nem ma

     }
      /* console.log($(".datum").val());
      console.log(jelenlegiDatum(0).slice(0,10)); */
      /* $(".datum").val(); */
      for (let index = 0; index < 8; index++) {//8 segédlet
        let datum = new Date(jelenlegiDatum(0));//mindig lenullázuk a jelenlegi dátumot
        let hanyperccelNagyobb=index*15
      datum.setMinutes(datum.getMinutes()+hanyperccelNagyobb);
      let oraraBeallit=datum.getMinutes();
      if(oraraBeallit<1){//időbeállítások csak 00 15 30 45 lehet a perc
          datum.setMinutes(0);
          kiegeszit="Egyből kezdés";
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
        console.log(oraraLista);
        oraraValasztasokSzoveg +='<option label="'+kiegeszit+'">'+(oraraLista[index]).toString().slice(16,21)+'</option>'
      }
      $("#oraraValasztasok").html(oraraValasztasokSzoveg);
    }
    function datumListaz(){//datumokhoz hozzá ad 7 nap választást
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
      }else if(datumok[index]===jelenlegiDatum(1).slice(0,10)){//holnapi datum esaz elso elore foglalhato datum
        kiegeszit="(Holnap)";
      }else if(datumok[index]===jelenlegiDatum(2).slice(0,10)){//holnaputani datum esaz elso elore foglalhato datum
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
    
    var utolsoElemhosszSeged=0;
    $(".ora").on("keyup", () => {//ha az edzeshossznál viszunk be adatot
      let k=$(".ora").val();//bevitt ertek
      console.log(k);
      /* console.log(parseInt(k)>0&&parseInt(k)<9); */
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
      
     /*  if(!(k.match(/[a-z]/i)===null)){//ha betüt irunk be akkor töröljön mindent// ha nem szám
      // if((typeof k.charAt(0))==="number"){//ha betüt irunk be akkor töröljön mindent// ha nem szám 
        console.log("szam");
        k="";
      }else if(parseInt(k)>3){
        k=3+":";
      }else if(k.length===1&&utolsoElemhosszSeged===0){//elso beirasnal fut le, beirt elem miatt 1 lessz a hossz es nem volt torles
        k=k+":";
      }*/
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