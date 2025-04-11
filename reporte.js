const fs = require('fs');
const path = require('path');

const archivo = process.argv[2]; // Para correr el proyecto solo lo llamariamos así: node reporte.js data.csv

if (!archivo) { //Si no especificamos el archivo que se leerá, me mostrará el mensaje.
  console.error("Por favor, especifica el archivo CSV.");
  process.exit(1);
}

const ruta = path.resolve(__dirname, archivo); // con __dirname Obtenemos la ruta actual del archivo a leer, el cual esta en la misma ruta de la clase reporte.js
fs.readFile(ruta, 'utf8', (err, data) => {
  if (err) {
    console.error("Error leyendo el archivo:", err.message);
    return;
  }

  const lineas = data.trim().split('\n').slice(1); // Ignora encabezado
  //Asigno los valores iniciales de mis variables
  let balance = 0;
  let mayorMonto = 0;
  let idMayor = null;
  let creditos = 0;
  let debitos = 0;

  for (const linea of lineas) {
    const [id, tipo, montoStr] = linea.split(','); 
    const monto = parseFloat(montoStr);

    if (tipo === 'Crédito') { //Sumo todas las transacciones con tipo Crédito
      balance += monto;
      creditos++;
    } else if (tipo === 'Débito') {  //Sumo todas las transacciones con tipo Débito
      balance -= monto;
      debitos++;
    }

    if (monto > mayorMonto) { //Busco el monto mayor por cada transacción
      mayorMonto = monto;
      idMayor = id;
    }
  }
//VISTA EN LA TERMINAL
  console.log("Reporte de Transacciones");
  console.log("---------------------------------------------");
  console.log(`Balance Final: ${balance.toFixed(2)}`);
  console.log(`Transacción de Mayor Monto: ID ${idMayor} - ${mayorMonto.toFixed(2)}`);
  console.log(`Conteo de Transacciones: Crédito: ${creditos} Débito: ${debitos}`);
});
