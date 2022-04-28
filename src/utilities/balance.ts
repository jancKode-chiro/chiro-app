import { useState } from 'react';

function Balance(message: any) {
  const [counter, setCounter] = useState(1);

  let messageBalance = () => setCounter(counter - 1);

  const setBalance = parseInt(message);

  message.value = setBalance;

  if (counter <= 0) {
    messageBalance = () => setCounter(1);
  }
}

export default Balance;
