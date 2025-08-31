import { motion } from 'framer-motion';
import { 
  SunIcon, 
  MoonIcon, 
  VideoCameraIcon,
  Bars3Icon,
  XMarkIcon,
  UserIcon,
  Cog6ToothIcon,
  CreditCardIcon,
  QuestionMarkCircleIcon,
  ArrowRightStartOnRectangleIcon,
  ChevronDownIcon
} from '@heroicons/react/24/outline';
import { useTheme } from '../../hooks/useTheme';
import { useAuth } from '../../hooks/useAuth';
import { Button, Dropdown, DropdownItem, DropdownSeparator } from '../ui';
import { cn } from '../../utils';
import toast from 'react-hot-toast';
import Logo from '../logo';

interface HeaderProps {
  onMenuToggle?: () => void;
  showMenuButton?: boolean;
}

export function Header({ onMenuToggle, showMenuButton = false }: HeaderProps) {
  const { theme, toggleTheme } = useTheme();
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success('Successfully signed out');
    } catch (error) {
      toast.error('Failed to sign out');
    }
  };

  // Get user initials for avatar
  const getUserInitials = (name: string | null | undefined): string => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const userInitials = getUserInitials(user?.displayName);
  const displayName = user?.displayName || 'User';
  const email = user?.email || 'user@snippo.com';

  // ...existing code...

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700"
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Left section */}
          <div className="flex items-center space-x-4">
            {showMenuButton && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onMenuToggle}
                className="lg:hidden -ml-3"
              >
                <Bars3Icon className="h-5 w-5" />
              </Button>
            )}
            <Logo />
          </div>

          {/* Right section */}
          <div className="flex items-center space-x-4">
            {/* Theme toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="p-2"
            >
              {theme === 'light' ? (
                <MoonIcon className="h-5 w-5" />
              ) : (
                <SunIcon className="h-5 w-5" />
              )}
            </Button>

            {/* User menu dropdown */}
            <Dropdown
              trigger={
                <div className="flex items-center space-x-2 cursor-pointer hover:opacity-80 transition-opacity">
                  <div className="h-8 w-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center shadow-md">
                    {user?.photoURL ? (
                      <img 
                        src={user.photoURL} 
                        alt={displayName}
                        className="h-8 w-8 rounded-full object-cover"
                      />
                    ) : (
                      <span className="text-white text-sm font-medium">{userInitials}</span>
                    )}
                  </div>
                  <div className="hidden sm:block">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">{displayName}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{email}</div>
                  </div>
                  <ChevronDownIcon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                </div>
              }
            >
              {/* User Info Header */}
              <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-600">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
                    {user?.photoURL ? (
                      <img 
                        src={user.photoURL} 
                        alt={displayName}
                        className="h-10 w-10 rounded-full object-cover"
                      />
                    ) : (
                      <span className="text-white font-medium">{userInitials}</span>
                    )}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900 dark:text-white">{displayName}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{email}</div>
                  </div>
                </div>
              </div>

              {/* Menu Items */}
              <DropdownItem 
                icon={<UserIcon className="h-4 w-4" />}
                onClick={() => console.log('Profile clicked')}
              >
                My Profile
              </DropdownItem>
              <DropdownItem 
                icon={<Cog6ToothIcon className="h-4 w-4" />}
                onClick={() => console.log('Settings clicked')}
              >
                Account Settings
              </DropdownItem>
              <DropdownItem 
                icon={<CreditCardIcon className="h-4 w-4" />}
                onClick={() => console.log('Billing clicked')}
              >
                Billing & Plans
              </DropdownItem>
              <DropdownSeparator />
              <DropdownItem 
                icon={<QuestionMarkCircleIcon className="h-4 w-4" />}
                onClick={() => console.log('Help clicked')}
              >
                Help & Support
              </DropdownItem>
              <DropdownSeparator />
              <DropdownItem 
                icon={<ArrowRightStartOnRectangleIcon className="h-4 w-4" />}
                onClick={handleSignOut}
                destructive
              >
                Sign Out
              </DropdownItem>
            </Dropdown>
          </div>
        </div>
      </div>
    </motion.header>
  );
}

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
  currentPath?: string;
}

export function Sidebar({ isOpen = true, onClose, currentPath = '/' }: SidebarProps) {
  const navigation = [
    { name: 'Home', href: '/', icon: '🏠' },
    { name: 'Dashboard', href: '/dashboard', icon: '📊' },
    { name: 'Upload', href: '/upload', icon: '📤' },
    { name: 'Projects', href: '/projects', icon: '📁' },
    { name: 'AI Generator', href: '/ai-generator', icon: '🤖' },
    { name: 'Settings', href: '/settings', icon: '⚙️' },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <motion.div
        initial={{ x: -300 }}
        animate={{ x: isOpen ? 0 : -300 }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className={cn(
          'fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 lg:relative lg:translate-x-0',
          !isOpen && 'lg:w-0 lg:overflow-hidden'
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 lg:hidden">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Menu
          </h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <XMarkIcon className="h-5 w-5" />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className={cn(
                'flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                currentPath === item.href
                  ? 'bg-primary-500 text-white'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
              )}
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.name}</span>
            </a>
          ))}
        </nav>

        {/* Footer */}
        <div className="absolute bottom-4 left-4 right-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
            SNIPPO v2.0
          </p>
        </div>
      </motion.div>
    </>
  );
}
