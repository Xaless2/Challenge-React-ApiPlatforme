import React, { useState, useContext, useEffect } from 'react';
import Table from '../components/common/Table';
import Toast from '../components/common/Toast';
import { ImUser } from "react-icons/im";
import { Link } from 'react-router-dom';
import "../styles/components.css"
import UserList from '../components/common/UserList';
import Stats from '../components/common/Stats';
import ModalPup from '../components/common/ModalPup';
import { AuthContext } from '../contexts/AuthContext';


function DashboardPage() {
  const [view, setView] = useState('dashboard');
  const [showToast, setShowToast] = useState(false);  
  const { token, userRole, logout } = useContext(AuthContext);
  const [deleteId, setDeleteId] = useState(null);
  const [data, setData] = useState([
    { id: 1, image: 'https://via.placeholder.com/150', name: 'Basic Fit', date: '2024-06-15' },
    { id: 2, image: 'https://via.placeholder.com/150', name: 'Fitness Parc', date: '2024-06-14' },
  ]);
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' },
  ]);
  const [stats, setStats] = useState({
    totalUsers: 2,
    activeUsers: 1,
    inactiveUsers: 1,
  });


  useEffect(() => {
    if (token) {
      console.log('Token: ', token);
      console.log('User Role: ', userRole);
    }
  }, [token, userRole]);


  const handleEdit = (id) => {
    console.log(`Edit item with id ${id}`);
  };

  const handleDelete = (id) => {
    setDeleteId(id);
    setShowToast(true);
  };

  const handleConfirm = () => {
    const newData = data.filter((item) => item.id !== deleteId);
    setData(newData);
    setShowToast(false);
  };

  const handleCancel = () => {
    setShowToast(false);
    setDeleteId(null);
  };

  const handleBrandClick = () => {
    setView('table'); 
  };
  
  const handleNavItemClick = (selectedView) => {
    if (selectedView === view) {
      return; 
    }
    setView(selectedView);
  };

  return (
    <>
      <aside
        className="fixed top-0 z-10 ml-[-100%] flex h-screen w-full flex-col justify-between shadow-md bg-white px-6 pb-3 transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%] dark:border-gray-700"
      >
        <div>
          <div className="-mx-6 px-6 py-4">
            <a href="#" title="home">
              <img src="images/logo.svg" className="w-32" alt="tailus logo" />
            </a>
          </div>
  
          <div className="mt-8 text-center">
            <img
              src="images/second_user.webp"
              alt=""
              className="m-auto h-10 w-10 rounded-full object-cover lg:h-28 lg:w-28"
            />
            <h5 className="mt-4 hidden text-xl font-semibold text-red-500 lg:blocktext-black">Cynthia J. Watts</h5>
            <span className="hidden text-black lg:block">Admin</span>
          </div>
  
          <ul className="mt-8 space-y-2 tracking-wide">
            <li>
              <a
                href="#"
                aria-label="dashboard"
                className={`relative flex items-center space-x-4 rounded-xl bg-gradient-to-r from-sky-600 to-cyan-400 px-4 py-3 text-black ${view === 'dashboard' ? 'bg-gray-300 dark:bg-gray-700' : ''}`}
                onClick={() => handleNavItemClick('dashboard')}
              >
                <svg className="-ml-1 h-6 w-6" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M6 8a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V8ZM6 15a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-1Z"
                    className="dark:fill-slate-600 fill-current text-cyan-400"
                  ></path>
                  <path
                    d="M13 8a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2V8Z"
                    className="fill-current text-cyan-200 "
                  ></path>
                  <path
                    d="M13 15a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-1Z"
                    className="fill-current "
                  ></path>
                </svg>
                <span className="-mr-1 font-medium">Dashboard</span>
              </a>
            </li>
            <li>
              <button
                onClick={handleBrandClick}
                className={`group flex items-center space-x-4 rounded-md px-4 py-3 text-black ${view === 'table' ? 'bg-gray-300 dark:bg-gray-700' : ''}`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    className="fill-current text-gray-300 "
                    fillRule="evenodd"
                    d="M2 6a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1H8a3 3 0 00-3 3v1.5a1.5 1.5 0 01-3 0V6z"
                    clipRule="evenodd"
                  />
                  <path
                    className="fill-current text-black group-hover:text-cyan-600 dark:group-hover:text-sky-400"
                    d="M6 12a2 2 0 012-2h8a2 2 0 012 2v2a2 2 0 01-2 2H2h2a2 2 0 002-2v-2z"
                  />
                </svg>
                <span className="group-hover:text-black">Marques</span>
              </button>
            </li>
  
            <li>
              <a
                href="#"
                className="group flex items-center space-x-4 rounded-md px-4 py-3 text-blacktext-black"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    className="fill-current text-black group-hover:text-cyan-600 dark:group-hover:text-cyan-400"
                    d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"
                  />
                  <path
                    className="fill-current text-gray-300 "
                    d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"
                  />
                </svg>
                <span className="group-hover:text-black">Other data</span>
              </a>
            </li>
            <li>

              <Link
                to="/profile"
                className="group flex items-center space-x-4 rounded-md px-4 py-3 text-blacktext-black"
              >
                <ImUser />
                <span className="group-hover:text-black text-black">Mon profil</span>
              
              </Link>
            </li>
          </ul>
        </div>
  
        <div className="-mx-6 flex items-center justify-between border-t px-6 pt-4 dark:border-gred-500">
          <button className="group flex items-center space-x-4 rounded-md px-4 py-3 text-blacktext-black">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            <span className="group-hover:text-black text-black">Logout</span>
          </button>
        </div>
      </aside>
  
      <div className="ml-auto mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%]">
        <div className="sticky top-0 h-16 border-b bg-white dark:border-gray-700 lg:py-2.5">
          <div className="flex items-center justify-between space-x-4 px-6 2xl:container">
            <h5 hidden className="text-2xl font-medium text-black text-black">Dashboard</h5>
            <button className="-mr-2 h-16 w-12 border-r lg:hidden dark:border-gray-700text-black">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="my-auto h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            <div className="flex space-x-4 ">
              <div hidden className="md:block">
                <div className="relative flex items-center text-cyan-500 focus-within:text-cyan-400">
                  <span className="absolute left-4 flex h-6 items-center  pr-3 ">
                    <svg
                      xmlns="http://ww50w3.org/2000/svg"
                      className="w-4 fill-current"
                      viewBox="0 0 35.997 36.004"
                    >
                      <path
                        id="Icon_awesome-search"
                        data-name="search"
                        d="M35.508,31.127l-7.l010-7a1.686,1.686,0,0,0-1.2-.492H26.156a14.618,14.618,0,1,0-2.531,2.531V27.3a1.686,1.686,0,0,0,.492,1.2l7.01,7.01a1.681,1.681,0,0,0,2.384,0l1.99-1.99a1.7,1.7,0,0,0,.007-2.391Zm-20.883-7.5a9,9,0,1,1,9-9A8.995,8.995,0,0,1,14.625,23.625Z"
                        ></path>
                      </svg>
                    </span>
                    <input
                      type="search"
                      name="leadingIcon"
                      id="leadingIcon"
                      placeholder="Search here"
                      className="outline-none  rounded-xl border border-gray-300 py-2.5 pl-14 pr-4 text-sm text-white transition focus:border-cyan-300 dark:bg-gray-900 "
                      style={{ width: '400px' }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex items-center space-x-4 mt-14">
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='mt-12'>
            {view === 'dashboard' ? (
              <>
                <Stats stats={stats} />
                <UserList users={users} />
              </>
            ) : view === 'table' ? (
              <>
                <ModalPup />
                <Table data={data} onEdit={handleEdit} onDelete={handleDelete} />
              </>
            ) : (
              <h1 className="text-3xl text-center mt-10">Bienvenue sur le Dashboard</h1>
            )}
          </div>
          {showToast && (
            <Toast
              message="Êtes-vous sûr de vouloir supprimer cet élément ?"
              onConfirm={handleConfirm}
              onCancel={handleCancel}
              duration={5000}
            />
          )}
        </div>
      </>
    );
  }
  
  export default DashboardPage;
  
  