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

// Schema for LandPage data
const landSchema = (index) => ({
  id: index + 1,
  tractId: `LND-${String(index + 1).padStart(3, '0')}`,
  county: `County ${(index % 20) + 1}`, // More varied counties
  trs: `T${(index % 15) + 1}N R${(index % 8) + 1}W S${(index % 30) + 1}`,
  grantor: `Grantor Energy Partners ${String.fromCharCode(65 + (index % 26))}`, // Cycle through A-Z
  grantee: `Big Resource Co. ${(index % 10) + 1}`,
  recordedDate: new Date(2022, (index % 12), (index % 28) + 1).toLocaleDateString(),
  acres: (Math.floor(Math.random() * 50) + 1) * 40, // Random acres in multiples of 40
});

function LandPage() {
  const [filters, setFilters] = useState({});
  const [quickFilterText, setQuickFilterText] = useState('');

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    console.log('LandPage Filters updated:', newFilters);
    // Future: Apply these filters to rowData if not handled by AG Grid's column filters directly
  };

  const columnDefs = useMemo(() => [
    { headerName: "ID", field: "id", width: 80, sort: 'asc' },
    { headerName: "Tract ID", field: "tractId", width: 120 },
    { headerName: "County", field: "county", minWidth: 150, filter: 'agTextColumnFilter' }, // Example of specific filter
    { headerName: "TRS", field: "trs", minWidth: 150 },
    { headerName: "Grantor", field: "grantor", minWidth: 220 },
    { headerName: "Grantee", field: "grantee", minWidth: 200 },
    { headerName: "Rec. Date", field: "recordedDate", minWidth: 120 },
    { headerName: "Acres", field: "acres", width: 100, filter: 'agNumberColumnFilter',
      valueFormatter: params => params.value.toLocaleString() // Format number
    },
  ], []);

  const rowData = useMemo(() => generateMoreData(150, landSchema), []); // Generate 150 rows

  return (
    <Container fluid>
      {/* Filter toggle button is part of Filter component itself now */}
      <Filter onFilterChange={handleFilterChange} />

      <Row className="mt-3 mb-3">
        <Col md={6} lg={4}> {/* Adjust width as needed */}
          <Form.Control
            type="search"
            placeholder="Quick Search Table..."
            value={quickFilterText}
            onChange={(e) => setQuickFilterText(e.target.value)}
            className="table-quick-filter-input" // Optional: for specific styling
          />
        </Col>
      </Row>

      {/* AgGridTable replaces the old table */}
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

export default LandPage;
