import ColorPalette from '@/Components/ColorPalette';
import { formatYen } from '@/Utils/format';
import { Link } from '@inertiajs/react';

/**
 * 参考1: 商品カード（画像・バッジ・タイトル・価格・カラースウッチ）
 * 参考2: 画像横に縦型カラーパレット
 */
export default function FlowerCard({ flower, layout = 'grid' }) {
    const palette =
        flower.color_palette?.length > 0
            ? flower.color_palette
            : flower.color_hex
              ? [flower.color_hex, flower.color_hex, flower.color_hex, flower.color_hex]
              : [];

    if (layout === 'palette') {
        return (
            <Link
                href={route('flowers.show', flower.slug)}
                className="group relative flex overflow-hidden rounded-lg border border-stone-100 bg-white shadow-sm transition hover:shadow-md"
            >
                <div className="relative flex-1 aspect-[3/4] min-h-[200px] overflow-hidden bg-stone-100">
                    {flower.is_seasonal && (
                        <span className="absolute left-2 top-2 z-10 bg-stone-900 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-white">
                            Season
                        </span>
                    )}
                    {flower.image ? (
                        <img
                            src={flower.image}
                            alt={flower.name}
                            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                            loading="lazy"
                        />
                    ) : (
                        <div className="flex h-full items-center justify-center text-4xl">🌸</div>
                    )}
                </div>
                {palette.length > 0 && (
                    <div className="flex w-12 shrink-0 flex-col items-center justify-center border-l border-stone-100 bg-stone-50/80 py-4">
                        <ColorPalette palette={palette} orientation="vertical" />
                    </div>
                )}
                <div className="absolute bottom-0 left-0 right-12 bg-gradient-to-t from-black/60 to-transparent p-4 pt-12">
                    <h3 className="font-serif text-white">{flower.name}</h3>
                    <p className="mt-0.5 text-sm text-white/90">{formatYen(flower.price)}</p>
                </div>
            </Link>
        );
    }

    return (
        <Link href={route('flowers.show', flower.slug)} className="group block">
            <div className="overflow-hidden rounded-lg border border-stone-100 bg-white shadow-sm transition hover:shadow-md">
                <div className="relative aspect-[3/4] overflow-hidden bg-stone-100">
                    {flower.is_seasonal && (
                        <span className="absolute left-3 top-3 z-10 bg-white px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-stone-800">
                            New
                        </span>
                    )}
                    {flower.image ? (
                        <img
                            src={flower.image}
                            alt={flower.name}
                            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                            loading="lazy"
                        />
                    ) : (
                        <div className="flex h-full items-center justify-center text-4xl">🌸</div>
                    )}
                </div>
                <div className="p-4 text-center">
                    <h3 className="font-serif text-base text-stone-800 group-hover:text-bloom-700">
                        {flower.name}
                    </h3>
                    <p className="mt-1 text-sm text-stone-600">{formatYen(flower.price)}</p>
                    {palette.length > 0 && (
                        <div className="mt-3 flex justify-center gap-1.5">
                            {palette.slice(0, 4).map((hex, i) => (
                                <span
                                    key={i}
                                    className={`h-4 w-4 rounded-full ${hex === '#F5F5F0' ? 'ring-1 ring-stone-300' : ''}`}
                                    style={{ backgroundColor: hex }}
                                />
                            ))}
                        </div>
                    )}
                    <p className="mt-2 text-xs text-stone-400 line-clamp-1">{flower.flower_language}</p>
                </div>
            </div>
        </Link>
    );
}
