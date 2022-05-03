class Idopont{
    
    constructor(node,adat){
        this.node = node;
        this.adat = adat;

        this.honapNev = this.node.children().children(".honap");
        this.napNev = this.node.children().children(".nap");
        this.datum = this.node.children().children(".datum");
        this.ora = this.node.children().children(".ora1");
        this.oras = this.node.children().children(".oras");
        this.ev = this.node.children().children(".ev");
        this.ugyfel_nev = this.node.children().children(".szemelyNeve");
        this.datumtol=this.node.children().children(".datumtol");
        this.ora = this.node.children().children(".ora");
        this.setAdat(this.adat);

        this.feloldas = this.node.children().children(".feloldasGomb");
        this.feloldas.on("click ", () => {
        this.kattintasTrigger("felold");
        });
        this.modosit = this.node.children().children(".modositGomb");
        this.modosit.on("click ", () => {
        this.kattintasTrigger("modosit");
        });
        //Módosítás------------------------------------------------
        this.nevModosit = this.node.children().children(".nevModosit");
        this.datumModosit = this.node.children().children(".datumModosit");
        this.modositOrara = this.node.children().children(".modositOrara");
        this.modositNev = this.node.children().children(".modositNev");
        this.modositEdzesHossz = this.node.children().children(".modositEdzesHossz");
        this.modositFelvisz = this.node.children().children(".modositFelvisz");
        this.modositSetAdat(this.adat);
        //---------------------------------------------------------
        this.modositFelvisz.on("click ", () => {
        this.kattintasTrigger("modositFelvitel");
        });

        this.megseModosit = this.node.children().children(".megseModosit");
        this.megseModosit.on("click ", () => {
        this.kattintasTrigger("megseModositas");
        });
    }
    kattintasTrigger(esemenyneve) {
        let esemeny = new CustomEvent(esemenyneve, {
            detail: {
                adat: this.adat,
                div:this.node
            }
        });
        window.dispatchEvent(esemeny);
    }
    honap(datum){
        const honapNevek = ["Január", "Február", "Március", "Április", "Május", "Június","Július", "Augusztus", "Szeptember", "Október", "November", "December"];
        let d = new Date(datum);
        return honapNevek[d.getUTCMonth()];
    }
    nap(datum){
        const napNevek = ['Vasárnap', 'Hétfő', 'Kedd', 'Szerda', 'Csütörtok', 'Péntek', 'Szombat'];
        let d = new Date(datum);
        return napNevek[d.getDay()];
    }
    oraFormaz(datum){
        if(datum.getMinutes()<10){
            return datum.getHours()+":"+"0"+datum.getMinutes();
        }
        return datum.getHours()+":"+datum.getMinutes();
    }
    setAdat(adat) {
        this.adat = adat;
        this.honapNev.text(this.honap(adat.datum));
        this.napNev.text(this.nap(adat.datum));
        let d = new Date(adat.datum);
        this.datum.text(d.getDate());
        this.ora.text(this.oraFormaz(d));
        this.oras.text(adat.ora.slice(1,5)+"-perc");
        this.ev.text(d.getFullYear());
        this.ugyfel_nev.text(adat.name);
        this.datumtol.text(adat.datum+" órától");
        this.ora.text("Edzés hossza: "+adat.ora.slice(1,5)+" óra");
    }
    modositSetAdat(adat){
        this.nevModosit.val(adat.name);
        this.datumModosit.val(adat.datum.slice(0,10));
        this.modositOrara.val(adat.datum.slice(11, 16));
        this.modositNev.val(adat.name);
        this.modositEdzesHossz.val(adat.ora.slice(0,5));
    }
}