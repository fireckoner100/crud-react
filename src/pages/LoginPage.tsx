import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext.tsx';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

interface FormData {
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const { login } = useContext(AuthContext)!;
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = ({ email, password }: FormData) => {
    if (login(email, password)) {
      navigate('/users'); // Redirige al usuario al panel de administración
    } else {
      setLoginError('Invalid credentials');
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 h-screen" style={{backgroundImage: 'linear-gradient(to right bottom, #03c4e8, #3097c0, #3b6d93, #354763, #242536)' }}>
      <div className="flex flex-col items-center justify-center h-screen px-6 py-8 mx-auto opacity-75">
        <h1 className="text-white font-bold text-3xl mb-4">{`<RafafeDev />`}</h1>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(onSubmit)}>
              {/* Mensaje de Error de Credenciales */}
              {loginError && (
                <p className="text-red-500 text-sm mb-2">{loginError}</p>
              )}

              {/* Campo de Email */}
              <div>
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <Controller
                  name="email"
                  control={control}
                  rules={{
                    required: 'Email is required',
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: 'Invalid email address',
                    },
                  }}
                  render={({ field }) => (
                    <InputText
                      {...field}
                      id="email"
                      className={`bg-gray-50 border ${
                        errors.email ? 'border-red-500' : 'border-gray-300'
                      } text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5`}
                      placeholder="name@company.com"
                    />
                  )}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                )}
              </div>

              {/* Campo de Contraseña */}
              <div>
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <Controller
                  name="password"
                  control={control}
                  rules={{
                    required: 'Password is required',
                    minLength: {
                      value: 6,
                      message: 'Password must be at least 6 characters long',
                    },
                  }}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="password"
                      id="password"
                      className={`bg-gray-50 border ${
                        errors.password ? 'border-red-500' : 'border-gray-300'
                      } text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5`}
                      placeholder="••••••••"
                    />
                  )}
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                )}
              </div>

              {/* Botón de Inicio de Sesión */}
              <Button
                type="submit"
                rounded
                className='w-full justify-center'
              >
                Sign in
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
