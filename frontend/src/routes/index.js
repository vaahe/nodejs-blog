import { Error } from "../pages/Error";
import { SignIn } from "../pages/auth/SignIn";
import { SignUp } from "../pages/auth/SignUp";
// import PrivateRoute from "../api/PrivateRoute";
import { MyPosts } from "../pages/posts/MyPosts";
import { AllPosts } from "../pages/posts/AllPosts";
import { CreatePost } from "../pages/posts/CreatePost";
import { Dashboard } from "../pages/dashboard/Dashboard";
import PrivateRoute from "../api/PrivateRoute";
import { EditPost } from "../pages/posts/EditPost";


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
        path: "/users/:userId",
        element:
            <PrivateRoute>
                <Dashboard />
            </PrivateRoute>,
        children: [
            {
                path: "/users/:userId/",
                element: <AllPosts />
            },
            {
                path: "/users/:userId/posts",
                element: <MyPosts />
            },
            {
                path: "/users/:userId/posts/:postId/update",
                element: <EditPost />
            },
            {
                path: "/users/:userId/create",
                element: <CreatePost />
            }
        ]
    },
    {
        path: "*",
        element: <Error />
    }
]