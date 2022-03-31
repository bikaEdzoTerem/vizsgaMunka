@include('layouts.recepcio')
@section('content')
<main>
      <header>
        <form action="{{route('OltozoFoglalasFelvitel1')}}" method="post">
          <div id="kereso">
            @csrf
            <div id="lekerekitve"></div>
            <div class="bal1">
              <label id="keresoSzoveg"for="fname" >Személy kereső:</label>
              <input type="txt" id="keresoInput" placeholder="Személy kereső" class="keresSzemely" name="ugyfelNev" value="{{old('ugyfelNev')}}"/>
              <div class="keresettSzemely"></div>
            </div>
            <div id="lekerekitve"></div>
            <div class="jobb1">
              <label id="keresoSzoveg"for="fname">Szekrény kereső:</label>
              <input type="number" id="keresoInput" placeholder="Szekrény kereső" min="0" class="keresSzekrenykulcs" name="szekrenySzama" value="{{old('szekrenySzama')}}"/>
                <table class="keresettSzekreny"></table>
            </div>
          </div>
              <button type="submit" class="lefoglal">Lefoglal</button><br>
              @if(Session::has('sikeres'))
                <div class="hibaüzenet sikeresUzenet">{{Session::get('sikeres')}}</div>
              @endif
              @if(Session::has('sikertelen'))
                <div class="hibaüzenet sikertelenUzenet">{{Session::get('sikertelen')}}</div>
              @endif
          </form>
          <div class="letszam">
            <p id="SzabadSzoveg">Férfi szabad hely:</p>
            <span id="ferfiLetszam"></span>
            <p id="SzabadSzoveg">Női szabad hely:</p>
            <span id="noiiLetszam">100</span>
          </div>
      </header>
    
    <div id="szemelyMegjelenites" class="Lefoglatak">
    </div>
    <section>
      <button type="submit" class="osszesFeloldasGomb">Felold</button>
      <div  class="szekrenyek"></div>
    </section>
  <footer>
    <div class="szemely">
      <label id="keresoSzoveg"for="fname">Neve: </label>
      <p class="neve"></p><br>
      <label id="keresoSzoveg"for="fname">Neme: </label>
      <p class="neme"></p><br>
      <label id="keresoSzoveg"for="fname">Igazolvány száma: </label>
      <p class="igazolvanySzama"></p><br>
      <label id="keresoSzoveg"for="fname">Igazolvány típusa: </label>
      <p class="igazolvanyTipusa"></p><br>
      <button type="button" class="felviszGomb">Felvisz</button><br>
      <label id="keresoSzoveg"for="fname">E-mail címe: </label>
      <p class="email"></p><br>
      {{-- <img src="img_girl.jpg" alt="profilkepe" class="szemelyKep"> --}}
      <label id="keresoSzoveg"for="fname">Bérlete : </label>
      <p class="berlete"></p>
    </div>
    
  <table >
    <!-- <tbody>
    <tr class="szekreny">
      <td class="szama"></td>
      <td class="neme"></td>
      <td class="uresE"></td>
      <td><button type="submit" class="feloldasGomb">Felold</button></td>
      <td class=""><input type="checkbox" class="hibasGomb" name="switch" ></td>
    </tr>
  </tbody> -->
  <div class="szekreny">
    <p class="szama"></p><br>
    <p class="neme"></p><br>
    <p class="uresE"></p><br>
    <p ><button type="submit" class="feloldasGomb">Felold</button></p><br>
    <p ><input type="checkbox" class="hibasGomb" name="switch" ></p><br>
  </div>
    © Minden jog fenntartva ©<br /></footer>
</main>
</body>
</html>
