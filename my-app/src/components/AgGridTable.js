import React, { useContext, useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ThemeContext } from '../ThemeContext'; // Adjust path if needed, should be correct

const AgGridTable = ({ columnDefs, rowData, quickFilterText, onGridReady, onFirstDataRendered }) => {
  const { theme } = useContext(ThemeContext);

  const defaultColDef = useMemo(() => ({
    sortable: true,
    resizable: true,
    filter: true, // Enable column filters by default
    floatingFilter: true, // Display floating filter row
    minWidth: 100, // Minimum column width
    suppressMenu: false, // Show column menu
  }), []);

  // Ensure grid responsiveness and set a default height.
  // Consider making height configurable via props or using autoHeight.
  const gridStyle = useMemo(() => ({ height: '600px', width: '100%' }), []);

  return (
    <div className={theme === 'dark' ? 'ag-theme-alpine-dark' : 'ag-theme-alpine'} style={gridStyle}>
      <AgGridReact
        columnDefs={columnDefs}
        rowData={rowData}
        defaultColDef={defaultColDef}
        pagination={true}
        paginationPageSize={25}
        domLayout='normal' // 'normal' is better for fixed height, 'autoHeight' for dynamic
        enableCellTextSelection={true}
        ensureDomOrder={true} // For accessibility
        quickFilterText={quickFilterText}
        onGridReady={onGridReady} // Callback for when grid is ready
        onFirstDataRendered={onFirstDataRendered} // Callback for when data is first rendered
        // Other useful props:
        // rowSelection="multiple" // Example: for enabling row selection
        // animateRows={true}
        // suppressRowClickSelection={true} // If using checkboxes for selection
        // sideBar={true} // To show column tool panel
      />
    </div>
  );
};

export default AgGridTable;
