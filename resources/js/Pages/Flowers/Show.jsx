import ColorPalette from '@/Components/ColorPalette';
import FlowerCard from '@/Components/FlowerCard';
import ShopLayout from '@/Layouts/ShopLayout';
import { formatYen } from '@/Utils/format';
import { Head, Link, useForm } from '@inertiajs/react';

const Box = 'div';

export default function FlowersShow({ flower, related }) {
    const form = useForm({ flower_id: flower.id, quantity: 1 });
    const palette = flower.color_palette ?? [];

    const addToCart = (e) => {
        e.preventDefault();
        form.post(route('cart.store'), { preserveScroll: true });
    };

    return (
        <ShopLayout wide>
            <Head title={flower.name} />

            <nav className="mb-6 text-sm text-stone-500">
                <Link href={route('home')} className="hover:text-bloom-700">
                    ホーム
                </Link>
                <span className="mx-2">/</span>
                <Link href={route('flowers.index')} className="hover:text-bloom-700">
                    Shop
                </Link>
                <span className="mx-2">/</span>
                <span className="text-stone-800">{flower.name}</span>
            </nav>

            <Box className="grid gap-10 lg:grid-cols-2">
                <Box className="relative flex overflow-hidden rounded-2xl bg-stone-100">
                    {flower.image ? (
                        <img
                            src={flower.image}
                            alt={flower.name}
                            className="aspect-square w-full object-cover"
                        />
                    ) : (
                        <Box className="flex aspect-square w-full items-center justify-center text-8xl">
                            🌸
                        </Box>
                    )}
                    {palette.length > 0 && (
                        <Box className="absolute right-0 top-0 flex h-full w-14 flex-col items-center justify-center gap-2 border-l border-white/20 bg-white/80 backdrop-blur-sm">
                            <span className="text-[10px] font-medium uppercase tracking-wider text-stone-400 [writing-mode:vertical-rl]">
                                花の配色
                            </span>
                            <ColorPalette palette={palette} orientation="vertical" />
                        </Box>
                    )}
                </Box>

                <Box>
                    <p className="text-xs font-medium uppercase tracking-wider text-stone-400">
                        花言葉
                    </p>
                    <p className="mt-1 font-serif text-xl text-bloom-800">{flower.flower_language}</p>
                    <h1 className="mt-4 font-serif text-3xl text-stone-900">{flower.name}</h1>
                    {flower.color && (
                        <Box className="mt-3 flex items-center gap-2">
                            <span
                                className="h-5 w-5 rounded-full ring-1 ring-stone-200"
                                style={{ backgroundColor: flower.color_hex ?? '#ccc' }}
                            />
                            <span className="text-sm text-stone-500">{flower.color}</span>
                        </Box>
                    )}
                    <p className="mt-4 text-2xl font-medium text-stone-800">{formatYen(flower.price)}</p>

                    {flower.is_seasonal && flower.season && (
                        <span className="mt-3 inline-block bg-stone-900 px-3 py-1 text-xs uppercase tracking-wide text-white">
                            Season · {flower.season}
                        </span>
                    )}

                    {flower.description && (
                        <p className="mt-6 leading-relaxed text-stone-600">{flower.description}</p>
                    )}

                    <form onSubmit={addToCart} className="mt-8 flex flex-wrap items-end gap-4 border-t border-stone-200 pt-8">
                        <Box>
                            <label className="text-sm text-stone-600">数量</label>
                            <input
                                type="number"
                                min={1}
                                max={20}
                                value={form.data.quantity}
                                onChange={(e) =>
                                    form.setData('quantity', parseInt(e.target.value, 10))
                                }
                                className="mt-1 block w-24 rounded-lg border-stone-200"
                            />
                        </Box>
                        <button type="submit" className="btn-primary" disabled={form.processing}>
                            カートに追加
                        </button>
                        <Link href={route('bouquet.builder')} className="btn-secondary">
                            花束に追加して作る
                        </Link>
                    </form>
                </Box>
            </Box>

            {related.length > 0 && (
                <section className="mt-16 border-t border-stone-200 pt-12">
                    <h2 className="font-serif text-xl text-stone-900">あわせて選ばれている花</h2>
                    <Box className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {related.map((f) => (
                            <FlowerCard key={f.id} flower={f} />
                        ))}
                    </Box>
                </section>
            )}
        </ShopLayout>
    );
}
