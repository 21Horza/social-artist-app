import { CREATE_POST_ROUTE, INFO_ROUTE, POSTS_ROUTE } from "../consts/consts";
import PostCreate from "../components/PostCreate";
import PostsList from "../components/PostsList";
import React from 'react';
import PostInfo from "../components/PostInfo";

export const artistRoutes = [
    {
        path: CREATE_POST_ROUTE,
        element: <PostCreate />
    }
]

export const publicRoutes = [
    {
        path: INFO_ROUTE + '/:id',
        element: <PostInfo />
    },
    {
        path: POSTS_ROUTE,
        element: <PostsList/>
    }
]