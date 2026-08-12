import InputError from '@/Components/InputError';
import ShopLayout from '@/Layouts/ShopLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <ShopLayout hideTitle>
            <Head title="新規会員登録" />

            <div className="mx-auto max-w-md">
                <div className="flex items-center justify-between border-b border-stone-300 pb-4">
                    <h1 className="text-lg text-stone-900">新規会員登録</h1>
                    <Link
                        href={route('checkout.start')}
                        className="flex h-8 w-8 items-center justify-center text-2xl leading-none text-stone-500 hover:text-stone-800"
                        aria-label="戻る"
                    >
                        ×
                    </Link>
                </div>

                <form onSubmit={submit} className="mt-10 space-y-5">
                    <div>
                        <label htmlFor="name" className="block text-sm text-stone-700">
                            お名前
                        </label>
                        <input
                            id="name"
                            type="text"
                            name="name"
                            value={data.name}
                            autoComplete="name"
                            autoFocus
                            onChange={(e) => setData('name', e.target.value)}
                            className="mt-1 w-full rounded-lg border-stone-200 focus:border-bloom-500 focus:ring-bloom-500"
                            required
                        />
                        <InputError message={errors.name} className="mt-2" />
                    </div>

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
                            autoComplete="new-password"
                            onChange={(e) => setData('password', e.target.value)}
                            className="mt-1 w-full rounded-lg border-stone-200 focus:border-bloom-500 focus:ring-bloom-500"
                            required
                        />
                        <InputError message={errors.password} className="mt-2" />
                    </div>

                    <div>
                        <label
                            htmlFor="password_confirmation"
                            className="block text-sm text-stone-700"
                        >
                            パスワード（確認）
                        </label>
                        <input
                            id="password_confirmation"
                            type="password"
                            name="password_confirmation"
                            value={data.password_confirmation}
                            autoComplete="new-password"
                            onChange={(e) =>
                                setData('password_confirmation', e.target.value)
                            }
                            className="mt-1 w-full rounded-lg border-stone-200 focus:border-bloom-500 focus:ring-bloom-500"
                            required
                        />
                        <InputError
                            message={errors.password_confirmation}
                            className="mt-2"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={processing}
                        className="flex w-full items-center justify-center rounded-full bg-bloom-500 px-6 py-3.5 text-sm font-medium text-white shadow-sm transition hover:bg-bloom-600 disabled:opacity-50"
                    >
                        新規会員登録して購入手続き
                    </button>

                    <div className="pt-2 text-center text-sm">
                        <Link
                            href={route('login', { to: 'checkout' })}
                            className="text-bloom-600 underline hover:text-bloom-700"
                        >
                            すでに会員の方はこちら
                        </Link>
                    </div>
                </form>
            </div>
        </ShopLayout>
    );
}
