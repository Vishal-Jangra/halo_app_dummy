import React, { useMemo, useState, useEffect } from 'react';
import { useTable, useSortBy, useGlobalFilter } from 'react-table';
import { Table as BootstrapTable, Form, InputGroup, Button, Alert } from 'react-bootstrap';
import './Table.css'; // For custom table styling if needed

// GlobalFilter component
function GlobalFilter({ globalFilter, setGlobalFilter }) {
  const [value, setValue] = useState(globalFilter);
  const onChange = (e) => {
    setValue(e.target.value);
  };

  // Debounce setting global filter
  useEffect(() => {
    const timeout = setTimeout(() => {
      setGlobalFilter(value || undefined);
    }, 300);
    return () => clearTimeout(timeout);
  }, [value, setGlobalFilter]);

  return (
    <InputGroup className="mb-3">
      <Form.Control
        value={value || ''}
        onChange={onChange}
        placeholder="Search all columns..."
      />
    </InputGroup>
  );
}

function AppTable({ columns, data }) {
  const [selectedCell, setSelectedCell] = useState(null);
  const [copiedAlert, setCopiedAlert] = useState(false);

  const defaultColumn = useMemo(
    () => ({
      // Let's set up our default Filter UI
      // Filter: DefaultColumnFilter, // We are using global filter for now
    }),
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
    },
    useGlobalFilter,
    useSortBy
  );

  const handleCellClick = (cell) => {
    setSelectedCell(cell.value);
    navigator.clipboard.writeText(cell.value).then(() => {
      setCopiedAlert(true);
      setTimeout(() => setCopiedAlert(false), 2000); // Hide alert after 2 seconds
    }).catch(err => {
      console.error('Failed to copy text: ', err);
      // Fallback for older browsers or if clipboard API is not available
      // You could implement a modal or a textarea to allow manual copying
      alert('Failed to copy. Please try again or copy manually.');
    });
  };

  return (
    <>
      {copiedAlert && (
        <Alert variant="success" onClose={() => setCopiedAlert(false)} dismissible>
          Copied "{selectedCell}" to clipboard!
        </Alert>
      )}
      <GlobalFilter
        globalFilter={state.globalFilter}
        setGlobalFilter={setGlobalFilter}
      />
      <BootstrapTable striped bordered hover responsive {...getTableProps()} className="app-table">
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? ' 🔽'
                        : ' 🔼'
                      : ''}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => (
                  <td
                    {...cell.getCellProps()}
                    onClick={() => handleCellClick(cell)}
                    title="Click to copy cell content"
                    style={{ cursor: 'pointer' }}
                  >
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </BootstrapTable>
      {rows.length === 0 && <p className="text-center">No data to display.</p>}
       {selectedCell && !copiedAlert && ( /* Show selected content if not showing copied alert */
        <div className="mt-2">
          <strong>Selected for copy:</strong> {selectedCell}
        </div>
      )}
    </>
  );
}

// Dummy data and columns for initial setup and testing
export const dummyData = [
  { id: 1, name: 'Well A', type: 'Oil', depth: 10000, status: 'Active' },
  { id: 2, name: 'Well B', type: 'Gas', depth: 12000, status: 'Inactive' },
  { id: 3, name: 'Well C', type: 'Oil', depth: 9500, status: 'Active' },
  { id: 4, name: 'Site Alpha', type: 'Injection', depth: 15000, status: 'Permitted' },
  { id: 5, name: 'Test Well 001', type: 'Exploratory', depth: 5000, status: 'Drilling' },
];

export const dummyColumns = [
  { Header: 'ID', accessor: 'id' },
  { Header: 'Name', accessor: 'name' },
  { Header: 'Type', accessor: 'type' },
  { Header: 'Depth (ft)', accessor: 'depth', Cell: ({ value }) => `${value.toLocaleString()}` },
  { Header: 'Status', accessor: 'status' },
];

export default AppTable;
