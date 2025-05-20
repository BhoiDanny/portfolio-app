import Footer from '@/components/portfolio/Footer';
import Navbar from '@/components/portfolio/Navbar';
import { cn } from '@/lib/utils';
import { Head } from '@inertiajs/react';
import { ReactNode } from 'react';

interface HomeLayoutProps {
    title?: string;
    description?: string;
    className?: string;
    children: ReactNode;
}

export default function HomeLayout({ title, description, className, children, ...props }: HomeLayoutProps) {
    return (
        <>
            <Head>
                <title>{title || 'Home'}</title>
                <meta name="description" content={description || ''} />
            </Head>
            <Navbar />
            <main className={cn('', className)} {...props}>
                {children}
            </main>
            <Footer />
        </>
    );
}
