class Ingreso extends Dato{
    static contador=0;

    constructor(descripcion, valor){
        super(descripcion, valor);
        this._id = ++Ingreso.contador;
    }

    get id(){
        return this._id;
    }
}