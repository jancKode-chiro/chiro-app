import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Button from "@material-ui/core/Button";

import Dashboard from "../dashboard/dashboard";

import FormikField from "../../components/form-field/form-field";
import FormikSelect, { FormikSelectItem } from "../../components/form-select/form-select";

import './create-user.styles.scss';

interface FormValues {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
  position: string;
}

const initialValues: FormValues = {
  name: "",
  email: '',
  password: '',
  passwordConfirm: '',
  position: ""
};

const positionItems: FormikSelectItem[] = [
  {
    label: "Front End",
    value: "front_end"
  },
  {
    label: "Back End",
    value: "back_end"
  },
  {
    label: "Dev Ops",
    value: "dev_ops"
  },
  {
    label: "QA",
    value: "qa"
  }
];

const roleItems: FormikSelectItem[] = [
  {
    label: "Admin",
    value: "admin"
  },
  {
    label: "User",
    value: "user"
  },

];

const emailAddresses = [
  'test@gmail.com',
  'test2@gmail.com',
  'test3@gmail.com'
];

const lowercaseRegex = /(?=.*[a-z])/;
const uppercaseRegex = /(?=.*[A-Z])/;
const numericRegex = /(?=.*[0-9])/;

const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too Short!")
    .required("Required"),
  email: Yup.string()
    .lowercase()
    .email('Must be a valid email!')
    .notOneOf(emailAddresses, 'Email already taken!')
    .required('Required!'),
  password: Yup.string()
    .matches(lowercaseRegex, 'one lowercase required!')
    .matches(uppercaseRegex, 'one uppercase required!')
    .matches(numericRegex, 'one number required!')
    .min(8, 'Minimum 8 characters required!')
    .required('Required!'),
  passwordConfirm: Yup.string()
    .oneOf([Yup.ref('password')], 'Password must be the same!')
    .required('Required!'),
  phoneNumber: Yup.string()
    .min(12, 'Maximum of 12 numbers is required!')
    .required('Your Number is Required!'),
  position: Yup.string().required("Required")
});

const App: React.FC = () => {
  const handleSubmit = (values: FormValues): void => {
    alert(JSON.stringify(values));
  };

  return (
    <div className="userform">
      <h1>Create User</h1>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={SignupSchema}
      >
        {({ dirty, isValid }) => {
          return (
            // <Dashboard>

            <Form>
              <FormikField name="name" label="Name" required />
              <FormikField name="email" label="Email" required />
              <FormikField
                name="password"
                label="Password"
                required
                type="password"
              />
              <FormikField
                name="passwordConfirm"
                label="Confirm Password"
                required
                type="password"
              />
              <FormikField
                name="phoneNumber"
                label="Phone Number"
                required

              />
              <FormikSelect
                name="role"
                items={roleItems}
                label="Role"
                required
              />
              <FormikSelect
                name="position"
                items={positionItems}
                label="Position"
                required
              />

              <Button
                variant="contained"
                color="primary"
                disabled={!dirty || !isValid}
                type="submit"
              >
                Create
              </Button>
            </Form>

            //  </Dashboard>
          );
        }}
      </Formik>
    </div>
  );
};

export default App;