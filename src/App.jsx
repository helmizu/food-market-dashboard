import React from 'react'
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import theme from './config/theme';
import { initializeProject } from './utils/firebase';
import { UserProvider } from './utils/context';
import { getUser } from './utils/storage';
import './App.css';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import CreateRestaurant from './pages/CreateRestaurant';
import AddMenu from './pages/AddMenu';
import Login from './pages/Login';
import Restaurant from './pages/Restaurant';
import Menu from './pages/Menu';
import EditMenu from './pages/EditMenu';

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Dashboard />,
      },
      {
        path: '/restaurant',
        element: <Restaurant />,
      },
      {
        path: '/restaurant/create-restaurant',
        element: <CreateRestaurant />,
      },
      {
        path: '/restaurant/menu',
        element: <Menu />,
      },
      {
        path: '/restaurant/menu/add',
        element: <AddMenu />,
      },
      {
        path: '/restaurant/menu/:menuId/edit',
        element: <EditMenu />,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />
  }
])

// initialize firebase
initializeProject();

const App = () => {
  const initUser = getUser();
  const [user, setUser] = React.useState(initUser)
  return (
    <ThemeProvider theme={theme}>
      <UserProvider value={{ user, setUser }}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <RouterProvider router={router} />
        {/* <App /> */}
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;
