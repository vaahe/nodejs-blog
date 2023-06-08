import { Error } from "../pages/Error";
import { SignIn } from "../pages/auth/SignIn";
import { SignUp } from "../pages/auth/SignUp";
import { MyPosts } from "../pages/posts/MyPosts";
import { EditPost } from "../pages/posts/EditPost";
import { AllPosts } from "../pages/posts/AllPosts";
import { CreatePost } from "../pages/posts/CreatePost";
import { PrivateRoute } from "../helpers/PrivateRoute";
import { Dashboard } from "../pages/dashboard/Dashboard";


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