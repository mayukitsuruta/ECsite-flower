import FlowerCard from "@/Components/FlowerCard";
import ShopLayout from "@/Layouts/ShopLayout";
import { Head, Link } from "@inertiajs/react";

const HERO_IMAGE = "/images/tenpogaikan.jpg";
const SHOP_INTERIOR =
    "https://images.unsplash.com/photo-1563241522-8f783137d9f2?w=800&q=80";

const IMG = {
    hana1: "/images/hana1.png",
    hana2: "/images/hana2.png",
    hana3: "/images/hana3.png",
    hana4: "/images/hana4.png",
};

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

export default function Home({ seasonalFlowers, shopFlowers }) {
    return (
        <ShopLayout home>
            <Head title="トップ" />

            {/* Hero */}
            <section className="relative bg-cream px-4 pb-16 pt-6 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-5xl">
                    <div className="relative mx-auto max-w-4xl">
                        <div className="arch-image relative mx-auto aspect-[16/10] w-full overflow-hidden shadow-xl sm:aspect-[2/1]">
                            <img
                                src={HERO_IMAGE}
                                alt="想い束 店舗外観"
                                className="h-full w-full object-cover object-center"
                            />
                            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-stone-900/55 to-transparent pb-6 pt-16 sm:pb-8 sm:pt-20">
                                <h1 className="text-center font-serif text-3xl font-bold tracking-wide text-white sm:text-5xl">
                                    Omoibouquet
                                </h1>
                            </div>
                        </div>
                        <img
                            src={IMG.hana1}
                            alt=""
                            aria-hidden
                            className="pointer-events-none absolute -left-10 top-6 h-20 w-20 object-contain sm:-left-20 sm:top-8 sm:h-32 sm:w-32 lg:-left-28 lg:h-40 lg:w-40"
                        />
                        <img
                            src={IMG.hana2}
                            alt=""
                            aria-hidden
                            className="pointer-events-none absolute -right-8 top-10 h-16 w-16 object-contain sm:-right-20 sm:h-28 sm:w-28 lg:-right-28 lg:h-36 lg:w-36"
                        />
                        <img
                            src={IMG.hana3}
                            alt=""
                            aria-hidden
                            className="pointer-events-none absolute -bottom-4 -left-6 h-16 w-16 object-contain sm:-bottom-6 sm:-left-16 sm:h-28 sm:w-28 lg:-left-24 lg:h-36 lg:w-36"
                        />
                        <img
                            src={IMG.hana4}
                            alt=""
                            aria-hidden
                            className="pointer-events-none absolute -bottom-6 -right-4 h-20 w-20 object-contain sm:-bottom-8 sm:-right-14 sm:h-32 sm:w-32 lg:-right-24 lg:h-40 lg:w-40"
                        />
                    </div>

                    <p className="mx-auto mt-10 max-w-xl text-center text-sm leading-relaxed text-stone-600 sm:text-base">
                        大切な人への想いを、花で束ねる。
                        <br className="hidden sm:block" />
                        花言葉を見ながら選んで、あなただけの一点ものを。
                    </p>
                </div>
            </section>

            {/* 花束カスタマイズ — 一面で目立たせる */}
            <section className="bg-white px-4 py-14 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-5xl">
                    <Link
                        href={route("bouquet.builder")}
                        className="group relative block overflow-hidden rounded-3xl bg-gradient-to-br from-bloom-600 via-bloom-700 to-bloom-900 px-8 py-14 text-white shadow-xl transition hover:shadow-2xl sm:px-14 sm:py-20"
                    >
                        <div className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full bg-white/10 blur-2xl sm:h-56 sm:w-56" />
                        <div className="pointer-events-none absolute -bottom-12 -left-8 h-48 w-48 rounded-full bg-bloom-400/20 blur-3xl" />

                        <div className="relative z-10 mx-auto max-w-2xl text-center">
                            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/75">
                                Start Here · Bouquet Builder
                            </p>
                            <h2 className="mt-4 font-serif text-3xl font-bold leading-tight sm:text-5xl">
                                花束をカスタマイズ
                            </h2>
                            <p className="mx-auto mt-5 max-w-lg text-sm leading-relaxed text-white/90 sm:text-base">
                                好きな花を一本ずつ選んで、色合いや本数も自由に。
                                おまかせではなく、あなただけの一点もの花束を作れます。
                            </p>

                            <ul className="mx-auto mt-8 flex max-w-xl flex-col gap-3 text-left text-sm text-white/90 sm:flex-row sm:justify-center sm:gap-8 sm:text-center">
                                <li>
                                    <span className="block text-xs text-white/55">
                                        STEP 1
                                    </span>
                                    お好みの花を組み合わせる
                                </li>
                                <li>
                                    <span className="block text-xs text-white/55">
                                        STEP 2
                                    </span>
                                    ラッピングやメッセージカードを選ぶ
                                </li>
                                <li>
                                    <span className="block text-xs text-white/55">
                                        STEP 3
                                    </span>
                                    カートに入れて購入
                                </li>
                            </ul>

                            <span className="mt-10 inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-bloom-700 shadow-lg transition group-hover:gap-3 group-hover:bg-bloom-50">
                                花束を作り始める
                                <span aria-hidden>→</span>
                            </span>
                        </div>
                    </Link>
                </div>
            </section>

            {/* Shop grid — 人気の花 */}
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
                    <div className="grid grid-cols-2 items-stretch gap-6 lg:grid-cols-3">
                        {shopFlowers.map((flower) => (
                            <FlowerCard key={flower.id} flower={flower} />
                        ))}
                    </div>
                </div>
            </section>

            {/* 季節のおすすめ */}
            {seasonalFlowers.length > 0 && (
                <section className="bg-cream px-4 py-16 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-6xl">
                        <div className="mb-10 flex items-end justify-between">
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-widest text-stone-400">
                                    Seasonal
                                </p>
                                <h2 className="mt-1 font-serif text-2xl text-stone-900">
                                    季節のおすすめ
                                </h2>
                            </div>
                            <Link
                                href={route("flowers.index", { seasonal: 1 })}
                                className="text-sm text-bloom-600 hover:underline"
                            >
                                View More →
                            </Link>
                        </div>
                        <div className="grid grid-cols-2 items-stretch gap-6 lg:grid-cols-3">
                            {seasonalFlowers.map((flower) => (
                                <FlowerCard key={flower.id} flower={flower} />
                            ))}
                        </div>
                    </div>
                </section>
            )}

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
                        <img
                            src={IMG.hana1}
                            alt=""
                            aria-hidden
                            className="mt-4 h-14 w-14 object-contain"
                        />
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
                <div className="mx-auto mt-16 flex max-w-5xl items-center justify-center gap-4 overflow-hidden sm:gap-8">
                    {[IMG.hana1, IMG.hana2, IMG.hana3, IMG.hana4].map(
                        (src, i) => (
                            <img
                                key={i}
                                src={src}
                                alt=""
                                aria-hidden
                                className="h-14 w-auto object-contain sm:h-20"
                            />
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
