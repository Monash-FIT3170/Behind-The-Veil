import React, { forwardRef } from 'react';
import {XMarkIcon} from "@heroicons/react/24/outline";
import './searchBar.css'

const SearchBar = forwardRef(({formClassName, searchClassName, resetClassName, placeholderName}, ref) => {
    const formClasses = formClassName;
    const searchClasses = searchClassName;
    const resetClasses = resetClassName;

    return(
        <form className={formClasses}>
            <input type="search" className={searchClasses} placeholder={placeholderName}/>
            <input type="reset" className={resetClasses} value="x"/>
        </form>
    );
});

export default SearchBar;