class Idopontok{
    constructor(idopontok){
        /* this.idopontokElem=$(".tablazat"); */
        this.idopontokTomb=idopontok;
        this.eltolas=[];
    }
    megjelenit(/* idopontok, */myCallback,eltolas,hanyOszlopos){
        /* this.eltolas.push(0); */
        /* console.log(eltolas); */
        /* let eltolas=1; */
        /* let hányOszlopos=7; */
        const hetNapjai = ["Vasárnap","Hétfő","Kedd","Szerda","Csütörtök","Péntek","Szombat"];
        let tablaSzoveg=/* gombB+gombJ+ */"<table><thead><tr>";
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
            /* const szuloElem = $('.tablaadat');
            const sablonElem = $('footer .idopont');
            sablonElem.show();
            szuloElem.empty();
            for (let index = 0; index < hányOszlopos; index++) {
                this.idopontokTomb.forEach(function (elem) {
                        console.log(index);
                        let datum1=elem.datum.slice(0,10);
                        let datum2=myCallback(index).slice(0,10);
                        if(datum2===datum1){
                            let node = sablonElem.clone().appendTo($('.tablaadat'+index));
                            const obj = new Idopont(node, elem);
                        }
                    });
            }
            sablonElem.hide(); */
            /* $(window).on('felold', (event) => {
                console.log("torol"+event.detail.id);
            myAjax.adattorles(apiVegpont, event.detail.id);
            apiVegpont = "http://localhost:4005/szemelyiEdzesek";
        }); */
        /* $(".JobbraNovel").on("click", () => {//rákattintás az oldalon
            this.eltolas++;
            console.log(eltolas);
          });
          $(".BalraCsokkent").on("click", () => {//rákattintás az oldalon
            this.eltolas--;
            console.log(eltolas);
          }); */
    }
    kattintasTrigger(esemenyneve) {
        let esemeny = new CustomEvent(esemenyneve, {
            detail: this.adat,
        });
        window.dispatchEvent(esemeny);
    }
    letrehoz(){

    }
    setIdopontok(idopont){
        console.log(idopont);
        this.idopontokTomb.push(idopont);
        this.megjelenit()
    }
}