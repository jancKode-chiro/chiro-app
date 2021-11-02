import React from 'react';

import { Input } from '../../components/common/forms/custom-input/input';

import './searchbar.styles.scss';

const SearchBar = () => (
  <form action='/' method='get'>
    <label htmlFor='header-search'></label>

    <div>
      <Input
        className='search-a'
        type='text'
        placeholder='Search'
        width='35%'
      />
    </div>
  </form>
);

export default SearchBar;
