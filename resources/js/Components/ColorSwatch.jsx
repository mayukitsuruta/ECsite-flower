export default function ColorSwatch({
    hex,
    label,
    selected = false,
    size = 'md',
    onClick,
    showLabel = false,
    border = false,
}) {
    const sizes = {
        sm: 'h-5 w-5',
        md: 'h-7 w-7',
        lg: 'h-9 w-9',
    };

    const needsBorder = border || hex === '#F5F5F0' || hex?.toLowerCase() === '#ffffff';

    const inner = (
        <span
            className={`block rounded-full shadow-sm transition ${sizes[size] ?? sizes.md} ${
                needsBorder ? 'ring-1 ring-stone-300' : ''
            } ${selected ? 'ring-2 ring-stone-800 ring-offset-2' : ''}`}
            style={{ backgroundColor: hex }}
            title={label}
        />
    );

    if (onClick) {
        return (
            <button
                type="button"
                onClick={onClick}
                className="group flex items-center gap-2 rounded-lg py-1 text-left transition hover:bg-stone-50"
            >
                {inner}
                {showLabel && (
                    <span className="text-sm text-stone-600 group-hover:text-stone-900">{label}</span>
                )}
            </button>
        );
    }

    return (
        <span className="flex items-center gap-2">
            {inner}
            {showLabel && <span className="text-sm text-stone-600">{label}</span>}
        </span>
    );
}
