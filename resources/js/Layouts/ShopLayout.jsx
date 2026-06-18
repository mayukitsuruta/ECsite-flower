import FlashMessage from '@/Components/FlashMessage';
import { Link, usePage } from '@inertiajs/react';

export default function ShopLayout({ children, title, wide = false, hideTitle = false }) {
    const { auth, cartCount, shop } = usePage().props;
    const mainClass = wide ? 'mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8' : 'mx-auto max-w-6xl px-4 py-8 sm:px-6';

    return (
        <div className="min-h-screen bg-white">
            <header className="sticky top-0 z-40 border-b border-stone-200 bg-white/95 backdrop-blur">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
                    <Link href={route('home')} className="group">
                        <p className="font-serif text-xl tracking-wide text-stone-900 group-hover:text-bloom-700">
                            {shop?.name ?? '想い束'}
                        </p>
                        <p className="hidden text-xs text-stone-400 sm:block">Omoi Bloom</p>
                    </Link>

                    <nav className="flex items-center gap-1 text-sm sm:gap-4">
                        <NavLink href={route('flowers.index')}>Shop</NavLink>
                        <NavLink href={route('bouquet.builder')}>花束を作る</NavLink>
                        <NavLink href={route('cart.index')} className="relative">
                            カート
                            {cartCount > 0 && (
                                <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-bloom-600 text-xs text-white">
                                    {cartCount}
                                </span>
                            )}
                        </NavLink>
                        {auth.user ? (
                            <>
                                <NavLink href={route('orders.index')}>注文履歴</NavLink>
                                <Link
                                    href={route('logout')}
                                    method="post"
                                    as="button"
                                    className="hidden text-stone-600 hover:text-stone-900 sm:inline"
                                >
                                    ログアウト
                                </Link>
                            </>
                        ) : (
                            <>
                                <NavLink href={route('login')}>ログイン</NavLink>
                                <Link
                                    href={route('register')}
                                    className="hidden rounded-full bg-stone-900 px-4 py-1.5 text-xs text-white sm:inline-flex"
                                >
                                    会員登録
                                </Link>
                            </>
                        )}
                    </nav>
                </div>
            </header>

            {title && !hideTitle && (
                <div className="border-b border-stone-200 bg-white">
                    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                        <h1 className="font-serif text-2xl text-stone-900 sm:text-3xl">{title}</h1>
                    </div>
                </div>
            )}

            <main className={mainClass}>{children}</main>

            <footer className="mt-20 border-t border-stone-200 bg-stone-50">
                <p className="py-12 text-center font-serif text-3xl tracking-wide text-stone-300 sm:text-4xl">
                    omoibloom.jp
                </p>
                <div className="mx-auto grid max-w-7xl gap-10 px-4 pb-12 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
                    <div>
                        <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-800">
                            店舗
                        </h4>
                        <p className="mt-3 text-sm leading-relaxed text-stone-600">
                            想い束 渋谷店
                            <br />
                            東京都渋谷区神南1-1-1
                        </p>
                    </div>
                    <div>
                        <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-800">
                            アカウント
                        </h4>
                        <ul className="mt-3 space-y-2 text-sm text-stone-600">
                            <li>
                                <Link href={route('login')} className="hover:text-bloom-700">
                                    ログイン
                                </Link>
                            </li>
                            <li>
                                <Link href={route('register')} className="hover:text-bloom-700">
                                    会員登録
                                </Link>
                            </li>
                            <li>
                                <Link href={route('orders.index')} className="hover:text-bloom-700">
                                    注文履歴
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-800">
                            ヘルプ
                        </h4>
                        <ul className="mt-3 space-y-2 text-sm text-stone-600">
                            <li>店舗受け取りについて</li>
                            <li>配送について</li>
                            <li>お問い合わせ</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-800">
                            Newsletter
                        </h4>
                        <p className="mt-3 text-sm text-stone-600">季節の花のお知らせをお届け</p>
                        <div className="mt-3 flex gap-2">
                            <input
                                type="email"
                                placeholder="メールアドレス"
                                className="flex-1 rounded border-stone-300 text-sm"
                            />
                            <button type="button" className="rounded bg-stone-800 px-3 py-1.5 text-xs text-white">
                                登録
                            </button>
                        </div>
                    </div>
                </div>
                <p className="border-t border-stone-200 py-4 text-center text-xs text-stone-400">
                    © {new Date().getFullYear()} {shop?.name}
                </p>
            </footer>

            <a
                href="#"
                className="fixed bottom-6 right-6 z-50 rounded-full bg-bloom-700 px-5 py-3 text-sm font-medium text-white shadow-lg transition hover:bg-bloom-800"
            >
                Chat
            </a>

            <FlashMessage />
        </div>
    );
}

function NavLink({ href, children, className = '' }) {
    return (
        <Link
            href={href}
            className={`px-2 py-1.5 text-stone-700 transition hover:text-stone-900 ${className}`}
        >
            {children}
        </Link>
    );
}
