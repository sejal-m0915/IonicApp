import { Directive } from '@angular/core';

@Directive({
  selector: '[appValidate]'
})
export class ValidateDirective {

  constructor() { }

  static atLeastOneValidator = () => {
    return (FormGroup: any) => {
        let controls = FormGroup.controls;
        if ( controls ) {
            let theOne = Object.keys(controls).find(key=> controls[key].value!==''&& controls[key].value!== false );
            if ( !theOne ) {
                return {
                    atLeastOneRequired : {
                        text : 'At least one should be selected'
                    }
                }
            }
        }
        return null;
    };
};

}
