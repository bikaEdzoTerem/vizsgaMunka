  
  @include('layouts.edzo')
  @section('content')
    <p>Bogdán Gábor</p>
    
        <form action="{{route('ugyfelEdzesFoglalasFelvitel')}}" method="post">
        @csrf
        <input placeholder="személy neve" type="txt"  class="szemelyKereso" name="ugyfelNev" value="{{old('ugyfelNev')}}" />

        <input placeholder="edzo id" type="text" name="edzo" value="{{old('edzo')}}" />

        <input type="date" class="datum" list="datumValasztasok" name="datum" value="{{old('datum')}}" />
        <datalist id="datumValasztasok"></datalist>

        <input class="orara"type="text" list="oraraValasztasok" placeholder="órára" minlength="4" maxlength="10" name="orara" value="{{old('orara')}}"/>
        <datalist id="oraraValasztasok"> </datalist>

        <input  class="ora"type="text" list="oraValasztasok" placeholder="edzés hossza(1:00)" maxlength="4" name="ora" value="{{old('ora')}}" />
        <datalist id="oraValasztasok"> </datalist>
        {{-- <div class="gomb"></div> --}}
        <button type=submit  class=lefoglal>Lefoglal</button>

        @if(Session::has('sikeres'))
          <div class="alert alert-sikeres">{{Session::get('sikeres')}}</div>
        @endif
        @if(Session::has('sikertelen'))
          <div class="alert alert-sikertelen">{{Session::get('sikertelen')}}</div>
        @endif
      </form>
  
    
    {{-- <form>
        <input placeholder="személy neve" type="txt"  class="szemelyKereso"  required/>
        <input type="date" class="datum"  list="datumValasztasok"  required/>
          <datalist id="datumValasztasok"></datalist>
          
          <input class="orara"type="text" list="oraraValasztasok" placeholder="órára" minlength="4" maxlength="10" required>
          <datalist id="oraraValasztasok"> </datalist>

          <input class="ora"type="text" list="oraValasztasok" placeholder="edzés hossza(1:00)" maxlength="4" required>
          <datalist id="oraValasztasok"> </datalist>
        <button type="button" class="lefoglal" >Lefoglal</button>
      </div>
    </form> --}}
  </article>
  <section>
    <div class="idopontok"></div>
  </section >
  <div class="tablaSeged">
    <button type="button" class="BalraCsokkent" id="gomb"><</button>
    <input type="number" list="hanyOszlopos" class="oszlopSzam" min="3" value="3">
    <input type="date" class="datumKeres" required>
    <button type="button" class="JobbraNovel" id="gomb">></button>
    <div class="tablazat" id="oszlop"></div>
  </div>
  <footer>
    <div class="idopont">
      <h3 class="szemelyNeve">a</h3>
      <p class="datumtol">10</p>
      <p class="ora">1</p>
      <button type="submit" class="feloldasGomb">Felold</button>
  </div>
    © Minden jog fenntartva ©<br />

  </footer>
{{-- <html lang="hu">
  <head>
    <meta charset="UTF-8" />
    <meta name="description" content="Edzo oldal" />
    <meta name="author" content="Bogdán Gábor" />
    <link rel="icon" href="bika.png">
    <link href="../css/EdzoCss/header.css" rel="stylesheet" type="text/css" />
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="../js/ajax.js"></script>
    <script src="../js/edzoIdopont.js"></script>
    <script src="../js/edzoIdopontok.js"></script>
    <script src="../js/edzo.js"></script>
    <title>Edzo felulet</title>
  </head>
  <body>
    <main>
      <header>
        <nav>
          <ul>
            <li><a href="/edzo">Edzo felulet</a></li>
          </ul>
        </nav>
      </header>
    <article>
      <p>Bogdán Gábor</p>
      <form>
          <input placeholder="személy neve" type="txt"  class="szemelyKereso"  required/>
          <input type="date" class="datum"  list="datumValasztasok" required/>
            <datalist id="datumValasztasok"></datalist>
            
            <input class="orara"type="text" list="oraraValasztasok" placeholder="órára" minlength="4" maxlength="5" required>
            <datalist id="oraraValasztasok"> </datalist>

            <input class="ora"type="text" list="oraValasztasok" placeholder="edzés hossza(1:00)" maxlength="4" required>
            <datalist id="oraValasztasok"> </datalist>
          <button type="button" class="lefoglal" >Lefoglal</button>
        </div>
      </form>
    </article>
    <section>
      <div class="idopontok"></div>
    </section >
    <div class="tablaSeged">
      <button type="button" class="BalraCsokkent" id="gomb"><</button>
      <input type="number" list="hanyOszlopos" class="oszlopSzam" min="3" value="3">
      <input type="date" class="datumKeres" required>
      <button type="button" class="JobbraNovel" id="gomb">></button>
      <div class="tablazat" id="oszlop"></div>
    </div>
  <footer>
    <div class="idopont">
      <h3 class="szemelyNeve">a</h3>
      <p class="datumtol">10</p>
      <p class="ora">1</p>
      <button class="feloldasGomb">Felold</button>
  </div>
    © Minden jog fenntartva ©<br />

  </footer>

</main>
</body>
</html>
 --}}