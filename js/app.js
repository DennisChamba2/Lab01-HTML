const ingresos = [
    new Ingreso('salario', 2100.00),
    new Ingreso('venta coche', 1500)
];
const egresos = [
    new Egreso('Renta departamento', 900),
    new Egreso('Ropa', 400)
];

let cargarApp = ()=>{
    cargarCabecero();
    cargarIngresos();
    cargarEgresos();
}

let totalIngresos = () =>{
    let totalIngresos = 0;
    for(let ingreso of ingresos){
        totalIngresos += ingreso.valor;
    }
    return totalIngresos;
}
let totalEgresos = () =>{
    let totalEgresos = 0;
    for(let egreso of egresos){
        totalEgresos += egreso.valor;
    }
    return totalEgresos;
}

let cargarCabecero = ()=>{
  let presupuesto = totalIngresos() - totalEgresos();  
  let porcentajeEgresos = totalEgresos()/totalIngresos();
  document.getElementById('presupuesto').innerHTML = formatoMoneda(presupuesto);
  document.getElementById('porcentaje').innerHTML = formatoPorcentaje(porcentajeEgresos);
  document.getElementById('ingresos').innerHTML = formatoMoneda(totalIngresos());
  document.getElementById('egresos').innerHTML = formatoMoneda(totalEgresos());
};

const formatoMoneda = (valor) =>{
    return valor.toLocaleString('en-US',{style:'currency', currency:'USD', minimunFractionDigits:2});
};
const formatoPorcentaje = (valor)=>{
    return valor.toLocaleString('en-US',{style:'percent', minimunFractionDigits:2});
};

const cargarIngresos = () =>{
    let ingresosHtml = '';
    for (let ingreso of ingresos){
        ingresosHtml += crearIngresoHTML(ingreso);
    }
    document.getElementById('lista-ingresos').innerHTML = ingresosHtml;
};

function crearIngresoHTML(ingreso){
    let ingresoHTML = `
    <div class="elemento limpiarEstilos">
    <div class="elemento_descripcion">${ingreso.descripcion}</div>
    <div class="derecha limpiarEstilos">
      <div class="elemento_valor">${formatoMoneda(ingreso.valor)}</div>
      <div class="elemento_eliminar">
        <button class="elemento_eliminar--btn">
          <ion-icon name="close-circle-outline" onclick='eliminarIngreso(${ingreso.id})'></ion-icon>
        </button>
      </div>
    </div>
    </div>`;
    return ingresoHTML;
}

const cargarEgresos = () =>{
    let egresosHtml = '';
    for (let egreso of egresos){
        egresosHtml += crearEgresoHTML(egreso);
    }
    document.getElementById('lista-egresos').innerHTML = egresosHtml;
};

function crearEgresoHTML(egreso){
    let egresoHTML = `
    <div class="elemento limpiarEstilos">
            <div class="elemento_descripcion">${egreso.descripcion}</div>
            <div class="derecha limpiarEstilos">
              <div class="elemento_valor">-${formatoMoneda(egreso.valor)}</div>
              <div class="elemento_porcentaje">${formatoPorcentaje(egreso.valor/totalEgresos())}</div>
              <div class="elemento_eliminar">
                <button class="elemento_eliminar--btn">
                  <ion-icon name="close-circle-outline"
                  onclick='eliminarEgreso(${egreso.id})'></ion-icon>
                </button>
              </div>
            </div>
          </div>`;
    return egresoHTML;
}

function eliminarEgreso(id){
    let indiceEliminar = egresos.findIndex((egreso)=>{egreso.id === id});
    egresos.splice(indiceEliminar, 1);
    cargarCabecero();
    cargarEgresos();
}
function eliminarIngreso(id){
    let indiceEliminar = ingresos.findIndex((ingreso)=>{ingreso.id === id});
    ingresos.splice(indiceEliminar, 1);
    cargarCabecero();
    cargarIngresos();
}

function agregarDato(){
    let forma = document.forms['forma'];
    let tipo = forma['tipo'];
    let descripcion = forma['descripcion'];
    let valor = forma['valor'];
    if(descripcion.value !== '' && valor.value !== ''){
        if(tipo.value === 'ingreso'){
            ingresos.push(new Ingreso(descripcion.value, Number(valor.value)));
            cargarCabecero();
            cargarIngresos();
            descripcion.value = '';
            valor.value = '';
        }else{
            egresos.push(new Egreso(descripcion.value, +valor.value));
            cargarCabecero();
            cargarEgresos();
            descripcion.value = '';
            valor.value = '';
        }
    }

}