import { Link } from '@inertiajs/react';

const Overlay = 'div';

export default function ShopHero({ title = 'Shop', subtitle, breadcrumbs = [] }) {
    return (
        <section className="relative -mx-4 sm:-mx-6 lg:-mx-8">
            <div className="relative h-48 overflow-hidden bg-stone-900 sm:h-56 md:h-64">
                <img
                    src="https://images.unsplash.com/photo-1597848212624-a19eb35eafc1?w=1600&q=80"
                    alt=""
                    className="h-full w-full object-cover opacity-70"
                />
                <Overlay className="absolute inset-0 bg-gradient-to-r from-stone-900/80 via-stone-900/40 to-transparent" />
                <h1 className="absolute inset-0 flex items-center justify-center font-serif text-4xl tracking-[0.2em] text-white sm:text-5xl">
                    {title}
                </h1>
            </div>
            {(breadcrumbs.length > 0 || subtitle) && (
                <div className="border-b border-stone-200 bg-white px-4 py-3 sm:px-6">
                    <nav className="mx-auto flex max-w-7xl items-center gap-2 text-sm text-stone-500">
                        <Link href={route('home')} className="hover:text-bloom-700">
                            ホーム
                        </Link>
                        {breadcrumbs.map((crumb, i) => (
                            <span key={i} className="flex items-center gap-2">
                                <span>/</span>
                                {crumb.href ? (
                                    <Link href={crumb.href} className="hover:text-bloom-700">
                                        {crumb.label}
                                    </Link>
                                ) : (
                                    <span className="text-stone-800">{crumb.label}</span>
                                )}
                            </span>
                        ))}
                    </nav>
                    {subtitle && (
                        <p className="mx-auto mt-1 max-w-7xl text-sm text-stone-500">{subtitle}</p>
                    )}
                </div>
            )}
        </section>
    );
}
