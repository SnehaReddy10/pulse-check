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
import {
  useLazyGetOrganizationByIdQuery,
  useUpdateOrganizationMutation,
} from '@/store/organizations/organizationApi';

function Organization() {
  const {
    data: organizations,
    error: getOrgsError,
    isFetching: isFetchingOrgs,
  } = useGetAllOrganizationsQuery({});

  const [createOrganization, createOrgResults] =
    useCreateOrganizationMutation();

  const [updateOrganization, updateOrgResults] =
    useUpdateOrganizationMutation();

  let [
    fetchOrganization,
    {
      data: currOrganization,
      error: getOrgError,
      isFetching: isFetchingOrg,
      isSuccess,
    },
  ] = useLazyGetOrganizationByIdQuery({});

  const [isModalOpen, setModalOpen] = useState(false);
  const [currOrg, setCurrOrg] = useState<{
    name: string;
    description: string;
  } | null>(null);

  const toggleModal = () => {
    setCurrOrg(null);
    currOrganization = null;
    setModalOpen(!isModalOpen);
  };

  const handleEditOrg = (id: string) => {
    setModalOpen(true);
    fetchOrganization(id);
  };

  if (!currOrg && isSuccess) {
    setCurrOrg(currOrganization?.organization);
  }

  const toastContext = useContext(ToastContext);
  const {
    register: registerField,
    handleSubmit,
    setValue,
    reset,
    formState: { isValid, errors },
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(organizationSchema),
  });

  if (getOrgsError || getOrgError) {
    return (
      <div className="flex h-full w-full justify-center items-center">
        <ServerError />
      </div>
    );
  }

  useEffect(() => {
    if (createOrgResults.error || updateOrgResults.error) {
      const r =
        (createOrgResults.error as any) ?? (updateOrgResults.error as any);

      if (!toastContext) {
        throw new Error('useContext must be used within a ToastProvider');
      }

      const { showToast } = toastContext;
      showToast(r?.data.message, 'error', 'left-0 top-10');
      reset();
    }
  }, [createOrgResults.error, updateOrgResults.error]);

  useEffect(() => {
    if (currOrg) {
      setValue('name', currOrg.name || '');
      setValue('description', currOrg.description || '');
    } else {
      reset();
    }
  }, [currOrg]);

  const onSubmit = (data: any) => {
    if (currOrg) {
      updateOrganization({ id: currOrganization?.organization?._id, ...data });
    } else {
      createOrganization(data);
    }
  };

  if (
    isFetchingOrgs ||
    updateOrgResults.isLoading ||
    createOrgResults.isLoading ||
    isFetchingOrg
  ) {
    return <Loader />;
  }

  if (
    (createOrgResults.isSuccess || updateOrgResults.isSuccess) &&
    isModalOpen
  ) {
    setModalOpen(false);
    createOrgResults.reset();
    updateOrgResults.reset();
  }

  return (
    <div className="bg-black py-4 h-full w-full flex flex-col max-sm:flex-col justify-center items-center">
      <Modal
        isOpen={isModalOpen}
        onClose={toggleModal}
        onCreate={handleSubmit(onSubmit)}
        title="Establish Your Organization"
        tagLine="Easily manage your services and teams in one place"
        action={`${currOrg ? 'Update' : 'Create'}`}
      >
        <CreateOrganizationForm
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          errors={errors}
          isValid={isValid}
          registerField={registerField}
          title={currOrg?.name}
          description={currOrg?.description}
        />
      </Modal>

      <div className="flex justify-end w-full">
        <Button onClick={toggleModal}>Create</Button>
      </div>

      <OrganizationGrid
        handleEditOrg={handleEditOrg}
        organizations={organizations}
      />
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

const OrganizationGrid = ({ handleEditOrg, organizations }: any) => {
  return (
    <div className="flex flex-col p-4 w-full">
      <Grid
        onDelete={(s: any) => {}}
        onEdit={handleEditOrg}
        title=""
        headers={[
          { label: 'Name', id: 1, className: 'w-[100px]' },
          { label: 'Description', id: 2, className: '' },
          { label: 'Incidents', id: 3, className: 'w-[100px] text-center' },
          { label: 'Created At', id: 4, className: 'w-[100px]' },
        ]}
        rows={organizations?.data?.map((org: any) => [
          { label: org.name, id: org._id, className: 'w-[200px]' },
          { label: org.description, id: org._id, className: 'w-[300px]' },
          {
            label: org.servicesCount,
            id: org._id,
            className: 'w-[300px] text-center',
          },
          {
            label: formatDate(org.createdAt),
            id: org._id,
            className: 'w-[200px]',
          },
        ])}
      />
    </div>
  );
};

export default Organization;
