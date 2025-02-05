// script.js

let priceData = [];

// Load Excel File and Parse Data
function loadExcelData() {
  const filePath = 'precios.xlsx';

  fetch(filePath)
    .then(response => response.arrayBuffer())
    .then(data => {
      const workbook = XLSX.read(data, { type: 'array' });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      priceData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
    })
    .catch(err => console.error('Error loading Excel file:', err));
}

loadExcelData();

const scenarios = {
  1: [['Contador', 'ERP Full']],
  2: [['Bodeguero', 'ERP Módulos']],
  3: [['Planta', 'ERP Módulos']],
  4: [['Planillero', 'ERP Estándar']],
  5: [['Implementación', 'Implementación']]
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
    const priceRow = priceData.find(row => row[0] === licencia);

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
      <option value="Implementación">Implementación</option>
    </select>
  `;
  configDiv.appendChild(div);
}
