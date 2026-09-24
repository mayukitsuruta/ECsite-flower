import FlashMessage from "@/Components/FlashMessage";
import { Link, router, usePage } from "@inertiajs/react";
import { useState } from "react";

export default function ShopLayout({
    children,
    title,
    wide = false,
    hideTitle = false,
    home = false,
    hideSearch = false,
    flush = false,
}) {
    const { auth, cartCount, shop } = usePage().props;
    const [searchQuery, setSearchQuery] = useState("");
    const mainClass =
        home || flush
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
                        aria-label={`${shop?.name ?? "omoi Bouquet"} ホーム`}
                        className="group flex shrink-0 items-center"
                    >
                        <img
                            src="/images/logo.png"
                            alt={shop?.name ?? "omoi Bouquet"}
                            className="h-12 w-auto object-contain transition group-hover:opacity-80 sm:h-16"
                        />
                    </Link>

                    {!hideSearch && (
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
                    )}

                    <nav className="flex shrink-0 items-center gap-1 text-sm sm:gap-3">
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

            <ShopFooter shop={shop} />

            <FlashMessage />
        </div>
    );
}

function ShopFooter({ shop }) {
    const strip = (prefix) =>
        Array.from({ length: 10 }, (_, i) => (
            <img
                key={`${prefix}-${i}`}
                src="/images/footerue.png"
                alt=""
                className="h-12 w-auto shrink-0 sm:h-16"
            />
        ));

    return (
        <footer className="mt-16 bg-white">
            <div className="overflow-hidden" aria-hidden>
                <div className="marquee-track flex w-max">
                    <div className="flex shrink-0 items-center">{strip("a")}</div>
                    <div className="flex shrink-0 items-center">{strip("b")}</div>
                </div>
            </div>

            <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between">
                    <div className="max-w-sm">
                        <p className="font-serif text-3xl text-stone-800 sm:text-4xl">
                            Omoi Bouquet
                        </p>
                        <p className="mt-4 text-sm leading-relaxed text-stone-500">
                            Feelings curated, defined by posture.
                            <br />
                            Where unique bouquets speak louder than words,
                            <br />
                            shaping the thoughtful gift of contemporary life.
                        </p>
                    </div>

                    <div className="flex gap-16 text-sm text-stone-600">
                        <div>
                            <h4 className="mb-3 text-stone-800">アカウント</h4>
                            <ul className="space-y-2">
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
                            <h4 className="mb-3 text-stone-800">ヘルプ</h4>
                            <ul className="space-y-2">
                                <li>店舗受け取りについて</li>
                                <li>配送について</li>
                                <li>お問い合わせ</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <p className="mt-16 text-xs text-stone-400">
                    © {new Date().getFullYear()} {shop?.name ?? "Omoi Bouquet"}
                </p>
            </div>
        </footer>
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
