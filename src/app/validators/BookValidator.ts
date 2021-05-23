import {FormControl, ValidationErrors} from "@angular/forms";

export class BookValidator {

    static titleFormat(control: FormControl): ValidationErrors | null {
        const value = control.value;

        if (value && (!(value as string).includes('React') && !(value as string).includes('Angular')) ) {
            return {
                "title": {message: "A címnek tartalmaznia kell az Angular vagy React szót"}
            };
        }  else {
           return null;
        }
    }

}