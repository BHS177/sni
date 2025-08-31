import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckIcon } from '@heroicons/react/24/outline';
import { Button, Input, Card, CardContent, PasswordInput } from '../components/ui';
import { GoogleIcon } from '../components/ui/GoogleIcon';
import { Link, useNavigate } from 'react-router-dom';
import { registerSchema, type RegisterFormData } from '../schemas/auth';
import { useAuth } from '../hooks/useAuth';
import toast from 'react-hot-toast';
import Logo from '../components/logo';

export function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const { signUp, signInWithGoogle, error, clearError } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const password = watch('password', '');

  const passwordRequirements = [
    { text: 'At least 8 characters', met: password.length >= 8 },
    { text: 'Contains uppercase letter', met: /[A-Z]/.test(password) },
    { text: 'Contains lowercase letter', met: /[a-z]/.test(password) },
    { text: 'Contains number', met: /\d/.test(password) },
    { text: 'Contains special character', met: /[^A-Za-z0-9]/.test(password) },
  ];

  const onSubmit = async (data: RegisterFormData) => {
    try {
      setIsLoading(true);
      clearError();
      
      await signUp({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword,
        agreeTerms: data.agreeTerms,
      });
      
      toast.success('Account created successfully!');
      navigate('/dashboard');
    } catch (err) {
      toast.error(error || 'Failed to create account');
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
      toast.error(error || 'Failed to sign in with Google');
    } finally {
      setIsGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary-50 via-white to-primary-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <Logo className='mx-auto' />
          <p className="text-gray-600 dark:text-gray-300 mt-4">
            Create your account
          </p>
        </div>

        <Card className="backdrop-blur-lg bg-white/80 dark:bg-gray-800/80 border border-white/20">
          <CardContent className="p-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="First Name"
                  placeholder="John"
                  {...register('firstName')}
                  error={errors.firstName?.message}
                />
                <Input
                  label="Last Name"
                  placeholder="Doe"
                  {...register('lastName')}
                  error={errors.lastName?.message}
                />
              </div>

              <Input
                label="Email"
                type="email"
                placeholder="Enter your email"
                {...register('email')}
                error={errors.email?.message}
              />

              <PasswordInput
                label="Password"
                placeholder="Create a password"
                {...register('password')}
                error={errors.password?.message}
              />

              {password && (
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Password requirements:
                  </p>
                  <div className="grid grid-cols-1 gap-1">
                    {passwordRequirements.map((req, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <CheckIcon className={`h-4 w-4 ${req.met ? 'text-green-500' : 'text-gray-300'}`} />
                        <span className={`text-sm ${req.met ? 'text-green-600 dark:text-green-400' : 'text-gray-500'}`}>
                          {req.text}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <PasswordInput
                label="Confirm Password"
                placeholder="Confirm your password"
                {...register('confirmPassword')}
                error={errors.confirmPassword?.message}
              />

              <div className="flex items-center">
                <input
                  id="agree-terms"
                  type="checkbox"
                  {...register('agreeTerms')}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <label htmlFor="agree-terms" className="ml-2 block text-sm text-gray-900 dark:text-gray-300">
                  I agree to the{' '}
                  <Link to="/terms" className="text-primary-600 hover:text-primary-500">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link to="/privacy" className="text-primary-600 hover:text-primary-500">
                    Privacy Policy
                  </Link>
                </label>
              </div>
              {errors.agreeTerms && (
                <p className="text-sm text-red-500">{errors.agreeTerms.message}</p>
              )}

              <Button
                type="submit"
                className="w-full"
                size="lg"
                disabled={isLoading || isGoogleLoading}
              >
                {isLoading ? 'Creating Account...' : 'Create Account'}
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
                {isGoogleLoading ? 'Signing up...' : 'Sign up with Google'}
              </Button>

              <div className="text-center">
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  Already have an account?{' '}
                  <Link
                    to="/login"
                    className="text-secondary-500 hover:text-secondary-600 font-medium"
                  >
                    Sign in
                  </Link>
                </span>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Features Preview */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            Join thousands of creators using SNIPPO
          </p>
          <div className="flex justify-center space-x-6 text-xs text-gray-400">
            <span>• AI-Powered Editing</span>
            <span>• Auto Captions</span>
            <span>• HD Export</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
