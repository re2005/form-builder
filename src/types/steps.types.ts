export interface StepTypes {
    label: string;
    fieldGroup: string;
    scrollToArticle: string;
    repeatStep: string;
    conditions: string;
    leadingText: string;
    tip: string;
    list: Array<InputTypes>
}

export interface InputTypes {
    name: string;
    type: string;
    label: string;
    fieldName: string;
    defaultName: string;
    leadingText: string;
    conditions: string;
    validation: ValidationTypes;
}

export interface ValidationTypes {
    required: boolean;
    config: any;
}

export interface InputOptionsTypes extends InputTypes {
    options: Array<any>;
}
