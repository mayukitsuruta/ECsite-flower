import FlowerCard from "@/Components/FlowerCard";
import ShopLayout from "@/Layouts/ShopLayout";
import { Head, Link } from "@inertiajs/react";

export default function Home({ seasonalFlowers, popularFlowers }) {
    return (
        <ShopLayout>
            <Head title="トップ" />

            <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-bloom-100 via-white to-sage-100 px-6 py-16 sm:px-12 sm:py-20">
                <div className="relative z-10 max-w-2xl">
                    <p className="text-sm font-medium uppercase tracking-widest text-bloom-600">
                        Omoi Bloom
                    </p>
                    <h1 className="mt-4 font-serif text-3xl leading-tight text-bloom-900 sm:text-4xl">
                        大切な人への想いを選び、
                        <br />
                        花で束ねる一点もの
                    </h1>
                    <p className="mt-6 text-stone-600">
                        花言葉を見ながら、あなただけの花束を。ネットで注文して、お近くの店舗で受け取れます。
                    </p>
                    <div className="mt-8 flex flex-wrap gap-3">
                        <Link
                            href={route("bouquet.builder")}
                            className="btn-primary"
                        >
                            花束を作る
                        </Link>
                        <Link
                            href={route("flowers.index")}
                            className="btn-secondary"
                        >
                            Shop — 花を選ぶ
                        </Link>
                    </div>
                </div>
                <div className="pointer-events-none absolute -right-8 top-8 text-[8rem] opacity-20 sm:text-[12rem]">
                    🌸
                </div>
            </section>

            <section className="mt-16">
                <div className="mb-8 flex items-end justify-between">
                    <div>
                        <h2 className="font-serif text-2xl text-bloom-900">
                            この季節のおすすめ
                        </h2>
                        <p className="mt-1 text-sm text-stone-500">
                            季節の花で、今の想いを伝えましょう
                        </p>
                    </div>
                    <Link
                        href={route("flowers.index", { seasonal: 1 })}
                        className="text-sm text-bloom-600 hover:underline"
                    >
                        すべて見る →
                    </Link>
                </div>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {seasonalFlowers.map((flower) => (
                        <FlowerCard key={flower.id} flower={flower} />
                    ))}
                </div>
            </section>

            <section className="mt-16 rounded-2xl border border-sage-200 bg-sage-50 p-8">
                <h2 className="font-serif text-xl text-sage-700">
                    想い束の3つの特徴
                </h2>
                <ul className="mt-6 grid gap-6 sm:grid-cols-3">
                    <Feature
                        icon="🌷"
                        title="自分で選んで組み合わせ"
                        text="おまかせではなく、一本一本あなたの手で選んだ花束。"
                    />
                    <Feature
                        icon="📖"
                        title="花言葉を見ながら選べる"
                        text="贈る想いにぴったりの花を、花言葉から見つけられます。"
                    />
                    <Feature
                        icon="🏪"
                        title="店舗受け取りOK"
                        text="ネット注文の便利さと、生花の鮮度を両立。"
                    />
                </ul>
            </section>

            <section className="mt-16">
                <h2 className="font-serif text-2xl text-bloom-900">人気の花</h2>
                <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {popularFlowers.map((flower) => (
                        <FlowerCard key={flower.id} flower={flower} />
                    ))}
                </div>
            </section>
        </ShopLayout>
    );
}

function Feature({ icon, title, text }) {
    return (
        <li>
            <span className="text-2xl">{icon}</span>
            <h3 className="mt-2 font-medium text-stone-800">{title}</h3>
            <p className="mt-1 text-sm text-stone-600">{text}</p>
        </li>
    );
}
