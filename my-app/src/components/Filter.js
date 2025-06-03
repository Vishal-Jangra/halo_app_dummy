import React, { useState, useContext, useEffect } from 'react';
import { Button, Form, Col, Row } from 'react-bootstrap'; // Removed Container as it's not used directly now
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

  // State for filter values
  const [county, setCounty] = useState([]);
  const [trs, setTrs] = useState([]);
  const [grantor, setGrantor] = useState([]);
  const [grantee, setGrantee] = useState([]);
  const [landName, setLandName] = useState([]);
  const [recordedFrom, setRecordedFrom] = useState(null);
  const [recordedTo, setRecordedTo] = useState(null);
  const [showGrantorGrantee, setShowGrantorGrantee] = useState(true);

  // State for TagsInput input values
  const [trsInputValue, setTrsInputValue] = useState('');
  const [grantorInputValue, setGrantorInputValue] = useState('');
  const [granteeInputValue, setGranteeInputValue] = useState('');
  const [landNameInputValue, setLandNameInputValue] = useState('');

  const countyOptions = [
    { value: 'county1', label: 'County 1' },
    { value: 'county2', label: 'County 2' },
    { value: 'county3', label: 'County 3' },
  ];

  const toggleFilter = () => setIsOpen(!isOpen);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const handleFilterApply = () => {
    if (recordedFrom && recordedTo && recordedFrom > recordedTo) {
      alert('Recorded From date cannot be after Recorded To date.');
      return;
    }
    onFilterChange({ county, trs, grantor: showGrantorGrantee ? grantor : [], grantee: showGrantorGrantee ? grantee : [], landName: !showGrantorGrantee ? landName : [], recordedFrom, recordedTo });
    setIsOpen(false);
  };

  const handleClearFilter = () => {
    setCounty([]); setTrs([]); setGrantor([]); setGrantee([]); setLandName([]);
    setRecordedFrom(null); setRecordedTo(null); setShowGrantorGrantee(true);
    setTrsInputValue(''); setGrantorInputValue(''); setGranteeInputValue(''); setLandNameInputValue(''); // Clear input values too
    onFilterChange({});
  };

  // Generic handler for tag double-click
  const handleTagDoubleClick = (tagValue, currentTags, setTagsFunc, setInputValueFunc) => {
    const newTags = currentTags.filter(t => t !== tagValue);
    setTagsFunc(newTags);
    setInputValueFunc(tagValue);
  };

  // renderTag prop for all TagsInput components
  const renderEditableTag = (tagProps, currentTags, setTagsFunc, setInputValueFunc) => {
    const { tag, key, disabled, onRemove, getTagDisplayValue } = tagProps;
    const tagDisplayValue = getTagDisplayValue(tag);
    return (
      <span
        key={key}
        className="react-tagsinput-tag"
        onDoubleClick={() => !disabled && handleTagDoubleClick(tagDisplayValue, currentTags, setTagsFunc, setInputValueFunc)}
      >
        {tagDisplayValue}
        {!disabled && <a className="react-tagsinput-remove" onClick={() => onRemove(key)} />}
      </span>
    );
  };

  const selectStyles = { // Styles from previous step, ensure they are up-to-date
    control: (provided, state) => ({...provided, minHeight: 'calc(1.6em + 1rem + 2px)', padding: '0 0.25rem', fontSize: '0.95rem', borderRadius: '6px', backgroundColor: theme === 'dark' ? 'var(--input-bg)' : 'var(--input-bg)', borderColor: state.isFocused ? (theme === 'dark' ? 'var(--input-focus-border)' : 'var(--input-focus-border)') : (theme === 'dark' ? 'var(--input-border)' : 'var(--input-border)'), boxShadow: state.isFocused ? `0 0 0 0.2rem ${theme === 'dark' ? 'var(--input-focus-shadow)' : 'var(--input-focus-shadow)'}` : null, '&:hover': {borderColor: theme === 'dark' ? 'var(--input-focus-border)' : 'var(--input-focus-border)',}, }),
    valueContainer: (provided) => ({...provided, padding: '2px 6px',}),
    menu: (provided) => ({...provided, backgroundColor: theme === 'dark' ? 'var(--bg-secondary)' : 'var(--bg-primary)', borderRadius: '6px', boxShadow: `0 4px 12px ${theme === 'dark' ? 'var(--shadow-color)' : 'rgba(0,0,0,0.1)'}`, zIndex: 1021,}),
    option: (provided, state) => ({...provided, backgroundColor: state.isSelected ? (theme === 'dark' ? 'var(--primary-color)' : 'var(--primary-color)') : state.isFocused ? (theme === 'dark' ? 'var(--primary-color-hover)' : 'var(--primary-color-hover)') : (theme === 'dark' ? 'var(--bg-secondary)' : 'var(--bg-primary)'), color: state.isSelected ? (theme === 'dark' ? 'var(--button-text-color)' : 'var(--button-text-color)') : state.isFocused ? (theme === 'dark' ? 'var(--button-text-color)' : 'var(--button-text-color)') : (theme === 'dark' ? 'var(--text-primary)' : 'var(--text-primary)'), '&:active': {backgroundColor: theme === 'dark' ? 'var(--primary-color-hover)' : 'var(--primary-color-hover)',}, borderRadius: '4px', margin: '2px 4px', width: 'calc(100% - 8px)',}),
    singleValue: (provided) => ({ ...provided, color: theme === 'dark' ? 'var(--text-primary)' : 'var(--text-primary)' }),
    multiValue: (provided) => ({...provided, backgroundColor: theme === 'dark' ? 'var(--primary-color)' : 'var(--primary-color)', borderRadius: '4px', padding: '2px 4px',}),
    multiValueLabel: (provided) => ({ ...provided, color: theme === 'dark' ? 'var(--button-text-color)' : 'var(--button-text-color)', fontSize: '0.85rem' }),
    multiValueRemove: (provided) => ({...provided, color: theme === 'dark' ? 'var(--button-text-color)' : 'var(--button-text-color)', ':hover': {backgroundColor: theme === 'dark' ? 'var(--primary-color-hover)' : 'var(--primary-color-hover)', color: theme === 'dark' ? 'var(--button-text-color)' : 'var(--button-text-color)', borderRadius: '0 4px 4px 0',},}),
    placeholder: (provided) => ({ ...provided, color: theme === 'dark' ? 'var(--text-muted)' : 'var(--text-muted)' }),
    input: (provided) => ({ ...provided, color: theme === 'dark' ? 'var(--text-primary)' : 'var(--text-primary)' }),
    clearIndicator: (provided) => ({...provided, color: theme === 'dark' ? 'var(--text-muted)' : 'var(--text-muted)', ':hover': { color: theme === 'dark' ? 'var(--text-primary)' : 'var(--text-primary)'}}),
    dropdownIndicator: (provided) => ({...provided, color: theme === 'dark' ? 'var(--text-muted)' : 'var(--text-muted)', ':hover': { color: theme === 'dark' ? 'var(--text-primary)' : 'var(--text-primary)'}}),
    indicatorSeparator: (provided) => ({...provided, backgroundColor: theme === 'dark' ? 'var(--input-border)' : 'var(--input-border)',})
  };

  return (
    <>
      <Button onClick={toggleFilter} className="mb-3 filter-toggle-button" variant={theme === 'dark' ? 'outline-light' : 'outline-primary'} aria-controls="filter-panel" aria-expanded={isOpen}>
        {isOpen ? 'Hide Filters' : 'Show Filters'}
      </Button>
      <div className={`filter-overlay ${isOpen ? 'open' : ''}`} onClick={toggleFilter} />
      <div className={`filter-panel ${isOpen ? 'open' : ''}`} id="filter-panel">
        <div className="filter-panel-header">
          <h5>Filters</h5>
          <Button variant="close" onClick={toggleFilter} aria-label="Close filter panel" />
        </div>
        <Form>
          <Form.Group controlId="countyFilter">
            <Form.Label>County</Form.Label>
            <Select isMulti options={countyOptions} value={county} onChange={setCounty} placeholder="Select counties..." styles={selectStyles} menuPlacement="auto" />
          </Form.Group>

          <Form.Group controlId="trsFilter">
            <Form.Label>TRS</Form.Label>
            <TagsInput
              value={trs}
              onChange={(tags) => { setTrs(tags); if (tags.length === 0 || (tags.length > 0 && trsInputValue === tags[tags.length-1])) setTrsInputValue(''); }}
              inputValue={trsInputValue}
              onChangeInput={setTrsInputValue}
              renderTag={(props) => renderEditableTag(props, trs, setTrs, setTrsInputValue)}
              inputProps={{ placeholder: 'Add TRS', className: 'filter-input-common' }}
            />
          </Form.Group>

          <Form.Group controlId="landFilterToggle">
            <Form.Check type="checkbox" label="Search by Land Name (instead of Grantor/Grantee)" checked={!showGrantorGrantee} onChange={() => setShowGrantorGrantee(!showGrantorGrantee)} />
          </Form.Group>

          {showGrantorGrantee ? (
            <>
              <Form.Group controlId="grantorFilter">
                <Form.Label>Grantor</Form.Label>
                <TagsInput
                  value={grantor}
                  onChange={(tags) => { setGrantor(tags); if (tags.length === 0 || (tags.length > 0 && grantorInputValue === tags[tags.length-1])) setGrantorInputValue(''); }}
                  inputValue={grantorInputValue}
                  onChangeInput={setGrantorInputValue}
                  renderTag={(props) => renderEditableTag(props, grantor, setGrantor, setGrantorInputValue)}
                  inputProps={{ placeholder: 'Add Grantor', className: 'filter-input-common' }}
                />
              </Form.Group>
              <Form.Group controlId="granteeFilter">
                <Form.Label>Grantee</Form.Label>
                <TagsInput
                  value={grantee}
                  onChange={(tags) => { setGrantee(tags); if (tags.length === 0 || (tags.length > 0 && granteeInputValue === tags[tags.length-1])) setGranteeInputValue(''); }}
                  inputValue={granteeInputValue}
                  onChangeInput={setGranteeInputValue}
                  renderTag={(props) => renderEditableTag(props, grantee, setGrantee, setGranteeInputValue)}
                  inputProps={{ placeholder: 'Add Grantee', className: 'filter-input-common' }}
                />
              </Form.Group>
            </>
          ) : (
            <Form.Group controlId="landNameFilter">
              <Form.Label>Land Name</Form.Label>
              <TagsInput
                value={landName}
                onChange={(tags) => { setLandName(tags); if (tags.length === 0 || (tags.length > 0 && landNameInputValue === tags[tags.length-1])) setLandNameInputValue(''); }}
                inputValue={landNameInputValue}
                onChangeInput={setLandNameInputValue}
                renderTag={(props) => renderEditableTag(props, landName, setLandName, setLandNameInputValue)}
                inputProps={{ placeholder: 'Add Land Name', className: 'filter-input-common' }}
              />
            </Form.Group>
          )}

          <Form.Group controlId="recordedFromFilter">
            <Form.Label>Recorded From Date</Form.Label>
            <DatePicker selected={recordedFrom} onChange={date => setRecordedFrom(date)} dateFormat="MM/dd/yyyy" className="filter-input-common" placeholderText="Select date" popperPlacement="bottom-start" />
          </Form.Group>
          <Form.Group controlId="recordedToFilter">
            <Form.Label>Recorded To Date</Form.Label>
            <DatePicker selected={recordedTo} onChange={date => setRecordedTo(date)} dateFormat="MM/dd/yyyy" className="filter-input-common" placeholderText="Select date" popperPlacement="bottom-start" />
          </Form.Group>

          <Row className="mt-4">
            <Col xs={6}><Button variant="primary" onClick={handleFilterApply} className="w-100">Apply</Button></Col>
            <Col xs={6}><Button variant="secondary" onClick={handleClearFilter} className="w-100">Clear</Button></Col>
          </Row>
        </Form>
      </div>
    </>
  );
}

export default Filter;
