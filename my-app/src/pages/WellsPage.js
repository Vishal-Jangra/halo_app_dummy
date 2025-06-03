import React, { useState, useMemo } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap'; // Added Form
import Filter from '../components/Filter';
import AgGridTable from '../components/AgGridTable'; // Import AgGridTable

// Utility to generate more data
const generateMoreData = (count, schemaCreator) => {
  const data = [];
  for (let i = 0; i < count; i++) {
    data.push(schemaCreator(i));
  }
  return data;
};

// Schema for WellsPage data
const wellStatuses = ['Producing', 'Drilling', 'Shut-In', 'Permitted', 'P&A', 'Testing'];
const wellTypes = ['Oil', 'Gas', 'Injection', 'SWD', 'Observation'];
const operators = ['Operator Alpha LLC', 'Beta Resources Inc.', 'Gamma Exploration Co.', 'Delta Drilling Corp.', 'Epsilon Energy Ltd.'];

const wellsSchema = (index) => ({
  id: index + 1,
  wellId: `W-${String(index + 1).padStart(5, '0')}`,
  wellName: `Well ${String.fromCharCode(65 + (index % 15))}-${(index % 50) + 1}${wellTypes[index % wellTypes.length].charAt(0)}`,
  apiNumber: `42-${String(101 + (index % 898)).padStart(3,'0')}-${String(10001 + (index % 89998)).padStart(5,'0')}`,
  status: wellStatuses[index % wellStatuses.length],
  type: wellTypes[index % wellTypes.length],
  depth: Math.floor(Math.random() * 15000) + 5000, // Random depth between 5000-20000
  operator: operators[index % operators.length],
  lastProductionDate: new Date(2024, (index % 6), (index % 28) + 1).toLocaleDateString(), // More recent dates
});


function WellsPage() {
  const [filters, setFilters] = useState({});
  const [quickFilterText, setQuickFilterText] = useState('');

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    console.log('WellsPage Filters updated:', newFilters);
  };

  const columnDefs = useMemo(() => [
    { headerName: "ID", field: "id", width: 80, sort: 'asc' },
    { headerName: "Well ID", field: "wellId", width: 130 },
    { headerName: "Well Name", field: "wellName", minWidth: 180 },
    { headerName: "API Number", field: "apiNumber", minWidth: 150 },
    { headerName: "Status", field: "status", minWidth: 120, filter: 'agSetColumnFilter' },
    { headerName: "Type", field: "type", minWidth: 100, filter: 'agSetColumnFilter' },
    {
      headerName: "Depth (TD)",
      field: "depth",
      width: 130,
      filter: 'agNumberColumnFilter',
      valueFormatter: params => params.value ? `${params.value.toLocaleString()} ft` : 'N/A',
    },
    { headerName: "Operator", field: "operator", minWidth: 200, filter: 'agTextColumnFilter' },
    { headerName: "Last Prod.", field: "lastProductionDate", minWidth: 130 },
  ], []);

  const rowData = useMemo(() => generateMoreData(200, wellsSchema), []); // Generate 200 rows

  return (
    <Container fluid>
      <Filter onFilterChange={handleFilterChange} />

      <Row className="mt-3 mb-3">
        <Col md={6} lg={4}>
          <Form.Control
            type="search"
            placeholder="Quick Search Wells..."
            value={quickFilterText}
            onChange={(e) => setQuickFilterText(e.target.value)}
            className="table-quick-filter-input"
          />
        </Col>
      </Row>

      <Row>
        <Col md={12}>
          <AgGridTable
            columnDefs={columnDefs}
            rowData={rowData}
            quickFilterText={quickFilterText}
          />
        </Col>
      </Row>
    </Container>
  );
}

export default WellsPage;
