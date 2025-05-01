import { SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';

export default function Home() {
    const { quote } = usePage<SharedData>().props;
    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <div className="text-center">
                <h1 className="mb-4 text-4xl font-bold">Welcome to my Portfolio App</h1>
                <p className="text-xl text-gray-600">
                    {quote.message} - <strong>{quote.author}</strong>
                </p>
                <Link href={route('login')} className="mt-4 text-xl text-blue-400">
                    Login Page
                </Link>
            </div>
        </div>
    );
}
