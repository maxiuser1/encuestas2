/* eslint-disable */
import moment from 'moment';

export const labels = [
    {
        id: 'f47c92e5-20b9-44d9-917f-9ff4ad25dfd0',
        title: 'Tecnologia',
    },
    {
        id: 'e2f749f5-41ed-49d0-a92a-1c83d879e371',
        title: 'RRHH',
    },
    {
        id: 'b1cde9ee-e54d-4142-ad8b-cf55dafc9528',
        title: 'Marketing',
    },
    {
        id: '6c288794-47eb-4605-8bdf-785b61a449d3',
        title: 'Contabilidad',
    },
    {
        id: 'bbc73458-940b-421c-8d5f-8dcd23a9b0d6',
        title: 'Calidad',
    },
    {
        id: '2dc11344-3507-48e0-83d6-1c047107f052',
        title: 'Infraestructura',
    },
];

export const notes = [
    {
        id: '8f011ac5-b71c-4cd7-a317-857dcd7d85e0',
        title: '',
        content: 'Mantención',
        tasks: null,
        image: null,
        reminder: null,
        labels: ['e2f749f5-41ed-49d0-a92a-1c83d879e371'],
        archived: false,
        createdAt: moment()
            .hour(10)
            .minute(19)
            .subtract(98, 'day')
            .toISOString(),
        updatedAt: null,
    },
    {
        id: 'ced0a1ce-051d-41a3-b080-e2161e4ae621',
        title: '',
        content: 'Mantención 2',
        tasks: null,
        reminder: null,
        labels: [
            'bbc73458-940b-421c-8d5f-8dcd23a9b0d6',
            'b1cde9ee-e54d-4142-ad8b-cf55dafc9528',
        ],
        archived: false,
        createdAt: moment()
            .hour(15)
            .minute(37)
            .subtract(80, 'day')
            .toISOString(),
        updatedAt: null,
    },
];
