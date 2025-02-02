function Form({ handleSubmit, onSubmit, children }: any) {
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white flex flex-col gap-10 items-center justify-center p-4 md:p-10 rounded-md"
    >
      {children}
    </form>
  );
}

export default Form;
