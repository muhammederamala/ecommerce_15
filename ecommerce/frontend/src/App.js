import { Container } from 'react-bootstrap'
import { createBrowserRouter, RouterProvider, createRoutesFromElements, Route } from 'react-router-dom'


import Footer from './components/Footer';
import Header from './components/Header';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path='/' element = {<HomeScreen />} />
      <Route path='/product/:id' element = {<ProductScreen />} />
    </Route>
  )
)


function App() {
  return (
    <div>
      <Header />
      <main>
        <Container>
          <RouterProvider router = {router} />
        </Container>
      </main>
      <Footer />
    </div>
  );
}

export default App;
