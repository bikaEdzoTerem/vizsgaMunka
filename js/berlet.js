class Berlet {
    constructor(node, elem, index) {
        this.node = node;
        this.cim = this.node.children(".cim");
        this.leiras = this.node.children(".leiras");
        this.ar = this.node.children(".ar");
        this.elem = elem;
        this.elem.index = index;
        this.setBerletAdatok(this.elem);
    }

    setBerletAdatok(ertek){
        this.cim.html(ertek.cim);
        this.leiras.html(ertek.leiras);
        this.ar.html(ertek.ar);
    }
}