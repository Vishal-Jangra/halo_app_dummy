import React, { useState, useMemo } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap'; // Added Form
import Filter from '../components/Filter';
import AgGridTable from '../components/AgGridTable'; // Import AgGridTable

// Utility to generate more data (can be shared if moved to a utils file)
const generateMoreData = (count, schemaCreator) => {
  const data = [];
  for (let i = 0; i < count; i++) {
    data.push(schemaCreator(i));
  }
  return data;
};

// Schema for OrderPage data
const orderTypes = ['Drilling Permit', 'Spacing Unit', 'Pooling Order', 'Completion Report', 'Plugging Permit', 'Field Rules'];
const orderStatuses = ['Approved', 'Pending', 'Denied', 'Expired', 'Amended', 'In Progress'];
const fields = ['Eagle Ford', 'Permian Basin', 'Bakken Shale', 'Niobrara', 'Haynesville', 'Marcellus'];

const orderSchema = (index) => ({
  id: index + 1,
  orderId: `ORD-${String(index + 1).padStart(4, '0')}`,
  orderType: orderTypes[index % orderTypes.length],
  wellName: `Well ${String.fromCharCode(65 + (index % 10))}-${(index % 100) +1}H`, // Well A-1H to J-100H
  status: orderStatuses[index % orderStatuses.length],
  orderDate: new Date(2023, (index % 12), (index % 28) + 1).toLocaleDateString(),
  field: fields[index % fields.length],
  documentLink: `https://example.com/docs/ord-${String(index + 1).padStart(4, '0')}.pdf`
});

function OrderPage() {
  const [filters, setFilters] = useState({});
  const [quickFilterText, setQuickFilterText] = useState('');

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    console.log('OrderPage Filters updated:', newFilters);
  };

  const columnDefs = useMemo(() => [
    { headerName: "ID", field: "id", width: 80, sort: 'asc' },
    { headerName: "Order ID", field: "orderId", width: 130 },
    { headerName: "Order Type", field: "orderType", minWidth: 180, filter: 'agSetColumnFilter' }, // Set filter for discrete values
    { headerName: "Well Name", field: "wellName", minWidth: 150 },
    { headerName: "Status", field: "status", minWidth: 120, filter: 'agSetColumnFilter' },
    { headerName: "Order Date", field: "orderDate", minWidth: 130 },
    { headerName: "Field", field: "field", minWidth: 150, filter: 'agSetColumnFilter' },
    {
      headerName: "Document",
      field: "documentLink",
      minWidth: 120,
      cellRenderer: params => params.value ? `<a href="${params.value}" target="_blank" rel="noopener noreferrer">View Doc</a>` : 'N/A',
      filter: false, // Disable filter for link column
      sortable: false, // Disable sort for link column
    }
  ], []);

  const rowData = useMemo(() => generateMoreData(120, orderSchema), []); // Generate 120 rows

  return (
    <Container fluid>
      <Filter onFilterChange={handleFilterChange} />

      <Row className="mt-3 mb-3">
        <Col md={6} lg={4}>
          <Form.Control
            type="search"
            placeholder="Quick Search Orders..."
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

export default OrderPage;
