import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useEffect } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';

const NotFound = () => {
    // const location = useLocation();
    // const navigate = useNavigate();

    useEffect(() => {
        console.error('404 Error: User attempted to access non-existent route:', location.pathname);
    }, [location.pathname]);

    return (
        <div className="bg-background flex min-h-screen items-center justify-center">
            <div className="max-w-md space-y-6 px-6 text-center">
                <h1 className="text-primary text-6xl font-bold">404</h1>
                <p className="font-display mb-4 text-2xl font-semibold">Page not found</p>
                <p className="text-foreground/70 mb-8">The page you are looking for doesn't exist or has been moved.</p>
                <Button onClick={() => {}} className="mx-auto">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Return to Home
                </Button>
            </div>
        </div>
    );
};

export default NotFound;
