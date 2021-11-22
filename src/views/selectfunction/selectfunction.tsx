
import React, { Component, Fragment } from 'react'

import Select, { components, IndicatorSeparatorProps, PlaceholderProps } from 'react-select';


import './selectfunction.styles.scss'

const Options = [
  { value: 'Solo', label: 'Solo' },
  { value: 'Solo(1)', label: 'Solo(1)' },
  { value: 'Test', label: 'Test' },
  { value: 'Pilot', label: 'Pilot' },
  { value: 'Programmer', label: 'Programmer' },
  { value: 'Captain', label: 'Captain' },
  { value: 'Mechanic', label: 'Mechanic' },


]

const customStyles = {
  option: (provided: any, state: any) => ({
    ...provided,
    color: state.isSelected ? 'green' : 'black',
    padding: 10,
  }),
  singleValue: (provided: any, state: any) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = 'opacity 250ms';

    return {
      ...provided, opacity, transition
    };
  }
}

const Checkbox = ({ children, ...props }: JSX.IntrinsicElements['input']) => (
  <label style={{ marginRight: '1em' }}>
    <input type="checkbox" {...props} />
    {children}
  </label>
);

interface State {
  [x: string]: any;
  readonly isClearable: boolean;
  readonly isDisabled: boolean;

  readonly isSearchable: boolean;
}

export default class SingleSelect extends Component<{}, State> {
  state: State = {
    isClearable: true,
    isDisabled: false,
    isSearchable: true,
  };

  toggleClearable = () =>
    this.setState((state) => ({ isClearable: !state.isClearable }));
  toggleDisabled = () =>
    this.setState((state) => ({ isDisabled: !state.isDisabled }));
  toggleSearchable = () =>
    this.setState((state) => ({ isSearchable: !state.isSearchable }));

  render() {
    const {
      toggleClearable,
      toggleDisabled,

      toggleSearchable,
    } = this;

    const { isClearable, isSearchable, isDisabled, isLoading } =
      this.state;

    const indicatorSeparatorStyle = {
      alignSelf: 'stretch',
      marginBottom: 8,
      marginTop: 8,
      width: 1,
    };

    const IndicatorSeparator = ({
      innerProps,
    }: IndicatorSeparatorProps<true>) => {
      return <span style={indicatorSeparatorStyle} {...innerProps} />;
    };

    const Placeholder = (props: PlaceholderProps) => {
      return <components.Placeholder {...props} />;
    };

    // const hidden = this.state.checked ? '' : 'hidden';

    return (
      <Fragment>
        <Select
          closeMenuOnSelect={false}
          classNamePrefix="select"
          options={Options}
          styles={customStyles}
          isDisabled={isDisabled}
          isLoading={isLoading}
          isClearable={isClearable}
          isSearchable={isSearchable}
          placeholder={'Select a Group:'}
          className='select'
          isMulti
        />
        <div
          style={{
            color: 'hsl(0, 0%, 40%)',
            display: 'inline-block',
            fontSize: 12,
            fontStyle: 'sans-serif-condensed.',
            marginTop: '1em',
          }}
        >

          <Checkbox checked={isClearable} onChange={toggleClearable}>
            Clearable
          </Checkbox>
          <Checkbox checked={isSearchable} onChange={toggleSearchable}>
            Type to Search
          </Checkbox>
          <Checkbox checked={isDisabled} onChange={toggleDisabled}>
            Disabled
          </Checkbox>


        </div>
      </Fragment>
    );
  }
}


