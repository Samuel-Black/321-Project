/*
Author: Samuel Black
https://github.com/Samuel-Black
*/

const passwordValidator = require('password-validator');
const schema = new passwordValidator();

schema
.is().min(8)                                    // Minimum length 8
.is().max(16)                                  // Maximum length 100
.has().uppercase(1)                              // Must have uppercase letters
.has().lowercase()                              // Must have lowercase letters
.has().digits(1)                                // Must have at least 1 digit
.has().not().spaces()                           // Should not have spaces
.is().not().oneOf(['Passw0rd', 'Password123', 'Spacebar123', 'Qwerty123', 'Asdf123']); // must not be one of the listed

export default schema;

// convert the password error message code into something human readable for display
function PasswordErrorMessage(val, password) {
    switch(val) {
        case 'min':
            return 'be at least 8 characters';
        case 'spaces':
            return 'not contain spaces';
        case 'uppercase':
            return 'have at least 1 uppercase letter';
        case 'lowercase':
            return 'have at least 1 uppercase letter';
        case 'digits':
            return 'have at least 2 numbers';
        case 'oneOf':
            return ` not be a common password: ${password}`;
    }
}

// If the given password input field does not contain a valid password according to the defined schema, return an error message
export function getPasswordErrorMessage(password, passwordFocused) {
    if (!passwordFocused && !schema.validate(password) && password.length > 0) {
        const errors = schema.validate(password, {list: true});
        let errorMessageString = 'Password must ';
        for (let i = 0; i < errors.length; i++) {
            errorMessageString += `${PasswordErrorMessage(errors[i], password)}${(i === errors.length - 1) ? '.' : ', '}`;
        }
        return errorMessageString;
    }
    else if (schema.validate(password) || password.length === 0)
        return null;
}
