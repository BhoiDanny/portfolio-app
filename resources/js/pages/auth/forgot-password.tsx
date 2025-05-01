import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import AuthLayout from '@/layouts/auth-layout';
import { Link, useForm } from '@inertiajs/react';
import { LoaderCircle, LucideArrowLeft } from 'lucide-react';
import { FormEventHandler } from 'react';

const ForgotPassword = ({ status }: { status?: boolean }) => {
    const { data, setData, post, processing, errors } = useForm<Required<{ email: string }>>({
        email: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('password.email'));
    };

    return (
        <AuthLayout title="Forgot Password">
            <div className="w-full max-w-md">
                {/* <Button variant="ghost" size="sm" className="mb-6" onClick={() => {}}>
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Portfolio
                    </Button> */}

                <Card>
                    <CardHeader className="space-y-1 text-center">
                        <CardTitle className="text-2xl font-medium">Forgot Password</CardTitle>
                        <CardDescription>Enter your email to receive a password reset link</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {status && <div className="mb-2 text-center text-green-600">{status}</div>}
                        <form onSubmit={submit} className="space-y-4">
                            <div className="space-y-2">
                                <label htmlFor="email" className="text-sm font-medium">
                                    Email Address
                                </label>
                                <Input
                                    id="email"
                                    type="email"
                                    autoComplete="off"
                                    autoFocus
                                    placeholder="Enter your email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    required
                                />
                                <InputError message={errors.email} />
                            </div>

                            <Button type="submit" className="w-full" disabled={processing}>
                                {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                Email password reset link
                            </Button>
                        </form>
                    </CardContent>
                    <CardFooter className="flex items-center justify-center">
                        <div className="text-muted-foreground flex items-center space-x-1 text-center text-sm">
                            <LucideArrowLeft className="h-4 w-4" />
                            <Link href={route('login')}>Return back to Login</Link>
                        </div>
                    </CardFooter>
                </Card>
            </div>
        </AuthLayout>
    );
};

export default ForgotPassword;
