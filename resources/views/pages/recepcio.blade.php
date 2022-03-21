@include('layouts.recepcio')
@section('content')
<main>
      <header>
        <nav>
          <ul>
            <li><a href="/recepcio">Recepcio felulet</a></li>
            <li><a href="#">Page 1</a></li>
            <li><a href="#">Page 2</a></li>
          </ul>
        </nav>
        <form action="{{route('OltozoFoglalasFelvitel')}}" method="post">
        @csrf
              <input id="katt1" placeholder="személy neve" type="txt"  class="szemelyLefoglal" name="ugyfelNev" value="{{old('ugyfelNev')}}"/>
              <input id="katt2" type="number" placeholder="szekrény száma" min="0" pattern='([0-9]+)'  class="kulcsLefoglal" name="szekrenySzama" value="{{old('szekrenySzama')}}"/>
              <span id="szekrenyerror"></span>
              <button type="submit" class="lefoglal">Lefoglal</button>
            </div>
            <p id="Szabad">Férfi szabad hely:</p>
            <span id="ferfiLetszam"></span>
            <p id="Szabad">Női szabad hely:</p>
            <span id="noiiLetszam">100</span>
            @if(Session::has('sikeres'))
          <div class="alert alert-sikeres">{{Session::get('sikeres')}}</div>
          @endif
          @if(Session::has('sikertelen'))
            <div class="alert alert-sikertelen">{{Session::get('sikertelen')}}</div>
          @endif
          </form>
        
      </header>
    
    <div id="szemelyMegjelenites" class="Lefoglatak">
      <div  class="bal" style="display:none;">
        <table>
          <thead><tr><th>Neve</th><th>Képe</th><th>Bérlete</th></tr></thead>
          <tbody><tr><td id="neve" ></td><td id="kep"></td><td id="berletDatum"></td></tr></tbody>
        </table>
      </div>
      <div class="jobbTablazatSzekreny" style="display:none;"></div>
    </div>
    <article>
      <div id="kereso">
        <div id="jobb">
          <form>
            <label id="keresoSzoveg"for="fname">Személy kereső:</label>
            <input type="txt" placeholder="Személy kereső" class="keresSzemely"/>
            <div class="keresettSzemely"></div>
          </form>
        </div>
        <div id="bal">
            <form>
            <label id="keresoSzoveg"for="fname">Szekrény kereső:</label>
            <input type="number" placeholder="Szekrény kereső" min="0" class="keresSzekrenykulcs"/>
          </form>
          <div class="keresettSzekreny"></div>
        </div>
        </div>
    </article>
    <section>
      
      </div>
    </label>
    <div class="osszesSzekreny"></div>
    <div id="szemelyerror"></div>
  </section>
  <footer>© Minden jog fenntartva ©<br /></footer>
</main>
</body>
</html>
