import {
    Directive,
    ElementRef,
    EventEmitter,
    HostListener,
    Output,
} from '@angular/core';

@Directive({
    selector: '[soloNombres]',
})
export class SoloNombresDirective {
    @Output() valueChange = new EventEmitter();
    constructor(private _el: ElementRef) {}

    @HostListener('input', ['$event']) onInputChange(event) {
        const initalValue = this._el.nativeElement.value;
        console.log('test', initalValue);

        const newValue = initalValue.replace(/[^0-9a-zA-Z áéíóúÁÉÍÓÚñÑ]*/g, '');
        this._el.nativeElement.value = newValue;
        this.valueChange.emit(newValue);
        if (initalValue !== this._el.nativeElement.value) {
            event.stopPropagation();
        }
    }
}
