import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { 
  VideoCameraIcon, 
  CheckCircleIcon,
  ArrowPathIcon,
  ClockIcon
} from '@heroicons/react/24/outline';
import { Button, Input, Card, CardContent } from '../components/ui';
import { Link, useSearchParams } from 'react-router-dom';
import { verifyEmailSchema, type VerifyEmailFormData } from '../schemas/auth';

export function VerifyEmailPage() {
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email') || 'user@example.com';
  const [isVerified, setIsVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<VerifyEmailFormData>({
    resolver: zodResolver(verifyEmailSchema),
  });

  const code = watch('code', '');

  // Resend cooldown timer
  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  const onSubmit = async (data: VerifyEmailFormData) => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Email verified with code:', data.code);
      setIsVerified(true);
      setIsLoading(false);
    }, 1500);
  };

  const handleResendCode = async () => {
    setResendLoading(true);
    setResendCooldown(60); // 60 second cooldown
    
    // Simulate API call
    setTimeout(() => {
      console.log('Verification code resent to:', email);
      setResendLoading(false);
    }, 1000);
  };

  // Auto-format code input (add spaces for readability)
  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 6);
    setValue('code', value);
  };

  // Success state
  if (isVerified) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
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
                Email Verified!
              </h2>
              
              <p className="text-gray-600 dark:text-gray-300 mb-8">
                Your email has been successfully verified. You can now access all features of your account.
              </p>
              
              <Link to="/dashboard">
                <Button className="w-full">
                  Continue to Dashboard
                </Button>
              </Link>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-2 mb-4">
            <div className="p-3 bg-indigo-500 rounded-xl">
              <VideoCameraIcon className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              SNIPPO
            </h1>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Verify Your Email
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            We've sent a 6-digit code to:
          </p>
          <p className="font-medium text-gray-900 dark:text-white mt-1">
            {email}
          </p>
        </div>

        <Card className="backdrop-blur-lg bg-white/80 dark:bg-gray-800/80 border border-white/20">
          <CardContent className="p-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <Input
                  label="Verification Code"
                  type="text"
                  placeholder="Enter 6-digit code"
                  {...register('code')}
                  onChange={handleCodeChange}
                  error={errors.code?.message}
                  className="text-center text-2xl tracking-widest font-mono"
                  maxLength={6}
                />
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 text-center">
                  Enter the 6-digit code sent to your email
                </p>
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={isLoading || code.length !== 6}
              >
                {isLoading ? 'Verifying...' : 'Verify Email'}
              </Button>
            </form>

            {/* Resend Code */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                Didn't receive the code?
              </p>
              
              <Button
                variant="ghost"
                onClick={handleResendCode}
                disabled={resendLoading || resendCooldown > 0}
                className="text-primary-600 hover:text-primary-500"
              >
                {resendLoading ? (
                  <>
                    <ArrowPathIcon className="h-4 w-4 mr-2 animate-spin" />
                    Sending...
                  </>
                ) : resendCooldown > 0 ? (
                  <>
                    <ClockIcon className="h-4 w-4 mr-2" />
                    Resend in {resendCooldown}s
                  </>
                ) : (
                  <>
                    <ArrowPathIcon className="h-4 w-4 mr-2" />
                    Resend Code
                  </>
                )}
              </Button>
            </div>

            <div className="mt-6 text-center border-t border-gray-200 dark:border-gray-700 pt-6">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Wrong email address?{' '}
                <Link
                  to="/register"
                  className="text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300 transition-colors"
                >
                  Update your email
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Help Text */}
        <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>
            Having trouble?{' '}
            <Link
              to="/contact"
              className="text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300 transition-colors"
            >
              Contact support
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
