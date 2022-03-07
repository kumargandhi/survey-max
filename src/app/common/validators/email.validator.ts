import { AbstractControl } from '@angular/forms';

export function validateEmail(fieldName = 'email', displayName = 'Email') {
    return (control: AbstractControl) => {
        const value = control.value;
        if (value == null || typeof value === 'undefined') {
            return null;
        }
        if (value.length < 1) {
            return { [fieldName]: `${displayName} is required` };
        }
        if (!emailIsValid(value)) {
            return { [fieldName]: `You must enter a valid ${displayName}` };
        }
        return null;
    };
}

export function emailIsValid(email: string): boolean {
    // eslint-disable-next-line
    const pattern: RegExp = /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;
    return pattern.exec(email) !== null;
}
