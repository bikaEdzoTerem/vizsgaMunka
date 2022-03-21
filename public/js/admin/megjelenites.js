class AdatokMegjelenitese{
    constructor(){
        
    }
    apiOsszealitas(adatok,oszlopNevek) {
        let vegApi = superapivegponto +"?"+queryParams.toString();
        console.log(vegApi);
        myAjax.adatbeolvas(vegApi, adatok, (adatok,oszlopNevek)=>{$(".elemek").empty();Alap(oszlopNevek);rend.elemMegjelenit(adatok,oszlopNevek)}, oszlopNevek);
    }
    adatbeilleszt(adatok, keresetErtek, eldont,oszlopNevek,keresetErtek2="",eldont2=false) {
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
                    $("#" + nev + "p").attr({ selected: true });
                    
                    eldont = false;
                }
                else {
                  $("#" + element + " ").val(adatok[element]);
                  console.log(adatok[element]);
              }
            }
            if (element == keresetErtek2) {
                if (eldont2===true) {
                    // console.log(adatok)
                    console.log(adatok[element]);
                    let nev = "";
                    try {
                      let nevek = element[keresetErtek2].split(" ");
                      
                      nevek.forEach((neve) => {
                          nev += neve;
                      });
                    } catch (error) {
                      nev=element[keresetErtek2];
                    }
                    //$("#" + segetelem[element] + " ").text(segetelem[element]);
                    $("#" + nev + "p").attr({ selected: true });
                    
                    eldont2 = false;
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
    
    
     beviteliMezoGeneralas(seged, keresetErtek, eldont,oszlopNevek,nemValtoztathato=false,tomb2=[],keresetErtek2="",eldont2=false) {
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
            } else if (eldont === true) {
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
                        '"id="'+
                        nev   +                     
                        'p">' +
                        element[keresetErtek] +
                        '</option>';
                });
                txt += "</select>";
            } 
            else if (eldont2 === true) {
                eldont2 = false;
                txt += '<select id="'+keresetErtek2+'" name="' + keresetErtek2 + '">';
                tomb2.forEach((element) => {
                    let nev = "";
                    try {
                      let nevek = element[keresetErtek2].split(" ");
                      
                      nevek.forEach((neve) => {
                          nev += neve;
                      });
                    } catch (error) {
                      nev=element[keresetErtek2];
                    }
                   
                  
                  
                    txt +=
                        '<option value="' +
                        element[keresetErtek2] +
                        '"id="'+
                        nev+
                        'p">' +
                        element[keresetErtek2] +
                        '</option>';
                });
                txt += "</select>";
            }else {
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