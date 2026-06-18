import ShopLayout from '@/Layouts/ShopLayout';
import { formatYen } from '@/Utils/format';
import { Head, Link } from '@inertiajs/react';

export default function OrdersIndex({ orders, statusLabels }) {
    return (
        <ShopLayout title="注文履歴">
            <Head title="注文履歴" />

            {orders.data.length === 0 ? (
                <p className="py-12 text-center text-stone-500">まだ注文がありません</p>
            ) : (
                <ul className="space-y-4">
                    {orders.data.map((order) => (
                        <li key={order.id}>
                            <Link
                                href={route('orders.show', order.id)}
                                className="block rounded-xl border border-bloom-100 bg-white p-4 transition hover:shadow-md sm:p-6"
                            >
                                <div className="flex flex-wrap items-center justify-between gap-2">
                                    <div>
                                        <p className="font-mono text-sm text-bloom-600">
                                            {order.order_number}
                                        </p>
                                        <p className="mt-1 text-sm text-stone-500">
                                            {new Date(order.created_at).toLocaleDateString('ja-JP')}
                                        </p>
                                    </div>
                                    <span className="rounded-full bg-bloom-100 px-3 py-1 text-sm text-bloom-800">
                                        {statusLabels[order.status] ?? order.status}
                                    </span>
                                    <p className="font-medium text-bloom-800">{formatYen(order.total)}</p>
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </ShopLayout>
    );
}
