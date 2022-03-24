class AdatokMegjelenitese {
    constructor() {}
    apiOsszealitas(adatok, oszlopNev) {
        let vegApi = superapivegponto + "?" + queryParams.toString();
        console.log(vegApi);
        myAjax.adatbeolvas(
            vegApi,
            adatok,
            (adatok) => {
                
                Alap(oszlopNev);
                rend.elemMegjelenit(adatok, oszlopNev);
            },
            
        );
    }
    adatbeilleszt(adatok, oszlopNevek) {
        console.log(adatok);
        oszlopNevek.forEach((element) => {
            $("#" + element + " ").val(adatok[element]);
            console.log(adatok[element]);
        });
    }

    beviteliMezoGeneralas(
        seged,
        keresetErtek,
        eldont,
        oszlopNevek,
        nemValtoztathato = false,
        tomb2 = [],
        keresetErtek2 = "",
        eldont2 = false
    ) {
        $("#javitas").remove();
        $("#fo").append('<form id="javitas"></form>');

        console.log(seged);
        let txt = "";
        oszlopNevek.forEach((element, index) => {
            txt += '<label for="' + element + '">' + element + ":</label>";

            if (index === nemValtoztathato) {
                txt +=
                    '<input type="text" id="' +
                    element +
                    '" name="' +
                    element +
                    '" autofocus placeholder="' +
                    element +
                    '" disabled' +
                    ">";
            } else if (eldont === true) {
                eldont = false;
                txt += '<select id="' + element + '" name="' + element + '">';
                seged.forEach((element) => {
                    let nev = "";
                    try {
                        let nevek = element[keresetErtek].split(" ");

                        nevek.forEach((neve) => {
                            nev += neve;
                        });
                    } catch (error) {
                        nev = element[keresetErtek];
                    }

                    txt +=
                        '<option value="' +
                        element[keresetErtek] +
                        '"id="' +
                        nev +
                        's1">' +
                        element[keresetErtek] +
                        "</option>";
                });
                txt += "</select>";
            } else if (eldont2 === true) {
                eldont2 = false;
                txt += '<select id="' + element + '" name="' + element + '">';
                tomb2.forEach((element) => {
                    let nev = "";
                    try {
                        let nevek = element[keresetErtek2].split(" ");

                        nevek.forEach((neve) => {
                            nev += neve;
                        });
                    } catch (error) {
                        nev = element[keresetErtek2];
                    }

                    txt +=
                        '<option value="' +
                        element[keresetErtek2] +
                        '"id="' +
                        nev +
                        's2">' +
                        element[keresetErtek2] +
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
