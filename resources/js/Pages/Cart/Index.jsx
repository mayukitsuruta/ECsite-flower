import ShopLayout from '@/Layouts/ShopLayout';
import { formatYen } from '@/Utils/format';
import { Head, Link, router } from '@inertiajs/react';
import { useEffect, useState } from 'react';

function MessageCardThumb() {
    return (
        <img
            src="/images/messagecard.png"
            alt="メッセージカード"
            className="h-24 w-24 shrink-0 rounded-lg border border-stone-200 object-contain bg-stone-50"
        />
    );
}

function MessageEditor({ item }) {
    const [texts, setTexts] = useState(item.message_texts ?? []);
    const [editingIndex, setEditingIndex] = useState(null);

    useEffect(() => {
        setTexts(item.message_texts ?? []);
    }, [item.message_texts]);

    const save = (next) => {
        router.patch(
            route('cart.update', item.id),
            { message_texts: next },
            { preserveScroll: true },
        );
    };

    return (
        <div className="mt-4 space-y-3">
            {texts.map((text, index) => (
                <div key={index} className="relative rounded-md border border-stone-800 p-4 pr-24">
                    {editingIndex === index ? (
                        <textarea
                            value={text}
                            onChange={(e) => {
                                const next = [...texts];
                                next[index] = e.target.value;
                                setTexts(next);
                            }}
                            onBlur={(e) => {
                                const next = [...texts];
                                next[index] = e.target.value;
                                setTexts(next);
                                setEditingIndex(null);
                                save(next);
                            }}
                            rows={3}
                            maxLength={200}
                            className="w-full resize-none border-0 bg-transparent p-0 text-sm text-stone-700 focus:ring-0"
                            autoFocus
                        />
                    ) : (
                        <p className="whitespace-pre-wrap text-sm leading-relaxed text-stone-700">
                            {text || '（メッセージ未入力）'}
                        </p>
                    )}
                    <button
                        type="button"
                        onClick={() => setEditingIndex(index)}
                        className="absolute bottom-3 right-3 rounded border border-stone-400 px-3 py-1 text-xs text-stone-700 hover:bg-stone-50"
                    >
                        編集する
                    </button>
                </div>
            ))}
        </div>
    );
}

export default function CartIndex({ items, subtotal }) {
    const updateQty = (id, quantity) => {
        router.patch(route('cart.update', id), { quantity }, { preserveScroll: true });
    };

    const removeItem = (id) => {
        if (confirm('カートから削除しますか？')) {
            router.delete(route('cart.destroy', id), { preserveScroll: true });
        }
    };

    // 商品の直後に、その商品に付属したメッセージカードが来るように並べ替え
    const orderedItems = [...items].sort((a, b) => {
        const aKey = a.item_type === 'message_card'
            ? `flower-${a.flower_id}-card`
            : `flower-${a.flower_id || a.id}`;
        const bKey = b.item_type === 'message_card'
            ? `flower-${b.flower_id}-card`
            : `flower-${b.flower_id || b.id}`;
        if (aKey === bKey) return 0;
        return aKey.localeCompare(bKey);
    });

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
                    <ul className="divide-y divide-stone-200 lg:col-span-2">
                        {orderedItems.map((item) => (
                            <li
                                key={item.id}
                                className={`py-6 ${item.item_type === 'message_card' ? 'bg-stone-50/70 pl-4 sm:pl-8' : ''}`}
                            >
                                <div className="flex gap-4 sm:gap-6">
                                    {item.item_type === 'message_card' ? (
                                        <MessageCardThumb />
                                    ) : item.flower?.image ? (
                                        <img
                                            src={item.flower.image}
                                            alt={item.display_name}
                                            className="h-24 w-24 shrink-0 rounded-lg object-cover"
                                        />
                                    ) : (
                                        <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-lg bg-stone-100 text-2xl">
                                            🌸
                                        </div>
                                    )}

                                    <div className="min-w-0 flex-1">
                                        <h3 className="font-serif text-lg text-stone-900">
                                            {item.display_name}
                                        </h3>
                                        {item.item_type === 'message_card' && item.attached_flower_name && (
                                            <p className="mt-0.5 text-sm text-stone-500">
                                                「{item.attached_flower_name}」に添付
                                            </p>
                                        )}
                                        {item.item_type === 'bouquet' && item.bouquet_items && (
                                            <ul className="mt-1 space-y-0.5 text-sm text-stone-500">
                                                {item.bouquet_items.map((bi, idx) => (
                                                    <li key={idx}>
                                                        {bi.name} × {bi.quantity}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                        <p className="mt-1 text-stone-800">
                                            {formatYen(item.unit_price)}
                                        </p>

                                        <div className="mt-3 flex items-center gap-4">
                                            {(item.item_type === 'flower' || item.item_type === 'message_card') && (
                                                <div className="inline-flex items-center rounded-full bg-stone-100 px-2 py-1 text-sm">
                                                    <button
                                                        type="button"
                                                        onClick={() => updateQty(item.id, item.quantity - 1)}
                                                        className="h-7 w-7 text-stone-600"
                                                    >
                                                        −
                                                    </button>
                                                    <span className="w-6 text-center">{item.quantity}</span>
                                                    <button
                                                        type="button"
                                                        onClick={() => updateQty(item.id, item.quantity + 1)}
                                                        className="h-7 w-7 text-stone-600"
                                                    >
                                                        ＋
                                                    </button>
                                                </div>
                                            )}
                                            <button
                                                type="button"
                                                onClick={() => removeItem(item.id)}
                                                className="text-sm text-red-500 hover:underline"
                                            >
                                                削除
                                            </button>
                                        </div>

                                        {item.item_type === 'message_card' && (
                                            <MessageEditor item={item} />
                                        )}
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>

                    <aside className="h-fit border-l-0 border-stone-200 lg:border-l lg:pl-8">
                        <h2 className="font-serif text-lg">
                            注文内容 {items.length}件
                        </h2>
                        <div className="mt-4 space-y-2 text-sm text-stone-600">
                            <p className="flex justify-between">
                                <span>商品合計</span>
                                <span>{formatYen(subtotal)}</span>
                            </p>
                            <p className="flex justify-between">
                                <span>送料</span>
                                <span>店舗受取は無料</span>
                            </p>
                        </div>
                        <p className="mt-4 text-xl font-medium text-stone-900">
                            合計 {formatYen(subtotal)}
                        </p>
                        <Link
                            href={route('checkout.start')}
                            className="btn-primary mt-6 block w-full text-center"
                        >
                            購入手続きへ
                        </Link>
                    </aside>
                </div>
            )}
        </ShopLayout>
    );
}