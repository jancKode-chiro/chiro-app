import React from 'react';
import { DataStore } from 'aws-amplify';
import { User, UserRole } from '../models';
import { Auth } from 'aws-amplify';
import { Type } from 'typescript';
import { isEmpty } from 'lodash';
import { useAuth } from '../context/auth-context';
import moment from 'moment';

let systemError: string = '';

DataStore.configure({
  errorHandler: (error) => {
    systemError = error.message;
    alert(systemError);
    return systemError;
  },
});

type CreateUserProps = {
  name: string;
  email: string;
  phoneNumber: string;
  userDetails: {
    [key: string]: string;
  };
  role?: string;
};

const authSignup = async (
  name: string,
  email: string,
  password: string,
  phoneNumber: string
) => {
  try {
    const result = await Auth.signUp({
      username: email,
      password: password,
      attributes: {
        email: email,
        name: name,
        phone_number: `+${phoneNumber}`,
      },
    });

    return result;
  } catch (error: any) {
    alert(error.message);
  }
};

export const createUser = async (
  firstName: string,
  lastName: string,
  email: string,
  phoneNumber: string,
  // userDetails: { [key: string]: string },
  role: string,
  password: string,
  country: string,
  countryCode: string
): Promise<User | void> => {
  let currentDate = moment().format('YYYY-MM-DDThh:mm:ss.sssZ');
  const fullName = `${firstName} ${lastName}`;
  try {
    const result = await authSignup(fullName, email, password, phoneNumber);
    if (result) {
      const dataResult = await DataStore.save(
        new User({
          first_name: firstName,
          last_name: lastName,
          email: email,
          phone_number: `+${phoneNumber}`,
          create_date: currentDate,
          user_details: {
            address: country,
            country: country,
            country_code: countryCode,
          },
          role: UserRole.USER,
        })
      );
      if (result && systemError === '') {
        alert('Success, please check your email for the verification code');
        return dataResult;
      } else if (systemError) {
        alert(systemError);
      }
    }
  } catch (err: any) {
    console.log('Error on AWS signup', err.message);
  }
};

export const getUser = async (email: string) => {
  console.log('getUser email', email);
  const user = await DataStore.query(User, (u) => u.email('eq', email));
  console.log('getuser', user);
  return user[0].id;
};

export const forgotUserPassword = async (username: string) => {
  try {
    const result = Auth.forgotPassword(username);
    return result;
  } catch (err) {
    console.log(err);
  }
};

export const submitForgotPasswordCode = async (
  username: string,
  code: string,
  new_password: string
) => {
  try {
    const result = await Auth.forgotPasswordSubmit(
      username,
      code,
      new_password
    );
    return result;
  } catch (err) {
    console.log('Error while processing your change password request', err);
  }
};

export const confirmSignup = async (email: string, activationCode: string) => {
  try {
    Auth.confirmSignUp(email, activationCode)
      .then(() => {
        alert('Success! Redirecting you to the login page.');
      })
      .catch((err) => {
        alert(err.message);
        console.log('Error while trying to activate account', err);
      });
  } catch (err) {
    console.log('Error while trying to activate account', err);
  }
};
