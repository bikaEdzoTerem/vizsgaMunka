class Szekreny {
  constructor(node,adat)  {
    this.node = node;
    this.adat = adat;
    this.syekreny_szama = this.node.children(".szama");
    this.syekreny_szama.text(adat.szekreny_id);

    this.szekreny_neme = this.node.children(".neme");
    this.szekreny_neme.text(adat.tipusa);

    this.szekreny_uresE = this.node.children(".uresE");
    if(adat.ures_e==="Ü"){
      this.szekreny_uresE.text("Üres");
    }else if(adat.ures_e==="R"){
      this.szekreny_uresE.text("Rossz!");
    }else if(adat.ures_e==="F"){
      this.szekreny_uresE.text("Foglalt");
    }
    this.szekreny_feloldas = this.node.children().children(".feloldasGomb");
    this.szekreny_feloldas.on("click ", () => {
      this.kattintasTrigger("felold");
    });

    this.szekreny_rosszCheckBox = this.node.children().children(".hibasGomb");
    this.szekreny_rosszCheckBox.on("input ", () => {
      this.kattintasTrigger("rossz");
    });
  }
  kattintasTrigger(esemenyneve) {// A főablakhoz adom az eseményt,
    let esemeny = new CustomEvent(esemenyneve, {
        detail: this.adat,//ezzel adatokat tudok átadni
    });
    window.dispatchEvent(esemeny);
    //Az eseményt majd a script.js-ben el tudom kapni.
  }

  adatAtiras(ertek) {
    this.txt =
      "<tr><th>" + ertek.szekreny_id + "</th>" + "<th>" + ertek.tipus + "</th>";
    let seged = "Üres";
    let segedGomb = "";
    if (ertek.urese === false) {
      seged = "Foglalt";
      segedGomb =
        '<th><button data-id="' +
        ertek.szekreny_id +
        '" class="feloldasGomb">Feloldás</button></th>';
    }

    this.txt += "<th>" + seged + "</th>" + segedGomb + "</tr>";
    this.kosarbaGombElem = $(".feloldasGomb");

    //console.log(this.txt);
  }
}
/* class SzekrenyFoglalt extends Szekreny{
    constructor(elem,adat){
        super(elem, adat)
        this.idElem=this.elem.children(".foglalas");
    }

} */
