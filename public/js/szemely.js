class Szemely{
    constructor(node,adat)  {
        this.node = node;
        this.adat = adat;
        this.neve = this.node.children(".neve");
        this.neme = this.node.children(".neme");
        this.igazolvanySzam = this.node.children(".igazolvanySzama");
        this.igazolvanyTipus = this.node.children(".igazolvanyTipusa");
        this.email = this.node.children(".email");
        this.kep = this.node.children(".szemelyKep");
        this.berlet = this.node.children(".berlete");
        this.setAdat(this.adat);
        this.felvisz = this.node.children(".felviszGomb");
        this.felvisz.on("click ", () => {
            this.kattintasTrigger("felviszAdat");
        });

        this.fajlKivalaszt = this.node.children(".fajlKivalaszt");
        this.fajlKivalaszt.on("change ", () => {
            this.kattintasTrigger("kivalasztFile");
        });

        
        
    }
    kattintasTrigger(esemenyneve) {
        let esemeny = new CustomEvent(esemenyneve, {
            detail: {
                adat: this.adat,
                div:this.node
            }
            /* detail: this.adat,//ezzel adatokat tudok átadni */
        });
        window.dispatchEvent(esemeny);
      }
      setAdat(adat){
        this.adat = adat;
        this.neve.text("Neve: "+adat.name);
        this.neme.text("Neme: "+adat.neme);
        this.igazolvanySzam.text("Igazolvány száma: "+adat.igazolvany_szam);
        this.igazolvanyTipus.text("Igazolvány típusa: "+adat.igazolvany_tipusa);
        this.email.text("E-mail címe: "+adat.email);
        this.kep.attr("src","kepek/SzemelyKepek/"+adat.kep);/* +".png" */
        if(adat.MegMeddigJo){
            this.berlet.text("Bérlete: "+adat.MegMeddigJo+"napig jó");
        }else{
            this.berlet.text("Bérlete: NINCS!").css("color", "red");
        }
      }
}