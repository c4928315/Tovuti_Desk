import React from 'react';
import { Navigate, Route, useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ element: Component, isAuthenticated, userClaims, ...rest }) => {
  const navigate = useNavigate();


  const hasRequiredClaims = (requiredClaims) => {
    return requiredClaims.every((claim) => {
      const claimValue = userClaims.find((userClaim) => userClaim.claimType === claim);

      return claimValue && claimValue.claimValue === 'true';
    });
  };

  return (
    <Route
      {...rest}
      element={
        isAuthenticated ? (
          hasRequiredClaims(rest.requiredClaims) ? (
            <Component />
          ) : (
            <Navigate to="/access-denied" />
          )
        ) : (
          <Navigate to="/login" />
        )
      }
    />
  );
};

export default ProtectedRoute;
