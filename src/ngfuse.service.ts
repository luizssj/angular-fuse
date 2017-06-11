import { Injectable } from '@angular/core';
import * as Fuse from 'fuse.js';

@Injectable()
export class NgFuseService {
    defaults: NgFuseOptions = {
        shouldSort: true,
        threshold: 0.6,
        location: 0,
        distance: 100,
        maxPatternLength: 32,
        minMatchCharLength: 1
    }

    searchOptions: NgFuseOptions;

    constructor() { };

    search(collection: Array<Object>, searchString: string, options: NgFuseOptions = {}) {
        Object.assign(this.searchOptions, this.defaults, options);

        let results = []
        if (searchString && searchString.length >= this.searchOptions.minSearchStringLenght) {
            const fuse = new Fuse(collection, this.searchOptions);
            results = fuse.search(searchString);
        } else {
            return collection;
        }
    };
}

export interface NgFuseOptions extends Fuse.FuseOptions {
    minSearchStringLenght?: 1;
}