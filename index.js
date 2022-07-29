// tenemos que agrupar informacion edad,nombre, descrip , img
class Mascota {
  constructor(nombre,edad,datos,img) {
    this.nombre = nombre,
    this.edad = edad,
    this.datos = datos,
    this.img = img
  }

  // metodos
}
// array donde guardamos cada uno de los objetos
let arrayMascotas = [];
let bandera = false;
// generar los eventos para capturar la infromacion del html

window.addEventListener("load", () => {
  if (localStorage.getItem("arraydeMascotas")) {
    arrayMascotas = JSON.parse(localStorage.getItem("arraydeMascotas"));
  generarInterfaz(arrayMascotas)
  }

})

let formulario = document.getElementById("form");

formulario.addEventListener("submit", (event) => {
  event.preventDefault();
  let nodo = event.target.children;
  if(bandera){
    console.log("actualizando");
    editarCampos()
    bandera = false;
  }else{
    const mascota = new Mascota(nodo[0].value, nodo[1].value, nodo[2].value, nodo[3].value);
    arrayMascotas.push(mascota)
    console.log(arrayMascotas);
    generarInterfaz(arrayMascotas)
  }

  localStorage.setItem("arraydeMascotas", JSON.stringify(arrayMascotas))

  // capturar el value de los inputs
 
 
  formulario.reset()
})

// funcion para generar el html

const generarInterfaz = (array) => {
  let contenedor = document.getElementById("container_mascotas");
  contenedor.innerHTML = "";
  array.map( el => contenedor.innerHTML += `
                          <div class="card" id="${el.nombre}" style="width: 18rem;">
                          <img src="${el.img}" class="card-img-top" alt="...">
                          <div class="card-body">
                            <h5 class="card-title">${el.nombre}</h5>
                            <p class="card-text">${el.edad}</p>
                            <p class="card-text">${el.datos}</p>
                            <button type="button" class="btn btn-danger btn_eliminar">Borrar</button>
                            <button type="button" class="btn btn-primary btn_actualizar">Actualizar</button>
                            </div>
                        </div>     
  `)

    eliminar()
    actualizar()
}

// funcion para eliminar

const eliminar = () => {
  let btnEliminar = document.querySelectorAll(".btn_eliminar");
console.log(btnEliminar);
  for (const btn of btnEliminar) {
    btn.addEventListener("click", (event) => {
      let nodo = event.path[2];
      // console.dir(event);
      let buscar = arrayMascotas.findIndex( el => el.nombre == nodo.id);
      arrayMascotas.splice(buscar,1)
      nodo.remove()
      localStorage.setItem("arraydeMascotas", JSON.stringify(arrayMascotas))
    } )
  }
}

// funcion actualizar 

const actualizar = () => {
  let btnActualizar = document.getElementsByClassName("btn_actualizar");
  for (const btn of btnActualizar) {
    btn.addEventListener("click", (event) => {
      bandera = true;
      let nodo = event.path[2];
      let buscar = arrayMascotas.find( el => el.nombre == nodo.id)
      document.getElementById("nombre").value = buscar.nombre;
      document.getElementById("edad").value = buscar.edad;
      document.getElementById("datos").value = buscar.datos;
      document.getElementById("img").value = buscar.img;
    })
  }
}

const editarCampos = () => {
  let id = document.getElementById("nombre").value 
  console.log(id);
  let buscar = arrayMascotas.findIndex(el => el.nombre == id)
  console.log(arrayMascotas);
  console.log(buscar);
  console.log( arrayMascotas[buscar] );
  arrayMascotas[buscar].edad =  document.getElementById("edad").value
  arrayMascotas[buscar].datos =  document.getElementById("datos").value
  arrayMascotas[buscar].img =  document.getElementById("img").value
  generarInterfaz(arrayMascotas)
}