import React, { useContext } from 'react';
import { Tabs, Tab, Container, Button } from 'react-bootstrap';
import './App.css';
import LandPage from './pages/LandPage';
import OrderPage from './pages/OrderPage';
import WellsPage from './pages/WellsPage';
import { ThemeProvider, ThemeContext } from './ThemeContext'; // Import ThemeProvider and ThemeContext

function AppContent() {
  const { theme, toggleTheme } = useContext(ThemeContext); // Consume theme context

  return (
    <div className={`App ${theme}-mode`}> {/* Apply theme class to App div */}
      <header className="App-header">
        <Container fluid>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h1>Well Management</h1>
            <Button
              variant={theme === 'light' ? 'dark' : 'light'}
              onClick={toggleTheme}
              className="theme-toggle-button"
            >
              Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
            </Button>
          </div>
        </Container>
      </header>
      <Container fluid className="mt-3 App-content-body">
        <Tabs defaultActiveKey="land" id="main-tabs" className="mb-3 main-tabs">
          <Tab eventKey="land" title="Land" className="main-tab">
            <LandPage />
          </Tab>
          <Tab eventKey="order" title="Order" className="main-tab">
            <OrderPage />
          </Tab>
          <Tab eventKey="wells" title="Wells" className="main-tab">
            <WellsPage />
          </Tab>
        </Tabs>
      </Container>
    </div>
  );
}

// Wrap AppContent with ThemeProvider
function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
