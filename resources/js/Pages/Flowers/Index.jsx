import ShopLayout from '@/Layouts/ShopLayout';
import { formatYen } from '@/Utils/format';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';

const TYPES = [
    { key: 'rose', label: 'バラ', image: '/images/type-rose.png' },
    { key: 'tulip', label: 'チューリップ', image: '/images/type-tulip.png' },
    { key: 'carnation', label: 'カーネーション', image: '/images/type-Carnation.png' },
    { key: 'lily', label: 'ユリ', image: '/images/type-lily.png' },
    { key: 'sunflower', label: 'ひまわり', image: '/images/type-himawari.png' },
    { key: 'filler', label: 'かすみ草', image: encodeURI("/images/type-baby's breath.png") },
    { key: 'seasonal', label: '紫陽花', image: '/images/type-Hydrangea.png' },
    { key: 'other', label: 'その他', image: '/images/type-other.png' },
    { key: 'bouquet', label: 'ブーケ', image: '/images/type-bouquet.png' },
    {
        key: 'bouquet-mix',
        label: '季節のブーケ',
        image: encodeURI('/images/type-Seasonal bouquet.png'),
        category: 'bouquet',
    },
];

const COLOR_BLOBS = [
    { key: 'ピンク', hex: '#F3C4B0', radius: '70% 30% 55% 45% / 45% 60% 40% 55%', size: 'h-14 w-16' },
    { key: '黄', hex: '#F3E18F', radius: '50% 50% 40% 60% / 40% 60% 40% 60%', size: 'h-12 w-12' },
    { key: '赤', hex: '#F5B7C8', radius: '40% 60% 55% 45% / 60% 40% 60% 40%', size: 'h-16 w-14' },
    { key: '紫', hex: '#D9C5F0', radius: '65% 35% 40% 60% / 50% 45% 55% 50%', size: 'h-14 w-[4.5rem]' },
    { key: 'オレンジ', hex: '#F5C8A4', radius: '45% 55% 65% 35% / 55% 45% 55% 45%', size: 'h-12 w-16' },
    { key: '緑', hex: '#B6E0CC', radius: '55% 45% 50% 50% / 40% 55% 45% 60%', size: 'h-14 w-14' },
];

const PURPOSES = [
    { key: 'birthday', label: 'お誕生日', icon: 'balloon' },
    { key: 'gift', label: 'ギフト', icon: 'gift' },
    { key: 'wedding', label: '結婚祝い', icon: 'ring' },
    { key: 'sympathy', label: 'お悔み', icon: 'bouquet' },
    { key: 'anniversary', label: '記念日', icon: 'calendar' },
    { key: 'opening', label: '開店祝い', icon: 'store' },
    { key: 'visit', label: 'お見舞い', icon: 'heart' },
    { key: 'other', label: 'その他', icon: 'spark' },
];

const LANGUAGE_TAGS = [
    {
        label: '感謝',
        search: '感謝',
        className:
            'flex h-20 w-24 items-center justify-center bg-[#d8ecc0] text-sm font-medium text-stone-700 -rotate-6 sm:h-24 sm:w-28',
        radius: '63% 37% 54% 46% / 55% 48% 52% 45%',
    },
    {
        label: 'おめでとう',
        search: '喜び',
        className:
            'flex h-[4.5rem] w-32 items-center justify-center bg-[#f6e59b] text-sm font-medium text-stone-700 rotate-3 sm:h-24 sm:w-36',
        radius: '48% 52% 42% 58% / 58% 42% 58% 42%',
    },
    {
        label: '愛情',
        search: '愛情',
        className:
            'flex h-24 w-24 items-center justify-center bg-[#e4d4f5] text-sm font-medium text-stone-700 -rotate-2 sm:h-28 sm:w-28',
        radius: '42% 58% 58% 42% / 48% 42% 58% 52%',
    },
    {
        label: '元気',
        search: '輝き',
        className:
            'flex h-16 w-24 items-center justify-center bg-[#f7d3b0] text-sm font-medium text-stone-700 rotate-6 sm:h-20 sm:w-28',
        radius: '40% 60% 50% 50% / 60% 40% 55% 45%',
    },
    {
        label: '幸福',
        search: '幸福',
        className:
            'flex h-20 w-20 items-center justify-center bg-[#f5c9d4] text-sm font-medium text-stone-700 -rotate-3 sm:h-24 sm:w-24',
        radius: '55% 45% 45% 55% / 45% 55% 45% 55%',
    },
];

