import ShopLayout from '@/Layouts/ShopLayout';
import { formatYen } from '@/Utils/format';
import { Head, Link, router, usePage } from '@inertiajs/react';

export default function CartIndex({ items, subtotal }) {
    const { auth } = usePage().props;
    const updateQty = (id, quantity) => {
        router.patch(route('cart.update', id), { quantity }, { preserveScroll: true });
    };

    const removeItem = (id) => {
        if (confirm('カートから削除しますか？')) {
            router.delete(route('cart.destroy', id), { preserveScroll: true });
        }
    };

    return (
        <ShopLayout title="ショッピングカート">
            <Head title="カート" />

            {items.length === 0 ? (
                <div className="py-16 text-center">
                    <p className="text-stone-500">カートは空です</p>
                    <Link href={route('flowers.index')} className="btn-primary mt-6 inline-flex">
                        花を選ぶ
                    </Link>
                </div>
            ) : (
                <div className="grid gap-10 lg:grid-cols-3">
                    <ul className="space-y-4 lg:col-span-2">
                        {items.map((item) => (
                            <li
                                key={item.id}
                                className="rounded-xl border border-bloom-100 bg-white p-4 sm:p-6"
                            >
                                <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
                                    <div>
                                        <span className="text-xs text-bloom-500">
                                            {item.item_type === 'bouquet' ? 'オリジナル花束' : '単品'}
                                        </span>
                                        <h3 className="font-serif text-lg text-bloom-900">
                                            {item.display_name}
                                        </h3>
                                        {item.bouquet_items && (
                                            <ul className="mt-2 space-y-1 text-sm text-stone-600">
                                                {item.bouquet_items.map((bi, idx) => (
                                                    <li key={idx}>
                                                        {bi.name} × {bi.quantity}
                                                        <span className="ml-2 text-xs text-sage-600">
                                                            （{bi.flower_language}）
                                                        </span>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                        <p className="mt-2 text-bloom-700">
                                            {formatYen(item.unit_price)}
                                            {item.item_type === 'flower' && ' / 本'}
                                        </p>
                                    </div>
                                    <div className="flex flex-col items-end gap-2">
                                        {item.item_type === 'flower' && (
                                            <div className="flex items-center gap-2">
                                                <button
                                                    type="button"
                                                    onClick={() => updateQty(item.id, item.quantity - 1)}
                                                    className="h-8 w-8 rounded-full border text-sm"
                                                >
                                                    −
                                                </button>
                                                <span>{item.quantity}</span>
                                                <button
                                                    type="button"
                                                    onClick={() => updateQty(item.id, item.quantity + 1)}
                                                    className="h-8 w-8 rounded-full border text-sm"
                                                >
                                                    ＋
                                                </button>
                                            </div>
                                        )}
                                        <p className="font-medium">{formatYen(item.line_total)}</p>
                                        <button
                                            type="button"
                                            onClick={() => removeItem(item.id)}
                                            className="text-xs text-red-500 hover:underline"
                                        >
                                            削除
                                        </button>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>

                    <aside className="h-fit rounded-2xl border border-bloom-200 bg-white p-6">
                        <h2 className="font-serif text-lg">お支払い金額</h2>
                        <p className="mt-4 text-2xl font-medium text-bloom-800">{formatYen(subtotal)}</p>
                        <p className="mt-2 text-xs text-stone-500">※ 配送料は注文時に計算（店舗受取は無料）</p>
                        <Link
                            href={auth.user ? route('checkout.index') : route('login')}
                            className="btn-primary mt-6 block w-full text-center"
                        >
                            {auth.user ? '注文に進む' : 'ログインして注文する'}
                        </Link>
                        <Link
                            href={route('bouquet.builder')}
                            className="btn-secondary mt-3 block w-full text-center"
                        >
                            花束を追加する
                        </Link>
                    </aside>
                </div>
            )}
        </ShopLayout>
    );
}
