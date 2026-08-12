import ShopLayout from '@/Layouts/ShopLayout';
import { Head, Link, usePage } from '@inertiajs/react';

export default function CheckoutStart() {
    const { auth } = usePage().props;
    const loginHref = auth.user
        ? route('checkout.index')
        : route('login', { to: 'checkout' });

    return (
        <ShopLayout hideTitle>
            <Head title="購入手続きへ" />

            <div className="mx-auto max-w-xl">
                <div className="flex items-center justify-between border-b border-stone-300 pb-4">
                    <h1 className="text-lg text-stone-900">購入手続きへ</h1>
                    <Link
                        href={route('cart.index')}
                        className="flex h-8 w-8 items-center justify-center text-2xl leading-none text-stone-500 hover:text-stone-800"
                        aria-label="閉じる"
                    >
                        ×
                    </Link>
                </div>

                <div className="mt-16 space-y-4">
                    <Link
                        href={loginHref}
                        className="flex w-full items-center justify-center rounded-full bg-bloom-500 px-6 py-3.5 text-sm font-medium text-white shadow-sm transition hover:bg-bloom-600"
                    >
                        ログインして購入手続き
                    </Link>

                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        <Link
                            href={route('register', { to: 'checkout' })}
                            className="flex items-center justify-center rounded-full border border-bloom-500 bg-white px-4 py-3 text-center text-sm font-medium text-bloom-600 transition hover:bg-bloom-50"
                        >
                            新規会員登録して購入手続き
                        </Link>
                        <Link
                            href={route('checkout.index')}
                            className="flex items-center justify-center rounded-full border border-bloom-500 bg-white px-4 py-3 text-center text-sm font-medium text-bloom-600 transition hover:bg-bloom-50"
                        >
                            ログインせずに購入手続き
                        </Link>
                    </div>
                </div>
            </div>
        </ShopLayout>
    );
}