const GARLAND = [
    '/images/hana1.png',
    '/images/hana2.png',
    '/images/hana3.png',
    '/images/hana4.png',
];

export default function FlowersIndex({ flowers, filters = {}, ranking = [], totalCount }) {
    const [search, setSearch] = useState(filters.search ?? '');

    const applyFilters = (overrides = {}, scrollToResults = true) => {
        const next = { ...filters, ...overrides };
        Object.keys(next).forEach((k) => {
            if (next[k] === undefined || next[k] === '' || next[k] === null) delete next[k];
        });
        if ('search' in overrides) {
            setSearch(overrides.search ?? '');
        }
        router.get(route('flowers.index'), next, {
            preserveState: true,
            replace: true,
            onSuccess: () => {
                if (scrollToResults) {
                    document
                        .getElementById('catalog-items')
                        ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            },
        });
    };

    const toggleFilter = (key, value) => {
        applyFilters({ [key]: filters[key] === value ? undefined : value });
    };

    const handleSearch = (e) => {
        e.preventDefault();
        applyFilters({ search: search.trim() || undefined });
    };

    const hasFilters = Boolean(
        filters.category ||
            filters.color ||
            filters.search ||
            filters.purpose ||
            filters.seasonal,
    );

    return (
        <ShopLayout hideTitle hideSearch flush>
            <Head title="花一覧" />

            <HeroSearch search={search} setSearch={setSearch} onSubmit={handleSearch} />

            <PromoBanners />

            {ranking.length > 0 && (
                <section className="px-4 py-16 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-6xl">
                        <SectionTitle en="RANKING" ja="人気の花束" />
                        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
                            {ranking.map((flower) => (
                                <CatalogCard key={flower.id} flower={flower} compact />
                            ))}
                        </div>
                    </div>
                </section>
            )}

            <section className="px-4 py-10 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-4xl">
                    <SectionTitle en="TYPE" ja="種類から探す" />
                    <div className="grid grid-cols-5 gap-x-3 gap-y-8">
                        {TYPES.map((type) => {
                            const category = type.category ?? type.key;
                            const isActive = filters.category === category;
                            return (
                                <button
                                    key={type.key}
                                    type="button"
                                    onClick={() => toggleFilter('category', category)}
                                    className="group flex flex-col items-center gap-2"
                                    aria-pressed={isActive}
                                >
                                    <span
                                        className={`h-16 w-16 overflow-hidden rounded-full border bg-cream-50 transition sm:h-24 sm:w-24 ${
                                            isActive
                                                ? 'border-bloom-500 ring-2 ring-bloom-400 ring-offset-2'
                                                : 'border-stone-200 group-hover:border-bloom-300'
                                        }`}
                                    >
                                        <img
                                            src={type.image}
                                            alt=""
                                            className="h-full w-full object-contain"
                                        />
                                    </span>
                                    <span className="text-[10px] text-stone-500 sm:text-xs">
                                        {type.label}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </section>

            <section className="px-4 py-10 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-3xl">
                    <SectionTitle en="COLOR" ja="カラーから探す" />
                    <div className="flex flex-wrap items-center justify-center gap-5 sm:gap-8">
                        {COLOR_BLOBS.map((color) => {
                            const isActive = filters.color === color.key;
                            return (
                                <button
                                    key={color.key}
                                    type="button"
                                    onClick={() => toggleFilter('color', color.key)}
                                    className={`color-blob ${color.size} ${isActive ? 'ring-2 ring-stone-700 ring-offset-2' : ''}`}
                                    style={{
                                        backgroundColor: color.hex,
                                        borderRadius: color.radius,
                                    }}
                                    aria-label={color.key}
                                    aria-pressed={isActive}
                                    title={color.key}
                                />
                            );
                        })}
                    </div>
                </div>
            </section>

            <section className="px-4 py-10 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-3xl">
                    <SectionTitle en="PURPOSE" ja="シーンから探す" />
                    <div className="mx-auto grid max-w-xl grid-cols-4 gap-x-4 gap-y-8">
                        {PURPOSES.map((purpose) => {
                            const isActive = filters.purpose === purpose.key;
                            return (
                                <button
                                    key={purpose.key}
                                    type="button"
                                    onClick={() => toggleFilter('purpose', purpose.key)}
                                    className={`flex flex-col items-center gap-2 text-stone-600 transition hover:text-bloom-700 ${
                                        isActive ? 'text-bloom-700' : ''
                                    }`}
                                    aria-pressed={isActive}
                                >
                                    <PurposeIcon name={purpose.icon} />
                                    <span className="text-[10px] tracking-wide sm:text-xs">
                                        {purpose.label}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </section>

            <section className="px-4 py-16 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-3xl text-center">
                    <p className="font-serif text-2xl leading-relaxed text-stone-600 sm:text-3xl">
                        言葉にできない気持ちを、
                        <br />
                        <span className="mt-2 inline-block sm:ml-16">花に託して。</span>
                    </p>
                    <p className="mt-6 text-xs tracking-[0.2em] text-stone-400">
                        花言葉から探す
                    </p>
                    <div className="mt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-6">
                        {LANGUAGE_TAGS.map((tag) => {
                            const isActive = filters.search === tag.search;
                            return (
                                <button
                                    key={tag.label}
                                    type="button"
                                    onClick={() => applyFilters({ search: isActive ? undefined : tag.search })}
                                    className={`shadow-sm transition hover:scale-105 ${tag.className} ${
                                        isActive ? 'ring-2 ring-stone-600 ring-offset-2' : ''
                                    }`}
                                    style={{ borderRadius: tag.radius }}
                                    aria-pressed={isActive}
                                >
                                    {tag.label}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </section>

            <section id="catalog-items" className="scroll-mt-24 px-4 py-8 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-6xl">
                    {hasFilters && (
                        <div className="mb-8 flex flex-wrap items-center justify-center gap-3 text-sm text-stone-500">
                            <span>{totalCount}件</span>
                            <button
                                type="button"
                                onClick={() => {
                                    setSearch('');
                                    router.get(route('flowers.index'), {}, { replace: true });
                                }}
                                className="text-bloom-700 underline-offset-2 hover:underline"
                            >
                                条件をクリア
                            </button>
                        </div>
                    )}

                    {flowers.data.length === 0 ? (
                        <p className="py-20 text-center text-stone-500">
                            条件に合う花が見つかりませんでした。
                        </p>
                    ) : (
                        <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4">
                            {flowers.data.map((flower) => (
                                <CatalogCard key={flower.id} flower={flower} />
                            ))}
                        </div>
                    )}

                    {flowers.next_page_url && (
                        <div className="mt-12 text-center">
                            <Link
                                href={flowers.next_page_url}
                                className="text-sm tracking-widest text-stone-500 transition hover:text-stone-800"
                                preserveScroll
                            >
                                もっと見る →
                            </Link>
                        </div>
                    )}
                </div>
            </section>

            <section className="px-4 py-16 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-4xl text-center">
                    <h2 className="font-serif text-2xl tracking-[0.35em] text-stone-700 sm:text-3xl">
                        ALL ITEMS
                    </h2>
                    <div className="mt-6 flex items-center justify-center gap-2 overflow-hidden sm:gap-4">
                        {Array.from({ length: 8 }, (_, i) => (
                            <img
                                key={i}
                                src={GARLAND[i % GARLAND.length]}
                                alt=""
                                className="h-8 w-8 object-contain sm:h-10 sm:w-10"
                            />
                        ))}
                    </div>
                </div>
            </section>
        </ShopLayout>
    );
}

function HeroSearch({ search, setSearch, onSubmit }) {
    return (
        <section className="relative">
            <div className="relative h-52 overflow-hidden sm:h-72 lg:h-80">
                <img
                    src="/images/tenpogaikan.jpg"
                    alt=""
                    className="h-full w-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-stone-900/15" />
                <form
                    onSubmit={onSubmit}
                    className="absolute bottom-5 left-1/2 w-[90%] max-w-xl -translate-x-1/2 sm:bottom-8"
                >
                    <label className="relative block">
                        <span className="sr-only">花を検索</span>
                        <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-stone-400">
                            <SearchIcon />
                        </span>
                        <input
                            type="search"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="お花を検索"
                            className="w-full rounded-full border-0 bg-white py-3 pl-12 pr-4 text-sm shadow-lg placeholder:text-stone-400 focus:ring-2 focus:ring-bloom-400"
                        />
                    </label>
                </form>
            </div>
        </section>
    );
}

function PromoBanners() {
    return (
        <section className="px-4 py-8 sm:px-6 lg:px-8">
            <div className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-2">
                <div className="flex items-center gap-4 rounded-2xl bg-cream px-6 py-5">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-bloom-700 shadow-sm">
                        <CalendarIcon />
                    </span>
                    <div>
                        <p className="font-serif text-lg text-stone-800">本日発送</p>
                        <p className="text-xs text-stone-500">15時までのご注文で出荷</p>
                    </div>
                </div>
                <div className="flex items-center justify-between gap-3 rounded-2xl bg-cream px-6 py-5">
                    <div>
                        <p className="font-serif text-base leading-snug text-stone-800">
                            店舗受け取りで送料無料
                        </p>
                        <p className="mt-1 text-xs text-stone-500">最短当日受け取りも可能</p>
                    </div>
                    <img
                        src="/images/hana1.png"
                        alt=""
                        className="h-16 w-16 shrink-0 object-contain sm:h-20 sm:w-20"
                    />
                </div>
            </div>
        </section>
    );
}

function SectionTitle({ en, ja }) {
    return (
        <div className="mb-10 text-center">
            <h2 className="font-serif text-2xl tracking-[0.35em] text-stone-700 sm:text-3xl">
                {en}
            </h2>
            {ja && (
                <p className="mt-2 text-[11px] tracking-[0.25em] text-stone-400">{ja}</p>
            )}
        </div>
    );
}

function CatalogCard({ flower, compact = false }) {
    return (
        <Link href={route('flowers.show', flower.slug)} className="group text-center">
            <div
                className={`overflow-hidden bg-white ${
                    compact ? 'aspect-square' : 'aspect-[4/5]'
                }`}
            >
                {flower.image ? (
                    <img
                        src={flower.image}
                        alt={flower.name}
                        className="h-full w-full object-contain transition duration-500 group-hover:scale-105"
                        loading="lazy"
                    />
                ) : (
                    <div className="flex h-full items-center justify-center text-4xl">🌸</div>
                )}
            </div>
            <h3 className="mt-3 line-clamp-2 font-serif text-sm text-stone-700 group-hover:text-bloom-700">
                {flower.name}
            </h3>
            {!compact && (
                <p className="mt-1 text-xs text-stone-500">{formatYen(flower.price)}</p>
            )}
            <Stars value={starValue(flower.id)} />
        </Link>
    );
}

function starValue(id) {
    return id % 3 === 0 ? 4 : 5;
}

function Stars({ value = 5 }) {
    const filled = Math.round(value);
    return (
        <div className="mt-1.5 flex justify-center gap-0.5 text-[11px] text-amber-400" aria-hidden>
            {Array.from({ length: 5 }, (_, i) => (
                <span key={i}>{i < filled ? '★' : '☆'}</span>
            ))}
        </div>
    );
}

function SearchIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-4.35-4.35M17 11a6 6 0 1 1-12 0 6 6 0 0 1 12 0Z" />
        </svg>
    );
}

function CalendarIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3.75 8.25h16.5M4.5 6.75h15A1.5 1.5 0 0 1 21 8.25v10.5a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 18.75V8.25a1.5 1.5 0 0 1 1.5-1.5Z" />
        </svg>
    );
}

function PurposeIcon({ name }) {
    const cls = 'h-8 w-8';
    const props = {
        xmlns: 'http://www.w3.org/2000/svg',
        viewBox: '0 0 24 24',
        fill: 'none',
        stroke: 'currentColor',
        strokeWidth: '1.4',
        className: cls,
    };

    switch (name) {
        case 'balloon':
            return (
                <svg {...props}>
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 15.2c3.2 0 5.7-2.8 5.7-6.4S15.2 2.4 12 2.4 6.3 5.2 6.3 8.8 8.8 15.2 12 15.2Z"
                    />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15.2 10.8 17h2.4L12 15.2Zm0 1.8v4.5M10.2 22h3.6" />
                </svg>
            );
        case 'gift':
            return (
                <svg {...props}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 10h16v10H4V10Zm-1 0h18M12 10v10M12 10s-3.5-5-6-3 6 3 6 3Zm0 0s3.5-5 6-3-6 3-6 3Z" />
                </svg>
            );
        case 'ring':
            return (
                <svg {...props}>
                    <circle cx="12" cy="14.5" r="5.5" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9V5.5l2-2-2.5.8L10 3.5l2 2" />
                </svg>
            );
        case 'bouquet':
            return (
                <svg {...props}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 13.5c1.8-2.8 5.2-3.2 6.2-1.4.9 1.6-.6 4.2-3.4 5.3-1 .4-2 .6-2.8.6s-1.8-.2-2.8-.6c-2.8-1.1-4.3-3.7-3.4-5.3 1-1.8 4.4-1.4 6.2 1.4Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v3.5M9.5 22h5" />
                    <path strokeLinecap="round" d="M10 11.5c.4-2 1.2-3.5 2-4.5 1 1 1.7 2.5 2 4.5" />
                </svg>
            );
        case 'calendar':
            return (
                <svg {...props}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3.75 8.25h16.5M4.5 6.75h15A1.5 1.5 0 0 1 21 8.25v10.5a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 18.75V8.25a1.5 1.5 0 0 1 1.5-1.5Z" />
                </svg>
            );
        case 'store':
            return (
                <svg {...props}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 10.5 5 6h14l2 4.5V20H3v-9.5ZM3 10.5h18M9 20v-6h6v6" />
                </svg>
            );
        case 'heart':
            return (
                <svg {...props}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 20s-7-4.4-7-9.2C5 8 7.2 6 9.5 6c1.4 0 2.6.7 3.5 1.8C13.9 6.7 15.1 6 16.5 6 18.8 6 21 8 21 10.8 21 15.6 12 20 12 20Z" />
                </svg>
            );
        default:
            return (
                <svg {...props}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v1.2M12 18.3v1.2M6.4 6.4l.9.9M16.7 16.7l.9.9M4.5 12h1.2M18.3 12h1.2M6.4 17.6l.9-.9M16.7 7.3l.9-.9M15.2 12a3.2 3.2 0 1 1-6.4 0 3.2 3.2 0 0 1 6.4 0Z" />
                </svg>
            );
    }
}
