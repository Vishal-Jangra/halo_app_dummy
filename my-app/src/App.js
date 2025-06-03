import React from 'react';
import { Tabs, Tab, Container } from 'react-bootstrap';
import './App.css';
import LandPage from './pages/LandPage';
import OrderPage from './pages/OrderPage';
import WellsPage from './pages/WellsPage';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Well Management</h1>
      </header>
      <Container fluid className="mt-3">
        <Tabs defaultActiveKey="land" id="main-tabs" className="mb-3">
          <Tab eventKey="land" title="Land">
            <LandPage />
          </Tab>
          <Tab eventKey="order" title="Order">
            <OrderPage />
          </Tab>
          <Tab eventKey="wells" title="Wells">
            <WellsPage />
          </Tab>
        </Tabs>
      </Container>
    </div>
  );
}

export default App;
