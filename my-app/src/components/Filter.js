import React, { useState } from 'react';
import { Button, Form, Col, Row, Container } from 'react-bootstrap';
import Select from 'react-select';
import TagsInput from 'react-tagsinput';
import DatePicker from 'react-datepicker';
import 'react-tagsinput/react-tagsinput.css'; // Default styling for react-tagsinput
import 'react-datepicker/dist/react-datepicker.css'; // Default styling for react-datepicker
import './Filter.css'; // Custom styles

function Filter({ onFilterChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [county, setCounty] = useState([]);
  const [trs, setTrs] = useState([]);
  const [showGrantorGrantee, setShowGrantorGrantee] = useState(true);
  const [grantor, setGrantor] = useState([]);
  const [grantee, setGrantee] = useState([]);
  const [landName, setLandName] = useState([]);
  const [recordedFrom, setRecordedFrom] = useState(null);
  const [recordedTo, setRecordedTo] = useState(null);

  const countyOptions = [
    { value: 'county1', label: 'County 1' },
    { value: 'county2', label: 'County 2' },
    { value: 'county3', label: 'County 3' },
  ];

  const toggleFilter = () => setIsOpen(!isOpen);

  const handleFilterApply = () => {
    // Basic validation example
    if (recordedFrom && recordedTo && recordedFrom > recordedTo) {
      alert('Recorded From date cannot be after Recorded To date.');
      return;
    }
    onFilterChange({
      county,
      trs,
      grantor: showGrantorGrantee ? grantor : [],
      grantee: showGrantorGrantee ? grantee : [],
      landName: !showGrantorGrantee ? landName : [],
      recordedFrom,
      recordedTo,
    });
  };

  const handleClearFilter = () => {
    setCounty([]);
    setTrs([]);
    setGrantor([]);
    setGrantee([]);
    setLandName([]);
    setRecordedFrom(null);
    setRecordedTo(null);
    setShowGrantorGrantee(true);
    // Also call onFilterChange with empty values if needed to clear results
    onFilterChange({});
  };

  return (
    <>
      <Button onClick={toggleFilter} className="mb-3">
        {isOpen ? 'Hide Filters' : 'Show Filters'}
      </Button>
      <div className={`filter-panel ${isOpen ? 'open' : ''}`}>
        <Container fluid>
          <Form>
            <Row className="mb-3">
              <Form.Group as={Col} md="6" controlId="countyFilter">
                <Form.Label>County</Form.Label>
                <Select
                  isMulti
                  options={countyOptions}
                  value={county}
                  onChange={setCounty}
                  placeholder="Select counties..."
                />
              </Form.Group>
              <Form.Group as={Col} md="6" controlId="trsFilter">
                <Form.Label>TRS</Form.Label>
                <TagsInput
                  value={trs}
                  onChange={setTrs}
                  inputProps={{ placeholder: 'Add TRS' }}
                />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} md="12" controlId="landFilterToggle">
                <Form.Check
                  type="checkbox"
                  label="Search by Land Name (instead of Grantor/Grantee)"
                  checked={!showGrantorGrantee}
                  onChange={() => setShowGrantorGrantee(!showGrantorGrantee)}
                />
              </Form.Group>
            </Row>

            {showGrantorGrantee ? (
              <Row className="mb-3">
                <Form.Group as={Col} md="6" controlId="grantorFilter">
                  <Form.Label>Grantor</Form.Label>
                  <TagsInput
                    value={grantor}
                    onChange={setGrantor}
                    inputProps={{ placeholder: 'Add Grantor' }}
                  />
                </Form.Group>
                <Form.Group as={Col} md="6" controlId="granteeFilter">
                  <Form.Label>Grantee</Form.Label>
                  <TagsInput
                    value={grantee}
                    onChange={setGrantee}
                    inputProps={{ placeholder: 'Add Grantee' }}
                  />
                </Form.Group>
              </Row>
            ) : (
              <Row className="mb-3">
                <Form.Group as={Col} md="12" controlId="landNameFilter">
                  <Form.Label>Land Name</Form.Label>
                  <TagsInput
                    value={landName}
                    onChange={setLandName}
                    inputProps={{ placeholder: 'Add Land Name' }}
                  />
                </Form.Group>
              </Row>
            )}

            <Row className="mb-3">
              <Form.Group as={Col} md="6" controlId="recordedFromFilter">
                <Form.Label>Recorded From Date</Form.Label>
                <DatePicker
                  selected={recordedFrom}
                  onChange={date => setRecordedFrom(date)}
                  dateFormat="MM/dd/yyyy"
                  className="form-control"
                  placeholderText="Select date"
                />
              </Form.Group>
              <Form.Group as={Col} md="6" controlId="recordedToFilter">
                <Form.Label>Recorded To Date</Form.Label>
                <DatePicker
                  selected={recordedTo}
                  onChange={date => setRecordedTo(date)}
                  dateFormat="MM/dd/yyyy"
                  className="form-control"
                  placeholderText="Select date"
                />
              </Form.Group>
            </Row>

            <Row>
              <Col>
                <Button variant="primary" onClick={handleFilterApply} className="me-2">
                  Apply Filters
                </Button>
                <Button variant="secondary" onClick={handleClearFilter}>
                  Clear Filters
                </Button>
              </Col>
            </Row>
          </Form>
        </Container>
      </div>
    </>
  );
}

export default Filter;
