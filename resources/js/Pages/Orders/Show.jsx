import ShopLayout from '@/Layouts/ShopLayout';
import { formatYen } from '@/Utils/format';
import { Head, Link } from '@inertiajs/react';

const Box = 'div';

export default function OrdersShow({ order, statusLabels }) {
    return (
        <ShopLayout title="注文詳細">
            <Head title={`注文 ${order.order_number}`} />

            <Box className="mb-6 flex flex-wrap items-center justify-between gap-4">
                <Box>
                    <p className="font-mono text-bloom-600">{order.order_number}</p>
                    <p className="mt-1 text-sm text-stone-500">
                        {new Date(order.created_at).toLocaleString('ja-JP')}
                    </p>
                </Box>
                <span className="rounded-full bg-bloom-100 px-4 py-1.5 text-sm font-medium text-bloom-800">
                    {statusLabels[order.status] ?? order.status}
                </span>
            </Box>

            <Box className="grid gap-6 lg:grid-cols-2">
                <section className="rounded-xl border border-bloom-100 bg-white p-6">
                    <h2 className="font-medium text-bloom-800">注文内容</h2>
                    <ul className="mt-4 space-y-3">
                        {order.items.map((item) => (
                            <li key={item.id} className="border-b border-bloom-50 pb-3 last:border-0">
                                <p className="font-medium">{item.name}</p>
                                {item.bouquet_items && (
                                    <ul className="mt-1 text-sm text-stone-600">
                                        {item.bouquet_items.map((bi, i) => (
                                            <li key={i}>
                                                {bi.name} × {bi.quantity}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                                <p className="mt-1 text-sm text-bloom-700">
                                    {item.quantity}点 × {formatYen(item.unit_price)} ={' '}
                                    {formatYen(item.line_total)}
                                </p>
                            </li>
                        ))}
                    </ul>
                    <p className="mt-4 border-t border-bloom-100 pt-4 text-lg font-medium">
                        合計 {formatYen(order.total)}
                    </p>
                </section>

                <section className="rounded-xl border border-bloom-100 bg-white p-6">
                    <h2 className="font-medium text-bloom-800">お届け・受取</h2>
                    <dl className="mt-4 space-y-3 text-sm">
                        <Box>
                            <dt className="text-stone-500">方法</dt>
                            <dd>{order.fulfillment_type === 'pickup' ? '店舗受け取り' : '配送'}</dd>
                        </Box>
                        {order.pickup_store && (
                            <Box>
                                <dt className="text-stone-500">店舗</dt>
                                <dd>{order.pickup_store}</dd>
                            </Box>
                        )}
                        {order.pickup_at && (
                            <Box>
                                <dt className="text-stone-500">受取日時</dt>
                                <dd>{new Date(order.pickup_at).toLocaleString('ja-JP')}</dd>
                            </Box>
                        )}
                        {order.delivery_address && (
                            <Box>
                                <dt className="text-stone-500">お届け先</dt>
                                <dd className="whitespace-pre-wrap">{order.delivery_address}</dd>
                            </Box>
                        )}
                        <Box>
                            <dt className="text-stone-500">お名前</dt>
                            <dd>{order.recipient_name}</dd>
                        </Box>
                        <Box>
                            <dt className="text-stone-500">電話</dt>
                            <dd>{order.recipient_phone}</dd>
                        </Box>
                        {order.message_card && (
                            <Box>
                                <dt className="text-stone-500">メッセージカード</dt>
                                <dd className="whitespace-pre-wrap">{order.message_card}</dd>
                            </Box>
                        )}
                    </dl>
                </section>
            </Box>

            <Link href={route('orders.index')} className="btn-secondary mt-8 inline-flex">
                注文一覧へ
            </Link>
        </ShopLayout>
    );
}
