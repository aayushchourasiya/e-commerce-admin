import React from 'react';
import { Navigate } from 'react-router-dom';

export function PageNotFound() {
  return <Navigate to="/"/>;
}