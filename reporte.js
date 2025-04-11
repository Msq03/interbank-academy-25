const fs = require('fs');
const path = require('path');

const archivo = process.argv[2]; // Ej: node reporte.js data.csv

if (!archivo) {
  console.error("Por favor, especifica el archivo CSV.");
  process.exit(1);
}

const ruta = path.resolve(__dirname, archivo);
fs.readFile(ruta, 'utf8', (err, data) => {
  if (err) {
    console.error("Error leyendo el archivo:", err.message);
    return;
  }

  const lineas = data.trim().split('\n').slice(1); // Ignora encabezado
  let balance = 0;
  let mayorMonto = 0;
  let idMayor = null;
  let creditos = 0;
  let debitos = 0;

  for (const linea of lineas) {
    const [id, tipo, montoStr] = linea.split(',');
    const monto = parseFloat(montoStr);

    if (tipo === 'Crédito') {
      balance += monto;
      creditos++;
    } else if (tipo === 'Débito') {
      balance -= monto;
      debitos++;
    }

    if (monto > mayorMonto) {
      mayorMonto = monto;
      idMayor = id;
    }
  }

  console.log("Reporte de Transacciones");
  console.log("---------------------------------------------");
  console.log(`Balance Final: ${balance.toFixed(2)}`);
  console.log(`Transacción de Mayor Monto: ID ${idMayor} - ${mayorMonto.toFixed(2)}`);
  console.log(`Conteo de Transacciones: Crédito: ${creditos} Débito: ${debitos}`);
});
