
// Variables globales
let participantes = [];
let yaSorteados = [];

//Variables del DOM
const inputNombre = document.getElementById("nombre");
const listaParticipantes = document.getElementById("listaParticipantes");
const listaSorteados = document.getElementById("listaSorteados");
const resultado = document.getElementById("resultado");

function agregarParticipante() {
  const nombre = inputNombre.value.trim();

  //Con esto evitamos nombres vacíos o duplicados
  if (nombre === "") {
    mostrarMensaje("⚠️ Por favor ingresa un nombre.", "error");
    return;
  }

  // Evita nombres duplicados en ambas listas
  if (participantes.includes(nombre) || yaSorteados.includes(nombre)) {
    mostrarMensaje("⚠️ Ese participante ya está en la lista.", "error");
    return;
  }

  // Agrega el nombre a la lista de participantes
  participantes.push(nombre);
  inputNombre.value = "";
  actualizarLista();
  mostrarMensaje(`✅ ${nombre} fue añadido a la lista.`, "ok");
}

function actualizarLista() {
  listaParticipantes.innerHTML = "";
  participantes.forEach((nombre, index) => {
    const li = document.createElement("li");
    li.textContent = `${index + 1}. ${nombre}`;
    listaParticipantes.appendChild(li);
  });
}

function actualizarSorteados() {
  listaSorteados.innerHTML = "";
  yaSorteados.forEach((nombre, index) => {
    const li = document.createElement("li");
    li.textContent = `${index + 1}. ${nombre}`;
    listaSorteados.appendChild(li);
  });
}

function sortearParticipante() {
  if (participantes.length === 0) {
    resultado.textContent = "🎉 ¡Todos los participantes ya fueron sorteados!";
    resultado.style.color = "#27ae60";
    return;
  }

  const indice = Math.floor(Math.random() * participantes.length);
  const ganador = participantes[indice];

  resultado.textContent = `🎁 El amigo secreto es: ${ganador} 🎁`;
  resultado.style.color = "#a81d1d";

  yaSorteados.push(ganador);
  participantes.splice(indice, 1);

  actualizarLista();
  actualizarSorteados();
}

function reiniciarSorteo() {

    participantes = participantes.concat(yaSorteados);
    yaSorteados = [];
    actualizarLista();
    actualizarSorteados();

  resultado.textContent = "!Hagamoslo de nuevo! 🎉";

}
function borrarTodo() {
  
  // Crea la confirmación de borrado de manera dinámica
  resultado.innerHTML = `
    <span>¿Estás seguro de que quieres borrar todos los participantes y sorteados?</span>
    <button id="btnAceptar">Aceptar</button>
    <button id="btnCancelar">Cancelar</button>
  `;
  resultado.style.color = "#c0392b";

  document.getElementById("btnAceptar").onclick = function() {
    participantes = [];
    yaSorteados = [];
    resultado.textContent = "";
    actualizarLista();
    actualizarSorteados();
    mostrarMensaje("🗑️ Todos los datos fueron borrados.", "ok");
  };

  document.getElementById("btnCancelar").onclick = function() {
    resultado.textContent = "Operación cancelada.";
    resultado.style.color = "#27ae60";
  };
}

// Muestra mensajes de error o confirmación
function mostrarMensaje(texto, tipo) {
  resultado.textContent = texto;
  resultado.style.color = tipo === "error" ? "#c0392b" : "#27ae60";
}



