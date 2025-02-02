import Form from '../common/Form';
import TertiaryInput from '../inputs/TertiaryInput';

function CreateOrganizationForm({
  handleSubmit,
  onSubmit,
  errors,
  registerField,
  isValid,
}: any) {
  return (
    <>
      <Form
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        isValid={isValid}
        buttonLabel={'Create'}
        children={
          <div className="flex flex-col gap-4 md:gap-10 items-center justify-center">
            <div className="grid grid-cols-1 gap-10">
              <TertiaryInput
                error={errors.name?.message}
                innerRef={registerField('name')}
                placeholder="Organization Name"
                label="name"
                className="w-40 md:w-64"
              />
              <TertiaryInput
                error={errors.description?.message}
                innerRef={registerField('description')}
                placeholder="secret"
                label="description"
                type="text"
                className="w-40 md:w-64"
              />
            </div>
          </div>
        }
      />
    </>
  );
}

export default CreateOrganizationForm;
