import { NavLink } from 'react-router-dom';
import {
  LogoIcon,
  DashboardIcon,
  PhonicsIcon,
  SpeechIcon,
  WritingIcon,
  SettingsIcon,
} from './Icons';

function Navbar() {
  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-2">
            <LogoIcon className="text-white" size={32} />
            <span className="font-bold text-xl">Hooked On Phonetics</span>
          </div>
          <div className="hidden md:flex space-x-6">
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                isActive
                  ? 'font-bold border-b-2 border-white flex items-center'
                  : 'hover:text-blue-200 flex items-center'
              }
            >
              <DashboardIcon className="mr-1" size={20} />
              Dashboard
            </NavLink>
            <NavLink
              to="/phonics"
              className={({ isActive }) =>
                isActive
                  ? 'font-bold border-b-2 border-white flex items-center'
                  : 'hover:text-blue-200 flex items-center'
              }
            >
              <PhonicsIcon className="mr-1" size={20} />
              Phonics
            </NavLink>
            <NavLink
              to="/speech"
              className={({ isActive }) =>
                isActive
                  ? 'font-bold border-b-2 border-white flex items-center'
                  : 'hover:text-blue-200 flex items-center'
              }
            >
              <SpeechIcon className="mr-1" size={20} />
              Speech
            </NavLink>
            <NavLink
              to="/writing"
              className={({ isActive }) =>
                isActive
                  ? 'font-bold border-b-2 border-white flex items-center'
                  : 'hover:text-blue-200 flex items-center'
              }
            >
              <WritingIcon className="mr-1" size={20} />
              Writing
            </NavLink>
            <NavLink
              to="/settings"
              className={({ isActive }) =>
                isActive
                  ? 'font-bold border-b-2 border-white flex items-center'
                  : 'hover:text-blue-200 flex items-center'
              }
            >
              <SettingsIcon className="mr-1" size={20} />
              Settings
            </NavLink>
          </div>
          <div className="md:hidden">
            {/* Mobile menu button - to be implemented */}
            <button className="text-white focus:outline-none">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
