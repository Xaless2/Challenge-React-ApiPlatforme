const createEstablishmentFormFields = [
    {
        type: 'number',
        name: 'brand_id',
        label: 'ID de la marque',
        required: true,
    },
    {
        type: 'text',
        name: 'display_name',
        label: 'Nom de l\'établissement',
        required: true,
    },
    {
        type: 'text',
        name: 'phone',
        label: 'Téléphone',
        required: false,
    },
    {
        type: 'text',
        name: 'address',
        label: 'Adresse',
        required: true,
    },
    {
        type: 'text',
        name: 'zip_code',
        label: 'Code postal',
        required: true,
    },
    {
        type: 'text',
        name: 'city',
        label: 'Ville',
        required: true,
    },
];

export default createEstablishmentFormFields;
