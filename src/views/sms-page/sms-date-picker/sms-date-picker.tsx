import { useState, useRef, SetStateAction } from 'react'
import { toast } from 'react-toastify'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import { DateTimePicker } from '@material-ui/pickers'
import DatePicker from 'react-datepicker'
import React from 'react'


const SmsDatePicker = () => {
  const [date, setDate] = useState();

  const loadDate = useRef(new Date() as any)

  const { control } = useForm()

  // const [myDate, setMyDate] = useState<Date | null>(null)

  const [clearedDate, handleClearedDateChange] = useState(null);
  const [selectedTime, handleTimeChange] = React.useState(new Date());
  const [selectDate, setSelectDate] = useState<Date | null>(null)
  const notifyDate = () => toast.update(loadDate.current, { render: 'Schedule has been set', type: toast.TYPE.SUCCESS, autoClose: 10000 })

  const onSelectDateHandler = async (date: any): Promise<void> => {
    setSelectDate(selectDate)
    notifyDate();
    // clearDayTimeout()   
    console.log(date)
  }

  // const handleSelectDate = (date: any) => {

  // }

  const handleDateChange = (date: any) => {
    setDate(date);
  };

  // console.log(date)

  return (
    <>
      <Controller
        name=''
        control={control}
        defaultValue={null}
        render={({ field }) => (
          <>
            <DateTimePicker
              label="DateTimePicker"
              inputVariant="outlined"
              value={selectedTime}
              color='secondary'
              fullWidth
              onChange={onSelectDateHandler}
            />
            {/* <DatePicker
              onChange={(e) => field.onChange((e), onSelectDateHandler)}
              selected={field.value}
              placeholderText="Select date"
              showTimeInput
              dateFormat="Pp"
              isClearable
              withPortal
            /> */}
            {/* <br /> */}
            {/* <KeyboardTimePicker
              autoOk
              // variant='static'
              openTo='hours'
              placeholder="Select Time"
              mask="__:__ _M"
              value={selectedTime}
              onChange={(date: any) => handleDateChange(date)}

            /> */}
          </>
        )}

      />

    </>
  )
}

export default SmsDatePicker;