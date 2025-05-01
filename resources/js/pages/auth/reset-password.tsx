import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import AuthLayout from '@/layouts/auth-layout';
import { useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

interface ResetPasswordProps {
    token: string;
    email: string;
}

type ResetPasswordForm = {
    token: string;
    email: string;
    password: string;
    password_confirmation: string;
};

const ResetPassword = ({ token, email }: ResetPasswordProps) => {
    const { data, setData, post, processing, errors, reset } = useForm<Required<ResetPasswordForm>>({
        token,
        email,
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('password.store'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <AuthLayout title="Reset Password">
            <div className="w-full max-w-md">
                {/* <Button variant="ghost" size="sm" className="mb-6" onClick={() => {}}>
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Portfolio
                    </Button> */}

                <Card>
                    <CardHeader className="space-y-1 text-center">
                        <CardTitle className="text-2xl font-medium">Reset Password</CardTitle>
                        <CardDescription>Please eneter your new password below</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={submit} className="space-y-4">
                            <div className="space-y-2">
                                <label htmlFor="email" className="text-sm font-medium">
                                    Email Address
                                </label>
                                <Input
                                    id="email"
                                    type="email"
                                    name="email"
                                    autoComplete="email"
                                    placeholder="Enter your email"
                                    value={data.email}
                                    readOnly
                                    onChange={(e) => setData('email', e.target.value)}
                                />
                                <InputError message={errors.email} />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="password" className="text-sm font-medium">
                                    Password
                                </label>
                                <Input
                                    id="password"
                                    type="password"
                                    name="password"
                                    autoComplete="new-password"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    placeholder="Enter your password"
                                    autoFocus
                                />
                                <InputError message={errors.password} />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="password_confirmation" className="text-sm font-medium">
                                    Confirm Password
                                </label>
                                <Input
                                    id="password_confirmation"
                                    type="password"
                                    name="password_confirmation"
                                    autoComplete="new-password"
                                    value={data.password_confirmation}
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                    placeholder="Confirm your password"
                                    autoFocus
                                />
                                <InputError message={errors.password_confirmation} />
                            </div>

                            <Button type="submit" className="w-full" disabled={processing}>
                                {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                Reset password
                            </Button>
                        </form>
                    </CardContent>
                    {/* <CardFooter className="flex items-center justify-center">
                        <div className="text-muted-foreground flex items-center space-x-1 text-center text-sm">
                            <LucideArrowLeft className="h-4 w-4" />
                            <Link href={route('login')}>Return back to Login</Link>
                        </div>
                    </CardFooter> */}
                </Card>
            </div>
        </AuthLayout>
    );
};

export default ResetPassword;
