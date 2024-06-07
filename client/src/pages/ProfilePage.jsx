import { Link } from "react-router-dom";
import { SlArrowLeft } from "react-icons/sl";
import { useContext, useEffect, useState } from 'react';
import { HookContext } from '../hooks/useHookProvider';
import Button from '../components/Button';

const ProfilPage = () => {

    const { currentUser } = useContext(HookContext); 
    const [allergies, setAllergies] = useState([]);
    const [user, setUser] = useState(null);
  

    useEffect(() => {
        fetchAllergies();
    }, []);

    useEffect(() => {
        if (currentUser) {
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            setUser(currentUser);
        }
    }, [currentUser]);
  
    useEffect(() => {
      const storedUser = localStorage.getItem('currentUser');
      if (storedUser) {
          setUser(JSON.parse(storedUser));
      }
    }, [])


    const handleAddAllergy = async (e) => {
        e.preventDefault();
        const allergen = e.target.allergy.value;
        try {
            await createAllergy(allergen);
            const allergies = await getAllergies();
            setUser({ ...user, allergies });
            fetchAllergies();
        } catch (error) {
            console.error(error);
        }

    }

    
    return (
        <div className=" min-h-screen">
             <div className="container mx-auto flex items-center justify-between px-4 text-black">
                   
                </div>
            <div className="container mx-auto py-8">
            <div className="py-4">
               
            </div>
                <div className="bg-white  rounded-md p-6 ">
                <Link to="/" className="flex items-center text-white text-sm bg-[#0ab3b3]">
                        <SlArrowLeft className="mr-2" /> Retour
                    </Link>
                    <h2 className="text-xl font-bold mb-4 mt-8">Mes informations</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Nom complet</label>
                            <p className="text-lg font-semibold">{user ? user.fullName : ''}</p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <p className="text-lg font-semibold">{user ? user.email : ''}</p>
                        </div>
                        <div className="col-span-2 mt-8">
                            <form onSubmit={handleAddAllergy} className="mt-4">
                                <input
                                    type="text"
                                    name="allergy"
                                    placeholder="Ajouter une allergie"
                                    className="border border-gray-300 p-2 w-full rounded-md"
                                />
                                
                                <Button  text={"Ajouter"} type={"submit"} className="mt-2 w-44"/>
                            </form>
                        </div>

                        <div className="col-span-2 mt-12">
                        <label className="block text-sm font-medium text-gray-700 font-bold text-2xl">Mes allergies  </label>
                        <div className="grid grid-cols-4 gap-4 max-w-4xl mx-auto">
                        {allergies?.length > 0 ? (
                                allergies.map((allergy, index) => (
                                    <div key={index} className="border-b border-gray-200 py-2">
                                        <div className="justify-between mb-4">
                                            <p className="font-bold">{allergy.allergen}</p>
                                           
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="col-span-4">
                                    <p className="py-2">Aucune allergie ajoutée</p>
                                </div>
                            )}
                        </div>
                        </div>
                    </div>
                    <div className="bg-[#0ab3b3] w-full mt-8 text-[#0ab3b3]">.</div>
                </div>
            </div>
        </div>
    );
};
    

export default ProfilPage;
