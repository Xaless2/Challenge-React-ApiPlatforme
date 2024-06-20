import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import FormBuilder from '../components/builder/FormBuilder';
import imageCompression from 'browser-image-compression';

function ProfilePage() {
  const { token, updateUser, error, getUser, user } = useContext(AuthContext);
  const [isUserDataLoaded, setIsUserDataLoaded] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [userUpdate, setUserUpdate] = useState({
    email: '',
    password: '',
    firstname: '',
    lastname: '',
    phone: '',
    address: '',
    zipcode: '',
    city: '',
    imageUrl: '',
  });


  useEffect(() => {
    const fetchUser = async () => {
        if (!isUserDataLoaded) {
            await getUser();
            if (user) {
                setUserUpdate({
                    email: user.email,
                    password: '', 
                    firstname: user.firstname,
                    lastname: user.lastname,
                    phone: user.phone,
                    address: user.address,
                    zipcode: user.zipcode,
                    city: user.city,
                    imageUrl: user.imageUrl,
                });
                setIsUserDataLoaded(true);
            }
        }
    };

    fetchUser();
}, [getUser, user, isUserDataLoaded]);


 
  const handleChange = (e) => {
    const { name, value } = e.target;
  
    if (name === 'imageUrl') {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setUserUpdate((prev) => ({
            ...prev,
            imageUrl: reader.result,
          }));
        };
        reader.readAsDataURL(file);
      }
    } else {
      setUserUpdate((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleImageChange = async (e) => {
    console.log(e.target.files[0]);
    const file = e.target.files[0];
    if (file) {
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920, 
        useWebWorker: true,
      };
      try {
        const compressedFile = await imageCompression(file, options);
        const reader = new FileReader();
        reader.onloadend = () => {
          setUserUpdate((prev) => ({
            ...prev,
            imageUrl: reader.result,
          }));
        };
        reader.readAsDataURL(compressedFile);
      } catch (error) {
        console.error('Error compressing image: ', error);
      }
    }
  };

  const handleSubmit = async (e) => {
    console.log(userUpdate);
    e.preventDefault();
    const response = await updateUser(userUpdate);
    if (response) {
      console.log('update success');
    } else {
      console.error('update failed');
    }
  };

  const fields = [
    { type: 'text', label: 'First Name', name: 'firstname', value: userUpdate.firstname, onChange: handleChange },
    { type: 'text', label: 'Last Name', name: 'lastname', value: userUpdate.lastname, onChange: handleChange },
    { type: 'email', label: 'Email', name: 'email', value: userUpdate.email, onChange: handleChange },
    { type: 'text', label: 'Phone', name: 'phone', value: userUpdate.phone, onChange: handleChange },
    { type: 'text', label: 'Address', name: 'address', value: userUpdate.address, onChange: handleChange },
    { type: 'text', label: 'Zipcode', name: 'zipcode', value: userUpdate.zipcode, onChange: handleChange },
    { type: 'text', label: 'City', name: 'city', value: userUpdate.city, onChange: handleChange },
    { 
      type: 'button', 
      label: "Enregistrer les modifications",
      onClick: handleSubmit,
      
      style: {
        hoverBackgroundColor: 'black',
        color: 'white',
        width:'100%',
        fontWeight: 'bold',
        paddingY: '2',
        paddingX: '4',
        borderRadius: 'rounded',
        focus: {
          outline: 'none',
          shadow: 'outline',
        },
      },
    },
  ];

  return (
    <div className="min-h-screen py-10">
      <div className="max-w-4xl mx-auto bg-white p-10 rounded-2xl">
        <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-8">Mon profile</h2>
        <div className="flex flex-col items-center mb-10">
          <img
           src={userUpdate.imageUrl}
            alt="Profile"
            className="h-32 w-32 rounded-full object-cover mb-4 border-4 border-blue-500"
          />
          <input type="file" onChange={handleImageChange} style={{display: 'none'}} id="imageUpload" />
          <label htmlFor="imageUpload" className="cursor-pointer">Modifier l'image</label>
         
          {user && (
              <>
                  <h5 className="text-2xl font-bold text-gray-900">{user.lastname}</h5>
                  <h5 className="text-2xl font-bold text-gray-900">{user.firstname}</h5>
              </>
          )}
        </div>
        <div className="text-center mb-8">
          <h4 className="text-3xl font-semibold text-gray-800">Mes informations</h4>
        </div>
        <FormBuilder fields={fields} />
      </div>
    </div>
  );
}

export default ProfilePage;
