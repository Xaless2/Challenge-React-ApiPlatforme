import React, { useState, useContext, useEffect } from 'react';
import Table from '../components/common/Table';
import Toast from '../components/common/Toast';
import { ImUser, ImBackward } from "react-icons/im";
import { HiChevronLeft } from "react-icons/hi";
import { Link } from 'react-router-dom';
import "../styles/components.css"
import UserList from '../components/common/UserList';
import Stats from '../components/common/Stats';
import ModalPup from '../components/common/ModalPup';
import { AuthContext } from '../contexts/AuthContext';
import { BrandContext } from '../contexts/BrandContext';
import { useLocation } from 'react-router-dom';



function DashboardPage() {
  const [view, setView] = useState('dashboard');
  const [showToast, setShowToast] = useState(false);  
  const { token, userRole, logout, user, getUser } = useContext(AuthContext);
  const [deleteId, setDeleteId] = useState(null);
  const { getBrands } = useContext(BrandContext);
  const [data, setData] = useState([]);
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' },
  ]);
  const [stats, setStats] = useState({
    totalUsers: 2,
    activeUsers: 1,
    inactiveUsers: 1,
  });
  const [isUserDataLoaded, setIsUserDataLoaded] = useState(false);

  const history = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      const brands = await getBrands();
      setData(brands);
    };

    fetchData();
  }, [getBrands]);


  useEffect(() => {
    const fetchUser = async () => {
        if (!isUserDataLoaded) {
            await getUser();
            if (user) {
                setIsUserDataLoaded(true);
            }
        }
    };
    fetchUser();
}, [getUser, user, isUserDataLoaded]);


  useEffect(() => {
    if (token) {
     const roles = ['ROLE_ADMIN', 'ROLE_COACH', 'ROLE_CLIENT'];
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
        <Link to="/" onClick={() => history.goBack()} className="flex flex-row items-center justify-center">
          <HiChevronLeft className='text-4xl'/>
          <span className="ml-2 text-black">Retour</span>
        </Link>
        </div>
          {user && (
          <div className="mt-8 text-center">
            <img
              src="images/second_user.webp"
              alt=""
              className="m-auto h-10 w-10 rounded-full object-cover lg:h-28 lg:w-28"
            />
            <h5 className="mt-4 hidden text-xl font-semibold text-red-500 lg:block text-black">{user.firstname}</h5>
            <span className="hidden text-black lg:block">{user.roles[0]}</span>
          </div>
          )}
  
          <ul className="mt-8 space-y-2 tracking-wide">
            <li>
              <a
                href="#"
                aria-label="dashboard"
                className={`relative flex items-center space-x-4 rounded-xl px-4 py-3 text-black ${view === 'dashboard' ? 'bg-gray-300 dark:bg-gray-700' : ''}`}
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
            {userRole !== 'ROLE_COACH' && userRole !== 'ROLE_CLIENT' && (
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
            )}
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
            <Link
              to="/"
              onClick={logout}
              className="group-hover:text-black text-black"
            >
                <span className="group-hover:text-black text-black">Se déconnecter</span>
            </Link>

          </button>
        </div>
      </aside>
  
      <div className="ml-auto mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%]">
        <div className="sticky top-0 h-16 border-b bg-white dark:border-gray-700 lg:py-2.5">
          <div className="flex items-center justify-between space-x-4 px-6 2xl:container">
            <h5 hidden className="text-2xl font-medium text-black text-black">Dashboard</h5>
           
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
  
  