import React from 'react'
import { useForm } from 'react-hook-form';


import './uploadbutton.styles.scss';

function FileButton() {
  console.log('File(s) dropped');

  const { register, handleSubmit } = useForm()


  const onSubmit = (data: { filename: { name: any; }[]; }) => {
    const storageRef = new Storage().ref();
    const fileRef = storageRef.child(data.filename[0].name);
    fileRef.put(data.filename[0].name).then(() => {
      console.log('Uploaded a file');
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} >
      <input required type='file' name='filename' className='choose-wrapper' />
      <button className='submitfilebutton '>Submit</button>
    </form>
  )
}





export default FileButton;
