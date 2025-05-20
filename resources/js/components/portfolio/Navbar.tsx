import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';
import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';

const navItems = [
    { label: 'Home', href: '#hero' },
    { label: 'About', href: '#about' },
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'Skills', href: '#skills' },
    { label: 'Experience', href: '#experience' },
    { label: 'Contact', href: '#contact' },
];

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header
            className={`fixed z-50 w-full transition-all duration-300 ${
                isScrolled ? 'bg-white/90 py-8 shadow-md backdrop-blur-md' : 'bg-transparent py-5'
            }`}
        >
            <div className="container mx-auto flex items-center justify-between px-4">
                <a href="#hero" className="text-primary text-xl font-bold">
                    Portfolio
                </a>

                {/* Desktop Navigation */}
                <nav className="hidden space-x-8 md:flex">
                    {navItems.map((item) => (
                        <a key={item.href} href={item.href} className="hover:text-primary text-foreground/80 hover:text-foreground transition-colors">
                            {item.label}
                        </a>
                    ))}
                    <Button asChild variant="default">
                        <Link href="/login" target="_blank">
                            Login
                        </Link>
                    </Button>
                </nav>

                {/* Mobile Menu Button */}
                <button className="text-foreground md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle menu">
                    {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Navigation */}
            {mobileMenuOpen && (
                <nav className="bg-background flex flex-col space-y-4 border-t px-4 py-4 md:hidden">
                    {navItems.map((item) => (
                        <a
                            key={item.href}
                            href={item.href}
                            className="hover:text-primary py-2 transition-colors"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            {item.label}
                        </a>
                    ))}
                    <Button asChild variant="default" className="mt-2">
                        <a href="/login">Login</a>
                    </Button>
                </nav>
            )}
        </header>
    );
};

export default Navbar;
