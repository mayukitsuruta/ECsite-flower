import FlashMessage from "@/Components/FlashMessage";
import { Link, router, usePage } from "@inertiajs/react";
import { useState } from "react";

export default function ShopLayout({
    children,
    title,
    wide = false,
    hideTitle = false,
    home = false,
}) {
    const { auth, cartCount, shop } = usePage().props;
    const [searchQuery, setSearchQuery] = useState("");
    const mainClass = home
        ? ""
        : wide
          ? "mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8"
          : "mx-auto max-w-6xl px-4 py-8 sm:px-6";

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(
            route("flowers.index"),
            searchQuery.trim() ? { search: searchQuery.trim() } : {},
        );
    };

    return (
        <div className={`min-h-screen ${home ? "bg-cream" : "bg-white"}`}>
            <header
                className={`sticky top-0 z-40 border-b ${
                    home
                        ? "border-cream-200 bg-cream/95 backdrop-blur"
                        : "border-stone-200 bg-white/95 backdrop-blur"
                }`}
            >
                <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
                    <Link
                        href={route("home")}
                        className="group flex shrink-0 items-center gap-3"
                    >
                        {home && (
                            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-bloom-600 text-lg text-white shadow-sm">
                                🌸
                            </span>
                        )}
                        <div>
                            <p className="font-serif text-xl tracking-wide text-stone-900 group-hover:text-bloom-700">
                                {shop?.name ?? "想い束"}
                            </p>
                            <p className="hidden text-xs text-stone-400 sm:block">
                                {home ? "flower shop" : "flower shop"}
                            </p>
                        </div>
                    </Link>

                    <form
                        onSubmit={handleSearch}
                        className="order-last flex w-full min-w-0 flex-1 items-center gap-2 sm:order-none sm:mx-4 sm:max-w-md lg:max-w-lg"
                    >
                        <input
                            type="search"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="花の名前・花言葉で検索…"
                            className="w-full rounded-full border-stone-300 bg-white px-4 py-2 text-sm shadow-sm focus:border-bloom-400 focus:ring-bloom-400"
                        />
                        <button
                            type="submit"
                            className="shrink-0 rounded-full bg-bloom-600 px-4 py-2 text-xs font-medium text-white transition hover:bg-bloom-700 sm:text-sm"
                        >
                            細かく検索
                        </button>
                    </form>

                    <nav className="flex shrink-0 items-center gap-1 text-sm sm:gap-3">
                        <NavLink href={route("flowers.index")} home={home}>
                            花束一覧
                        </NavLink>
                        <NavLink
                            href={route("bouquet.builder")}
                            home={home}
                            className="hidden sm:inline-flex"
                        >
                            花束を作る
                        </NavLink>
                        <Link
                            href={route("cart.index")}
                            aria-label={`カート${cartCount > 0 ? `（${cartCount}点）` : ""}`}
                            className="relative flex items-center justify-center rounded-full p-1.5 transition hover:bg-bloom-50"
                        >
                            <img
                                src="/images/cart.png"
                                alt=""
                                className="h-8 w-8 object-contain sm:h-9 sm:w-9"
                            />
                            {cartCount > 0 && (
                                <span className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-bloom-600 text-xs font-medium text-white">
                                    {cartCount}
                                </span>
                            )}
                        </Link>
                        {auth.user ? (
                            <>
                                <NavLink
                                    href={route("orders.index")}
                                    home={home}
                                    className="hidden sm:inline-flex"
                                >
                                    注文履歴
                                </NavLink>
                                <Link
                                    href={route("logout")}
                                    method="post"
                                    as="button"
                                    className="hidden text-stone-600 hover:text-stone-900 sm:inline"
                                >
                                    ログアウト
                                </Link>
                            </>
                        ) : (
                            <>
                                <NavLink
                                    href={route("login")}
                                    home={home}
                                    className="hidden sm:inline-flex"
                                >
                                    ログイン
                                </NavLink>
                                <Link
                                    href={route("register")}
                                    className={`hidden rounded-full px-4 py-1.5 text-xs sm:inline-flex ${
                                        home
                                            ? "border border-stone-300 bg-white text-stone-800 hover:bg-stone-50"
                                            : "bg-stone-900 text-white"
                                    }`}
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
                        <h1 className="font-serif text-2xl text-stone-900 sm:text-3xl">
                            {title}
                        </h1>
                    </div>
                </div>
            )}

            <main className={mainClass}>{children}</main>

            {!home && (
                <footer className="mt-20 border-t border-stone-200 bg-stone-50">
                    <p className="py-12 text-center font-serif text-3xl tracking-wide text-stone-300 sm:text-4xl">
                        omoi bouquet.jp
                    </p>
                    <FooterGrid />
                    <p className="border-t border-stone-200 py-4 text-center text-xs text-stone-400">
                        © {new Date().getFullYear()} {shop?.name}
                    </p>
                </footer>
            )}

            {home && (
                <footer className="border-t border-cream-200 bg-cream py-6">
                    <p className="text-center text-xs text-stone-400">
                        © {new Date().getFullYear()} {shop?.name ?? "想い束"}
                    </p>
                </footer>
            )}

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

function FooterGrid() {
    return (
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
                        <Link
                            href={route("login")}
                            className="hover:text-bloom-700"
                        >
                            ログイン
                        </Link>
                    </li>
                    <li>
                        <Link
                            href={route("register")}
                            className="hover:text-bloom-700"
                        >
                            会員登録
                        </Link>
                    </li>
                    <li>
                        <Link
                            href={route("orders.index")}
                            className="hover:text-bloom-700"
                        >
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
                <p className="mt-3 text-sm text-stone-600">
                    季節の花のお知らせをお届け
                </p>
                <div className="mt-3 flex gap-2">
                    <input
                        type="email"
                        placeholder="メールアドレス"
                        className="flex-1 rounded border-stone-300 text-sm"
                    />
                    <button
                        type="button"
                        className="rounded bg-stone-800 px-3 py-1.5 text-xs text-white"
                    >
                        登録
                    </button>
                </div>
            </div>
        </div>
    );
}

function NavLink({ href, children, className = "", home = false }) {
    return (
        <Link
            href={href}
            className={`px-2 py-1.5 transition ${
                home
                    ? "text-stone-700 hover:text-bloom-700"
                    : "text-stone-700 hover:text-stone-900"
            } ${className}`}
        >
            {children}
        </Link>
    );
}
