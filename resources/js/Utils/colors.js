/** サイドバー・カード用のカラーフィルター定義 */
export const COLOR_FILTERS = [
    { key: '赤', label: '赤', hex: '#C41E3A' },
    { key: 'ピンク', label: 'ピンク', hex: '#F4A6B8' },
    { key: '白', label: '白', hex: '#F5F5F0', border: true },
    { key: '黄', label: '黄', hex: '#F5C542' },
    { key: 'オレンジ', label: 'オレンジ', hex: '#E87C3E' },
    { key: '青', label: '青', hex: '#4A7BB7' },
    { key: '紫', label: '紫', hex: '#9B7BB8' },
    { key: '緑', label: '緑', hex: '#6B8E6B' },
];

export function defaultPalette(hex) {
    return [hex, hex, hex, hex];
}
