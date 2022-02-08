class MyAjax {
  constructor() {}

  KattintasTrigger() {
    let esemeny = new CustomEvent("sorszam", { detail: this.id });
    window.dispatchEvent(esemeny);
  }

  adatbeolvas(faljnev, tomb, myCallback) {
    this.adatbeolvas(faljnev, tomb, myCallback, false);
  }
  adatbeolvas(faljnev, tomb, myCallback, seged) {
   tomb.splice(0, tomb.length);
    $.ajax({
      url: faljnev,
      type: "GET",
      success: function (result) {
        result./*api vegpont nélkül a tömb belseje.*/ forEach((value) => {
          tomb.push(value);
        });
        if (seged === false) {
          myCallback(tomb);
        } else {
          myCallback(tomb, seged);
        }
        //console.log(tomb);
      },
    });
  }

  adatkuldes(faljnev, adat) {
    $.ajax({
      url: faljnev,
      type: "POST",
      data: adat,
      success: function (result) {
        console.log(result);
      },
      //console.log(tomb);
    });
  }

  adattorles(faljnev, id) {
    $.ajax({
      url: faljnev + "/" + id,
      type: "DELETE",
      success: function (result) {
        console.log(result);
      },
      //console.log(tomb);
    });
  }

  adatmodosit(faljnev, adat, id) {
    $.ajax({
      url: faljnev + "/" + id,
      type: "PUT",
      data: adat,
      success: function (result) {
        console.log(result);
      },
      //console.log(tomb);
    });
  }
}
