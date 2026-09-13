import { NavLink } from "react-router-dom"
import { ThemeToggle } from "./ThemeToggle";

interface NavigationItem {
  name: string;
  href: string;
}

const navigation: NavigationItem[] = [
    { name: 'Home', href: '/' },
    { name: 'Binary translate', href: '/binarytranslate' },
    { name: 'Services', href: '/services' },
    { name: 'Contact', href: '/contact' },
];

function Navbar() {
    const linkStyles = ({ isActive }: { isActive: boolean }) =>
        `px-3 py-2 rounded-md text-sm font-medium transition-colors ${ isActive ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
    }`;

  return (
    <header>
        <nav className="shadow-lg w-full top-0 z-50 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="hidden md:flex space-x-4">
                        <ThemeToggle />
                        {navigation.map((item) => (
                            <NavLink key={item.name} to={item.href} className={linkStyles}>
                                {item.name}
                            </NavLink>
                        ))}
                    </div>
                </div>
            </div>
        </nav>
    </header>
  );
};

export default Navbar;