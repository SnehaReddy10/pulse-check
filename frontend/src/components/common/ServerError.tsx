import { Button } from '../ui/button';
import { useEffect, useState } from 'react';

function ServerError({ statusCode = 500 }) {
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (statusCode === 503) {
      setMessage('Service Unavailable. Please try again later.');
    } else {
      setMessage('Internal Server Error. Something went wrong.');
    }
  }, [statusCode]);

  return (
    <div className="bg-black text-white py-4 h-full w-full flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold">{statusCode}</h1>
      <p className="text-lg mt-4">{message}</p>
      <Button className="mt-6" onClick={() => window.location.reload()}>
        Retry
      </Button>
    </div>
  );
}

export default ServerError;
