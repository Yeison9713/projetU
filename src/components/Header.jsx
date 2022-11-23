import React, { Fragment, useState } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'
import { Link, useLocation } from 'react-router-dom'

const user = {
  name: 'User test',
  email: 'user@test.com',
  imageUrl: 'https://thumbs.dreamstime.com/b/businessman-icon-image-male-avatar-profile-vector-glasses-beard-hairstyle-179728610.jpg',
}
const navigation = [
  {
    name: 'Perfil',
    href: '/profile',
  },
  {
    name: 'Mascotas',
    href: '/mascotas',
  },
  {
    name: "Procedimientos",
    href: "#"
  },
]

const navigationMobile = [
  { name: 'Inicio', href: '/', current: false },
]

const userNavigation = [
  { name: 'Perfil', href: '/profile' },
  { name: 'Configuracción', href: '#' },
  { name: 'Cerrar sesión', href: 'logout' },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default () => {
  const { pathname } = useLocation()
  const [auth, setAuth] = useState({
    profile: null,
  })

  return (
    <Disclosure as="nav" className="bg-gray-50 border-b border-gray-200">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative h-16 flex items-center justify-between">
              <div className="flex items-center">
                <Link to="/" className="flex-shrink-0">
                  <img
                    className="h-16 w-auto"
                    src={'https://cdn.pixabay.com/photo/2017/03/16/21/18/logo-2150297__480.png'}
                    alt="Workflow"
                  />
                </Link>

                {/* Links section */}
                <div className="hidden lg:block lg:ml-10">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <div className="relative group">
                        <Link
                          key={item.name}
                          to={item.href}
                          className={classNames(
                            item.current
                              ? 'bg-gray-100'
                              : 'hover:text-gray-700',
                            `px-3 py-2 rounded-md text-sm font-medium text-gray-900 
                                                    ${item.href ==
                              '/admin-users' &&
                              auth?.profile !== 'admin'
                              ? 'hidden'
                              : ''
                            }
                                                    ${pathname.includes(
                              item.href,
                            )
                              ? 'bg-gray-200/70 text-indigo-500 font-semibold'
                              : ''
                            }
                                                    `,
                          )}
                          aria-current={item.current ? 'page' : undefined}
                        >
                          {item.name}
                        </Link>
                        {item.children && (
                          <ul className="hidden group-hover:flex absolute left-0 top-8 bg-gray-50 flex-col py-2 px-5 border rounded">
                            {item.children.map((item2) => (
                              <Link
                                key={item2.name}
                                to={item2.href}
                                className={classNames(
                                  item.current
                                    ? 'bg-gray-100'
                                    : 'hover:text-gray-700',
                                  `px-3 py-2 rounded-md text-sm font-medium text-gray-900 mb-2 
                                                        ${item2.href ==
                                    '/admin-users' &&
                                    auth?.profile !==
                                    'admin'
                                    ? 'hidden'
                                    : ''
                                  }
                                                        ${pathname.includes(
                                    item2.href,
                                  )
                                    ? 'bg-gray-200/70 text-indigo-500 font-semibold'
                                    : ''
                                  }
                                                        `,
                                )}
                                aria-current={
                                  item2.current ? 'page' : undefined
                                }
                              >
                                {item2.name}
                              </Link>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex lg:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="bg-gray-50 p-2 inline-flex items-center justify-center rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-purple-500">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>

              {/* Actions section */}
              <div className="hidden lg:block lg:ml-4">
                <div className="flex items-center">
                  {/* Profile dropdown */}
                  <Menu as="div" className="ml-3 relative flex-shrink-0">
                    <div>
                      <Menu.Button className="bg-gray-50 rounded-full flex text-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-purple-500">
                        <span className="sr-only">Open user menu</span>
                        <img
                          className="rounded-full h-8 w-8"
                          src={user.imageUrl}
                          alt=""
                        />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="origin-top-right absolute z-10 right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                        {userNavigation.map((item) => (
                          <Menu.Item key={item.name}>
                            {({ active }) => (
                              <a
                                href={item.href}
                                className={classNames(
                                  active ? 'bg-gray-100' : '',
                                  'block py-2 px-4 text-sm text-gray-700 text-left',
                                )}
                              >
                                {item.name}
                              </a>
                            )}
                          </Menu.Item>
                        ))}
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="bg-gray-50 border-b border-gray-200 lg:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigationMobile.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current ? 'bg-gray-100' : 'hover:bg-gray-100',
                    `block px-3 py-2 rounded-md font-medium text-gray-900
                                        ${item.href == '/admin-users' &&
                      auth?.profile !== 'admin'
                      ? 'hidden'
                      : ''
                    }
                                        ${item.href == '/admin-users'
                      ? 'bg-gray-200/70 '
                      : ''
                    }
                                        `,
                  )}
                  aria-current={item.current ? 'page' : undefined}
                  target={item.name == 'Uptime' ? '_blank' : ''}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
            <div className="pt-4 pb-3 border-t border-gray-200">
              <div className="px-5 flex items-center">
                <div className="flex-shrink-0">
                  <img
                    className="rounded-full h-10 w-10"
                    src={user.imageUrl}
                    alt=""
                  />
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-gray-800">
                    {user.name}
                  </div>
                  <div className="text-sm font-medium text-gray-500">
                    {user.email}
                  </div>
                </div>
              </div>
              <div className="mt-3 px-2 space-y-1">
                {userNavigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className="block rounded-md py-2 px-3 text-base font-medium text-gray-900 hover:bg-gray-100"
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}
