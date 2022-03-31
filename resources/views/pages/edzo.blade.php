  
  @include('layouts.edzo')
  @section('content')
    <p>Joó Edvárd</p>
    
        <form action="{{route('ugyfelEdzesFoglalasFelvitel1')}}" method="post">
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
        <button type="submit"  class=lefoglal>Lefoglal</button>

        @if(Session::has('sikeres'))
          <div class="alert alert-sikeres">{{Session::get('sikeres')}}</div>
        @endif
        @if(Session::has('sikertelen'))
          <div class="alert alert-sikertelen">{{Session::get('sikertelen')}}</div>
        @endif
      </form>
  </article>
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
      {{-- <p class="datumig">10</p> --}}
      <p class="ora">1</p>
      <button type="submit" class="feloldasGomb">Felold</button>
  </div>
    © Minden jog fenntartva ©<br />

  </footer>