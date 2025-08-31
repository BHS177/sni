import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { 
  VideoCameraIcon, 
  ArrowLeftIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';
import { Button, Input, Card, CardContent } from '../components/ui';
import { Link } from 'react-router-dom';
import { forgotPasswordSchema, type ForgotPasswordFormData } from '../schemas/auth';
import { useAuth } from '../hooks/useAuth';
import toast from 'react-hot-toast';

export function ForgotPasswordPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const { resetPassword, error, clearError } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    try {
      setIsLoading(true);
      clearError();
      
      await resetPassword(data.email);
      
      toast.success('Password reset email sent!');
      setIsSubmitted(true);
    } catch (err) {
      toast.error(error || 'Failed to send reset email');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md"
        >
          <Card className="backdrop-blur-lg bg-white/80 dark:bg-gray-800/80 border border-white/20">
            <CardContent className="p-8 text-center">
              <div className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-6">
                <CheckCircleIcon className="h-8 w-8 text-green-500" />
              </div>
              
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Check Your Email
              </h2>
              
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                We've sent a password reset link to:
              </p>
              
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 mb-6">
                <p className="font-medium text-gray-900 dark:text-white">
                  {getValues('email')}
                </p>
              </div>
              
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">
                If you don't see the email, check your spam folder or try again.
              </p>
              
              <div className="space-y-4">
                <Button
                  onClick={() => setIsSubmitted(false)}
                  variant="outline"
                  className="w-full"
                >
                  Send Another Email
                </Button>
                
                <Link to="/login">
                  <Button variant="ghost" className="w-full">
                    <ArrowLeftIcon className="h-4 w-4 mr-2" />
                    Back to Login
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-2 mb-4">
            <div className="p-3 bg-blue-500 rounded-xl">
              <VideoCameraIcon className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              SNIPPO
            </h1>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Forgot Your Password?
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Enter your email and we'll send you a reset link
          </p>
        </div>

        <Card className="backdrop-blur-lg bg-white/80 dark:bg-gray-800/80 border border-white/20">
          <CardContent className="p-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <Input
                  label="Email Address"
                  type="email"
                  placeholder="Enter your email"
                  {...register('email')}
                  error={errors.email?.message}
                />
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? 'Sending...' : 'Send Reset Link'}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <Link
                to="/login"
                className="inline-flex items-center text-sm text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300 transition-colors"
              >
                <ArrowLeftIcon className="h-4 w-4 mr-1" />
                Back to Login
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Help Text */}
        <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>
            Remember your password?{' '}
            <Link
              to="/login"
              className="text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300 transition-colors"
            >
              Sign in
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
