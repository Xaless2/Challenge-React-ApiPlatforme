const createPerformanceFormFields = [
    {
        type: 'number',
        name: 'establishment_id',
        label: "ID de l'établissement",
        required: true,
    },
    {
        type: 'select',
        name: 'performance_name',
        label: 'Nom de la performance',
        options: [
            { value: 'yoga', label: 'Yoga' },
            { value: 'pilates', label: 'Pilates' },
            { value: 'boxe', label: 'Boxe' },
            { value: 'crossfit', label: 'CrossFit' },
            { value: 'zumba', label: 'Zumba' },
            { value: 'musculation', label: 'Musculation' },
            { value: 'course', label: 'Course à pied' },
            { value: 'natation', label: 'Natation' },
            { value: 'halterophilie', label: 'Haltérophilie' },
            { value: 'aerobic', label: 'Aérobic' },
        ],
        required: true,
    },
    {
        type: 'textarea',
        name: 'description',
        label: 'Description',
        required: true,
    },
    {
        type: 'number',
        name: 'number_of_clients_max',
        label: 'Nombre maximum de clients',
        required: true,
    },
    {
        type: 'text',
        name: 'stripe_price_id',
        label: 'Prix',
        required: true,
    },
    {
        type: 'button',
        label: 'Créer Performance',
        onClick: (values) => {
            console.log('Form values:', values);
        },
    },
];

export default createPerformanceFormFields;
