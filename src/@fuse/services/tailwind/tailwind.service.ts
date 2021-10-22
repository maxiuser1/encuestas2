import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { fromPairs, map } from 'lodash-es';

@Injectable()
export class FuseTailwindService {
    private _tailwindConfig: ReplaySubject<any> = new ReplaySubject<any>(1);

    /**
     * Constructor
     */
    constructor() {
        // Prepare the config object
        const config: any = {};

        // Extract the style from the class
        const regexpForClass =
            /\.fuse-tailwind-extracted-config\s\{([\s\S]*)\}/g;

        // Parse the themes objects
        config.themes = fromPairs(
            map(config.themes, (value, key) => [key, JSON.parse(value)])
        );

        // Execute the observable with the config
        this._tailwindConfig.next(config);
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for _tailwindConfig
     */
    get tailwindConfig$(): Observable<any> {
        return this._tailwindConfig.asObservable();
    }
}
