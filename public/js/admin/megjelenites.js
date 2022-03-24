class AdatokMegjelenitese{
constructor(){
    
}
apiOsszealitas(adatok,oszlopNevek) {
    let vegApi = superapivegponto +"?"+queryParams.toString();
    console.log(vegApi);
    myAjax.adatbeolvas(vegApi, adatok, (adatok,oszlopNevek)=>{$(".elemek").empty();Alap(oszlopNevek);rend.elemMegjelenit(adatok,oszlopNevek)}, oszlopNevek);
}
adatbeilleszt(adatok, keresetErtek, eldont,oszlopNevek) {
    console.log(adatok)
    oszlopNevek.forEach((element) => {
        if (element == keresetErtek) {
            if (eldont == true) {
                // console.log(adatok)
                console.log(adatok[element]);
                let nev = "";
                try {
                  let nevek = element[keresetErtek].split(" ");
                  
                  nevek.forEach((neve) => {
                      nev += neve;
                  });
                } catch (error) {
                  nev=element[keresetErtek];
                }
                //$("#" + segetelem[element] + " ").text(segetelem[element]);
                $("#" + nev + "").attr({ selected: true });

                eldont = false;
            }
            else {
              $("#" + element + " ").val(adatok[element]);
              console.log(adatok[element]);
          }
        } else {
            $("#" + element + " ").val(adatok[element]);
            console.log(adatok[element]);
        }
    });
}


 beviteliMezoGeneralas(seged, keresetErtek, eldont,oszlopNevek,nemValtoztathato=false) {
    $("#javitas").remove();
    $("#fo").append('<form id="javitas"></form>');

    console.log(seged);
    let txt = "";
    oszlopNevek.forEach((element,index) => {
        

        txt += '<label for="' + element + '">' + element + ":</label>";

        if ( index=== nemValtoztathato) {
            txt +=
                '<input type="text" id="' +
                element +
                '" name="' +
                element +
                '" autofocus placeholder="' +
                element +
                '" disabled>';
        } else if (eldont == true) {
            eldont = false;
            txt += '<select id="'+keresetErtek+'" name="' + keresetErtek + '">';
            seged.forEach((element) => {
              let nev = "";
              try {
                let nevek = element[keresetErtek].split(" ");
                
                nevek.forEach((neve) => {
                    nev += neve;
                });
              } catch (error) {
                nev=element[keresetErtek];
              }
              
                txt +=
                    '<option value="' +
                    element[keresetErtek] +
                    '"id="' +
                    nev +
                    '">' +
                    element[keresetErtek] +
                    "</option>";
            });
            txt += "</select>";
        } else {
            txt +=
                '<input type="text" id="' +
                element +
                '" name="' +
                element +
                '" autofocus placeholder="' +
                element +
                '" required>';
        }
    });

    $("#javitas").append(txt);
    $("#javitas").append(`<button type="button" id="kuld" >küld</button`);
}


}