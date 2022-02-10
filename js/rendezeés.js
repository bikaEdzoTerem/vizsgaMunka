
class AdminRend{
    constructor(){
      this.termek=[];
      this.megjelenit=1;
    };
    
   keresoMezo(tomb,myAjax) {
    
    $("#keresSzoveg").on("keyup", () => {

        let apivegpont = "http://localhost:3000/adat";
        apivegpont += "?q=" + $("#keresSzoveg").val();
        console.log(apivegpont);
    
        myAjax.adatbeolvas(apivegpont, this.termek, termekLista,tomb);
      });
       
   };

    rendezesTabla(apivegpont){
        let rendezes;
        
        $("#rendezes").on("change", () => {
            switch ($("#rendezes").val()) {
              case "NameListAsc":
                
                  rendezes = "?_sort=eszkoz_neve&_order=asc";
                  apivegpont = "http://localhost:3000/adat";
                  apivegpont += rendezes;
                  myAjax.adatbeolvas(apivegpont, termek, termekLista);
                break;
                case "CostListDesc":
                  rendezes = "?_sort=ar&_order=desc";
                  apivegpont = "http://localhost:3000/adat";
                  apivegpont += rendezes;
                  myAjax.adatbeolvas(apivegpont, termek, admin.termekLista);
                  break;
                  case "NameListDesc":
                    rendezes = "?_sort=eszkoz_neve&_order=desc";
                    apivegpont = "http://localhost:3000/adat";
                    apivegpont += rendezes;
                    myAjax.adatbeolvas(apivegpont, termek, termekLista);
                  break;
                  case "CostListAsc":
                    rendezes = "?_sort=ar&_order=asc";
                    apivegpont = "http://localhost:3000/adat";
                    apivegpont += rendezes;
                    myAjax.apivegpont(apivegpont, termek, termekLista);
        
                    break;
              default:
                break;
            };
            });
    }

    rendezoMezoLetreHozas(tomb){
        let txt="";
        $("#rendezes").empty();
        
        tomb.forEach(element => {
            txt+='<option id="'+element+'Asc" value="'+element+'!asc">'+element+' szerint csökkenő</option>';
            txt+='<option id="'+element+'Desc" value="'+element+'!desc">'+element+' szerint emelkedő</option>';
        });
        $("#rendezes").append(txt);

    
    };
    dbElem(ertek){
      "?_start="+megjelenit+"&_end="+megjelenit+ertek
    }

}

