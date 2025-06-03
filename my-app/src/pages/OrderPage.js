import React, { useState, useMemo } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Filter from '../components/Filter';
import AppTable from '../components/Table';

// Specific dummy data and columns for OrderPage
const orderPageColumns = [
  { Header: 'Order ID', accessor: 'orderId' },
  { Header: 'Order Type', accessor: 'orderType' },
  { Header: 'Well Name', accessor: 'wellName' },
  { Header: 'Status', accessor: 'status' },
  { Header: 'Order Date', accessor: 'orderDate' },
  { Header: 'Field', accessor: 'field' },
];

const orderPageData = [
  { orderId: 'ORD-001', orderType: 'Drilling Permit', wellName: 'Well Alpha', status: 'Approved', orderDate: '2023-01-20', field: 'Eagle Ford' },
  { orderId: 'ORD-002', orderType: 'Spacing Unit', wellName: 'Well Beta', status: 'Pending', orderDate: '2023-02-10', field: 'Permian Basin' },
  { orderId: 'ORD-003', orderType: 'Pooling Order', wellName: 'Well Gamma', status: 'Approved', orderDate: '2022-12-05', field: 'Bakken Shale' },
  { orderId: 'ORD-004', orderType: 'Completion Report', wellName: 'Well Delta', status: 'Submitted', orderDate: '2023-03-15', field: 'Niobrara' },
  { orderId: 'ORD-005', orderType: 'Plugging Permit', wellName: 'Old Well 123', status: 'Expired', orderDate: '2020-07-01', field: 'Haynesville' },
];

function OrderPage() {
  const [filters, setFilters] = useState({});

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    console.log('OrderPage Filters updated:', newFilters);
    // As with LandPage, actual data filtering based on these filters can be added later.
  };

  const tableColumns = useMemo(() => orderPageColumns, []);
  const tableData = useMemo(() => orderPageData, []);

  return (
    <Container fluid>
      <Row>
        <Col md={12}>
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

export default OrderPage;
