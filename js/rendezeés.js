
class AdminRend{
    constructor(){
      
     
    };
    
   keresoMezo() {
    
    $("#keresSzoveg").on("keyup", () => {

        apivegpont = "http://localhost:3000/adat";
        apivegpont += "?q=" + $("#keresSzoveg").val();
        console.log(apivegpont);
    
        apiOsszealitas();
      });
       
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
        $("article ul").empty();
        txt+='<li class="page-item"><a class="page-link" href="#">Previous</a></li>';
    for (let index = 0; index <adathoszz / $("#listaz").val(); index++) {
        txt+='<li class="page-item"><a class="page-link" >'+index+'</a></li>';
      
    }
    txt+='<li class="page-item"><a class="page-link" href="#">Next</a></li>';
    $("article ul").append(txt);
    }
    

}
