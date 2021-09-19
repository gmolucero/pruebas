export const validate = (getValidationSchema) => {
    return (values) => {
        const validationSchema = getValidationSchema(values);
        try {
            validationSchema.validateSync(values, { abortEarly: false });
            return {};
        } catch (error) {
            return getErrorsFromValidationError(error);
        }
    };
};

export const getErrorsFromValidationError = (validationError) => {
    const FIRST_ERROR = 0;
    return validationError.inner.reduce((errors, error) => {
        return {
            ...errors,
            [error.path]: error.errors[FIRST_ERROR],
        };
    }, {});
};

export const getValidationResult = (condition) => condition ? 'valid' : 'invalid';
export const getInputValue = (target) => {
    if (target.type === 'checkbox') return { [target.name]: target.checked }
    return { [target.name]: target.value }
}


// CREATORS
export const handlerInputChangeCreator = (formik) => ({ target }) => formik.setValues({ ...formik.values, ...getInputValue(target) });