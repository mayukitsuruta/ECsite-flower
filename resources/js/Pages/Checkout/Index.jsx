import ShopLayout from '@/Layouts/ShopLayout';
import { formatYen } from '@/Utils/format';
import { Head, useForm, usePage } from '@inertiajs/react';

export default function CheckoutIndex({ items, subtotal, stores }) {
    const { auth } = usePage().props;

    const form = useForm({
        fulfillment_type: 'pickup',
        pickup_store: Object.keys(stores)[0] ?? '',
        pickup_at: '',
        recipient_name: auth.user?.name ?? '',
        recipient_phone: '',
        delivery_address: '',
        message_card: '',
        notes: '',
    });

    const deliveryFee = form.data.fulfillment_type === 'delivery' ? 800 : 0;
    const total = subtotal + deliveryFee;

    const submit = (e) => {
        e.preventDefault();
        form.post(route('checkout.store'));
    };

    const minPickup = new Date();
    minPickup.setDate(minPickup.getDate() + 1);
    const minPickupStr = minPickup.toISOString().slice(0, 16);

    return (
        <ShopLayout title="ご注文">
            <Head title="注文" />

            <form onSubmit={submit} className="grid gap-10 lg:grid-cols-3">
                <div className="space-y-6 lg:col-span-2">
                    <fieldset className="rounded-xl border border-bloom-100 bg-white p-6">
                        <legend className="px-2 font-medium text-bloom-800">受け取り方法</legend>
                        <label className="mt-4 flex cursor-pointer items-center gap-3">
                            <input
                                type="radio"
                                name="fulfillment_type"
                                value="pickup"
                                checked={form.data.fulfillment_type === 'pickup'}
                                onChange={() => form.setData('fulfillment_type', 'pickup')}
                                className="text-bloom-600 focus:ring-bloom-500"
                            />
                            <span>店舗受け取り（おすすめ・無料）</span>
                        </label>
                        <label className="mt-3 flex cursor-pointer items-center gap-3">
                            <input
                                type="radio"
                                name="fulfillment_type"
                                value="delivery"
                                checked={form.data.fulfillment_type === 'delivery'}
                                onChange={() => form.setData('fulfillment_type', 'delivery')}
                                className="text-bloom-600 focus:ring-bloom-500"
                            />
                            <span>配送（+{formatYen(800)}）</span>
                        </label>
                    </fieldset>

                    {form.data.fulfillment_type === 'pickup' && (
                        <fieldset className="rounded-xl border border-bloom-100 bg-white p-6">
                            <legend className="px-2 font-medium text-bloom-800">店舗・日時</legend>
                            <select
                                value={form.data.pickup_store}
                                onChange={(e) => form.setData('pickup_store', e.target.value)}
                                className="mt-4 w-full rounded-lg border-bloom-200"
                            >
                                {Object.entries(stores).map(([key, label]) => (
                                    <option key={key} value={key}>
                                        {label}
                                    </option>
                                ))}
                            </select>
                            <label className="mt-4 block text-sm text-stone-600">受取希望日時</label>
                            <input
                                type="datetime-local"
                                min={minPickupStr}
                                value={form.data.pickup_at}
                                onChange={(e) => form.setData('pickup_at', e.target.value)}
                                className="mt-1 w-full rounded-lg border-bloom-200"
                                required
                            />
                        </fieldset>
                    )}

                    {form.data.fulfillment_type === 'delivery' && (
                        <fieldset className="rounded-xl border border-bloom-100 bg-white p-6">
                            <legend className="px-2 font-medium text-bloom-800">お届け先</legend>
                            <textarea
                                value={form.data.delivery_address}
                                onChange={(e) => form.setData('delivery_address', e.target.value)}
                                rows={3}
                                className="mt-4 w-full rounded-lg border-bloom-200"
                                placeholder="〒・住所・建物名"
                                required
                            />
                        </fieldset>
                    )}

                    <fieldset className="rounded-xl border border-bloom-100 bg-white p-6">
                        <legend className="px-2 font-medium text-bloom-800">贈り先・連絡先</legend>
                        <label className="mt-4 block text-sm">お名前</label>
                        <input
                            type="text"
                            value={form.data.recipient_name}
                            onChange={(e) => form.setData('recipient_name', e.target.value)}
                            className="mt-1 w-full rounded-lg border-bloom-200"
                            required
                        />
                        <label className="mt-4 block text-sm">電話番号</label>
                        <input
                            type="tel"
                            value={form.data.recipient_phone}
                            onChange={(e) => form.setData('recipient_phone', e.target.value)}
                            className="mt-1 w-full rounded-lg border-bloom-200"
                            required
                        />
                        <label className="mt-4 block text-sm">メッセージカード（任意）</label>
                        <textarea
                            value={form.data.message_card}
                            onChange={(e) => form.setData('message_card', e.target.value)}
                            rows={2}
                            maxLength={200}
                            className="mt-1 w-full rounded-lg border-bloom-200"
                            placeholder="花束に添えるメッセージ"
                        />
                        <label className="mt-4 block text-sm">備考（任意）</label>
                        <textarea
                            value={form.data.notes}
                            onChange={(e) => form.setData('notes', e.target.value)}
                            rows={2}
                            className="mt-1 w-full rounded-lg border-bloom-200"
                        />
                    </fieldset>
                </div>

                <aside className="h-fit rounded-2xl border border-bloom-200 bg-white p-6">
                    <h2 className="font-serif text-lg">注文内容</h2>
                    <ul className="mt-4 space-y-2 text-sm">
                        {items.map((item) => (
                            <li key={item.id} className="flex justify-between gap-2">
                                <span className="truncate">{item.display_name}</span>
                                <span className="shrink-0">{formatYen(item.line_total)}</span>
                            </li>
                        ))}
                    </ul>
                    <div className="mt-4 space-y-1 border-t border-bloom-100 pt-4 text-sm">
                        <p className="flex justify-between">
                            <span>小計</span>
                            <span>{formatYen(subtotal)}</span>
                        </p>
                        {deliveryFee > 0 && (
                            <p className="flex justify-between">
                                <span>配送料</span>
                                <span>{formatYen(deliveryFee)}</span>
                            </p>
                        )}
                        <p className="flex justify-between text-lg font-medium text-bloom-800">
                            <span>合計</span>
                            <span>{formatYen(total)}</span>
                        </p>
                    </div>
                    <button type="submit" className="btn-primary mt-6 w-full" disabled={form.processing}>
                        注文を確定する
                    </button>
                    {Object.keys(form.errors).length > 0 && (
                        <ul className="mt-4 text-sm text-red-600">
                            {Object.values(form.errors).map((err, i) => (
                                <li key={i}>{err}</li>
                            ))}
                        </ul>
                    )}
                </aside>
            </form>
        </ShopLayout>
    );
}
