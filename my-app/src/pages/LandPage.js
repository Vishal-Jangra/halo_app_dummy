import React, { useState, useMemo } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Filter from '../components/Filter';
import AppTable from '../components/Table';

// Specific dummy data and columns for LandPage
const landPageColumns = [
  { Header: 'Tract ID', accessor: 'tractId' },
  { Header: 'Grantor', accessor: 'grantor' },
  { Header: 'Grantee', accessor: 'grantee' },
  { Header: 'TRS', accessor: 'trs' },
  { Header: 'Recorded Date', accessor: 'recordedDate' },
  { Header: 'Acres', accessor: 'acres', Cell: ({ value }) => `${value.toLocaleString()}` },
];

const landPageData = [
  { tractId: 'LND-001', grantor: 'Smith Family Trust', grantee: 'Big Oil Corp', trs: 'T1N R2E S3', recordedDate: '2022-01-15', acres: 160 },
  { tractId: 'LND-002', grantor: 'Jane Doe', grantee: 'Energy Inc.', trs: 'T2N R1W S10', recordedDate: '2021-11-30', acres: 320 },
  { tractId: 'LND-003', grantor: 'John Johnson Estate', grantee: 'Big Oil Corp', trs: 'T1S R3E S22', recordedDate: '2023-03-01', acres: 80 },
  { tractId: 'LND-004', grantor: 'Green Pastures LLC', grantee: 'Independent Producer', trs: 'T3N R1E S7', recordedDate: '2020-05-20', acres: 640 },
  { tractId: 'LND-005', grantor: 'Robert King', grantee: 'Energy Inc.', trs: 'T1N R2E S4', recordedDate: '2022-08-10', acres: 40 },
];

function LandPage() {
  const [filters, setFilters] = useState({});

  // For now, actual filtering of data based on 'filters' is not implemented here.
  // The Table component's own global search will work on the passed data.
  // This 'handleFilterChange' is a placeholder for future, more complex filtering logic.
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    console.log('LandPage Filters updated:', newFilters);
    // In a real scenario, you might filter landPageData here based on newFilters
    // and pass the filtered data to AppTable.
    // For now, we pass all data and let AppTable's global filter work.
  };

  const tableColumns = useMemo(() => landPageColumns, []);
  const tableData = useMemo(() => landPageData, []);

  return (
    <Container fluid>
      <Row>
        <Col md={12}> {/* Filter can be md={3} and Table md={9} for a side-by-side layout if preferred */}
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

export default LandPage;
