const formulario = document.getElementById('formulario');
const input = document.getElementById('input');
const  listaTareas = document.getElementById('Lista-tareas');
const templateAlerta = document.getElementById('template-alerta').content;
const fragment = new DocumentFragment();
/* let tareas = {
  1612460323084:{
    id: 1612460323084,
    texto: "texto #1",
    estado: false
  },
  1612460396440:{
    id: 1612460396440,
    texto: "texto #2",
    estado: false
  }
} */
/* console.log(Date.now()) */
let tareas = {}

//DOMContentLoaded seria algo asi como el useEffect de react
document.addEventListener('DOMContentLoaded', () =>{
  //estoy pintado el localstorage para q no se borre en caaso q actualice:
  if (localStorage.getItem('miLlave')){
    tareas = JSON.parse(localStorage.getItem('miLlave'))
  }
  //estoy pintando las tareas 1 y 2 una sola vez y no cada vez q agrego una tarea diferente
  pintarDatos()//podria pasar la e si quisiera
})

listaTareas.addEventListener('click', (e) =>{
  btnAccion(e)
})

formulario.addEventListener('submit', (e) => {
  e.preventDefault()
  //puedo capturar el contenido del input de tres maneras:
  //numero de posicion
 //1) console.log(e.target[0].value)
  //por tag
 // 2) console.log(e.target.querySelector('input').value)
  //por id o class
 // 3) console.log(input.value)
 setTarea(e)
})

const setTarea = (e) => {

  if(input.value.trim() === ""){
    console.log('esta vacio')
    return
  }

  //construimos el objeto
  const tarea = {
    id: Date.now(),//genero un indice mediante la fecha
    texto: input.value,
    estado: false
  }
//lo empujo a la variable objeto
  tareas[tarea.id] = {...tarea}

  //limpio el input
  formulario.reset()
  //recupero el focus luego de enviar
  input.focus()

  pintarDatos()
}

const pintarDatos = () => {
  //almacenar en el locla storage
  localStorage.setItem('miLlave', JSON.stringify(tareas))

  if(Object.values(tareas).length === 0){
    //voy a pintra el div de la carita miestras no hayan tareas
    listaTareas.innerHTML =`
    <div class="alert alert-dark text-center">
      <strong>NO hay TAREAS</strong> &#x2603
      </div>
    `
    return
  }
//para recorrer los objestos se una "for in", pero con este truco puiedo utilizar forEach
  listaTareas.innerHTML=""//limpio el dom
Object.values(tareas).forEach((item) =>{
  console.log(item)
  const clone = templateAlerta.cloneNode(true);
  clone.querySelector('p').textContent = item.texto

  if(item.estado){
    clone.querySelector('.alert').classList.replace('alert-warning', 'alert-primary'),
      clone.querySelectorAll('.fas')[0].classList.replace('fa-check-circle', 'fa-undo-alt');
      clone.querySelector('p').style.textDecoration = 'line-through'
   
  }

  clone.querySelectorAll('.fas')[0].dataset.id = item.id//asigno el ide d los botones
  clone.querySelectorAll('.fas')[1].dataset.id = item.id//asigno el ide d los botones
  fragment.appendChild(clone)
})
listaTareas.appendChild(fragment)
}

const btnAccion = (e) =>{
 // console.log(e.target.classList.contains('fa-check-circle'))
 //cambio el estado del boton a true
  if (e.target.classList.contains('fa-check-circle')){
//console.log(e.target.dataset.id)
    tareas[e.target.dataset.id].estado = true
    pintarDatos()
    //console.log(tareas)
 }

  if (e.target.classList.contains('fa-minus-circle')) {
    delete tareas[e.target.dataset.id]
    pintarDatos()
    //console.log(tareas)
  }

  //cambio el estado del boton a false
  if (e.target.classList.contains('fa-undo-alt')) {
    tareas[e.target.dataset.id].estado = false
    pintarDatos()
    //console.log(tareas)
  }
  
 e.stopPropagation()
}






