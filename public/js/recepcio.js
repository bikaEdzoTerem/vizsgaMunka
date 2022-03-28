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
  szekrenyekMegjelenit();
  function kiir(tomb) {
    let seged = ".szekrenyek";
    szekrenyemben.megjelenit(tomb, seged);
    console.log(szekrenyemben.getSzabadHelySzam(tomb,"Férfi"));
    $("#ferfiLetszam").html(szekrenyemben.getSzabadHelySzam(tomb,"Férfi"));
    $("#noiiLetszam").html(szekrenyemben.getSzabadHelySzam(tomb,"Nő"));
    
  }
//-----------------------------------------------------------------------------------------------------------------------
  let apiVegpont = "/api/recepcioHoz";
  myAjax.adatbeolvas(apiVegpont, szekrenyekTomb, szekreny);
  function szekreny(idopontokT){
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
  }
  
  //-------------------------------------------------------------------------------------------------------------------------
  $(window).on('rossz', (event) => {//ha kipipálom a checkboxot akkor modositja az adatot rosssz ra
    /* console.log(event.detail.szekreny_id);
    let szekrenyKeres=[];
      let apiVegpont = "/api/szekreny";
      apiVegpont += "?idRossz=" + event.detail.szekreny_id;
      myAjax.adatbeolvas(apiVegpont, szekrenyKeres, keres1);
      window.location.reload();
  });
  function keres1(){
    console.log("feloldott");
  } */
  //event.detail.attr('checked');
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
  $(window).on('felold', (event) => {//ha rányomok a feloldra modositja az adatot
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
    /* let szekrenyKeres=[];
      let apiVegpont = "/api/szekreny";
      apiVegpont += "?id=" + event.detail.szekreny_id;
      myAjax.adatbeolvas(apiVegpont, szekrenyKeres, keres2);
      window.location.reload();
  });
  function keres2(){
    console.log("feloldott");
  } */
//-------------------------------------------------------------------------------------------------
    $(document).ready(function(e) {
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
      myAjax.adatbeolvas(apiVegpont,tomb,szemelyKeresoMegjelenit);
    }
    function szemelyKeresoMegjelenit(tomb){
      console.log(tomb);
      let seged=""
      
      if(tomb.length===1){
        seged+="<span>Neve: "
        seged+=tomb[0].nev+"<br>";
        seged+="Neme: "
        seged+=tomb[0].neme+"<br>";
        seged+="Igazolvány száma: "
        seged+=tomb[0].igazolvany_szam+"<br>";
        seged+="Igazolvány tipusa: "
        seged+=tomb[0].igazolvany_tipusa+"<br>";
        seged+="E-mail címe: "
        seged+=tomb[0].email_cim+"<br>";
        seged+="Jogosultsága: "
        seged+=tomb[0].jogosultsag_id+"<br>";
        seged+="Születési dátuma: "
        seged+=tomb[0].szul_datum+"</span>"+"<br>";
        seged+="Képe: "
        seged+='<img src="' + tomb[0].kep + '"alt="Profilkép"></img>'+"<br>";
        if(tomb[0].MegMeddigJo=== undefined){
          seged+="Nincs bérlete!"
        }else{
          seged+="Bérlete még: "
          seged+=tomb[0].MegMeddigJo;
          seged+=" nap-ig jó";
        }
      }else if(tomb.length>1){
        seged="Egyszerre több személyT talált";
      }
      $(".keresettSzemely").html(seged);
    };
//-------------------------------------------------------------------------------------------------
    $(document).ready(function(e) {
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
      myAjax.adatbeolvas(apiVegpont,tomb,szekrenyKeresoMegjelenit);
    };
    function szekrenyKeresoMegjelenit(tomb){
      console.log(tomb);
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

      /* let seged="";
      if(tomb.length===1){
        seged+="<span>"+"Szekrény száma: ";
        seged+=tomb[0].szekreny_id+"<br>";
        seged+="Állapota: ";
        if(tomb[0].ures_e==="F"){
          seged+="Foglalt"+"<br>";
          seged+='<button data-id="'+tomb[0].szekreny_id+'" class="feloldasGomb">Feloldás</button>';
          seged+='<input type="checkbox" data-id="' +
          tomb[0].szekreny_id +
          '" class="hibasGomb" name="switch" >';
        }else if(tomb[0].ures_e==="R"){
          seged+="Rossz"+"<br>";
          seged+="Típusa: ";
          seged+=tomb[0].tipusa+"</span>";
          seged+='<input type="checkbox" data-id="' +
          tomb[0].szekreny_id +
          '" class="hibasGomb" name="switch" checked>';
        }else{
          seged+="Üres"+"<br>";
        }
        
      }else if(tomb.length>1){
        seged="";
      }
      $(".keresettSzekreny").html(seged); */
      $(".feloldasGomb").on("click", (event) => {
        let id = $(event.target).attr("data-id");
        szekrenyemben.katt(tomb[0].szekreny_id,"kattint","Ü");
      });
      $(".hibasGomb").on("change", (event) => {
        let id = $(event.target).attr("data-id");
        if(event.target.checked===true){
          szekrenyemben.katt(szekreny_id,"kattint","R") ;
        }else{
          szekrenyemben.katt(szekreny_id,"kattint","Ü");
        }
      });
    };
//-------------------------------------------------------------------------------------------------
  

});
