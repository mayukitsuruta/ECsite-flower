<?php

namespace Database\Seeders;

use App\Models\Flower;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class FlowerSeeder extends Seeder
{
    /** @var array<string, array{hex: string, palette: array<string>}> */
    private array $colorMap = [
        '赤' => ['hex' => '#C41E3A', 'palette' => ['#8B1538', '#C41E3A', '#E8A0A8', '#4A1520']],
        'ピンク' => ['hex' => '#F4A6B8', 'palette' => ['#E8B4C8', '#F4A6B8', '#FADCE4', '#C97B8F']],
        '白' => ['hex' => '#F5F5F0', 'palette' => ['#FFFFFF', '#F5F5F0', '#E8E4DC', '#D4CFC4']],
        '黄' => ['hex' => '#F5C542', 'palette' => ['#E8B820', '#F5C542', '#8B9A3C', '#4A6741']],
        'オレンジ' => ['hex' => '#E87C3E', 'palette' => ['#D4652A', '#E87C3E', '#F5A962', '#8B4513']],
        '青' => ['hex' => '#4A7BB7', 'palette' => ['#2E5A8A', '#4A7BB7', '#8BAED4', '#1A3A5C']],
        '紫' => ['hex' => '#9B7BB8', 'palette' => ['#7B5A9E', '#9B7BB8', '#C4B0D4', '#4A3560']],
        '緑' => ['hex' => '#6B8E6B', 'palette' => ['#4A6741', '#6B8E6B', '#A8C4A0', '#2D4A28']],
    ];

    public function run(): void
    {
        $flowers = [
            [
                'name' => '赤バラ（1本）',
                'description' => '情熱的で力強い印象。特別な日の贈り物に。',
                'price' => 800,
                'image' => 'https://images.unsplash.com/photo-1518895949257-7621c3c786d4?w=600&q=80',
                'flower_language' => '情熱・愛・美',
                'color' => '赤',
                'category' => 'rose',
                'is_seasonal' => false,
            ],
            [
                'name' => 'ピンクバラ（1本）',
                'description' => 'やわらかく上品なピンク。感謝や初恋の気持ちを伝えます。',
                'price' => 750,
                'image' => 'https://images.unsplash.com/photo-1582794543131-59203a520f2e?w=600&q=80',
                'flower_language' => '感謝・優美・幸福',
                'color' => 'ピンク',
                'category' => 'rose',
                'is_seasonal' => false,
            ],
            [
                'name' => '白バラ（1本）',
                'description' => '清らかで誠実なイメージ。新しい始まりにも。',
                'price' => 750,
                'image' => 'https://images.unsplash.com/photo-1561181286-d3fee7d5eaa0?w=600&q=80',
                'flower_language' => '純潔・尊敬・新しい始まり',
                'color' => '白',
                'category' => 'rose',
                'is_seasonal' => false,
            ],
            [
                'name' => '赤チューリップ',
                'description' => '春の定番。ストレートな愛情表現に。',
                'price' => 400,
                'image' => 'https://images.unsplash.com/photo-1520763185295-fb34c374b561?w=600&q=80',
                'flower_language' => '愛の告白・真実の愛',
                'color' => '赤',
                'category' => 'tulip',
                'is_seasonal' => true,
                'season' => '春',
            ],
            [
                'name' => 'ピンクチューリップ',
                'description' => '春らしい柔らかな色合い。大切な人への気持ちに。',
                'price' => 380,
                'image' => 'https://images.unsplash.com/photo-1615485925617-37f3430b25e1?w=600&q=80',
                'flower_language' => '永遠の愛・幸福',
                'color' => 'ピンク',
                'category' => 'tulip',
                'is_seasonal' => true,
                'season' => '春',
            ],
            [
                'name' => 'ピンクカーネーション',
                'description' => '母の日や感謝の贈り物に人気の定番。',
                'price' => 350,
                'image' => 'https://images.unsplash.com/photo-1563241527-3004b5be0ffd?w=600&q=80',
                'flower_language' => '感謝・温かい心',
                'color' => 'ピンク',
                'category' => 'carnation',
                'is_seasonal' => false,
            ],
            [
                'name' => '白ユリ',
                'description' => '上品で華やか。お祝いやフォーマルなシーンに。',
                'price' => 600,
                'image' => 'https://images.unsplash.com/photo-1591886960571-74d43a7094e6?w=600&q=80',
                'flower_language' => '純潔・威厳・祝福',
                'color' => '白',
                'category' => 'lily',
                'is_seasonal' => false,
            ],
            [
                'name' => 'ひまわり（1本）',
                'description' => '明るく元気な印象。夏の贈り物にぴったり。',
                'price' => 450,
                'image' => 'https://images.unsplash.com/photo-1597848212624-a19eb35eafc1?w=600&q=80',
                'flower_language' => '憧れ・情熱・あなただけを見つめる',
                'color' => '黄',
                'category' => 'sunflower',
                'is_seasonal' => true,
                'season' => '夏',
            ],
            [
                'name' => 'かすみ草',
                'description' => '花束の彩りに。ナチュラルな雰囲気をプラス。',
                'price' => 280,
                'image' => 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=600&q=80',
                'flower_language' => '感謝・清らかな心・幸福',
                'color' => '白',
                'category' => 'filler',
                'is_seasonal' => false,
            ],
            [
                'name' => 'ラベンダー',
                'description' => '落ち着いた香りと色。リラックスした贈り物に。',
                'price' => 420,
                'image' => 'https://images.unsplash.com/photo-1499002238440-d264edd596ec?w=600&q=80',
                'flower_language' => '期待・沈黙・あなたを待っています',
                'color' => '紫',
                'category' => 'seasonal',
                'is_seasonal' => true,
                'season' => '初夏',
            ],
            [
                'name' => 'アジサイ（青）',
                'description' => '梅雨の季節を彩る。想いを静かに伝える花。',
                'price' => 550,
                'image' => 'https://images.unsplash.com/photo-1591886960571-74d43a7094e6?w=600&q=80',
                'flower_language' => '移り気・辛抱強さ・家族愛',
                'color' => '青',
                'category' => 'seasonal',
                'is_seasonal' => true,
                'season' => '梅雨',
            ],
            [
                'name' => 'ガーベラ（オレンジ）',
                'description' => '明るく親しみやすい。日常の贈り物にも。',
                'price' => 320,
                'image' => 'https://images.unsplash.com/photo-1455659814943-a5209ad8615a?w=600&q=80',
                'flower_language' => '神秘・希望・常に前進',
                'color' => 'オレンジ',
                'category' => 'other',
                'is_seasonal' => false,
            ],
        ];

        foreach ($flowers as $data) {
            $colorKey = $data['color'] ?? '白';
            $colorData = $this->colorMap[$colorKey] ?? $this->colorMap['白'];

            Flower::updateOrCreate(
                ['slug' => Str::slug($data['name'])],
                array_merge($data, [
                    'slug' => Str::slug($data['name']),
                    'stock' => 100,
                    'is_active' => true,
                    'color_hex' => $colorData['hex'],
                    'color_palette' => $colorData['palette'],
                ])
            );
        }
    }
}
