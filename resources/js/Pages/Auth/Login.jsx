import InputError from '@/Components/InputError';
import ShopLayout from '@/Layouts/ShopLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <ShopLayout hideTitle>
            <Head title="ログイン" />

            <div className="mx-auto max-w-md">
                <div className="flex items-center justify-between border-b border-stone-300 pb-4">
                    <h1 className="text-lg text-stone-900">ログイン</h1>
                    <Link
                        href={route('checkout.start')}
                        className="flex h-8 w-8 items-center justify-center text-2xl leading-none text-stone-500 hover:text-stone-800"
                        aria-label="戻る"
                    >
                        ×
                    </Link>
                </div>

                {status && (
                    <p className="mt-4 text-sm font-medium text-green-600">{status}</p>
                )}

                <form onSubmit={submit} className="mt-10 space-y-5">
                    <div>
                        <label htmlFor="email" className="block text-sm text-stone-700">
                            メールアドレス
                        </label>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            autoComplete="username"
                            autoFocus
                            onChange={(e) => setData('email', e.target.value)}
                            className="mt-1 w-full rounded-lg border-stone-200 focus:border-bloom-500 focus:ring-bloom-500"
                            required
                        />
                        <InputError message={errors.email} className="mt-2" />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm text-stone-700">
                            パスワード
                        </label>
                        <input
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            autoComplete="current-password"
                            onChange={(e) => setData('password', e.target.value)}
                            className="mt-1 w-full rounded-lg border-stone-200 focus:border-bloom-500 focus:ring-bloom-500"
                            required
                        />
                        <InputError message={errors.password} className="mt-2" />
                    </div>

                    <label className="flex items-center gap-2 text-sm text-stone-600">
                        <input
                            type="checkbox"
                            name="remember"
                            checked={data.remember}
                            onChange={(e) => setData('remember', e.target.checked)}
                            className="rounded border-stone-300 text-bloom-600 focus:ring-bloom-500"
                        />
                        ログイン状態を保持する
                    </label>

                    <button
                        type="submit"
                        disabled={processing}
                        className="flex w-full items-center justify-center rounded-full bg-bloom-500 px-6 py-3.5 text-sm font-medium text-white shadow-sm transition hover:bg-bloom-600 disabled:opacity-50"
                    >
                        ログインして購入手続き
                    </button>

                    <div className="flex flex-col items-center gap-3 pt-2 text-sm">
                        {canResetPassword && (
                            <Link
                                href={route('password.request')}
                                className="text-stone-500 underline hover:text-stone-800"
                            >
                                パスワードをお忘れの方
                            </Link>
                        )}
                        <Link
                            href={route('register', { to: 'checkout' })}
                            className="text-bloom-600 underline hover:text-bloom-700"
                        >
                            新規会員登録はこちら
                        </Link>
                    </div>
                </form>
            </div>
        </ShopLayout>
    );
}
