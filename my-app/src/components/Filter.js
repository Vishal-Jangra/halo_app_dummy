import React, { useState, useContext, useEffect } from 'react'; // Added useEffect
import { Button, Form, Col, Row, Container } from 'react-bootstrap';
import Select from 'react-select';
import TagsInput from 'react-tagsinput';
import DatePicker from 'react-datepicker';
import 'react-tagsinput/react-tagsinput.css';
import 'react-datepicker/dist/react-datepicker.css';
import './Filter.css';
import { ThemeContext } from '../ThemeContext';

function Filter({ onFilterChange }) {
  const { theme } = useContext(ThemeContext);
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

  // Add effect to toggle 'overflow: hidden' on body when filter is open
  // to prevent background scrolling.
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    // Cleanup function to reset overflow when component unmounts or isOpen changes
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);


  const handleFilterApply = () => {
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
    setIsOpen(false); // Optionally close filter on apply
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
    onFilterChange({});
    // setIsOpen(false); // Optionally close filter on clear
  };

  const selectStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: theme === 'dark' ? 'var(--input-bg)' : 'var(--input-bg)',
      borderColor: theme === 'dark' ? 'var(--input-border)' : 'var(--input-border)',
      boxShadow: state.isFocused ? `0 0 0 1px ${theme === 'dark' ? 'var(--input-focus-border)' : 'var(--input-focus-border)'}` : null,
      '&:hover': {
        borderColor: theme === 'dark' ? 'var(--input-focus-border)' : 'var(--input-focus-border)',
      },
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: theme === 'dark' ? 'var(--bg-secondary)' : 'var(--bg-primary)',
      zIndex: 1021, // Ensure menu is above filter panel's z-index
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? (theme === 'dark' ? 'var(--primary-color)' : 'var(--primary-color)')
                      : state.isFocused ? (theme === 'dark' ? 'var(--bg-tertiary)' : 'var(--bg-tertiary)')
                      : (theme === 'dark' ? 'var(--bg-secondary)' : 'var(--bg-primary)'),
      color: state.isSelected ? (theme === 'dark' ? 'var(--button-text-color)' : 'var(--button-text-color)')
             : (theme === 'dark' ? 'var(--text-primary)' : 'var(--text-primary)'),
      '&:active': {
        backgroundColor: theme === 'dark' ? 'var(--primary-color-hover)' : 'var(--primary-color-hover)',
      },
    }),
    singleValue: (provided) => ({
      ...provided,
      color: theme === 'dark' ? 'var(--text-primary)' : 'var(--text-primary)',
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: theme === 'dark' ? 'var(--primary-color)' : 'var(--primary-color)',
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: theme === 'dark' ? 'var(--button-text-color)' : 'var(--button-text-color)',
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      color: theme === 'dark' ? 'var(--button-text-color)' : 'var(--button-text-color)',
      ':hover': {
        backgroundColor: theme === 'dark' ? 'var(--primary-color-hover)' : 'var(--primary-color-hover)',
        color: 'white',
      },
    }),
    placeholder: (provided) => ({
      ...provided,
      color: theme === 'dark' ? 'var(--text-muted)' : 'var(--text-muted)',
    }),
    input: (provided) => ({
      ...provided,
      color: theme === 'dark' ? 'var(--text-primary)' : 'var(--text-primary)',
    }),
  };


  return (
    <>
      {/* This button's placement might need to be reconsidered.
          For now, it stays where it was (likely in each Page component).
          If it were part of a global header, its interaction with the fixed panel would be different.
      */}
      <Button
        onClick={toggleFilter}
        className="mb-3 filter-toggle-button" // Added a class for more specific targeting if needed
        variant={theme === 'dark' ? 'outline-light' : 'outline-primary'}
        aria-controls="filter-panel"
        aria-expanded={isOpen}
      >
        {isOpen ? 'Hide Filters' : 'Show Filters'}
      </Button>

      <div
        className={`filter-overlay ${isOpen ? 'open' : ''}`}
        onClick={toggleFilter} // Close panel if overlay is clicked
      />

      <div className={`filter-panel ${isOpen ? 'open' : ''}`} id="filter-panel">
        <Container fluid>
          {/* Added a header to the filter panel for title and close button */}
          <Row className="mb-3 align-items-center">
            <Col>
              <h5 className="mb-0">Filters</h5>
            </Col>
            <Col xs="auto">
              <Button variant="close" onClick={toggleFilter} aria-label="Close filter panel" />
            </Col>
          </Row>

          <Form>
            <Row className="mb-3">
              <Form.Group as={Col} xs="12" controlId="countyFilter">
                <Form.Label>County</Form.Label>
                <Select
                  isMulti
                  options={countyOptions}
                  value={county}
                  onChange={setCounty}
                  placeholder="Select counties..."
                  styles={selectStyles}
                  menuPlacement="auto" // Important for fixed position containers
                />
              </Form.Group>
              <Form.Group as={Col} xs="12" controlId="trsFilter">
                <Form.Label>TRS</Form.Label>
                <TagsInput
                  value={trs}
                  onChange={setTrs}
                  inputProps={{ placeholder: 'Add TRS' }}
                />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} xs="12" controlId="landFilterToggle">
                <Form.Check
                  type="checkbox"
                  label="Search by Land Name"
                  checked={!showGrantorGrantee}
                  onChange={() => setShowGrantorGrantee(!showGrantorGrantee)}
                />
              </Form.Group>
            </Row>

            {showGrantorGrantee ? (
              <>
                <Row className="mb-3">
                  <Form.Group as={Col} xs="12" controlId="grantorFilter">
                    <Form.Label>Grantor</Form.Label>
                    <TagsInput
                      value={grantor}
                      onChange={setGrantor}
                      inputProps={{ placeholder: 'Add Grantor' }}
                    />
                  </Form.Group>
                </Row>
                <Row className="mb-3">
                  <Form.Group as={Col} xs="12" controlId="granteeFilter">
                    <Form.Label>Grantee</Form.Label>
                    <TagsInput
                      value={grantee}
                      onChange={setGrantee}
                      inputProps={{ placeholder: 'Add Grantee' }}
                    />
                  </Form.Group>
                </Row>
              </>
            ) : (
              <Row className="mb-3">
                <Form.Group as={Col} xs="12" controlId="landNameFilter">
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
              <Form.Group as={Col} xs="12" controlId="recordedFromFilter">
                <Form.Label>Recorded From Date</Form.Label>
                <DatePicker
                  selected={recordedFrom}
                  onChange={date => setRecordedFrom(date)}
                  dateFormat="MM/dd/yyyy"
                  className="form-control"
                  placeholderText="Select date"
                  popperPlacement="bottom-start" // Better placement for side panel
                />
              </Form.Group>
              <Form.Group as={Col} xs="12" controlId="recordedToFilter">
                <Form.Label>Recorded To Date</Form.Label>
                <DatePicker
                  selected={recordedTo}
                  onChange={date => setRecordedTo(date)}
                  dateFormat="MM/dd/yyyy"
                  className="form-control"
                  placeholderText="Select date"
                  popperPlacement="bottom-start" // Better placement for side panel
                />
              </Form.Group>
            </Row>

            <Row className="mt-4"> {/* Added mt-4 for spacing */}
              <Col xs={6}> {/* Using xs for better control on small screens */}
                <Button variant="primary" onClick={handleFilterApply} className="w-100">
                  Apply
                </Button>
              </Col>
              <Col xs={6}>
                <Button variant="secondary" onClick={handleClearFilter} className="w-100">
                  Clear
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
