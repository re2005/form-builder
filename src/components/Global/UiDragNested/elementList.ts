import { InputOptionsTypes, InputTypes } from '@/types/steps.types';

export const elementList: Array<InputTypes | InputOptionsTypes> = [
    {
        name: 'Text',
        type: 'text',
        label: 'Text default label',
        fieldName: '',
        defaultName: '',
        leadingText: '',
        conditions: '',
        validation: {
            required: true,
            config: {}
        }
    },
    {
        name: 'Number',
        type: 'number',
        label: 'Number default label',
        fieldName: '',
        defaultName: '',
        leadingText: '',
        conditions: '',
        validation: {
            required: true,
            config: {}
        }
    },
    {
        name: 'Date',
        type: 'date',
        label: 'Date default label',
        fieldName: '',
        defaultName: '',
        leadingText: '',
        conditions: '',
        validation: {
            required: true,
            config: {}
        }
    }
];
