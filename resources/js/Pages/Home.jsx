import FlowerCard from "@/Components/FlowerCard";
import ShopLayout from "@/Layouts/ShopLayout";
import { Head, Link, router } from "@inertiajs/react";
import { useState } from "react";

const HERO_IMAGE =
    "https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=1200&q=80";
const SHOP_INTERIOR =
    "https://images.unsplash.com/photo-1563241522-8f783137d9f2?w=800&q=80";

const NEWS_ITEMS = [
    {
        date: "2026.07.01",
        title: "夏の新作花束、取り扱い開始しました",
    },
    {
        date: "2026.06.15",
        title: "店舗受け取りの営業時間変更のお知らせ",
    },
    {
        date: "2026.06.01",
        title: "母の日ギフト、ご好評につき再入荷しました",
    },
];

const QUICK_CATEGORIES = [
    { label: "バラ", href: { category: "rose" }, emoji: "🌹" },
    { label: "チューリップ", href: { category: "tulip" }, emoji: "🌷" },
    { label: "季節の花", href: { seasonal: 1 }, emoji: "🌸" },
    { label: "ピンク", href: { color: "ピンク" }, emoji: "💗" },
    { label: "すべて", href: {}, emoji: "🌿" },
];

export default function Home({ seasonalFlowers, shopFlowers }) {
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(
            route("flowers.index"),
            searchQuery.trim() ? { search: searchQuery.trim() } : {},
        );
    };

    return (
        <ShopLayout home>
            <Head title="トップ" />

            {/* Hero */}
            <section className="relative bg-cream px-4 pb-16 pt-6 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-4xl">
                    <div className="relative mx-auto max-w-md sm:max-w-lg">
                        <div className="arch-image relative mx-auto aspect-[3/4] max-h-[520px] overflow-hidden shadow-xl">
                            <img
                                src={HERO_IMAGE}
                                alt="想い束 花屋"
                                className="h-full w-full object-cover"
                            />
                            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-stone-900/50 to-transparent pb-8 pt-24">
                                <h1 className="text-center font-serif text-4xl font-bold tracking-wide text-white sm:text-5xl">
                                    Omoibouquet
                                </h1>
                            </div>
                        </div>
                        <span className="pointer-events-none absolute -left-4 top-12 text-3xl sm:-left-8 sm:text-4xl">
                            🌸
                        </span>
                        <span className="pointer-events-none absolute -right-2 top-24 text-2xl sm:-right-6 sm:text-3xl">
                            🌷
                        </span>
                        <span className="pointer-events-none absolute -bottom-2 left-8 text-2xl sm:text-3xl">
                            💐
                        </span>
                        <span className="pointer-events-none absolute -bottom-4 right-12 text-3xl sm:text-4xl">
                            🌼
                        </span>
                    </div>

                    <p className="mx-auto mt-10 max-w-xl text-center text-sm leading-relaxed text-stone-600 sm:text-base">
                        大切な人への想いを、花で束ねる。
                        <br className="hidden sm:block" />
                        花言葉を見ながら選んで、あなただけの一点ものを。
                    </p>
                </div>
            </section>

            {/* Primary CTAs — 花検索 & 花束カスタマイズ */}
            <section className="bg-white px-4 py-14 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-5xl">
                    <p className="mb-8 text-center text-xs font-semibold uppercase tracking-[0.3em] text-bloom-600">
                        Start Here
                    </p>
                    <div className="grid gap-6 md:grid-cols-2">
                        {/* 花を探す */}
                        <div className="home-action-card group border-bloom-200 bg-gradient-to-br from-bloom-50 to-white">
                            <div className="flex items-start gap-4">
                                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-bloom-600 text-2xl text-white shadow-md">
                                    🔍
                                </span>
                                <div className="flex-1">
                                    <p className="text-xs font-semibold uppercase tracking-wider text-bloom-500">
                                        Flower Search
                                    </p>
                                    <h2 className="mt-1 font-serif text-2xl text-stone-900">
                                        花を探す
                                    </h2>
                                    <p className="mt-2 text-sm leading-relaxed text-stone-600">
                                        花名・花言葉・色・カテゴリから、
                                        贈りたい想いに合う花を見つけられます。
                                    </p>
                                </div>
                            </div>

                            <form onSubmit={handleSearch} className="mt-6">
                                <div className="flex gap-2">
                                    <input
                                        type="search"
                                        value={searchQuery}
                                        onChange={(e) =>
                                            setSearchQuery(e.target.value)
                                        }
                                        placeholder="花の名前や花言葉で検索…"
                                        className="flex-1 rounded-full border-stone-300 bg-white px-4 py-2.5 text-sm shadow-sm focus:border-bloom-400 focus:ring-bloom-400"
                                    />
                                    <button
                                        type="submit"
                                        className="btn-primary shrink-0 px-5"
                                    >
                                        検索
                                    </button>
                                </div>
                            </form>

                            <div className="mt-4 flex flex-wrap gap-2">
                                {QUICK_CATEGORIES.map((cat) => (
                                    <Link
                                        key={cat.label}
                                        href={route("flowers.index", cat.href)}
                                        className="inline-flex items-center gap-1 rounded-full border border-stone-200 bg-white px-3 py-1 text-xs text-stone-700 transition hover:border-bloom-300 hover:bg-bloom-50"
                                    >
                                        <span>{cat.emoji}</span>
                                        {cat.label}
                                    </Link>
                                ))}
                            </div>

                            <Link
                                href={route("flowers.index")}
                                className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-bloom-700 transition group-hover:gap-2"
                            >
                                すべての花を見る
                                <span aria-hidden>→</span>
                            </Link>
                        </div>

                        {/* 花束をカスタマイズ */}
                        <Link
                            href={route("bouquet.builder")}
                            className="home-action-card home-action-card-accent group block"
                        >
                            <div className="flex items-start gap-4">
                                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/20 text-2xl backdrop-blur-sm">
                                    💐
                                </span>
                                <div className="flex-1">
                                    <p className="text-xs font-semibold uppercase tracking-wider text-white/80">
                                        Bouquet Builder
                                    </p>
                                    <h2 className="mt-1 font-serif text-2xl text-white">
                                        花束をカスタマイズ
                                    </h2>
                                    <p className="mt-2 text-sm leading-relaxed text-white/90">
                                        好きな花を一本ずつ選んで、
                                        色合いや本数も自由に組み合わせ。
                                        世界にひとつだけの花束を作れます。
                                    </p>
                                </div>
                            </div>

                            <ul className="mt-6 space-y-2 text-sm text-white/90">
                                <li className="flex items-center gap-2">
                                    <span className="text-white/60">①</span>
                                    色で絞り込んで花を選ぶ
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="text-white/60">②</span>
                                    本数を調整してプレビュー
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="text-white/60">③</span>
                                    カートに入れて店舗受け取り
                                </li>
                            </ul>

                            <span className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-bloom-700 shadow-md transition group-hover:gap-3">
                                花束を作り始める
                                <span aria-hidden>→</span>
                            </span>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Seasonal quick picks */}
            {seasonalFlowers.length > 0 && (
                <section className="bg-cream px-4 py-10 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-5xl">
                        <h2 className="text-center font-serif text-lg text-stone-800">
                            今の季節におすすめ
                        </h2>
                        <div className="mt-6 grid grid-cols-3 gap-3 sm:grid-cols-5 sm:gap-4">
                            {seasonalFlowers.slice(0, 5).map((flower) => (
                                <Link
                                    key={flower.id}
                                    href={route("flowers.show", flower.slug)}
                                    className="group overflow-hidden rounded-lg border-2 border-sage-300 bg-sage-100 p-1 shadow-sm transition hover:shadow-md"
                                >
                                    <div className="aspect-square overflow-hidden rounded-md bg-white">
                                        {flower.image ? (
                                            <img
                                                src={flower.image}
                                                alt={flower.name}
                                                className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                                                loading="lazy"
                                            />
                                        ) : (
                                            <div className="flex h-full items-center justify-center text-3xl">
                                                🌸
                                            </div>
                                        )}
                                    </div>
                                    <p className="mt-1.5 truncate text-center text-[10px] font-medium text-stone-700 sm:text-xs">
                                        {flower.name}
                                    </p>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Shop grid */}
            <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-6xl">
                    <div className="mb-10 flex items-end justify-between">
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-widest text-stone-400">
                                Shop
                            </p>
                            <h2 className="mt-1 font-serif text-2xl text-stone-900">
                                人気の花
                            </h2>
                        </div>
                        <Link
                            href={route("flowers.index")}
                            className="text-sm text-bloom-600 hover:underline"
                        >
                            View More →
                        </Link>
                    </div>
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {shopFlowers.map((flower) => (
                            <FlowerCard key={flower.id} flower={flower} />
                        ))}
                    </div>
                </div>
            </section>

            {/* News */}
            <section className="bg-cream px-4 py-16 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-6xl">
                    <p className="text-xs font-semibold uppercase tracking-widest text-stone-400">
                        News
                    </p>
                    <h2 className="mt-1 font-serif text-2xl text-stone-900">
                        お知らせ
                    </h2>
                    <div className="mt-8 grid gap-6 sm:grid-cols-3">
                        {[SHOP_INTERIOR, HERO_IMAGE, SHOP_INTERIOR].map(
                            (img, i) => (
                                <article
                                    key={i}
                                    className="overflow-hidden rounded-xl bg-white shadow-sm"
                                >
                                    <div className="aspect-[4/3] overflow-hidden">
                                        <img
                                            src={img}
                                            alt=""
                                            className="h-full w-full object-cover"
                                            loading="lazy"
                                        />
                                    </div>
                                    <div className="p-4">
                                        <time className="text-xs text-stone-400">
                                            {NEWS_ITEMS[i]?.date}
                                        </time>
                                        <p className="mt-1 text-sm leading-relaxed text-stone-700">
                                            {NEWS_ITEMS[i]?.title}
                                        </p>
                                    </div>
                                </article>
                            ),
                        )}
                    </div>
                </div>
            </section>

            {/* Calendar */}
            <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
                <div className="mx-auto flex max-w-6xl flex-col items-center gap-10 md:flex-row">
                    <div className="w-full max-w-md flex-1">
                        <HomeCalendar />
                    </div>
                    <div className="flex flex-col items-center md:items-end">
                        <p className="font-serif text-5xl font-bold leading-none tracking-tight text-stone-900 [writing-mode:vertical-rl] md:text-6xl">
                            Calendar
                        </p>
                        <span className="mt-4 text-4xl">💐</span>
                        <p className="mt-6 max-w-xs text-center text-sm text-stone-500 md:text-right">
                            店舗の営業日・イベント情報を
                            カレンダーでご確認ください。
                        </p>
                    </div>
                </div>
            </section>

            {/* Marquee */}
            <div className="overflow-hidden border-y border-stone-900 bg-cream py-3">
                <div className="marquee-track flex whitespace-nowrap">
                    {[...Array(4)].map((_, i) => (
                        <span
                            key={i}
                            className="mx-8 font-serif text-sm font-bold uppercase tracking-widest text-stone-900"
                        >
                            And Material Things, What Really Matters To You
                            &nbsp;&nbsp;·&nbsp;&nbsp;
                        </span>
                    ))}
                </div>
            </div>

            {/* About */}
            <section className="bg-cream px-4 py-20 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-2xl">
                    <div className="about-oval relative px-8 py-16 text-center">
                        <h2 className="font-serif text-3xl font-bold text-stone-900">
                            About
                        </h2>
                        <p className="mt-6 text-sm leading-loose text-stone-600">
                            想い束は、ネットで注文して店舗で受け取れる
                            花屋です。おまかせのブーケではなく、
                            一本一本あなたの手で選んだ花を束ねる。
                            花言葉を大切に、贈る想いに寄り添う
                            一点ものの花束をお届けします。
                        </p>
                        <div className="mt-8 flex justify-center gap-4">
                            <Link
                                href={route("flowers.index")}
                                className="btn-secondary text-xs"
                            >
                                花を探す
                            </Link>
                            <Link
                                href={route("bouquet.builder")}
                                className="btn-primary text-xs"
                            >
                                花束を作る
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Info list */}
            <section className="bg-white px-4 py-12 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-3xl">
                    <h2 className="font-serif text-xl text-stone-900">
                        Information
                    </h2>
                    <ul className="mt-6 divide-y divide-stone-200">
                        {NEWS_ITEMS.map((item) => (
                            <li
                                key={item.date}
                                className="flex gap-6 py-4 text-sm"
                            >
                                <time className="shrink-0 font-mono text-stone-400">
                                    {item.date}
                                </time>
                                <span className="text-stone-700">
                                    {item.title}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            {/* Store location */}
            <section className="bg-cream px-4 py-16 sm:px-6 lg:px-8">
                <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2">
                    <div className="overflow-hidden rounded-xl bg-stone-200 shadow-sm">
                        <iframe
                            title="店舗地図"
                            src="https://maps.google.com/maps?q=渋谷区神南&t=&z=15&ie=UTF8&iwloc=&output=embed"
                            className="h-64 w-full border-0 md:h-full md:min-h-[280px]"
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        />
                    </div>
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-widest text-stone-400">
                            Access
                        </p>
                        <h2 className="mt-1 font-serif text-2xl text-stone-900">
                            想い束 渋谷店
                        </h2>
                        <dl className="mt-6 space-y-3 text-sm text-stone-600">
                            <div>
                                <dt className="font-medium text-stone-800">
                                    住所
                                </dt>
                                <dd>東京都渋谷区神南1-1-1</dd>
                            </div>
                            <div>
                                <dt className="font-medium text-stone-800">
                                    営業時間
                                </dt>
                                <dd>10:00 – 19:00（定休日：水曜）</dd>
                            </div>
                            <div>
                                <dt className="font-medium text-stone-800">
                                    電話
                                </dt>
                                <dd>03-1234-5678</dd>
                            </div>
                        </dl>
                        <div className="mt-6 overflow-hidden rounded-xl">
                            <img
                                src={SHOP_INTERIOR}
                                alt="店内"
                                className="h-40 w-full object-cover"
                                loading="lazy"
                            />
                        </div>
                    </div>
                </div>

                {/* Footer flower row */}
                <div className="mx-auto mt-16 flex max-w-4xl justify-center gap-4 text-4xl sm:gap-8 sm:text-5xl">
                    {["🌷", "🌼", "🌸", "🌻", "🌺", "💐", "🌹", "🪻"].map(
                        (emoji, i) => (
                            <span
                                key={i}
                                className="transition hover:scale-110"
                                style={{
                                    transform: `rotate(${(i % 2 === 0 ? -1 : 1) * (5 + i * 3)}deg)`,
                                }}
                            >
                                {emoji}
                            </span>
                        ),
                    )}
                </div>
            </section>
        </ShopLayout>
    );
}

function HomeCalendar() {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const monthLabel = today.toLocaleDateString("ja-JP", {
        year: "numeric",
        month: "long",
    });

    const cells = [];
    for (let i = 0; i < firstDay; i++) cells.push(null);
    for (let d = 1; d <= daysInMonth; d++) cells.push(d);

    return (
        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
            <p className="text-center font-serif text-xl text-stone-800">
                {monthLabel}
            </p>
            <div className="mt-4 grid grid-cols-7 gap-1 text-center text-xs">
                {["日", "月", "火", "水", "木", "金", "土"].map((d) => (
                    <span key={d} className="py-1 font-medium text-stone-400">
                        {d}
                    </span>
                ))}
                {cells.map((day, i) => (
                    <span
                        key={i}
                        className={`flex h-8 items-center justify-center rounded-full text-sm ${
                            day === today.getDate()
                                ? "bg-bloom-600 font-bold text-white"
                                : day
                                  ? "text-stone-700"
                                  : ""
                        }`}
                    >
                        {day ?? ""}
                    </span>
                ))}
            </div>
            <p className="mt-4 text-center text-xs text-stone-400">
                <span className="inline-block h-2 w-2 rounded-full bg-bloom-600" />{" "}
                本日
            </p>
        </div>
    );
}
