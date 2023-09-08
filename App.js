import './App.css';
import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import RootLayout from './RootLayout';
import 'bootstrap/dist/css/bootstrap.min.css';
import Error from './components/Error';
import Login from './components/userLogin';
import Home from './components/home';
import Register from './components/UserRegister';
import Profile from './components/Profile';
import Dashboard from './components/Dashboard';

function App() {
  const router = createBrowserRouter([
    {
      path:'/',
      element:<RootLayout/>,
      errorElement:<Error/>,
      children:[
        {
          path:'/',
          element:<Home/>
        },
        {
          path:'/register',
          element:<Register/>
        },
        {
          path:'/login',
          element:<Login/>
        },
        {
          path:'/addevent',
          element:<AddEvent/>
        } ,
        {
          path:'/profile',
          element:<Profile/>
        },{
          path:'/dashboard',
          element:<Dashboard/>
        }
      ]
    }
  ])
  return (
    <RouterProvider router={ router}/>
  );
}

export default App;
