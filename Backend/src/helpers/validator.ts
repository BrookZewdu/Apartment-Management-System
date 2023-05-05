import Joi from 'joi';
import passwordComplexity from 'joi-password-complexity';

export default function validateSignupRequest(body : any) {
    const schema = Joi.object({
        name: Joi.string()
            .min(3)
            .max(30)
            .required(),
        fatherName: Joi.string()
            .min(3)
            .max(30)
            .required(),
        grandFatherName: Joi.string()
            .min(3)
            .max(30)
            .required(),
        phoneNumber: Joi.string()
            .min(10)
            .max(13)
            .required(),
        password: Joi.string()
            .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
            .required(),
        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
            .required(),
        
    });
    const result = schema.validate(body);

    if ( !result.error ) {
        const complexityOptions = {
            min: 6,
            max: 30,
            lowerCase: 1,
            upperCase: 1,
            numeric: 1,
            symbol: 1,
            requirementCount: 2,
        } 
        const complexityResult = passwordComplexity(complexityOptions, "Password").validate(body.password);
        console.log(complexityResult);
        if (complexityResult.error) return complexityResult;
    }

    return result;
};