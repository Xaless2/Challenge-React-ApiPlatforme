import React, { useState, useContext, useEffect } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import FormBuilder from "../builder/FormBuilder";
import { BrandContext } from "../../contexts/BrandContext";
import { AuthContext } from "../../contexts/AuthContext";

export default function ModalPup() {
  const { addBrand, error, setError } = useContext(BrandContext);
  const { user, token } = useContext(AuthContext);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [brand, setBrand] = useState({
    image_url: '',
    kbis_pdf: '',
    display_name: '',
  });

  useEffect(() => {
    if (user) {
      setBrand((prevBrand) => ({
        ...prevBrand,
        user_id: user.id,
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setBrand({
        ...brand,
        [name]: files[0],
      });
    } else {
      setBrand({
        ...brand,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e, onClose) => {
    e.preventDefault();
    setError(null); 
    if (user && token) {
      try {
        await addBrand(brand);
        onClose();
      } catch (error) {
        console.error('Error adding brand:', error);
      }
    } else {
      console.error('User or token is not available');
    }
  };

  

  const fields = (onClose) => [
    { type: 'text', label: 'Le nom de votre marque', name: 'display_name', value: brand.display_name, onChange: handleChange },
    {
      type: 'button',
      label: 'Enregistrer',
      onClick: (e) => handleSubmit(e, onClose),
      style: {
        hoverBackgroundColor: '#088f9c',
        color: 'white',
        fontWeight: 'bold',
        width: '100%',
        paddingY: '2',
        paddingX: '4',
        borderRadius: 'rounded',
        focus: {
          outline: 'none',
          shadow: 'outline'
        }
      }
    },
  ];

  return (
    <>
      <Button onPress={onOpen}>Ajouter une marque</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Ajouter une marque</ModalHeader>
              <ModalBody>
                <FormBuilder fields={fields(onClose)} />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Fermer
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}