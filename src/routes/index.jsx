import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useAuth } from "../components/Context/AuthProvider";
import { ProtectedRoute } from "./ProtectedRoute";
// import Dashboard from "../components/dashboard/Dashboard";
import Login from "../components/login/Login";
import Users from "../components/Users/Users";


const Routes = () => {
    const { token } = useAuth();

    // Define public routes accessible to all users
    const routesForPublic = [
        {
            path: "/login",
            element: <Login />,
        },
        {
            path: "/about-us",
            element: <div>About Us</div>,
        },
    ];

    // Define routes accessible only to authenticated users
    const routesForAuthenticatedOnly = [
        {
            path: "/",
            element: <ProtectedRoute />, // Wrap the component in ProtectedRoute
            children: [



                {
                    path: '/user-permissions',
                    element: <Users />
                },

            ],
        },
    ];

    // Define routes accessible only to non-authenticated users
    const routesForNotAuthenticatedOnly = [

        {
            path: "/login",
            element: <Login />,
        },
    ];

    // Combine and conditionally include routes based on authentication status
    const router = createBrowserRouter([
        ...routesForPublic,
        ...(!token ? routesForNotAuthenticatedOnly : []),
        ...routesForAuthenticatedOnly,
    ]);

    // Provide the router configuration using RouterProvider
    return <RouterProvider router={router} />;
};

export default Routes;