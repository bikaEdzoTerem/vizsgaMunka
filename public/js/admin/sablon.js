class Kartya {
  constructor(elem, adat, elemnev) {
    this.elem = elem;
   
   
    elemnev.forEach((element) => {
      this[element] = this.elem.children("." + element);
      
    });

    this.adat = adat;
    
    this.termekTorles = this.elem.children(".torol");
    this.termekModosit = this.elem.children(".modosit");
    this.setAdatok(adat, elemnev);
    this.termekTorles.on("click ", ()=> {
      
      this.torol();
          });
    this.termekModosit.on("click ", ()=>{
      
      this.modosit();
      
    });
  }

  setAdatok(ertekek, elemnev) {
    
    elemnev.forEach((element) => {
      this[element].html(ertekek[element]);
    });
  }
  

  torol() {
    let esemeny = new CustomEvent("torol", { detail: this.adat });
    window.dispatchEvent(esemeny);
    
  }
  modosit() {
    let esemeny = new CustomEvent("modosit", { detail: this.adat });
    window.dispatchEvent(esemeny);
    
  }
}
