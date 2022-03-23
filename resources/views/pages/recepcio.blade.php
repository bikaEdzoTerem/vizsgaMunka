@include('layouts.recepcio')
@section('content')
<main>
      <header>
        <nav>
          <ul>
            <li><a href="/recepcio">Recepcio felulet</a></li>
            <li><a href="#">Szántai Barna</a></li>
            <li><a href="#">Bogdán Gábor</a></li>
          </ul>
        </nav>
        <form action="{{route('OltozoFoglalasFelvitel')}}" method="post">
        @csrf
          <p>Szántai Barna <br> Bogdán Gábor<br>Joó Edvárd<br>Gutyina András</p>
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
    <table border="1">
      <tr>
        <td>Szekrény szám</td>
        <td>Neme</td>
        <td>Üres-e</td>
        <td>Felodás</td>
      </tr>
      @foreach ($szekenies as $adat)
      <tr>
        <td>{{$adat['szekreny_id']}}</td>
        <td>{{$adat['tipusa']}}</td>
        @if ($adat->ures_e=="Ü")
        <td><a>Üres</a></td>
        @elseif($adat->ures_e=="F")
          <td><a>Foglat</a></td>
          @elseif($adat->ures_e=="R")
          <td><a>Rossz!</a></td>
        @endif
        @if ($adat->ures_e=="F")
          <td><a href={{"felold/".$adat['szekreny_id']}}><button >Felold</button></a></td>
          @else
          <td><a></a></td>
          @endif
          @if($adat->ures_e=="R")
            @csrf
            <td><a href={{"elront/".$adat['szekreny_id']}}><input type="checkbox" {{-- class="hibasGomb" --}} checked></a></td>
          @else
            @csrf
            <td><a href={{"elront/".$adat['szekreny_id']}}><input type="checkbox" {{-- class="hibasGomb" --}}></a></td>
          </form>
          @endif
      </tr>
      @endforeach
    </table>
    <div class="osszesSzekreny2">
      
    </div>
    <div class="osszesSzekreny"></div>
    <div id="szemelyerror"></div>
  </section>
  <footer>© Minden jog fenntartva ©<br /></footer>
</main>
</body>
</html>
