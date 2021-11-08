interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  status: string;
  phoneNumber: string;
  userDetails: {
    [key: string]: string;
  };
  role: string;
}
