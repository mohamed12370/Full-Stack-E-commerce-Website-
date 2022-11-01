const dataMethod = ['body', 'params', 'query'];

const validationMethod = (schema) => {
    return (req, res, next) => {
        const errorArr = [];
        dataMethod.forEach((el) => {
            if (schema[el]) {
                const result = schema[el].validate(req[el]);
                if (result.error) {
                    console.log(result.error.details[0].message);
                    errorArr.push(result.error.details);
                }
            }
        });
        if (errorArr.length) {
            res.json({ message: 'error validation', err: errorArr });
        } else {
            next();
        }
    };
};

module.exports = validationMethod;