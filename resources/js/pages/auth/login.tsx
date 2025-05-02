import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import AuthLayout from '@/layouts/auth-layout';
import { Link, router, useForm } from '@inertiajs/react';
import { ArrowLeft, LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

interface LoginProps {
    canResetPassword?: boolean;
    status: string | null;
}

type LoginForm = {
    email: string;
    password: string;
    remember: boolean;
};

const Login = ({ canResetPassword, status }: LoginProps) => {
    const { data, setData, post, processing, errors, reset } = useForm<Required<LoginForm>>({
        email: '',
        password: '',
        remember: false,
    });
    const handleLogin: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <AuthLayout title="Login">
            <div className="w-full max-w-md">
                <Button variant="ghost" size="sm" className="mb-6" onClick={() => router.visit(route('home'))}>
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to Portfolio
                </Button>

                <Card>
                    <CardHeader className="space-y-1 text-center">
                        <CardTitle className="mb-2 text-2xl font-semibold">Login to Dashboard</CardTitle>
                        <CardDescription>Enter your credentials to access the dashboard</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {status && <div className="mb-2 text-center text-green-600">{status}</div>}
                        <form onSubmit={handleLogin} className="space-y-4">
                            <div className="space-y-2">
                                <label htmlFor="email" className="text-sm font-medium">
                                    Email Address
                                </label>
                                <Input
                                    id="email"
                                    type="email"
                                    autoFocus
                                    autoComplete="email"
                                    tabIndex={1}
                                    placeholder="Enter your email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    required
                                />
                                <InputError message={errors.email} className="mt-1" />
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <label htmlFor="password" className="text-sm font-medium">
                                        Password
                                    </label>
                                    {canResetPassword && (
                                        <Link href={route('password.request')} className="text-primary text-sm hover:underline">
                                            Forgot password?
                                        </Link>
                                    )}
                                </div>
                                <Input
                                    id="password"
                                    type="password"
                                    autoComplete="current-password"
                                    tabIndex={2}
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    placeholder="Enter your password"
                                    required
                                />
                                <InputError message={errors.password} className="mt-1" />
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id="remember"
                                        name="remember"
                                        checked={data.remember}
                                        onClick={() => setData('remember', !data.remember)}
                                        tabIndex={3}
                                    />
                                    <label htmlFor="remember" className="text-sm font-medium">
                                        Remember me
                                    </label>
                                </div>
                                <InputError message={errors.remember} className="mt-1" />
                            </div>
                            <Button type="submit" className="w-full" disabled={processing}>
                                {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                {processing ? `Logging in...` : 'Login'}
                            </Button>
                        </form>
                    </CardContent>
                    {/* <CardFooter className="border-t pt-4">
                        <p className="text-muted-foreground w-full text-center text-xs">
                            For demo: Use email "admin@example.com" and password "password"
                        </p>
                    </CardFooter> */}
                </Card>
            </div>
        </AuthLayout>
    );
};

export default Login;
