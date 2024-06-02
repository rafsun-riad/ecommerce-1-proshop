import { Container } from 'react-bootstrap';
import { BrowserRouter, Route } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';

import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main className="py-3">
        <Container>
          <Route path="/" component={Home} exact />
          <Route path="/product/:id" component={ProductDetail} />
        </Container>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
