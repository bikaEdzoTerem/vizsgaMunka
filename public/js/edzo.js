$(function () {
  const idopontok = new Idopontok();
  const myAjax = new MyAjax();
  /* idopontok.megjelenit(idopontokTomb,jelenlegiDatum); */
  const adottEdzo=10;
  var munkaoratol=8;
  var munkaoraig=22;
  var talaltNev=false;
  var talaltDatum=false;
  var szemelyKeres=[];
  var elorefoglalas=100;

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
    /* myAjax.adatbeolvas(apiVegpont, idopontokTomb, termekLista); */

    myAjax.adatbeolvas(apiVegpont, idopontok.idopontokTomb, idopontok.megjelenit,jelenlegiDatum);
    gombElrejt();
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
        gombElrejt();
      }else{
        console.log("van ilyen név");
        console.log(tomb[0]);
        talaltNev=true;
        if(talaltDatum===true){
          gombMegjelenit();
        }else{
          gombElrejt()
        }
      }
    }
    function gombElrejt(){
      $(".lefoglal")[0].style.display = "none";
    }
    function gombMegjelenit(){
      $(".lefoglal")[0].style.display = "block";
    }
    $(".lefoglal").on("click", () => {// ha kattintunk a lefoglal gomb-ra
      oraBeallitas();
      let datumSeged=$(".datum").val();
      console.log(datumSeged);
      let szemelySeged=$(".szemelyKereso").val();
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
          id: 3,
          ugyfel_id: szemelyKeres[0].szemely_id,
          ugyfel_nev: szemelyKeres[0].nev,
          datum: datumSeged.replaceAll("T", " "),
          ora: "2:00",
          edzo_id:adottEdzo,
        };
       /*  myAjax.adatkuldes(apiVegpont, szoveg); */
      }else{
        console.log("hibás a dátum vagy a név");
      }
    });
    
    function oraBeallitas(){
      if(!($(".ora").val()==="")){//ha megvan adva dátum 
        //console.log($(".ora").val().slice(2,4));
        talaltDatum=true;
        if(talaltNev===true){
          gombMegjelenit()
        }else{
          gombElrejt()
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
        gombElrejt();
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
        $(".datum")[0].value=$(".datum").val().slice(0,13)+":00";//levágja a másodpercet és hozzá adjuk a 00 így mindig ha megadunk másodpercet akkor 00 lesz
      }
    });

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
    function oraraListaz(){
      let oraraLista=[];
     /*  if()//ha mai napra nézi */
     if($(".datum").val()===""){//ures a datum
       console.log("nincs kitoltve a datum");
     }else if($(".datum").val()===jelenlegiDatum(0).slice(0,10)){//ma
       console.log("ma");
       for (let index = 0; index < 8; index++) {
        let datum = new Date();
         console.log(datum);
       }
     }else if(!($(".datum").val()===jelenlegiDatum(0).slice(0,10))){//nem ma

     }
      /* console.log($(".datum").val());
      console.log(jelenlegiDatum(0).slice(0,10)); */
      /* $(".datum").val(); */
      let datum = new Date(jelenlegiDatum(0));
      for (let index = 0; index < 8; index++) {
        let hanyperccelNagyobb=index*15
      datum.setMinutes(datum.getMinutes()+75+hanyperccelNagyobb);
      oraraLista.push(datum);
      let oraraBeallit=datum.getMinutes();
      console.log(datum);
      console.log(oraraBeallit);
        if(oraraBeallit<1){//időbeállítások csak 00 15 30 45 lehet a perc
          datum.setMinutes(0);
          console.log("belep");
        }else if(oraraBeallit>0&&oraraBeallit<16){
          datum.setMinutes(15);
        }else if(oraraBeallit>15&&oraraBeallit<31){
          datum.setMinutes(30);
        }else if(oraraBeallit>30&&oraraBeallit<46){
          datum.setMinutes(45);
        }else if(oraraBeallit>45&&oraraBeallit<61){
          datum.setHours(datum.getHours()+1, 00);
        }
      }
        console.log(datum);
    }
    $(".orara").on("keyup", () => {//ha az orara viszunk be adatot
      
      oraraListaz();
    });
    
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
    $(".ora").on("keyup", () => {//ha az oranal viszunk be adatot
      let k=$(".ora").val();//bevitt ertek
      if(k.length===1&&utolsoElemhosszSeged===0){//elso beirasnal fut le, beirt elem miatt 1 lessz a hossz es nem volt torles
        k=k+":";
      }
      if(!(k.match(/[a-z]/i)===null)){//ha betüt irunk be akkor töröljön mindent
        k="";
      }
      utolsoElemhosszSeged=k.length;
      $(".ora")[0].value=k;
      }
    );
});