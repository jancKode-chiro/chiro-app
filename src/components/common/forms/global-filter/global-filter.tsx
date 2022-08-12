import React, { useState, Dispatch, SetStateAction, ChangeEvent } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { useAsyncDebounce } from 'react-table';
import { Input } from '../custom-input/input';

type GlobalFilterProps = {
  filter: string;
  setFilter: Dispatch<SetStateAction<string>>;
};

const GlobalFilterWrapper = styled.div`
  display: flex;
  align-items: flex-start;
`;

const GlobalFilter = ({ filter, setFilter }: GlobalFilterProps) => {
  const { register } = useForm();
  const [value, setValue] = useState<string>(filter);
  const onChangeHandler = useAsyncDebounce((value: string) => {
    setFilter(value);
  }, 1000);
  return (
    <GlobalFilterWrapper className='global-filter'>
      <Input
        width='20rem'
        placeholder='Search'
        marginBottom='1.2rem'
        value={value}
        {...register('search', {
          onChange: (e: ChangeEvent<HTMLInputElement>) => {
            onChangeHandler(e.target.value);
            setValue(e.target.value);
          },
        })}
      />
    </GlobalFilterWrapper>
  );
};

export default GlobalFilter;
