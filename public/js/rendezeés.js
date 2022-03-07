class AdminRend{
    constructor(){
      
     
    };
    
   keresoMezo() {
    

    megjelenit=0;
        rendezes= "?q=" + $("#keresSzoveg").val();
       
        
    
        apiOsszealitas();
   };
       
   

    rendezesTabla(){
        
        
        
          let darabolas = $("#rendezes").val();
          let vegtemek = darabolas.split("!");
          console.log(vegtemek);
          rendezes = "?_sort=" + vegtemek[0] + "&_order=" + vegtemek[1] + "";
          console.log("?_sort=" + vegtemek[0] + "&_order=" + vegtemek[1] + "");
          apiOsszealitas();
           
    }

    rendezoMezoLetreHozas(){
        let txt="";
        $("#rendezes").empty();
        
        tomb.forEach(element => {
            txt+='<option id="'+element+'Asc" value="'+element+'!asc">'+element+' szerint csökkenő</option>';
            txt+='<option id="'+element+'Desc" value="'+element+'!desc">'+element+' szerint emelkedő</option>';
        });
        $("#rendezes").append(txt);

    
    };
    oldalakSzama(mindenadat){
        let txt="";
        console.log(mindenadat);
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
    
    apiOsszealitas();
  
  }