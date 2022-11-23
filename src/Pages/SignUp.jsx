import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, registerWithEmailAndPassword, } from "../Firebase";

export default () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [genero, setGenero] = useState("");
    const [edad, setEdad] = useState("");
    const [celular, setCelular] = useState("");

    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();
    const register = () => {
        if (!name) alert("Please enter name");
        registerWithEmailAndPassword({
            name,
            genero,
            edad,
            celular,
            email,
            password
        });
    };
    useEffect(() => {
        if (loading) return;
        if (user) navigate("/");
    }, [user, loading]);

    return (
        <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
            <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
                <h1 className="text-3xl font-semibold text-center text-blue-700">
                    Registrarse
                </h1>
                <div className="mt-6" >
                    <div className="mb-2 " >
                        <label
                            className="block text-sm font-semibold text-gray-800 text-left"
                        >
                            Nombres completos
                        </label>
                        <input
                            type="text"
                            className="block w-full px-4 py-2 mt-2 text-blue-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div className="mb-2 flex justify-between">
                        <div className="w-full">
                            <label
                                className="block text-sm font-semibold text-gray-800 text-left"
                            >
                                Genero
                            </label>
                            <select
                                value={genero}
                                className="mt-2 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                onChange={(e) => setGenero(e.target.value)}
                            >
                                <option value={''}>Choose an option</option>
                                <option value={'masculino'}>Masculino</option>
                                <option value={'femenino'}>Femenino</option>

                            </select>

                        </div>
                        <div className="ml-2 w-full">
                            <label

                                className="block text-sm font-semibold text-gray-800 text-left"
                            >
                                Edad
                            </label>
                            <input
                                type="text"
                                className="block w-full px-4 py-2 mt-2 text-blue-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                value={edad}
                                onChange={(e) => setEdad(e.target.value)}
                            />

                        </div>

                    </div>



                    <div className="mb-2">
                        <label
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
                            className="block text-sm font-semibold text-gray-800 text-left"
                        >
                            Celular
                        </label>
                        <input
                            type="text"
                            className="block w-full px-4 py-2 mt-2 text-blue-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            value={celular}
                            onChange={(e) => setCelular(e.target.value)}
                        />
                    </div>

                    <div className="mb-2">
                        <label
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
                    <div className="mt-6">
                        <button
                            onClick={register}
                            className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-700 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                        >
                            Registrar
                        </button>
                    </div>
                </div>

            </div>
        </div>
    )
}