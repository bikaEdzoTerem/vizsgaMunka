@include('layouts.recepcio')
@section('content')
<main>
      <header>
        <form action="{{route('OltozoFoglalasFelvitel1')}}" method="post">
          @csrf
          <div id="kereso">
            {{-- <div id="lekerekitve"></div> --}}
            <div class="bal1">
              <label id="keresoSzoveg"for="fname" >Személy kereső:</label>
              <input type="txt" id="keresoInput" placeholder="Személy kereső" class="keresSzemely" name="ugyfelNev" value="{{old('ugyfelNev')}}"/>
              <div class="keresettSzemely"></div>
            </div>
            {{-- <div id="lekerekitve"></div> --}}
            <div class="jobb1">
              <label id="keresoSzoveg"for="fname">Szekrény kereső:</label>
              <input type="number" id="keresoInput" placeholder="Szekrény kereső" min="0" class="keresSzekrenykulcs" name="szekrenySzama" value="{{old('szekrenySzama')}}"/>
                <div class="keresettSzekreny"></div>
            </div>
            <div class="gomb">
              <button type="submit" class="lefoglal">Lefoglal</button>
            </div>
            <div class="letszam">
              <p id="SzabadSzoveg">Férfi szabad hely:</p>
              <span class="ferfiLetszam"></span>
              <p id="SzabadSzoveg">Női szabad hely:</p>
              <span class="noiiLetszam">100</span>
            </div>
          </div>
              @if(Session::has('sikeres'))
                <div class="hibaüzenet sikeresUzenet">{{Session::get('sikeres')}}</div>
              @endif
              @if(Session::has('sikertelen'))
                <div class="hibaüzenet sikertelenUzenet">{{Session::get('sikertelen')}}</div>
              @endif
        </form>
          
      </header>
    <section>
      <div class="szekrenyValtoztat">
      <select class="szekrenyekValasztas"></select>
      <button type="submit" class="osszesFeloldasGomb">Összes felold</button>
    </div>
      <div  class="szekrenyek"></div>
    </section>
  <footer>
    <div class="szemely">
      {{-- <label id="keresoSzoveg"for="fname">Neve: </label> --}}
      <p class="neve"></p>{{-- <br> --}}
      {{-- <label id="keresoSzoveg"for="fname">Neme: </label> --}}
      <p class="neme"></p>{{-- <br> --}}
      {{-- <label id="keresoSzoveg"for="fname">Igazolvány száma: </label> --}}
      <p class="igazolvanySzama"></p>{{-- <br> --}}
      {{-- <label id="keresoSzoveg"for="fname">Igazolvány típusa: </label> --}}
      <p class="igazolvanyTipusa"></p>{{-- <br> --}}
      <button type="button" class="felviszGomb">Felvisz</button>{{-- <br> --}}
      {{-- <label id="keresoSzoveg"for="fname">E-mail címe: </label> --}}
      <p class="email"></p>{{-- <br> --}}
      {{-- <img src="img_girl.jpg" alt="profilkepe" class="szemelyKep"> --}}
      {{-- <label id="keresoSzoveg"for="fname">Bérlete : </label> --}}
      <p class="berlete"></p>
    </div>
    
  <table >
  <div class="szekreny">
    <div class="circle">
      <p class="szama"></p>
    </div>
    <div class="tartalom">
      <p class="neme"></p>
      <p class="uresE"></p>
      <p ><button type="submit" class="feloldasGomb">Felold</button></p>{{-- <br> --}}
      <p class="check"><input type="checkbox" class="hibasGomb" name="switch" ></p>
    </div>
  </div>
    © Minden jog fenntartva ©<br />
  </footer>
</main>
</body>
</html>
