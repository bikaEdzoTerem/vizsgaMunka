class Idopont{
    
    constructor(node,adat){
        console.log(adat);
        this.node = node;
        this.adat = adat;
        this.ugyfel_nev = this.node.children(".szemelyNeve");
        this.ugyfel_nev.text("Név: "+adat.nev);
        
        this.datumtol=this.node.children(".datumtol");
        this.datumtol.text(adat.datum+" órától");
        /* this.datumig=this.node.children(".datumig");
        this.datumig.text(adat.datum.slice(0,11)+(parseInt(adat.datum.slice(11,13))+parseInt(adat.ora.slice(0,1)))+" óráig"); */
        
        this.ora = this.node.children(".ora");
        this.ora.text(adat.ora.slice(0,1)+" órás edzés");
        this.ora.text("Edzés hossza: "+adat.ora.slice(1,5)+" óra");

        this.feloldas = this.node.children(".feloldasGomb");
        this.feloldas.on("click ", () => {
            this.kattintasTrigger("felold");

        });
    }
    kattintasTrigger(esemenyneve) {
        let esemeny = new CustomEvent(esemenyneve, {
            detail: this.adat,
        });
        window.dispatchEvent(esemeny);
    }
    
    /* megjelenit(tomb,myCallback){
        
        
        tablaSzoveg+='</tbody>';
        tablaSzoveg+='</table>';
        $(".idopontok").html(tablaSzoveg);
        $(".feloldasGomb").on("click", (event) => {
            console.log($(event.target).attr("data-id"));
            let id=$(event.target).attr("data-id");
            const kattintas=id.split(".");
        });
    } */
}