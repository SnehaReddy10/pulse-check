import {
  useCreateOrganizationMutation,
  useGetAllOrganizationsQuery,
} from '@/store';
import Loader from '../common/Loader';
import { Button } from '../ui/button';
import Grid from '../common/Grid';
import { useContext, useEffect, useState } from 'react';
import Modal from '../common/Modal';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { organizationSchema } from '@/validators/OrganizatiobSchema';
import { ToastContext } from '@/context/ToastContext';
import CreateOrganizationForm from '../form/CreateOrganizationForm';
import ServerError from '../common/ServerError';

function Organization() {
  const {
    data: organizations,
    error,
    isFetching,
  } = useGetAllOrganizationsQuery({});
  const [createOrganization, results] = useCreateOrganizationMutation();

  const [isModalOpen, setModalOpen] = useState(false);

  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };
  const toastContext = useContext(ToastContext);
  const {
    register: registerField,
    handleSubmit,
    reset,
    formState: { isValid, errors },
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(organizationSchema),
  });

  if (error) {
    return (
      <div className="flex h-full w-full justify-center items-center">
        <ServerError />
      </div>
    );
  }
  useEffect(() => {
    if (results.error) {
      const r = results.error as any;

      if (!toastContext) {
        throw new Error('useContext must be used within a ToastProvider');
      }

      const { showToast } = toastContext;
      showToast(r?.data.message, 'error', 'left-0 top-10');
      reset();
    }
  }, [results.error]);

  const onSubmit = (data: any) => {
    createOrganization(data);
  };

  if (isFetching) {
    return <Loader />;
  }

  if (results.isSuccess && isModalOpen) {
    setModalOpen(false);
  }

  return (
    <div className="bg-black py-4 h-full w-full flex flex-col max-sm:flex-col justify-center items-center">
      <Modal
        isOpen={isModalOpen}
        onClose={toggleModal}
        onCreate={handleSubmit(onSubmit)}
        title="Establish Your Organization"
        tagLine="Easily manage your services and teams in one place"
      >
        <CreateOrganizationForm
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          errors={errors}
          isValid={isValid}
          registerField={registerField}
        />
      </Modal>

      <div className="flex justify-end w-full">
        <Button onClick={toggleModal}>Create</Button>
      </div>
      <div className="flex flex-col p-4 w-full">
        <Grid
          title=""
          headers={[
            { label: 'Name', id: 1, className: 'w-[100px]' },
            { label: 'Description', id: 2, className: '' },
            { label: 'Incidents', id: 3, className: 'w-[100px] text-center' },
            { label: 'Created At', id: 4, className: 'w-[100px]' },
          ]}
          rows={organizations?.data?.map((org: any) => [
            { label: org.name, className: 'w-[200px]' },
            { label: org.description, className: 'w-[300px]' },
            { label: org.servicesCount, className: 'w-[300px] text-center' },
            { label: formatDate(org.createdAt), className: 'w-[200px]' },
          ])}
        />
      </div>
    </div>
  );
}
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  });
};

export default Organization;
