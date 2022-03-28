class Szekrenyek {
  constructor(tomb) {
      this.szekrenyTomb = tomb;
  }
  getTomb(tomb) {
      console.log(tomb);
  }
  getSzabadHelySzam(tomb, nem) {
      let db = 0;
      for (let index = 0; index < tomb.length; index++) {
          if (
              tomb[index].ures_e == "Ü" &&
              !(tomb[index].ures_e == "R") &&
              tomb[index].tipusa == nem
          ) {
              db++;
          }
      }
      return db;
  }
  katt(id, neve, uresErtek) {
      this.szekrenyTomb[id - 1].ures_e = uresErtek;
      let esemeny = new CustomEvent(neve, {
          detail: {
              tomb: this.szekrenyTomb,
              id: id - 1,
          },
      });
      window.dispatchEvent(esemeny);
  }
  megjelenit(tomb, hova) {
      /*   const szuloElem = $('.szekrenyek');
    const sablonElem = $('footer .szekreny');
  sablonElem.show();
  szuloElem.empty();
  idopontokT.forEach(function (elem) {
    console.log(elem);
    let node = sablonElem.clone().appendTo('.szekrenyek');
    console.log("kreal");
    const obj = new Szekreny(node, elem);
  });
  sablonElem.hide(); 
*/

      console.log(tomb);
      
      let fejléc ='<table class="szekrenyekTabla"><thead><tr class="cim"> <th>Szekrény szám</th> <th>Neme</th> <th>Üres-e</th> <th><button type="submit" class="osszesFeloldasGomb">Összes felold</button></th> <th></th> </tr></thead>';
      let txt=fejléc+'';
      for (let index = 0; index < tomb.length; index++) {
        txt+='<tr class="tablaadat0"></tr>'
      }
      txt += '</table>';

      $(hova).html(txt);

      /* $(".hibasGomb").on("change", (event) => {
          let id = $(event.target).attr("data-id");
          if (event.target.checked === true) {
              this.katt(id, "kattint", "R");
          } else {
              this.katt(id, "kattint", "Ü");
          }
          console.log(event.target.checked);
      }); */
  }
}
