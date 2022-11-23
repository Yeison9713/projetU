import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

import { auth, db } from "../Firebase";
import { query, collection, getDocs, where } from "firebase/firestore";

export default () => {
    const [user, setUser] = useState({})

    const handleUser = (e) => {
        const { name, value } = e.target;

        setUser(prevData => ({
            ...prevData,
            [name]: value
        }))
    }

    const handleError = ({ name, value = false }) => {
        setError((prevData) => ({
            ...prevData,
            [name]: value ? true : false
        }))
    }

    const [errors, setError] = useState({
        name: false,
        genero: false,
        edad: false,
        celular: false,
        email: false,
    })

    const [dataAuth, loading, error] = useAuthState(auth);

    const fetchUserName = async () => {
        try {
            const q = query(collection(db, "users"), where("uid", "==", dataAuth?.uid));
            const doc = await getDocs(q);
            const data = doc.docs[0].data();

            setUser(data)
        } catch (err) {
            console.error(err);
            alert("An error occured while fetching user data");
        }
    };

    useEffect(() => {
        if (loading) return;
        fetchUserName();
    }, [dataAuth, loading]);


    return (
        <div className="flex w-full h-full justify-center">
            <div className="text-left w-2/5 space-y-8 divide-y divide-gray-200 px-6 lg:px-8 pb-16">
                <div className="pt-8">
                    <div >
                        <h3 className="text-lg leading-6 font-medium text-gray-900">Informacion personal</h3>
                    </div>

                    <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-12">
                        <div className="sm:col-span-12">
                            <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">
                                Nombres completos
                            </label>
                            <div className="mt-1">
                                <input
                                    type="text"
                                    value={user.name}
                                    onChange={(e) => { handleUser(e); handleError({ name: e.target.name }) }}
                                    name="name"
                                    autoComplete="identification_number"
                                    className="shadow-sm bg-gray-200 cursor-not-allowed focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                    disabled={true}
                                />
                                {errors.first_name && (
                                    <p className="text-red-500 text-sm mt-2">
                                        Names is required.
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-12">
                        <div className="sm:col-span-12">
                            <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">
                                Genero
                            </label>
                            <div className="mt-1">
                                <input
                                    type="text"
                                    value={user.genero}
                                    onChange={(e) => { handleUser(e); handleError({ name: e.target.name }) }}
                                    name="genero"
                                    autoComplete="genero"
                                    className="shadow-sm bg-gray-200 cursor-not-allowed focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                    disabled={true}
                                />
                                {errors.first_name && (
                                    <p className="text-red-500 text-sm mt-2">
                                        Genero is required.
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-12">
                        <div className="sm:col-span-12">
                            <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">
                                Edad
                            </label>
                            <div className="mt-1">
                                <input
                                    type="text"
                                    value={user.edad}
                                    onChange={(e) => { handleUser(e); handleError({ name: e.target.name }) }}
                                    name="edad"
                                    autoComplete="edad"
                                    className="shadow-sm bg-gray-200 cursor-not-allowed focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                    disabled={true}
                                />
                                {errors.first_name && (
                                    <p className="text-red-500 text-sm mt-2">
                                        Edad is required.
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-12">
                        <div className="sm:col-span-12">
                            <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">
                                Celular
                            </label>
                            <div className="mt-1">
                                <input
                                    type="text"
                                    value={user.celular}
                                    onChange={(e) => { handleUser(e); handleError({ name: e.target.name }) }}
                                    name="celular"
                                    autoComplete="celular"
                                    className="shadow-sm bg-gray-200 cursor-not-allowed focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                    disabled={true}
                                />
                                {errors.first_name && (
                                    <p className="text-red-500 text-sm mt-2">
                                        Celular is required.
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-12">
                        <div className="sm:col-span-12">
                            <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">
                                Correo
                            </label>
                            <div className="mt-1">
                                <input
                                    type="text"
                                    value={user.email}
                                    onChange={(e) => { handleUser(e); handleError({ name: e.target.name }) }}
                                    name="email"
                                    autoComplete="email"
                                    className="shadow-sm bg-gray-200 cursor-not-allowed focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                    disabled={true}
                                />
                                {errors.first_name && (
                                    <p className="text-red-500 text-sm mt-2">
                                        Correo is required.
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </div>

    )
}