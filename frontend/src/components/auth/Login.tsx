import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useContext, useEffect } from 'react';
import TertiaryInput from '../inputs/TertiaryInput';
import { ToastContext } from '@/context/ToastContext';
import { useLoginMutation } from '@/store';
import { Button } from '../ui/button';
import { loginSchema } from '@/validators/LoginSchema';
import Loader from '../common/Loader';

function Login() {
  const [register, results] = useLoginMutation();
  const navigate = useNavigate();
  const toastContext = useContext(ToastContext);

  const {
    register: registerField,
    handleSubmit,
    reset,
    formState: { isValid, errors },
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(loginSchema),
  });

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
    register(data);
  };

  if (results.isLoading) {
    return <Loader />;
  }

  if (results.isSuccess) {
    navigate('/');
  }

  return (
    <div className="bg-[#D4D4D4] h-full w-full flex max-sm:flex-col justify-center items-center min-h-screen">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white flex items-center justify-center p-4 md:p-10 rounded-md shadow-gray-400 shadow-2xl"
      >
        <div className="flex animate-fadeIn flex-col gap-4 md:gap-10 items-center justify-center text-nowrap">
          <div>
            <h2 className="text-xl md:text-3xl font-semibold font-serif">
              Welcome back
            </h2>
            <p className="text-xxs">
              Don't have an account?{' '}
              <span className="font-bold">
                <Link to={'/register'}>Register</Link>
              </span>
            </p>
          </div>
          <div className="grid grid-cols-1 gap-7">
            <TertiaryInput
              error={errors.email?.message}
              innerRef={registerField('email')}
              placeholder="john.doe@gmail.com"
              label="email"
              className="w-40 md:w-64"
            />
            <TertiaryInput
              error={errors.password?.message}
              innerRef={registerField('password')}
              placeholder="secret"
              label="password"
              type="password"
              className="w-40 md:w-64"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Button
              disabled={!isValid}
              type="submit"
              className="rounded-full w-56 md:w-72 md:text-xs py-2 font-semibold"
            >
              Login
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;
