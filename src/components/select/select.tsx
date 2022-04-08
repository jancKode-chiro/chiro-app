
import React,
{
  useState,
  useEffect,
  useMemo,
  Fragment
}
  from 'react'

import Select, { StylesConfig } from 'react-select';
import AsyncSelect from 'react-select/async'
import { getTemplates } from '../../api/template';
import { useQuery } from 'react-query';
import { isEmpty } from 'lodash';
import { Typography } from "@material-ui/core";

import makeAnimated from 'react-select/animated'
import './select.styles.scss'

const animatedComponents = makeAnimated();

const Options = [
  { value: 'Solo', label: 'Solo' },
  { value: 'Solo(1)', label: 'Solo(1)' },
  { value: 'Test', label: 'Test' },
  { value: 'Pilot', label: 'Pilot' },
  { value: 'Programmer', label: 'Programmer' },
  { value: 'Captain', label: 'Captain' },
  { value: 'Mechanic', label: 'Mechanic' },


]

const customStyles: StylesConfig = {
  input: (styles) => ({
    ...styles,
    height: '52px',
    color: 'transparent',
  }),
  multiValue: (styles) => {
    return {
      ...styles,
      backgroundColor: 'transparent'
    }
  },
  multiValueLabel: styles => {
    return {
      color: 'rgb(54 179 126 / 61%)'
    }
  }
}


// const Checkbox = ({ children, ...props }: JSX.IntrinsicElements['input']) => (
//   <label style={{ marginRight: '1em' }}>
//     <input type="checkbox" {...props} />
//     {children}
//   </label>
// );


const CustomSelect = ({ onChange }: any) => {
  const [inputValue, setValue] = useState('')
  const [selectedValue, setSelectedValue] = useState(null);


  const [template, setTemplate] = useState<any>();

  const { data } = useQuery(['templates'], () =>
    getTemplates()
  );

  const parseDataHandler = (data: any) => {

    return data?.map((template: any) => {
      return {
        value: template.content,
        label: template.title
      }
    })
  }

  useEffect(() => {
    if (!isEmpty(data)) {
      setTemplate(parseDataHandler(data))
    };
  }, [data]);



  const handleInputChange = (value: any) => {
    setValue(value)
  }

  const handleChange = (item: any) => {
    setSelectedValue(item)
    onChange(item.value)
  }

  return (
    <>
      <Select
        components={animatedComponents}
        options={template}
        styles={customStyles}
        onInputChange={handleInputChange}
        onChange={handleChange}
      />
    </>

  )
}

export default CustomSelect