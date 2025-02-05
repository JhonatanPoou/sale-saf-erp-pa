// script.js

let priceData = [];

// Cargar archivo Excel desde la ruta en GitHub
async function loadExcelData() {
  const filePath = 'precios.xlsx';
  try {
    const response = await fetch(filePath);
    const data = await response.arrayBuffer();
    const workbook = XLSX.read(data, { type: 'array' });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    priceData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
  } catch (error) {
    console.error('Error cargando el archivo Excel:', error);
  }
}

loadExcelData();

const scenarios = {
  1: [['Contador', 'ERP Full'], ['Bodeguero', 'ERP Módulos'], ['Planta', 'ERP Módulos'], ['Planillero', 'ERP Estándar'], ['Implementación', 'Implementación']],
  2: [['Contador', 'ERP Estándar'], ['Bodeguero', 'ERP Módulos'], ['Planillero', 'ERP Estándar'], ['Implementación', 'Implementación']],
  3: [['Finca SAF', 'Finca SAF'], ['Usuario SAF', 'Usuario SAF'], ['Bodeguero', 'ERP Módulos'], ['Planillero', 'Planilla Agrícola'], ['Implementación', 'Implementación']],
  4: [['Contador', 'ERP Estándar'], ['Vendedor', 'ERP Módulos'], ['Vendedor', 'ERP Módulos'], ['Vendedor', 'ERP Módulos'], ['Implementación', 'Implementación']],
  5: [['Sucursal 1', 'ERP Estándar'], ['Sucursal 2', 'ERP Estándar'], ['Sucursal 3', 'ERP Estándar'], ['Vendedor', 'ERP Módulos'], ['Vendedor', 'ERP Módulos'], ['Vendedor', 'ERP Módulos'], ['Vendedor', 'ERP Módulos'], ['Vendedor', 'ERP Módulos'], ['Vendedor', 'ERP Módulos'], ['Implementación', 'Implementación']]
};

function loadScenario(scenarioId) {
  const scenario = scenarios[scenarioId];
  if (!scenario) return;
  renderTable(scenario);
}

function renderTable(data) {
  const tableBody = document.getElementById('price-table-body');
  tableBody.innerHTML = '';

  data.forEach(item => {
    const [puesto, licencia] = item;
    const priceRow = priceData.find(row => row[0] === licencia); // Asegúrate de que esta columna se llame 'Tipo licencia'

    if (priceRow) {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${puesto}</td>
        <td>${licencia}</td>
        <td>${priceRow[1] || 'N/A'}</td>
        <td>${priceRow[2] || 'N/A'}</td>
      `;
      tableBody.appendChild(row);
    }
  });
}

function addCustomRow() {
  const configDiv = document.getElementById('custom-config');
  const div = document.createElement('div');
  div.innerHTML = `
    <input type="text" placeholder="Puesto" class="puesto-input">
    <select class="licencia-select">
      <option value="ERP Full">ERP Full</option>
      <option value="ERP Módulos">ERP Módulos</option>
      <option value="ERP Estándar">ERP Estándar</option>
      <option value="Finca SAF">Finca SAF</option>
      <option value="Usuario SAF">Usuario SAF</option>
      <option value="Planilla Agrícola">Planilla Agrícola</option>
      <option value="Implementación">Implementación</option>
    </select>
  `;
  configDiv.appendChild(div);
}
