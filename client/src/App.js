import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Users from './pages/Users';
import Profile from './pages/Profile';
import Message from './pages/Message';
import Auth from './pages/Auth';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import Posts from './pages/Posts';

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: "http://localhost:4000/graphql"
})


function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Navbar/>
          <Routes>  
            <Route path='/' element={<Users/>}/>
            <Route path='/profile' element={<Profile/>}/>   
            <Route path='/message' element={<Message/>}/>
            <Route path='/posts' element={<Posts/>}/>
            <Route path='/auth/*' element={<Auth/>}/>
          </Routes> 
        <Footer/>
      </div>
    </ApolloProvider>
  );
}

export default App;
