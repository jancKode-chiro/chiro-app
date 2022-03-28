import React from 'react'
import { useState, useRef, SetStateAction } from 'react'
import { toast } from 'react-toastify'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import { KeyboardDateTimePicker } from '@material-ui/pickers'
import Button from "@material-ui/core/Button"
// import DatePicker from 'react-datepicker'

// const DateScheduler = new DayPilot.Navigator("datepicker", {
//   onTimeRangeSelected: (args: any) => {

//     scheduler.update({
//       startDate: args.day,
//     });                                                       

//   }       
// });
// DateScheduler.init();

// const scheduler = new DayPilot.Scheduler("scheduler", {
//   timeHeaders: [{ groupBy: "Day", format: "MMMM d, yyyy" }, { groupBy: "Hour" }, { groupBy: "Cell" }],
//   scale: "CellDuration",
//   cellDuration: 15,
//   days: 1,  
//   // ...
// });
// scheduler.init(); 

const SmsDatePicker = () => {
  const [date, setDate] = useState<Date | null>(null);

  const loadDate = useRef(new Date() as any)

  const { control, handleSubmit } = useForm()

  // const datepicker = new DayPilot.Navigator("datepicker", {
  //   onTimeRangeSelected: (args: any) => {

  //     scheduler.update({
  //       startDate: args.day,
  //       scrollTo: args.day.addHours(9)
  //     });

  //   }
  // });
  // datepicker.init();

  const [selectedTime, handleTimeChange] = React.useState(new Date());
  const [selectDate, setSelectDate] = useState<Date | null>(null)
  const notifyDate = () => toast.update(loadDate.current, { render: 'Schedule has been set', type: toast.TYPE.SUCCESS, autoClose: 10000 })

  const submitData = (Date: any) => {
    console.log(Date);
    notifyDate();
  }
  // const onSelectDateHandler = async (date: any): Promise<void> => {
  //   setSelectDate(selectDate)
  //   notifyDate();
  //   // clearDayTimeout()   
  //   console.log(date)
  // }
  return (
    <>
      <Controller
        name=''
        control={control}
        defaultValue={date}
        render={({ field }) => (
          <>
            <KeyboardDateTimePicker
              InputAdornmentProps={{ position: 'end' }}
              label="Select Schedule"
              inputVariant="outlined"
              value={date}
              color='secondary'
              onChange={setDate}
              fullWidth
            />
            <Button
              onSubmit={handleSubmit(submitData)}
              type='button'
              variant='contained'
              color='secondary'
              size='small'
              fullWidth
            >
              Set Schedule
            </Button>
            {date?.toUTCString()}
            {/* <DatePicker
              onChange={(e) => field.onChange((e), onSelectDateHandler)}
              selected={field.value}
              placeholderText="Select date"
              showTimeInput
              dateFormat="Pp"
              isClearable
              withPortal
            /> */}
          </>
        )}

      />

    </>
  )
}

export default SmsDatePicker;