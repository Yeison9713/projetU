import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
// import Cookies from 'js-cookie'
import Header from "../components/Header";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from '../Firebase'

export default () => {
    let navigate = useNavigate();
    const [user, loading, error] = useAuthState(auth);

    useEffect(() => {
        if (loading) return;

        if (!user) navigate("/login");
    }, [user, loading])

    return loading ?
        <div>
            <h1>Loading</h1>
        </div>
        :
        <div className='h-full'>

            <Header />
            <Outlet />
        </div>
}