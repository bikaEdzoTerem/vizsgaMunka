@include('layouts.recepcio')
@section('content')
<main>
      <header>
        <form action="{{route('OltozoFoglalasFelvitel')}}" method="post">
          <div id="kereso">
            @csrf
            <div class="bal1">
              <label id="keresoSzoveg"for="fname" >Személy kereső:</label>
              <input type="txt" placeholder="Személy kereső" class="keresSzemely" name="ugyfelNev" value="{{old('ugyfelNev')}}"/>
              <div class="keresettSzemely"></div>
            </div>
            <div class="jobb1">
              <label id="keresoSzoveg"for="fname">Szekrény kereső:</label>
              <input type="number" placeholder="Szekrény kereső" min="0" class="keresSzekrenykulcs" name="szekrenySzama" value="{{old('szekrenySzama')}}"/>
              <div >
                <table class="keresettSzekreny"></table>
              </div>
            </div>
          </div>
              <button type="submit" class="lefoglal">Lefoglal</button><br>
              @if(Session::has('sikeres'))
                <div class="alert alert-sikeres">{{Session::get('sikeres')}}</div>
              @endif
              @if(Session::has('sikertelen'))
                <div class="alert alert-sikertelen">{{Session::get('sikertelen')}}</div>
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
    <article>
      
      
      
    </article>
    <section>
      <div class="szekrenyek"></div>
    </section>
    
    {{-- <table class="szekrenyek">
      <tbody>
      </tbody>
    </table> --}}
    {{-- <section>
      
      </div>
    </label>
    </table>
    <div class="osszesSzekreny2">
      
    </div>
    <div class="osszesSzekreny"></div>
    <div id="szemelyerror"></div>
  </section> --}}
  
  <footer>
    {{-- <div class="szekreny">
      <h3 class="szama">1</h3>
      <p class="neme">Férfi</p>
      <p class="uresE">Üres</p>
      <button type="submit" class="feloldasGomb">Felold</button>
  </div> --}}
  <table >
    <tbody>
    <tr class="szekreny">
      <td class="szama"></td>
      <td class="neme"></td>
      <td class="uresE"></td>
      <td><button type="submit" class="feloldasGomb">Felold</button></td>
      <td><input type="checkbox" class="hibasGomb" name="switch" ></td>
    </tr>
  </tbody>
</table>
    © Minden jog fenntartva ©<br /></footer>
</main>
</body>
</html>
