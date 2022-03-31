$(function () {
  const myAjax = new MyAjax();
  let szekrenyekTomb = [];
  const szekrenyemben = new Szekrenyek(szekrenyekTomb);
  const honapok = ["Január", "Február", "Március","Aprilis", "Május", "Június", "Július", "Augusztus","Szeptember", "Október", "November", "December"];
  const hetNapjai = ["Vasárnap","Hétfő","Kedd","Szerda","Csütörtök","Péntek","Szombat"];

  var hibak=['<div class="alert hiba"><h3 id="alertUzenet">Hiba</h3><a class="close">&times;</a></div>',
  '<div class="alert figyelmeztetes"><h3 id="alertUzenet">Hiba</h3><a class="close">&times;</a></div>',
  '<div class="alert sikeres"><h3 id="alertUzenet">Hiba</h3><a class="close">&times;</a></div>',]



  
  function szekrenyekMegjelenit() {
    let apiVegpont = "/api/recepcioHoz";
    myAjax.adatbeolvas(apiVegpont, szekrenyekTomb, kiir);

  }
  szekrenyekMegjelenit();//létrehozza s zekrények tábla szerkezetét
  function kiir(tomb) {
    let seged = ".szekrenyek";
    szekrenyemben.megjelenit(tomb, seged);
    $("#ferfiLetszam").html(szekrenyemben.getSzabadHelySzam(tomb,"Férfi"));
    $("#noiiLetszam").html(szekrenyemben.getSzabadHelySzam(tomb,"Nő"));
    
  }
//-----------------------------------------------------------------------------------------------------------------------
  let apiVegpont = "/api/recepcioHoz";
  myAjax.adatbeolvas(apiVegpont, szekrenyekTomb, szekreny);
  function szekreny(idopontokT){//szekrények táblába belerakja az adatokat
    console.log(idopontokT);
    const szuloElem = $('.szekrenyekTabla > tbody:last-child');
    const sablonElem = $('footer .szekreny ');
    sablonElem.show();
    szuloElem.empty();
    idopontokT.forEach(function (elem) {
      let node = sablonElem.clone().appendTo('.szekrenyekTabla > tbody:last-child');
      const obj = new Szekreny(node, elem);
      if(elem.ures_e==="Ü"){
        obj.szekreny_feloldas.hide();
      }else if(elem.ures_e==="R"){
        obj.szekreny_feloldas.hide();
        obj.szekreny_rosszCheckBox.attr("checked", true);
      }
    });
    sablonElem.hide(); 
    $('footer .szemely').hide()
  }
  
  //-------------------------------------------------------------------------------------------------------------------------
  $(window).on('rossz', (event) => {//ha rányomok a checkboxot akkor modositja az adatot
  console.log(event.detail.ures_e);
  if(event.detail.ures_e==="Ü"){
    szoveg = {
      szekreny_id: event.detail.szekreny_id,
      ures_e: "R",
      tipusa:event.detail.tipusa,
    };
  }else if(event.detail.ures_e==="R"){
    szoveg = {
      szekreny_id: event.detail.szekreny_id,
      ures_e: "Ü",
      tipusa:event.detail.tipusa,
    };
  }
  console.log(event.detail.szekreny_id);
    apiVegpont = "api/recepcioHoz";
    
    myAjax.adatmodosit(apiVegpont,szoveg, event.detail.szekreny_id);
    window.location.reload();
  });
  //-------------------------------------------------------------------------------------------------------------------------
  $(window).on('felold', (event) => {//ha rányomok a feloldra modositja az adatot(feloldja a szekrényt)
    console.log(event.detail.szekreny_id);
    apiVegpont = "api/recepcioHoz";
    szoveg = {
      szekreny_id: event.detail.szekreny_id,
      ures_e: "Ü",
      tipusa:event.detail.tipusa,
    };
    myAjax.adatmodosit(apiVegpont,szoveg, event.detail.szekreny_id);
    window.location.reload();
  });
//-------------------------------------------------------------------------------------------------
    $(document).ready(function(e) {// személy kereső inputnál gépelek csak akkor fut le a SzemélyKeres metódus ha abbahagyom 
      var timeout;
      var delay = 1000;   // 1 másodperc
  
      $(".keresSzemely").on("input", () => {
          if(timeout) {
              clearTimeout(timeout);
          }
          timeout = setTimeout(function() {
            szemelyKeres();
          }, delay);
      });
    });

    function szemelyKeres(){
      let tomb=[];
      let apiVegpont = "/api/ugyfelEdzesSzemellyel";
      apiVegpont += "?nev=" + $(".keresSzemely").val();
      if(!($(".keresSzemely").val()==="")){// ha nincs semmise megadva az inputnak akkor ne fusson le
        myAjax.adatbeolvas(apiVegpont,tomb,szemelyKeresoMegjelenit);
      }else{
         $('.keresettSzemely ').empty();
      }
    }
    function szemelyKeresoMegjelenit(szemely){//sablonelemet klónozza és ha nincs igazolványa létrehoz egy inputot
          const szuloElem = $('.keresettSzemely');
          const sablonElem = $('footer .szemely ');
          sablonElem.show();
          szuloElem.empty();
          szemely.forEach(function (elem) {
            let node = sablonElem.clone().appendTo('.keresettSzemely');
            const obj1 = new Szemely(node, elem);
          });
          sablonElem.hide();
          if(szemely[0].igazolvany_szam===""){
            $(".igazolvanySzama").html('<input type="txt" placeholder="Igazolvány Száma" class="bekerIgazolvanySzam" />');
            $(".igazolvanyTipusa").html('<input type="txt" placeholder="Igazolvány Típusa" class="bekerIgazolvanyTipus" />');
            $(".felviszGomb").show();
            $(".szemely .berlete").html(" NINCS!");
          }else {
            $(".felviszGomb").hide();
            $(".szemely .berlete").append(" napig jó");
          }
  };
  $(window).on('felviszAdat', (event) => {//ha rányomok a felviszre felviszi az igazolványát
    $igazolvanySzam=$(".bekerIgazolvanySzam").val();
    $igazolvanyTipus=$(".bekerIgazolvanyTipus").val();
    /* apiVegpont = "api/szemely/berletfelvisz"; */
    apiVegpont = "api/szemely";
     szoveg = {
      email_cim:event.detail.email_cim,
      nev:event.detail.nev, 
      szemely_id:event.detail.szemely_id,
      szul_datum:event.detail.szul_datum,
      neme:event.detail.neme,
      jogosultsag_id:event.detail.jogosultsag_id,
      igazolvany_szam:$igazolvanySzam,
      igazolvany_tipusa:$igazolvanyTipus,
    };
    
    myAjax.adatmodosit(apiVegpont,szoveg, event.detail.szemely_id);
    window.location.reload(); 
  });
//-------------------------------------------------------------------------------------------------
    $(document).ready(function(e) {// Szekrény kereső inputnál gépelek csak akkor fut le a SzemélyKeres metódus ha abbahagyom 
      var timeout;
      var delay = 1000;   // 1 másodperc
  
      $(".keresSzekrenykulcs").on("input", () => {
          if(timeout) {
              clearTimeout(timeout);
          }
          timeout = setTimeout(function() {
            szekrenyKereso();
          }, delay);
      });
    });

    function szekrenyKereso(){
      let tomb=[];
      let apiVegpont = "/api/szekreny";
      apiVegpont += "?pontosSzekreny=" + $(".keresSzekrenykulcs").val();
      if(!($(".keresSzekrenykulcs").val()==="")){// ha nincs semmise megadva az inputnak akkor ne fusson le
        myAjax.adatbeolvas(apiVegpont,tomb,szekrenyKeresoMegjelenit);
      }else{
         $('.keresettSzekreny ').empty();
      }
    };
    function szekrenyKeresoMegjelenit(tomb){//kiiratja a keresett szekrényt a klónozott szekrény osztályból
      const sablonElem = $('footer .szekreny ');
      sablonElem.show();
      $(".keresettSzekreny").empty();
      tomb.forEach(function (elem) {
        let node = sablonElem.clone().appendTo(".keresettSzekreny");
        const obj = new Szekreny(node, elem);
        if(elem.ures_e==="Ü"){
          obj.szekreny_feloldas.hide();
        }else if(elem.ures_e==="R"){
          obj.szekreny_feloldas.hide();
          obj.szekreny_rosszCheckBox.attr("checked", true);
        }
      });
      sablonElem.hide();
      $(".keresettSzekreny .szama").prepend("Szekrény száma: ");

      $(".keresettSzekreny .neme").prepend("Tulajdonsága: ");
      $(".keresettSzekreny .uresE").prepend("Állapota: ");
      $(".keresettSzekreny .hibasGomb").parent().prepend("Funkcio: ");
      $(".feloldasGomb").on("click", (event) => {
        let id = $(event.target).attr("data-id");
        szekrenyemben.katt(tomb[0].szekreny_id,"kattint","Ü");
      });
      $(".hibasGomb").on("change", (event) => {//adott szekrény
        if(event.target.checked===true){
          szekrenyemben.katt(szekreny_id,"kattint","R") ;
        }else{
          szekrenyemben.katt(szekreny_id,"kattint","Ü");
        }
      });
    };
    
    $(window).on('osszesFelold', () => {//összes szekrény feloldása
      apiVegpont="/api/recepcioHozOsszesSzekrenyFelold";
      myAjax.adatkuldes(apiVegpont)
    });
//-------------------------------------------------------------------------------------------------
  

});
