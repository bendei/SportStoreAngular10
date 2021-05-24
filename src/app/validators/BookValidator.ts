import {FormControl, FormGroup, ValidationErrors} from "@angular/forms";

export class BookValidator {

    static titleFormat(control: FormControl): ValidationErrors | null {
        const value = control.value;

        if (value && (!(value as string).includes('React') && !(value as string).includes('Angular')) ) {
            return {
                title: {message: "A címnek tartalmaznia kell az Angular vagy React szót"},
               // "zokni": {message: "zokni"}
            };
        }  else {
           return null;
        }
    }

    static ageAndYearCorrect(sor: FormGroup): ValidationErrors | null {
        const currentYear = new Date().getFullYear();
        const age =  sor.get("age")?.value;
        const year = sor.get("birthYear")?.value;

        sor.get("age")?.setErrors({msg: ""});
        sor.get("birthYear")?.setErrors({msg: ""});

        if((age && year) && currentYear-year != age) {
            return {ageAndYear: {message: "Kora és a születési éve nem passzol"}};
        } else {
            sor.get("age")?.setErrors(null);
            sor.get("birthYear")?.setErrors(null);
            return null;
        }
     
    }

}