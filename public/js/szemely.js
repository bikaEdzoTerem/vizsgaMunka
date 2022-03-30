class Szemely{
    constructor(node,adat)  {
        this.node = node;
        this.adat = adat;
        this.neve = this.node.children(".neve");
        this.neve.text(adat.nev);

        this.neme = this.node.children(".neme");
        this.neme.text(adat.neme);

        this.igazolvanySzam = this.node.children(".igazolvanySzama");
        this.igazolvanySzam.text(adat.igazolvany_szam);

        this.igazolvanyTipus = this.node.children(".igazolvanyTipusa");
        this.igazolvanyTipus.text(adat.igazolvany_tipusa);

        this.felvisz = this.node.children(".felviszGomb");
        this.felvisz.on("click ", () => {
            this.kattintasTrigger("felviszAdat");
        });

        this.email = this.node.children(".email");
        this.email.text(adat.email_cim);

        /* this.kep.text(adat.kep);
        this.kep = this.node.children(".szemelyKep"); */

        this.berlet = this.node.children(".berlete");
        this.berlet.text(adat.MegMeddigJo);
    }
    kattintasTrigger(esemenyneve) {// A főablakhoz adom az eseményt,
        let esemeny = new CustomEvent(esemenyneve, {
            detail: this.adat,//ezzel adatokat tudok átadni
        });
        window.dispatchEvent(esemeny);
        //Az eseményt majd a script.js-ben el tudom kapni.
      }
}