import React, { forwardRef } from 'react';
import './searchBar.css'
import classNames from 'classnames';

const SearchBar = forwardRef(({formClassName, searchClassName, resetClassName, placeholderName}, ref) => {
    const formClasses = formClassName ? classNames("", formClassName) : "container h-8 w-[395px]";
    const searchClasses = searchClassName ? classNames("", searchClassName) : "border-2 border-gray-300 border-r-0 rounded rounded-r-none main-text align-top h-8 w-[361px] pl-[10px]";
    const resetClasses = resetClassName ? classNames("", resetClassName) : "bg-white main-text border-2 border-gray-300 border-l-0 rounded rounded-l-none h-8 w-[33px] hover:bg-gray-300 active:bg-gray-400";

    return(
        <form className={formClasses}>
            <input type="search" className={searchClasses} placeholder={placeholderName}/>
            <input type="reset" className={resetClasses} value="x"/>
        </form>
    );
});

export default SearchBar;