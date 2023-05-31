import { Error } from "../pages/Error";
import { SignIn } from "../pages/auth/SignIn";
import { SignUp } from "../pages/auth/SignUp";
// import PrivateRoute from "../api/PrivateRoute";
import { MyPosts } from "../pages/posts/MyPosts";
import { AllPosts } from "../pages/posts/AllPosts";
import { CreatePost } from "../pages/posts/CreatePost";
import { Dashboard } from "../pages/dashboard/Dashboard";
import PrivateRoute from "../api/PrivateRoute";


export const routes = [
    {
        path: "/",
        element: <SignIn redirect="/signin" />,
    },
    {
        path: "/signin",
        element: <SignIn />,
    },
    {
        path: "/signup",
        element: <SignUp />,
    },
    {
        path: "/users/:id",
        element:
            <PrivateRoute>
                <Dashboard />
            </PrivateRoute>,
        children: [
            {
                path: "/users/:id/",
                element: <AllPosts />
            },
            {
                path: "/users/:id/posts",
                element: <MyPosts />
            },
            {
                path: "/users/:id/create_post",
                element: <CreatePost />
            }
        ]
    },
    {
        path: "*",
        element: <Error />
    }
]