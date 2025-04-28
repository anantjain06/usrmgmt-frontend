import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router';
import Login from './pages/Login';
import Layout from './Layout';
import ProtectedRoute from "./pages/ProtectedRoute";
import { protectedRoutes } from './config/RoutesConfig';

function App() {
  return (
    <Routes>
      {/* Public Route */}
      <Route path="/login" element={<Login />} />

      {/* Layout Route with Nested Children */}
      <Route path="/" element={<Layout />}>
        {protectedRoutes.map(({ path, element }) => (
          <Route
            key={path}
            path={path.replace(/^\//, '')}
            element={<ProtectedRoute>{element}</ProtectedRoute>}
          />
        ))}
      </Route>
    </Routes>
  );
}

export default App;
