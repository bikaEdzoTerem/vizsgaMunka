class AdatokMegjelenitese{
constructor(){
    
}
apiOsszealitas(adatok,oszlopNevek) {
    let vegApi = superapivegponto +"?"+queryParams.toString();
    console.log(vegApi);
    myAjax.adatbeolvas(vegApi, adatok, (adatok,oszlopNevek)=>{$(".elemek").empty();Alap(oszlopNevek);rend.elemMegjelenit(adatok,oszlopNevek)}, oszlopNevek);
}
adatbeilleszt(adatok, keresetErtek, eldont,oszlopNevek) {
    console.log()
    oszlopNevek.forEach((element) => {
        if (element == keresetErtek) {
            if (eldont == true) {
                // console.log(adatok)
                console.log(adatok[element]);
                nev = "";
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


 beviteliMezoGeneralas(seged, keresetErtek, eldont,oszlopNevek) {
    $("#javitas").remove();
    $("#fo").append('<form id="javitas"></form>');

    console.log(seged);
    let txt = "";

    oszlopNevek.forEach((element) => {
        console.log(element);

        txt += '<label for="' + element + '">' + element + ":</label>";

        if (tomb[0] == element) {
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
            txt += '<select id="eszozneve" name="' + keresetErtek + '">';
            seged.forEach((element) => {
              nev = "";
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