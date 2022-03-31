class Idopontok{
    constructor(idopontok){
        this.idopontokTomb=idopontok;
        this.eltolas=[];
    }
    megjelenit(myCallback,eltolas,hanyOszlopos){
        const hetNapjai = ["Vasárnap","Hétfő","Kedd","Szerda","Csütörtök","Péntek","Szombat"];
        let tablaSzoveg="<table><thead><tr>";
        for (let index = 0+eltolas; index < hanyOszlopos+eltolas; index++) {//tábla cím hány oszlopos
            var datum = new Date(myCallback(index));
            tablaSzoveg+='<th>'+hetNapjai[datum.getDay()]+'<br>'+myCallback(index).slice(0,10)+'</th>'
        }
        tablaSzoveg+='</tr></thead>';
        tablaSzoveg+='<tbody>';
        tablaSzoveg+="<tr>"
        for (let index = 0; index < hanyOszlopos; index++) {
            tablaSzoveg+="<td class=tablaadat"+index+">";
            tablaSzoveg+="</td>";
        }
        tablaSzoveg+="</tr>"
        tablaSzoveg+='</tbody>';
            tablaSzoveg+='</table>';
            $(".tablazat").html(tablaSzoveg);
            
    }
    kattintasTrigger(esemenyneve) {
        let esemeny = new CustomEvent(esemenyneve, {
            detail: this.adat,
        });
        window.dispatchEvent(esemeny);
    }
}