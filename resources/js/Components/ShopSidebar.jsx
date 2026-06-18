import ColorSwatch from '@/Components/ColorSwatch';
import { formatYen } from '@/Utils/format';
import { COLOR_FILTERS } from '@/Utils/colors';
import { Link } from '@inertiajs/react';

export default function ShopSidebar({
    categories,
    filters,
    priceRange,
    featured,
    onFilter,
}) {
    const { min: priceMin, max: priceMax } = priceRange;

    return (
        <aside className="space-y-8">
            {/* カテゴリ */}
            <section>
                <h3 className="mb-3 font-serif text-sm font-semibold uppercase tracking-wider text-stone-800">
                    カテゴリ
                </h3>
                <ul className="space-y-1 text-sm">
                    <li>
                        <FilterLink
                            active={!filters.category}
                            onClick={() => onFilter({ category: undefined })}
                        >
                            すべて
                        </FilterLink>
                    </li>
                    {Object.entries(categories).map(([key, label]) => (
                        <li key={key}>
                            <FilterLink
                                active={filters.category === key}
                                onClick={() => onFilter({ category: key })}
                            >
                                {label}
                            </FilterLink>
                        </li>
                    ))}
                </ul>
            </section>

            {/* 価格 */}
            <section>
                <h3 className="mb-3 font-serif text-sm font-semibold uppercase tracking-wider text-stone-800">
                    価格
                </h3>
                <div className="space-y-3">
                    <input
                        type="range"
                        min={priceMin}
                        max={priceMax}
                        value={filters.price_max ?? priceMax}
                        onChange={(e) =>
                            onFilter({ price_max: Number(e.target.value) })
                        }
                        className="w-full accent-bloom-600"
                    />
                    <div className="flex gap-2 text-xs text-stone-500">
                        <span>¥{filters.price_min ?? priceMin}</span>
                        <span>—</span>
                        <span>¥{filters.price_max ?? priceMax}</span>
                    </div>
                </div>
            </section>

            {/* カラー（2枚目参考） */}
            <section>
                <h3 className="mb-1 font-serif text-sm font-semibold uppercase tracking-wider text-stone-800">
                    カラー
                </h3>
                <p className="mb-3 text-xs text-stone-400">花の配色で選ぶ</p>
                <ul className="space-y-2">
                    <li>
                        <button
                            type="button"
                            onClick={() => onFilter({ color: undefined })}
                            className={`text-sm ${!filters.color ? 'font-medium text-bloom-700' : 'text-stone-500 hover:text-stone-800'}`}
                        >
                            すべての色
                        </button>
                    </li>
                    {COLOR_FILTERS.map((c) => (
                        <li key={c.key}>
                            <ColorSwatch
                                hex={c.hex}
                                label={c.label}
                                selected={filters.color === c.key}
                                showLabel
                                border={c.border}
                                onClick={() => onFilter({ color: c.key })}
                            />
                        </li>
                    ))}
                </ul>
            </section>

            {/* 季節 */}
            <section>
                <h3 className="mb-3 font-serif text-sm font-semibold uppercase tracking-wider text-stone-800">
                    季節
                </h3>
                <label className="flex cursor-pointer items-center gap-2 text-sm text-stone-600">
                    <input
                        type="checkbox"
                        checked={Boolean(filters.seasonal)}
                        onChange={(e) =>
                            onFilter({ seasonal: e.target.checked ? 1 : undefined })
                        }
                        className="rounded border-stone-300 text-bloom-600 focus:ring-bloom-500"
                    />
                    季節の花のみ
                </label>
            </section>

            {/* おすすめ */}
            {featured?.length > 0 && (
                <section>
                    <h3 className="mb-3 font-serif text-sm font-semibold uppercase tracking-wider text-stone-800">
                        おすすめの花
                    </h3>
                    <ul className="space-y-3">
                        {featured.map((flower) => (
                            <li key={flower.id}>
                                <Link
                                    href={route('flowers.show', flower.slug)}
                                    className="flex gap-3 rounded-lg p-2 transition hover:bg-stone-50"
                                >
                                    <img
                                        src={flower.image}
                                        alt=""
                                        className="h-14 w-14 shrink-0 rounded-lg object-cover"
                                    />
                                    <div className="min-w-0">
                                        <p className="truncate text-sm font-medium text-stone-800">
                                            {flower.name}
                                        </p>
                                        <p className="text-xs text-bloom-600">
                                            {formatYen(flower.price)}
                                        </p>
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </section>
            )}
        </aside>
    );
}

function FilterLink({ active, onClick, children }) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`block w-full rounded px-2 py-1.5 text-left transition ${
                active
                    ? 'bg-bloom-50 font-medium text-bloom-800'
                    : 'text-stone-600 hover:bg-stone-50 hover:text-stone-900'
            }`}
        >
            {children}
        </button>
    );
}
