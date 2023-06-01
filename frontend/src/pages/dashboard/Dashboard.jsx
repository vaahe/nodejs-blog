import React, { useMemo, useState } from 'react';
import { Outlet } from 'react-router';

import { Main } from '../../layouts/Main';
import { Header } from '../../layouts/Header';
import { Sidebar } from '../../layouts/Sidebar';
import { Messages } from '../../components/Messages';
import { Pagination } from '../../components/Pagination';

import posts from "../../posts.json";

export const Dashboard = () => {


    return (
        <div className="bg-white dark:bg-[#0F172A] h-screen">
            <Header />
            <Sidebar />
            <Main>
                <Outlet />
               
                <Messages />
            </Main>
        </div>
    )
}
