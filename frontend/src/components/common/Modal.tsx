import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  tagLine: string;
  onCreate: () => void;
  children: React.ReactNode;
  action: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  tagLine,
  onCreate,
  children,
  action,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black text-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-xl text-black md:text-2xl font-semibold font-serif">
              {title}
            </h2>
            <p className="text-xxs text-black">{tagLine}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
            aria-label="Close modal"
          >
            &times;
          </button>
        </div>
        <div className="mb-4">{children}</div>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={onCreate}
            className="px-4 py-2 bg-black text-white rounded-md"
          >
            {action}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
