import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";

// import SignUp from './components/SignUp/SignUp';
// import SignIn from './components/SignIn/SignIn'
import Index from "./pages/Index/Index";
import {
  ProtectedAdminRoute,
} from "./middleware/auth";
import AdminLogin from "./pages/Admin/AdminLogin/AdminLogin";
import AdminDashboard from "./pages/Admin/Dashboard/Dashboard";

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
