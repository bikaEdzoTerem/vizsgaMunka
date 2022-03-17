class AdminRend{
    constructor(){
      let megjelenit = 0;
     
    };
    
   keresoMezo() {
    

    megjelenit=0;
       // keres= "?q=" + $("#keresSzoveg").val();
        queryParams.set("q",$("#keresSzoveg").val());
       
        
    
        adatMeg.apiOsszealitas(termek,Oszlopnev);
   };
       
   

    rendezesTabla(){
        
        
        
          let darabolas = $("#rendezes").val();
          let vegtemek = darabolas.split("!");
          console.log(vegtemek);
         // rendezes = "?_sort=" + vegtemek[0] + "&_order=" + vegtemek[1] + "";
         queryParams.set("_sort",vegtemek[0])
         queryParams.set("_order",vegtemek[1])
          console.log("?_sort=" + vegtemek[0] + "&_order=" + vegtemek[1] + "");
          adatMeg.apiOsszealitas(termek,Oszlopnev);
           
    }

    rendezoMezoLetreHozas(nev){
        let txt="";
        $("#rendezes").empty();
        
        nev.forEach(element => {
            txt+='<option id="'+element+'Asc" value="'+element+'!asc">'+element+' szerint csökkenő</option>';
            txt+='<option id="'+element+'Desc" value="'+element+'!desc">'+element+' szerint emelkedő</option>';
        });
        $("#rendezes").append(txt);

    
    };
    elemMegjelenit(termekek, tomb) {
      
      rend.oldalakSzama(termekek);
      const szuloElem = $(".elemek");
      const sablonElem = $(".elem");
      //  myAjax.getjson("alapnevek.json", tomb);
  
      szuloElem.empty();
      termekek.forEach(function (elem, index) {
          if (
              (megjelenit <= index) &
              (megjelenit + parseInt($("#listaz").val()) > index)
          ) {
              let node = sablonElem.clone().appendTo(szuloElem);
              const obj = new Kartya(node, elem, tomb);
          }
      });
      sablonElem.hide(); //sablonelem eltávolítása
  }


    oldalakSzama(mindenadat){
        let txt="";
       // console.log(mindenadat);
        let adathoszz=mindenadat.length ;
          $("#navig").empty();
          
      for (let index = 0; index <adathoszz / $("#listaz").val(); index++) {
          $("#navig").append(' <button class="oldal"  id='+index+'>'+index+'</button>');
          $('#'+index+'').on("click", function() {
            oldalValt(index);
              console.log(index);
             });
      }
    }
   

     
    

} 
function oldalValt(ertek){
    megjelenit=($("#listaz").val()*ertek)
    console.log($("#listaz").val()*ertek);
    
    adatMeg.apiOsszealitas(termek,Oszlopnev);
  
  }