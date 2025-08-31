import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input, Card, CardContent, PasswordInput } from '../components/ui';
import { GoogleIcon } from '../components/ui/GoogleIcon';
import { Link, useNavigate } from 'react-router-dom';
import { loginSchema, type LoginFormData } from '../schemas/auth';
import { useAuth } from '../hooks/useAuth';
import toast from 'react-hot-toast';
import Logo from '../components/logo';

export function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const { signIn, signInWithGoogle, error, clearError } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      setIsLoading(true);
      clearError();

      await signIn({
        email: data.email,
        password: data.password,
        rememberMe: data.rememberMe,
      });

      toast.success('Successfully signed in!');
      navigate('/dashboard');
    } catch (err) {
      toast.error(error || 'Failed to sign in');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setIsGoogleLoading(true);
      clearError();

      await signInWithGoogle();

      toast.success('Successfully signed in with Google!');
      navigate('/dashboard');
    } catch (err) {
      console.error('Google Sign-in Error:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to sign in with Google';
      toast.error(errorMessage);
    } finally {
      setIsGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        {/* Logo */}

        <div className="text-center mb-8">
          <Logo className='mx-auto' />
          <p className="text-gray-600 dark:text-gray-300 mt-4">
            Sign in to your account
          </p>
        </div>

        <Card className="backdrop-blur-lg bg-white/80 dark:bg-gray-800/80 border border-white/20">
          <CardContent className="p-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <Input
                label="Email"
                type="email"
                placeholder="Enter your email"
                {...register('email')}
                error={errors.email?.message}
              />

              <PasswordInput
                label="Password"
                placeholder="Enter your password"
                {...register('password')}
                error={errors.password?.message}
              />

              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-primary-500 focus:ring-primary-500"
                    {...register('rememberMe')}
                  />
                  <span className="ml-2 text-sm text-gray-600 dark:text-gray-300">
                    Remember me
                  </span>
                </label>
                <Link
                  to="/forgot-password"
                  className="text-sm text-primary-500 hover:text-primary-600"
                >
                  Forgot password?
                </Link>
              </div>

              <Button
                type="submit"
                className="w-full"
                size="lg"
                disabled={isLoading || isGoogleLoading}
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300 dark:border-gray-600" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white dark:bg-gray-800 text-gray-500">
                    Or continue with
                  </span>
                </div>
              </div>

              <Button
                type="button"
                variant="outline"
                className="w-full"
                size="lg"
                onClick={handleGoogleSignIn}
                disabled={isLoading || isGoogleLoading}
              >
                <GoogleIcon className="w-5 h-5 mr-2" />
                {isGoogleLoading ? 'Signing in...' : 'Sign in with Google'}
              </Button>

              <div className="text-center">
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  Don't have an account?{' '}
                  <Link
                    to="/register"
                    className="text-primary-500 hover:text-primary-600 font-medium"
                  >
                    Sign up
                  </Link>
                </span>
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
