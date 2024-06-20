import React,{useState, useContext} from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import FormBuilder from "../builder/FormBuilder";
import { BrandContext } from "../../contexts/BrandContext";

export default function ModalPup() {
  // const {addBrand, error} = React.useContext(BrandContext);
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [brand, setBrand] = useState({
    image_url: '',
    kbis_pdf: '',
    display_name: '',
  });

  const handleChange = (e) => {
    setBrand({
      ...brand,
      [e.target.display_name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // addBrand(brand);
  }



  const fields = [
    { type: 'text', label: 'Le nom de votre marque', value: brand.display_name, onChange: handleChange },
    { type: 'file', label: 'Image', name: 'image', value: brand.image_url, onChange: handleChange },
    { type: 'file', label: 'Kbis', name: 'fichier', value: brand.kbis_pdf, onChange: handleChange },
    { 
      type: 'button', 
      label: 'Enregistrer', 
      onClick: handleSubmit,
      style: {
        hoverBackgroundColor: '#088f9c',
        color: 'white',
        fontWeight: 'bold',
        width:'100%',
        paddingY: '2',
        paddingX: '4',
        borderRadius: 'rounded',
        focus: {
          outline: 'none',
          shadow: 'outline'
        }
      }
    },
   
  ]
  return (
    <>
      <Button onPress={onOpen}>Ajouter une marque</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Ajouter une marque</ModalHeader>
              <ModalBody>
              <FormBuilder fields={fields} />
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
