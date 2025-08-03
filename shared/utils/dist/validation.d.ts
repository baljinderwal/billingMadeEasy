import Joi from 'joi';
export declare const userValidation: {
    register: Joi.ObjectSchema<any>;
    login: Joi.ObjectSchema<any>;
    updateProfile: Joi.ObjectSchema<any>;
};
export declare const productValidation: {
    create: Joi.ObjectSchema<any>;
    update: Joi.ObjectSchema<any>;
};
export declare const cartValidation: {
    addItem: Joi.ObjectSchema<any>;
    updateItem: Joi.ObjectSchema<any>;
};
export declare const orderValidation: {
    create: Joi.ObjectSchema<any>;
};
export declare const addressValidation: {
    create: Joi.ObjectSchema<any>;
};
//# sourceMappingURL=validation.d.ts.map