import ColorSwatch from './ColorSwatch';

/**
 * 2枚目参考：花束カード横の縦型カラーパレット（花艺配色）
 */
export default function ColorPalette({
    palette = [],
    label = '花の配色',
    orientation = 'vertical',
    className = '',
}) {
    if (!palette?.length) return null;

    const isVertical = orientation === 'vertical';

    return (
        <div
            className={`flex ${isVertical ? 'flex-col items-center gap-1.5' : 'flex-row gap-1.5'} ${className}`}
        >
            {isVertical && (
                <span className="mb-1 text-[10px] font-medium uppercase tracking-wider text-stone-400">
                    {label}
                </span>
            )}
            {palette.slice(0, 4).map((hex, i) => (
                <ColorSwatch key={i} hex={hex} size="sm" border={hex === '#F5F5F0'} />
            ))}
        </div>
    );
}
