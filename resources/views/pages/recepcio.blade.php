@include('layouts.recepcio')
@section('content')
<main>
      <header>
        <nav>
          <ul>
            <li><a href="/recepcio">Recepcio felulet</a></li>
          </ul>
        </nav>
        <p>Bogdán Gábor</p>
        <p>Szántai Barna</p>
        <p>Joó Edvárd</p>
        <p id="Szabad">Férfi szabad hely:</p>
            <span id="ferfiLetszam"></span>
            <p id="Szabad">Női szabad hely:</p>
            <span id="noiiLetszam">100</span>
      </header>
    
    <div id="szemelyMegjelenites" class="Lefoglatak">
    </div>
    <article>
      <div id="kereso">
        <form action="{{route('OltozoFoglalasFelvitel')}}" method="post">
          @csrf
            <label id="keresoSzoveg"for="fname" >Személy kereső:</label>
            <input type="txt" placeholder="Személy kereső" class="keresSzemely" name="ugyfelNev" value="{{old('ugyfelNev')}}"/>
            <label id="keresoSzoveg"for="fname">Szekrény kereső:</label>
            <input type="number" placeholder="Szekrény kereső" min="0" class="keresSzekrenykulcs" name="szekrenySzama" value="{{old('szekrenySzama')}}"/>
            <button type="submit" class="lefoglal">Lefoglal</button><br>
            @if(Session::has('sikeres'))
              <div class="alert alert-sikeres">{{Session::get('sikeres')}}</div>
            @endif
            @if(Session::has('sikertelen'))
              <div class="alert alert-sikertelen">{{Session::get('sikertelen')}}</div>
            @endif
        </form>
      </div>
      <div class="keresettSzemely"></div>
      <div class="keresettSzekreny"></div>
    </article>
    <section>
      <div class="szekrenyek"></div>
    </section>
  
  <footer>
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
