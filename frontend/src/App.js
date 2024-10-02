import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";

import Home from "./pages/User/Home/Home";
// import SignUp from './components/SignUp/SignUp';
// import SignIn from './components/SignIn/SignIn'
import Index from "./pages/Index/Index";
import {
  AuthorizeUser,
  ProtectedAdminRoute,
  ProtectRoute,
} from "./middleware/auth";
import AdminLogin from "./pages/Admin/AdminLogin/AdminLogin";
import AdminDashboard from "./pages/Admin/Dashboard/Dashboard";
import EventManager from "./pages/Admin/EventManager/EventManager";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={<Index />} />
      {/* <Route path="/register" element={<SignUp />} /> */}
      {/* <Route path="/password" element={<SignIn />} /> */}
      {/* <Route path="/profile" element={<AuthorizeUser><Profile /></AuthorizeUser>} /> */}
      {/* <Route path="/reset" element={<Reset />} /> */}
      {/* <Route path="/recovery" element={<Recovery />} /> */}
      {/* <Route path="/pagenotfound" element={<PageNotFound />} /> */}
      <Route
        path="/user/home"
        element={
          <AuthorizeUser>
            <Home />
          </AuthorizeUser>
        }
      />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedAdminRoute>
            {" "}
            <AdminDashboard />{" "}
          </ProtectedAdminRoute>
        }
      />
      <Route
        path="/admin/events"
        element={
          <ProtectedAdminRoute>
            <EventManager />
          </ProtectedAdminRoute>
        }
      />
    </Route>
  )
);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
