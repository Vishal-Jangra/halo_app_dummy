import React, { useState, useMemo } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Filter from '../components/Filter';
import AppTable from '../components/Table';

// Specific dummy data and columns for WellsPage
const wellsPageColumns = [
  { Header: 'Well ID', accessor: 'wellId' },
  { Header: 'Well Name', accessor: 'wellName' },
  { Header: 'API Number', accessor: 'apiNumber' },
  { Header: 'Status', accessor: 'status' },
  { Header: 'Type', accessor: 'type' },
  { Header: 'Depth (TD)', accessor: 'depth', Cell: ({ value }) => `${value ? value.toLocaleString() : 'N/A'} ft` },
  { Header: 'Operator', accessor: 'operator' },
];

const wellsPageData = [
  { wellId: 'W-001', wellName: 'North Star 1H', apiNumber: '42-123-45678', status: 'Producing', type: 'Oil', depth: 12500, operator: 'Big Oil Corp' },
  { wellId: 'W-002', wellName: 'Desert Diamond 2X', apiNumber: '42-321-87654', status: 'Drilling', type: 'Gas', depth: 15000, operator: 'Energy Inc.' },
  { wellId: 'W-003', wellName: 'Riverbend SWD 1', apiNumber: '42-001-23456', status: 'Active', type: 'SWD', depth: 8000, operator: 'Water Disposal LLC' },
  { wellId: 'W-004', wellName: 'Wildcat Prospect A1', apiNumber: '42-987-65432', status: 'Permitted', type: 'Exploratory', depth: null, operator: 'Indy Exploration' },
  { wellId: 'W-005', wellName: 'Old Faithful #3', apiNumber: '42-111-22222', status: 'Shut-In', type: 'Oil', depth: 9750, operator: 'Vintage Petroleum' },
];

function WellsPage() {
  const [filters, setFilters] = useState({});

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    console.log('WellsPage Filters updated:', newFilters);
    // Actual filtering logic will depend on how filters should interact with table data.
  };

  const tableColumns = useMemo(() => wellsPageColumns, []);
  const tableData = useMemo(() => wellsPageData, []);

  return (
    <Container fluid>
      <Row>
        <Col md={12}> {/* Using full width for filter toggle, actual filter panel slides below */}
          <Filter onFilterChange={handleFilterChange} />
        </Col>
      </Row>
      <Row className="mt-3">
        <Col md={12}>
          <AppTable columns={tableColumns} data={tableData} />
        </Col>
      </Row>
    </Container>
  );
}

export default WellsPage;
