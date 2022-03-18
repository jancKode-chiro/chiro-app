import { useState, useRef } from 'react'
import { toast } from 'react-toastify'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import { KeyboardTimePicker } from '@material-ui/pickers'
import DatePicker from 'react-datepicker'


const SmsDatePicker = () => {
  const loadDate = useRef(new Date() as any)

  const { control } = useForm()

  const [myDate, setMyDate] = useState<Date | null>(null)
  const [selectedTime, handleTimeChange] = useState(new Date());
  const [selectDate, setSelectDate] = useState<Date | null>(null)
  const notifyDate = () => toast.update(loadDate.current, { render: 'Schedule has been set', type: toast.TYPE.SUCCESS, autoClose: 10000 })
  const onSelectDateHandler = async (data: Date): Promise<void> => {
    setSelectDate(selectDate)
    notifyDate();
    // clearDayTimeout()   
    console.log(data)
  }
  return (
    <>
      <Controller
        name=''
        control={control}
        defaultValue={null}
        render={({ field }) => (
          <>
            <DatePicker
              onChange={(e) => field.onChange((e), onSelectDateHandler)}
              selected={field.value}
              placeholderText="Select date"
              dateFormat="Pp"
              isClearable
              withPortal
            />
            <br />
            <KeyboardTimePicker
              autoOk
              variant='static'
              openTo='hours'
              placeholder="Select Time"
              mask="__:__ _M"
              value={selectedTime}
              onChange={(date: any) => handleTimeChange(date)} /></>
        )}

      />

    </>
  )
}

export default SmsDatePicker;