import React, { useEffect, useState } from "react";
import { auth, db, createPet } from "../Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { query, collection, getDocs, where } from "firebase/firestore";

import { PencilAltIcon, TrashIcon } from "@heroicons/react/outline"

const dataForm = () => {
    return {
        name: '',
        age: '',
        type: '',
        color: '',
        weight: '',
        method: 'create'
    }
}

const profiles = [
    { value: 'cat', text: 'Gato' },
    { value: 'dog', text: 'Perro' },
    { value: 'rabbit', text: 'Conejos' },
    { value: 'gangster', text: 'Gangster' },
    { value: 'horse', text: 'Caballo' },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default () => {
    const [showModalPet, setShowModalPet] = useState(false);
    const [form, setForm] = useState(dataForm)
    const [pets, setPets] = useState([])
    const [dataAuth, loading, error] = useAuthState(auth);

    const handleChangeForm = (e) => {
        const { name, value } = e.target;

        setForm(prevData => ({
            ...prevData,
            [name]: value
        }))
    }

    const validateForm = async () => {
        try {
            if (!form.name) {
                alert("Ingrese el nombre")
            } else if (!form.age) {
                alert("Ingrese la edad")
            } else if (!form.type) {
                alert("Seleciona el tipo de mascota");
            } else if (!form.color) {
                alert("Ingrese el color del animal");
            } else if (form.method == 'update') {
                alert("Metodo no habilitado")
            } else {
                await createPet({ auth: dataAuth, ...form })

                alert("Se registro correctamente!")
                setShowModalPet(false)
                fetchPets()
            }

        } catch (error) {
            console.log(error)
        }
    }

    const fetchPets = async () => {
        try {
            const q = query(collection(db, "pets"), where("user_id", "==", dataAuth?.uid));
            const doc = await getDocs(q);

            let glass = []

            for (const item of doc.docs) {
                glass.push(item.data())
            }

            setPets(glass)

        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        if (loading) return;

        if (dataAuth) fetchPets()
    }, [dataAuth, loading])

    const getProfile = (id) => {
        let profile = profiles.find(e => e.value === id)
        return profile ? profile.text : ''
    }

    const formatDate = (dateIso) => {
        if (!dateIso) return ''

        return new Date(dateIso).toLocaleString()
    }

    return (
        <div className="max-w-4xl mx-auto">
            <div className="py-8 px-4 sm:px-6 lg:px-8">
                <div className="sm:flex sm:items-center">
                    <div className="sm:flex-auto">
                        <h1 className="text-xl font-semibold text-gray-900">Mascotas</h1>
                    </div>

                    <button
                        type="button"
                        className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        onClick={() => setShowModalPet(true)}
                    >
                        Nueva mascota
                    </button>
                </div>
                <br />

                <div className="mt-8 flex flex-col">
                    <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                                <table className="min-w-full divide-y divide-gray-300">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th scope="col" className="py-3.5 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                                Nombre
                                            </th>
                                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                Edad
                                            </th>
                                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                Tipo de mascota
                                            </th>
                                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                Color
                                            </th>
                                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                Fecha creado
                                            </th>
                                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                Action
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 bg-white">
                                        {/*  */}

                                        {pets && pets.map((pet) => (
                                            <tr key={pet.created_at}>
                                                <td className="whitespace-nowrap py-4 pr-3 text-sm text-gray-500 sm:pl-6">
                                                    <div className="text-gray-900 font-semibold">{`${pet.name}`}</div>
                                                </td>
                                                <td className="whitespace-nowrap py-4 pl-2.5 pr-3 text-sm text-gray-500 text-center">
                                                    <div className="text-gray-500">{`${pet.age}`}</div>
                                                </td>
                                                <td className="whitespace-nowrap py-4 pl-2.5 pr-3 text-sm text-gray-500">
                                                    <div className="text-gray-500">{getProfile(pet.type)}</div>
                                                </td>
                                                <td className="whitespace-nowrap py-4 pl-2.5 pr-3 text-sm text-gray-500">
                                                    <div className="text-gray-500">{pet.color}</div>
                                                </td>
                                                <td className="whitespace-nowrap py-4 pl-2.5 pr-3 text-sm text-gray-500">
                                                    <div className="text-gray-500">{formatDate(pet.created_at)}</div>
                                                </td>
                                                <td className="whitespace-nowrap py-4 pl-2.5 pr-3 text-sm text-gray-500 ">
                                                    <div className="text-gray-500 flex align-middle">

                                                        <div className="relative flex flex-col items-center group">
                                                            <PencilAltIcon id={pet.id} onClick={() => {

                                                                setForm(pet);
                                                                handleChangeForm({ target: { value: 'update', name: 'method' } });
                                                                setShowModalPet(true)

                                                            }} className="ml-1 mt-1 h-4 w-4 cursor-pointer hover:text-sky-600" />

                                                            <div className="absolute bottom-0 flex flex-col items-center hidden mb-6 group-hover:flex">
                                                                <span className="relative z-10 p-2 text-xs leading-none text-white whitespace-no-wrap bg-gray-600 shadow-lg rounded-md">Actualizar mascota</span>
                                                                <div className="w-3 h-3 -mt-2 rotate-45 bg-gray-600"></div>
                                                            </div>
                                                        </div>

                                                        <div className="relative flex flex-col items-center group">

                                                            <TrashIcon id={pet.created_at}
                                                                className="ml-1 mt-1 h-4 w-4 cursor-pointer hover:text-red-600" data-bs-toggle="tooltip" data-bs-placement="top" title="Tooltip on top" />

                                                            <div className="absolute bottom-0 flex flex-col items-center hidden mb-6 group-hover:flex">
                                                                <span className="relative z-10 p-2 text-xs leading-none text-white whitespace-no-wrap bg-gray-600 shadow-lg rounded-md">Inhabilitar mascota</span>
                                                                <div className="w-3 h-3 -mt-2 rotate-45 bg-gray-600"></div>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                        {/*  */}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {showModalPet ? (
                <>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                        <div className="relative w-96 my-6 mx-auto max-w-3xl">
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">

                                {/*header*/}
                                <div className="flex items-start justify-between p-4 border-b border-solid border-slate-200 rounded-t">


                                    <h3 className="text-2xl font-semibold">
                                        {form?.method === 'create' ? 'Agregar mascota' : 'Modificar mascota'}
                                    </h3>
                                    <button
                                        className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                        onClick={() =>
                                            setShowModalPet(false)
                                        }
                                    >
                                        <span className="text-black-900 font-semibold h-6 w-6 block">
                                            ×
                                        </span>
                                    </button>
                                </div>

                                {/*body*/}
                                <div className="relative  flex-auto">
                                    <div className="mt-10 sm:mt-0">

                                        <div className="mt-5 md:mt-0 md:col-span-2">

                                            <div className="px-4 py-4 bg-white ">
                                                <div className="grid grid-cols-12 gap-3">

                                                    <div className="col-span-12 sm:col-span-12">
                                                        <label className="block text-sm font-medium text-gray-700">
                                                            Nombre
                                                        </label>
                                                        <input
                                                            disabled={form?.method === 'create' ? false : true}
                                                            type="text"
                                                            name="name"
                                                            value={form.name}
                                                            onChange={handleChangeForm}
                                                            autoComplete="name"
                                                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                        />
                                                    </div>

                                                    <div className="col-span-12 sm:col-span-12">
                                                        <label className="block text-sm font-medium text-gray-700">
                                                            Edad
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name="age"
                                                            value={form.age}
                                                            onChange={handleChangeForm}
                                                            autoComplete="age"
                                                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                        />
                                                    </div>

                                                    <div className="col-span-12 sm:col-span-12">
                                                        <label className="block text-sm font-medium text-gray-700">
                                                            Tipo de mascota
                                                        </label>
                                                        <select
                                                            name="type"
                                                            value={form.type}
                                                            onChange={handleChangeForm}
                                                            autoComplete="type"
                                                            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                        >
                                                            <option value="">Choose an option</option>
                                                            {profiles && profiles.map((profile) => (
                                                                <option key={profile.value} value={profile.value}> {`${profile.text}`}</option>
                                                            ))}
                                                        </select>
                                                    </div>

                                                    <div className="col-span-12 sm:col-span-12">
                                                        <label className="block text-sm font-medium text-gray-700">
                                                            Color
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name="color"
                                                            value={form.color}
                                                            onChange={handleChangeForm}
                                                            autoComplete="color"
                                                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                        />
                                                    </div>

                                                    <div className="col-span-12 sm:col-span-12">
                                                        <label className="block text-sm font-medium text-gray-700">
                                                            Peso
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name="weight"
                                                            value={form.weight}
                                                            onChange={handleChangeForm}
                                                            autoComplete="weight"
                                                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                        />
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/*footer*/}
                                <div className="flex items-center justify-end p-4 border-t border-solid border-slate-200 rounded-b">
                                    <button
                                        className="bg-red-500 text-white active:bg-red-600 rounded uppercase text-sm px-4 py-2 border border-transparent shadow-sm text-sm font-medium hover:bg-red-700 mr-1"
                                        type="button"
                                        onClick={() => {
                                            setShowModalPet(false);
                                            // setForm(dataForm)
                                        }}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        className="bg-emerald-500 text-white active:bg-emerald-600 rounded uppercase text-sm px-4 py-2 border border-transparent shadow-sm text-sm font-medium hover:bg-emerald-700"
                                        type="button"
                                        onClick={validateForm}
                                    >
                                        Save
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
        </div>
    )
}