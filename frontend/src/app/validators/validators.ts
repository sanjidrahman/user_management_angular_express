import { FormGroup } from '@angular/forms';

export function passwordMatchValidator(password: string, confirmPass: string) {
    return (formgroup: FormGroup) => {
        const passwordcontrol = formgroup.controls[password];
        const confirmPassControl = formgroup.controls[confirmPass];

        if (confirmPassControl.errors && confirmPassControl.errors['passwordMismatch']) {
            return
        }

        if (passwordcontrol.value !== confirmPassControl.value) {
            confirmPassControl.setErrors({ passwordMismatch: true })
        }
    };
}