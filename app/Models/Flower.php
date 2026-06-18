<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Flower extends Model
{
    protected $fillable = [
        'name',
        'slug',
        'description',
        'price',
        'image',
        'flower_language',
        'color',
        'color_hex',
        'color_palette',
        'category',
        'stock',
        'is_seasonal',
        'season',
        'is_active',
    ];

    protected function casts(): array
    {
        return [
            'is_seasonal' => 'boolean',
            'is_active' => 'boolean',
            'color_palette' => 'array',
        ];
    }

    protected static function booted(): void
    {
        static::creating(function (Flower $flower) {
            if (empty($flower->slug)) {
                $flower->slug = Str::slug($flower->name);
            }
        });
    }

    public function scopeActive(Builder $query): Builder
    {
        return $query->where('is_active', true);
    }

    public function scopeSeasonal(Builder $query): Builder
    {
        return $query->where('is_seasonal', true);
    }

    public function getRouteKeyName(): string
    {
        return 'slug';
    }

    public static function categories(): array
    {
        return [
            'rose' => 'バラ',
            'tulip' => 'チューリップ',
            'carnation' => 'カーネーション',
            'lily' => 'ユリ',
            'sunflower' => 'ひまわり',
            'filler' => 'かすみ草・小花',
            'seasonal' => '季節の花',
            'other' => 'その他',
        ];
    }
}
