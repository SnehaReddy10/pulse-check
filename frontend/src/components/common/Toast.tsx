import { useEffect } from 'react';
import { BiSolidError } from 'react-icons/bi';
import { IoIosInformationCircle, IoIosWarning } from 'react-icons/io';
import { IoCheckmarkDoneCircleSharp } from 'react-icons/io5';
import { twMerge } from 'tailwind-merge';

function Toast({
  message,
  type,
  onClose,
  className = '',
}: {
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  onClose: any;
  className?: string;
}) {
  useEffect(() => {
    const timeout = setTimeout(() => {
      onClose();
    }, 3000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <>
      <div className="">
        {message && (
          <div
            className={twMerge(`flex gap-1 animate-fadeIn absolute px-20 py-3 m-2 ${
              type === 'success' ? 'bg-green-700 text-white' : ''
            } ${type === 'error' ? 'bg-red-500 text-white' : ''}
            ${type === 'info' ? 'bg-blue-500 text-white' : ''}
${
  type === 'warning' ? 'bg-yellow-500 text-black-900' : ''
} text-xs rounded-sm ${className}`)}
          >
            {type === 'warning' && <IoIosWarning color="black" size={25} />}
            {type === 'error' && <BiSolidError color="white" size={25} />}
            {type === 'info' && (
              <IoIosInformationCircle color="white" size={25} />
            )}
            {type === 'success' && (
              <IoCheckmarkDoneCircleSharp color="white" size={25} />
            )}
            {message}
          </div>
        )}
      </div>
    </>
  );
}

export default Toast;
