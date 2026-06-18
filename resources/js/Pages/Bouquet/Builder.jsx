import ColorPalette from '@/Components/ColorPalette';
import ColorSwatch from '@/Components/ColorSwatch';
import ShopHero from '@/Components/ShopHero';
import ShopLayout from '@/Layouts/ShopLayout';
import { formatYen } from '@/Utils/format';
import { COLOR_FILTERS } from '@/Utils/colors';
import { Head, useForm } from '@inertiajs/react';
import { useMemo, useState } from 'react';

const Box = 'div';

export default function BouquetBuilder({ flowers, categories, wrappingFee }) {
    const [bouquetName, setBouquetName] = useState('想いの花束');
    const [quantities, setQuantities] = useState({});
    const [colorFilter, setColorFilter] = useState(null);

    const form = useForm({ bouquet_name: bouquetName, items: [] });

    const setQty = (flowerId, qty) => {
        setQuantities((prev) => ({ ...prev, [flowerId]: Math.max(0, Math.min(20, qty)) }));
    };

    const filteredFlowers = useMemo(() => {
        if (!colorFilter) return flowers;
        return flowers.filter((f) => f.color === colorFilter);
    }, [flowers, colorFilter]);

    const selectedItems = useMemo(
        () =>
            flowers
                .filter((f) => (quantities[f.id] ?? 0) > 0)
                .map((f) => ({
                    flower: f,
                    quantity: quantities[f.id],
                    subtotal: f.price * quantities[f.id],
                })),
        [flowers, quantities],
    );

    const bouquetPalette = useMemo(() => {
        const colors = [];
        selectedItems.forEach((i) => {
            (i.flower.color_palette ?? []).forEach((hex) => {
                if (!colors.includes(hex)) colors.push(hex);
            });
        });
        return colors.slice(0, 4);
    }, [selectedItems]);

    const total = useMemo(() => {
        const flowersTotal = selectedItems.reduce((sum, i) => sum + i.subtotal, 0);
        return selectedItems.length > 0 ? flowersTotal + wrappingFee : 0;
    }, [selectedItems, wrappingFee]);

    const combinedLanguages = selectedItems
        .map((i) => `${i.flower.name}：${i.flower.flower_language}`)
        .join(' / ');

    const submit = (e) => {
        e.preventDefault();
        form.transform(() => ({
            bouquet_name: bouquetName,
            items: selectedItems.map((i) => ({
                flower_id: i.flower.id,
                quantity: i.quantity,
            })),
        }));
        form.post(route('bouquet.store'));
    };

    return (
        <ShopLayout wide hideTitle>
            <Head title="花束を作る" />

            <ShopHero
                title="Build"
                subtitle="配色を見ながら、想いの花束を一点ものに"
                breadcrumbs={[
                    { label: '花一覧', href: route('flowers.index') },
                    { label: '花束を作る' },
                ]}
            />

            <form onSubmit={submit} className="mt-8">
                {/* カラーフィルター（2枚目参考） */}
                <Box className="mb-8 rounded-xl border border-stone-200 bg-stone-50 p-6">
                    <h2 className="font-serif text-sm font-semibold uppercase tracking-wider text-stone-800">
                        カラーで選ぶ
                    </h2>
                    <p className="mt-1 text-xs text-stone-500">花の配色から、束ねたいイメージを選びましょう</p>
                    <Box className="mt-4 flex flex-wrap gap-3">
                        <button
                            type="button"
                            onClick={() => setColorFilter(null)}
                            className={`rounded-full px-4 py-1.5 text-sm ${
                                !colorFilter
                                    ? 'bg-stone-800 text-white'
                                    : 'bg-white text-stone-600 ring-1 ring-stone-200'
                            }`}
                        >
                            すべて
                        </button>
                        {COLOR_FILTERS.map((c) => (
                            <ColorSwatch
                                key={c.key}
                                hex={c.hex}
                                label={c.label}
                                selected={colorFilter === c.key}
                                border={c.border}
                                onClick={() => setColorFilter(c.key)}
                            />
                        ))}
                    </Box>
                </Box>

                <Box className="grid gap-10 lg:grid-cols-3">
                    {/* 3列グリッド（2枚目参考） */}
                    <Box className="lg:col-span-2">
                        <Box className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                            {filteredFlowers.map((flower) => {
                                const qty = quantities[flower.id] ?? 0;
                                const palette = flower.color_palette ?? [];

                                return (
                                    <Box
                                        key={flower.id}
                                        className={`relative flex overflow-hidden rounded-lg border bg-white transition ${
                                            qty > 0
                                                ? 'border-bloom-500 ring-2 ring-bloom-200'
                                                : 'border-stone-100 hover:shadow-md'
                                        }`}
                                    >
                                        <Box className="relative min-h-[180px] flex-1 overflow-hidden bg-stone-100">
                                            {flower.image && (
                                                <img
                                                    src={flower.image}
                                                    alt={flower.name}
                                                    className="h-full w-full object-cover"
                                                />
                                            )}
                                            <Box className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3 pt-8">
                                                <p className="text-sm font-medium text-white">{flower.name}</p>
                                                <p className="text-xs text-white/80">
                                                    {formatYen(flower.price)}
                                                </p>
                                            </Box>
                                        </Box>
                                        {palette.length > 0 && (
                                            <Box className="flex w-11 shrink-0 flex-col items-center justify-center gap-1 border-l border-stone-100 bg-stone-50 py-3">
                                                <ColorPalette palette={palette} orientation="vertical" />
                                            </Box>
                                        )}
                                        <Box className="absolute right-14 top-2 flex gap-1 sm:right-auto sm:left-2">
                                            <QtyBtn onClick={() => setQty(flower.id, qty - 1)}>−</QtyBtn>
                                            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-xs font-bold shadow">
                                                {qty}
                                            </span>
                                            <QtyBtn onClick={() => setQty(flower.id, qty + 1)}>＋</QtyBtn>
                                        </Box>
                                    </Box>
                                );
                            })}
                        </Box>
                    </Box>

                    <aside className="h-fit rounded-xl border border-stone-200 bg-white p-6 shadow-sm lg:sticky lg:top-24">
                        <h2 className="font-serif text-lg text-stone-900">花束プレビュー</h2>

                        {bouquetPalette.length > 0 && (
                            <Box className="mt-4 flex items-center gap-4 rounded-lg bg-stone-50 p-4">
                                <ColorPalette palette={bouquetPalette} label="束ねる配色" />
                                <p className="text-xs text-stone-500">選んだ花の配色イメージ</p>
                            </Box>
                        )}

                        <label className="mt-4 block text-sm text-stone-600">花束の名前</label>
                        <input
                            type="text"
                            value={bouquetName}
                            onChange={(e) => setBouquetName(e.target.value)}
                            className="mt-1 w-full rounded-lg border-stone-200"
                            maxLength={100}
                        />

                        {selectedItems.length > 0 ? (
                            <>
                                <ul className="mt-4 space-y-2 text-sm">
                                    {selectedItems.map((i) => (
                                        <li key={i.flower.id} className="flex justify-between">
                                            <span>
                                                {i.flower.name} × {i.quantity}
                                            </span>
                                            <span>{formatYen(i.subtotal)}</span>
                                        </li>
                                    ))}
                                    <li className="flex justify-between text-stone-500">
                                        <span>ラッピング</span>
                                        <span>{formatYen(wrappingFee)}</span>
                                    </li>
                                </ul>
                                {combinedLanguages && (
                                    <Box className="mt-4 rounded-lg bg-sage-50 p-3 text-xs text-sage-700">
                                        <p className="font-medium">花言葉</p>
                                        <p className="mt-1 leading-relaxed">{combinedLanguages}</p>
                                    </Box>
                                )}
                                <p className="mt-4 border-t border-stone-100 pt-4 text-lg font-medium">
                                    合計 {formatYen(total)}
                                </p>
                                <button
                                    type="submit"
                                    className="btn-primary mt-6 w-full"
                                    disabled={form.processing}
                                >
                                    カートに追加
                                </button>
                            </>
                        ) : (
                            <p className="mt-6 text-sm text-stone-500">
                                カードの＋で花を追加してください
                            </p>
                        )}
                    </aside>
                </Box>
            </form>
        </ShopLayout>
    );
}

function QtyBtn({ onClick, children }) {
    return (
        <button
            type="button"
            onClick={onClick}
            className="flex h-7 w-7 items-center justify-center rounded-full bg-white/90 text-sm shadow hover:bg-white"
        >
            {children}
        </button>
    );
}
