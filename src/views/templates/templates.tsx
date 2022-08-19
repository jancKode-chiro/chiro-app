import React, {
  ReactNode,
  useEffect,
  useState,
  useMemo,

} from 'react';
import { withRouter } from 'react-router';
import { useQuery } from 'react-query';
import { isEmpty } from 'lodash';
import { useForm } from 'react-hook-form';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Stack from '@mui/material/Stack';

import {
  Input,
  InputButton,
} from '../../components/common/forms/custom-input/input';
import Dashboard from '../dashboard/dashboard';
import Table from '../../components/table/table';
import './tempaltes.styles.scss';
import { addTemplate, deleteTemplate, getTemplates } from '../../api/template';
import { TextareaAutosize, Typography } from '@material-ui/core';
import CustomModal from '../../components/modal/modal';
import { useTemplate } from '../../context/template-context';


type DashboardProps = {
  children?: ReactNode;
};

const Templates = ({ children }: DashboardProps) => {

  const [templates, setTemplates] = useState<any>([]);
  const { register } = useForm({
    mode: "onChange"
  });
  const { title, content, setTemplateContent, setTemplateTitle } = useTemplate()

  useEffect(() => { }, [title, content])


  const { data } = useQuery(['templates'], () =>
    getTemplates()
  );

  useEffect(() => {
    console.log('data', data)
    if (!isEmpty(data)) setTemplates(data);

  }, [data]);

  const onCloseEditModal = () => {
    setTemplateTitle('');
    setTemplateContent('')
  }

  const onConfirmEdit = (id: string): string => {
    return id;
  }

  const onConfirmDelete = (id: string): void => {
    deleteTemplate(id);
  }

  const columns = useMemo(
    () => [
      {
        Header: 'Title',
        accessor: 'title',
      },
      {
        Header: 'Content',
        accessor: 'content',
      },
      {
        Header: 'Action',
        accessor: '',
        Cell: ({
          cell: {
            row: { original },
          },

        }: any) => (
          <Stack direction='row' spacing={1} alignItems='center'>
            <CustomModal
              headerText='Edit Template'
              contentText='Edit Template?'
              buttonTriggerText='Edit this template?'
              onOpenCallback={() => onConfirmEdit(original.id)}
              customComponent={
                <IconButton aria-label="delete" color='info' onClick={() => { setTemplateTitle(original.title); setTemplateContent(original.content) }} >
                  <EditIcon />
                </IconButton>}
              onCloseButtonText='Cancel'
              onOpenButtonText='Save'
              children={<>
                <Typography gutterBottom variant='h5' component={'div'}>Current title: {original.title}</Typography>
                <Input
                  type={'text'}
                  inputMode='text'
                  width={300}
                  marginBottom={'.5rem'}
                  {...register('title', {
                    value: original.title,
                    onChange: (e) => setTemplateTitle(e.target.value)
                  })}
                />
                <Typography gutterBottom variant='h5' component={'div'}>Content</Typography>
                <TextareaAutosize style={{
                  width: 'inherit',
                }}
                  minRows={20}
                  cols={100}
                  {...register('content', {
                    value: original.content,
                    onChange: (e) => setTemplateContent(e.target.value)
                  })}
                />
              </>}
              onCloseCallback={() => onCloseEditModal()}
              type='template'
            />
            <CustomModal
              headerText='Delete Template'
              contentText='Are you sure you want to delete this template?'
              buttonTriggerText='Delete Template?'
              onOpenCallback={() => onConfirmDelete(original.id)}
              customComponent={<IconButton aria-label="delete" color='error'>
                <DeleteIcon style={{
                  marginTop: -30
                }} />
              </IconButton>}
              onCloseButtonText='No'
              onOpenButtonText='Yes'
            />
          </Stack>
        ),
      },
    ],
    []
  );

  const handleConfirm = () => {
    addTemplate(title, content)
    setTemplateContent('')
    setTemplateTitle('')
  }

  return (
    <Dashboard isNavbar={true}>
      <div className='contacts'>
        <form className='contacts-form'>
          <label className='title'>Templates</label>
          <CustomModal
            headerText='Add Template'
            contentText='Add Template'
            buttonTriggerText='Add a new Template'
            onOpenCallback={() => handleConfirm()}
            customComponent={<InputButton
              value='Add Template'
              type='button'
              className='bg-green text-white'
              width='12rem'
            />}
            onCloseButtonText='No'
            onOpenButtonText='Yes'
            children={<>
              <Typography gutterBottom variant='h5' component={'div'}>Title</Typography>
              <Input
                type={'text'}
                inputMode='text'
                width={300}
                marginBottom={'.5rem'}
                {...register('title', {
                  value: title,
                  onChange: (e) => setTemplateTitle(e.target.value)

                })}
              />
              <Typography gutterBottom variant='h5' component={'div'}>Content</Typography>
              <TextareaAutosize style={{
                width: 'inherit',

              }} minRows={20} cols={100} {...register('content', {
                value: content,
                onChange: (e) => setTemplateContent(e.target.value)
              })} />
            </>}
          />
        </form>


        <div className='contact-data-image'>
          <Table columns={columns} data={templates} />
        </div>
      </div>
    </Dashboard>
  );
};

export default withRouter(Templates);
