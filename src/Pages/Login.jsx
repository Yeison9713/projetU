import React, { useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom"
import { useAuthState } from "react-firebase-hooks/auth";

import { auth, signInWithEmailAndPassword} from '../Firebase'

export default () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (loading) {
            return;
        }

        if (user) navigate("/");
    }, [user, loading]);

    return (
        <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
            <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
                <h1 className="text-3xl font-semibold text-center text-blue-700">
                    Ingresar
                </h1>
                <div className="mt-6">
                    <div className="mb-2">
                        <label
                            for="email"
                            className="block text-sm font-semibold text-gray-800 text-left"
                        >
                            Correo
                        </label>
                        <input
                            type="email"
                            className="block w-full px-4 py-2 mt-2 text-blue-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}

                        />
                    </div>
                    <div className="mb-2">
                        <label
                            for="password"
                            className="block text-sm font-semibold text-gray-800 text-left"
                        >
                            Contraseña
                        </label>
                        <input
                            type="password"
                            className="block w-full px-4 py-2 mt-2 text-blue-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <a
                        href="#"
                        className="text-xs text-blue-600 hover:underline"
                    >
                        ¿Olvidaste tu contraseña?
                    </a>
                    <div className="mt-6">
                        <button
                            className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-700 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                            onClick={() => signInWithEmailAndPassword(auth, email, password)}
                        >
                            Ingresar
                        </button>
                    </div>
                </div>

                <p className="mt-8 text-xs font-light text-center text-gray-700">
                    {" "}
                    No tienes cuenta?{" "}

                    <Link to="/signup">
                        <a
                            href="#"
                            className="font-medium text-blue-600 hover:underline"
                        >
                            Registrate
                        </a>
                    </Link>
                </p>
            </div>
        </div>
    )
}