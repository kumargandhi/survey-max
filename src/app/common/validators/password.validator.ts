import { AbstractControl } from '@angular/forms';

export function validatePassword(fieldName = 'password', displayName = 'Password') {
    return (control: AbstractControl) => {
        const value = control.value;
        if (value == null || typeof value === 'undefined') {
            return null;
        }
        if (value.length < 1) {
            return { [fieldName]: `${displayName} is required` };
        }
        if (!passwordIsValid(value)) {
            // eslint-disable-next-line
            return { [fieldName]: `${displayName} must be 9 or more characters, containing lower and upper case letters, digits and special characters` };
        }
        return null;
    };
}

export function passwordIsValid(email: string): boolean {
    const pattern: RegExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[~!@#$%^&*()_+{}":;'])(?!.*\s).{9,}$/;
    return pattern.exec(email) !== null;
}
