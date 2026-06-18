import FlowerCard from '@/Components/FlowerCard';
import ShopHero from '@/Components/ShopHero';
import ShopSidebar from '@/Components/ShopSidebar';
import ShopLayout from '@/Layouts/ShopLayout';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';

export default function FlowersIndex({
    flowers,
    categories,
    filters,
    priceRange,
    featured,
    totalCount,
}) {
    const [viewMode, setViewMode] = useState('grid');
    const [search, setSearch] = useState(filters.search ?? '');

    const applyFilters = (overrides = {}) => {
        const next = { ...filters, ...overrides };
        Object.keys(next).forEach((k) => {
            if (next[k] === undefined || next[k] === '') delete next[k];
        });
        router.get(route('flowers.index'), next, { preserveState: true, replace: true });
    };

    const handleSearch = (e) => {
        e.preventDefault();
        applyFilters({ search: search || undefined });
    };

    const from = flowers.from ?? 0;
    const to = flowers.to ?? 0;

    return (
        <ShopLayout wide hideTitle>
            <Head title="花一覧" />

            <ShopHero
                title="Shop"
                subtitle="花言葉と配色から、想いに合う花を選ぶ"
                breadcrumbs={[{ label: '花一覧' }]}
            />

            <div className="mt-8 flex flex-col gap-8 lg:flex-row lg:gap-12">
                {/* 左サイドバー（参考1枚目） */}
                <div className="w-full shrink-0 lg:w-56 xl:w-64">
                    <form onSubmit={handleSearch} className="mb-6 lg:hidden">
                        <input
                            type="search"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="花の名前・花言葉で検索"
                            className="w-full rounded-lg border-stone-200 text-sm"
                        />
                    </form>
                    <ShopSidebar
                        categories={categories}
                        filters={filters}
                        priceRange={priceRange}
                        featured={featured}
                        onFilter={applyFilters}
                    />
                </div>

                {/* メイン（参考1枚目：ツールバー＋グリッド） */}
                <div className="min-w-0 flex-1">
                    <div className="mb-6 hidden lg:block">
                        <form onSubmit={handleSearch} className="max-w-md">
                            <input
                                type="search"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="花の名前・花言葉で検索..."
                                className="w-full rounded-lg border-stone-200 text-sm shadow-sm"
                            />
                        </form>
                    </div>

                    <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-stone-200 pb-4">
                        <p className="text-sm text-stone-500">
                            {totalCount > 0 ? (
                                <>
                                    <span className="font-medium text-stone-800">{from}–{to}</span>
                                    {' / '}
                                    {totalCount}件
                                </>
                            ) : (
                                '0件'
                            )}
                        </p>
                        <div className="flex flex-wrap items-center gap-3">
                            <div className="flex rounded-lg border border-stone-200 p-0.5">
                                <ViewToggle
                                    active={viewMode === 'grid'}
                                    onClick={() => setViewMode('grid')}
                                    label="グリッド"
                                />
                                <ViewToggle
                                    active={viewMode === 'palette'}
                                    onClick={() => setViewMode('palette')}
                                    label="配色"
                                />
                            </div>
                            <select
                                value={filters.sort ?? 'default'}
                                onChange={(e) => applyFilters({ sort: e.target.value })}
                                className="rounded-lg border-stone-200 py-1.5 pl-3 pr-8 text-sm"
                            >
                                <option value="default">並び替え：標準</option>
                                <option value="price_asc">価格：安い順</option>
                                <option value="price_desc">価格：高い順</option>
                                <option value="name">名前順</option>
                            </select>
                        </div>
                    </div>

                    {flowers.data.length === 0 ? (
                        <p className="py-20 text-center text-stone-500">
                            条件に合う花が見つかりませんでした。
                        </p>
                    ) : (
                        <div
                            className={
                                viewMode === 'palette'
                                    ? 'grid gap-4 sm:grid-cols-2 xl:grid-cols-3'
                                    : 'grid gap-6 sm:grid-cols-2 xl:grid-cols-3'
                            }
                        >
                            {flowers.data.map((flower) => (
                                <FlowerCard
                                    key={flower.id}
                                    flower={flower}
                                    layout={viewMode === 'palette' ? 'palette' : 'grid'}
                                />
                            ))}
                        </div>
                    )}

                    {flowers.next_page_url && (
                        <div className="mt-12 text-center">
                            <Link
                                href={flowers.next_page_url}
                                className="inline-flex min-w-[200px] items-center justify-center rounded-full border-2 border-stone-800 bg-white px-8 py-3 text-sm font-medium uppercase tracking-wider text-stone-800 transition hover:bg-stone-800 hover:text-white"
                                preserveScroll
                            >
                                もっと見る
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </ShopLayout>
    );
}

function ViewToggle({ active, onClick, label }) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`rounded-md px-3 py-1 text-xs font-medium transition ${
                active ? 'bg-stone-800 text-white' : 'text-stone-500 hover:text-stone-800'
            }`}
        >
            {label}
        </button>
    );
}
