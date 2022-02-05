class Kartya {
    constructor(elem, adat,elemnev) {
     
      this.elem = elem;
      elemnev.forEach(element => {
        

        this[element] = this.elem.children("."+element);
      // console.log( this[element] );
      });
    
     
      
      
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
     
      elemnev.forEach(element => {
        

        this[element].html(ertekek[element]);
       
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