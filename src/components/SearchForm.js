import React from 'react';

const SearchForm = (props) => {
    return (
        <form id={props.formId}>
            <input type="text" name="removeSearch" value="" />
            <input type="text" name="search" />
            <input type="submit" value="" />
        </form>
    )
};

export default SearchForm;