class Kartya {
    constructor(elem, adat,elemnev) {
     
      this.elem = elem;
      elemnev.forEach(element => {
        

        this[element] = this.elem.children("."+element);
       console.log( this[element] );
      });
     /*for (let i = 0; i < elemnev.length; i++) {
        this[elemnev[i]] = this.elem.children("."+elemnev[i]);
       console.log(elemnev[i])
      }*/
     
      
      
      this.adat = adat;  
      
      this.setAdatok(adat,elemnev); 
      this.elem.on("click",() =>{
        this.torol();
        })
        this.elem.on("click",() =>{
            this.modosit();
            })
    
    
    }

    setAdatok(ertekek,elemnev){
     /* console.log(elemnev);
      elemnev.forEach(element => {
        console.log(element);
        this.element.html(ertekek.element);
      });*/
     /*for (let i = 0; i < elemnev.length; i++) {
       console.log(elemnev[i]);
        this.elemnev[i].html(ertekek.elemnev[i]);
        
      }*/
    /*   this.cim.html(ertekek.nev);
      //this.kep.attr("src", ertekek.kep);
      this.email.html(ertekek.email);
      this.jogosultsag.html(ertekek.jogosultsag_id);
      this.szulDatum.html(ertekek.szul);
      this.Neme.html(ertekek.neme);
      this.igazolvanyszam.html(ertekek.igazolvany);
      this.igazolvanyTipusa.html(ertekek.igazolvany); */
      
      elemnev.forEach(element => {
        

        this[element].html(ertekek[element]);
       //console.log( this[element] );
      });
    
      }

      torol() {
        let esemeny = new CustomEvent("torol", { detail: this.adat });
        window.dispatchEvent(esemeny);
        console.log("bent vagyokk azéterben ");
      }
      modosit() {
        let esemeny = new CustomEvent("modosit", { detail: this.adat });
        window.dispatchEvent(esemeny);
        console.log("bent vagyokk azéterben ");
      }
    }