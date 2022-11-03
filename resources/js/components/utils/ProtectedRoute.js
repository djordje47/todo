import {Navigate, Outlet} from "react-router";

const ProtectedRoute = ({isAllowed, redirectPath = '/landing', children}) => {
  if (!isAllowed) {
    return <Navigate to={redirectPath} replace/>;
  }
  return children ? children : <Outlet/>;
};
export default ProtectedRoute;