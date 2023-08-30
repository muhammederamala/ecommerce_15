import { Container } from 'react-bootstrap'
import { createBrowserRouter, RouterProvider, createRoutesFromElements, Route } from 'react-router-dom'


import Footer from './components/Footer';
import Header from './components/Header';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path='/' element = {<HomeScreen />} />
      <Route path='login/' element = {<LoginScreen />} />
      <Route path='register/' element = {<RegisterScreen />} />
      <Route path='/product/:id' element = {<ProductScreen />} />
      <Route path='/cart/:id?' element = { <CartScreen />} />
    </Route>
  )
)


function App() {
  return (
    <div>
      <Header />
      <main className='py-5'>
        <Container>
          <RouterProvider router = {router} />
        </Container>
      </main>
      <Footer />
    </div>
  );
}

export default App;
