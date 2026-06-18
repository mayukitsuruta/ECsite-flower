<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CartItem extends Model
{
    protected $fillable = [
        'user_id',
        'session_id',
        'item_type',
        'flower_id',
        'bouquet_name',
        'bouquet_items',
        'quantity',
        'unit_price',
    ];

    protected function casts(): array
    {
        return [
            'bouquet_items' => 'array',
        ];
    }

    public function flower(): BelongsTo
    {
        return $this->belongsTo(Flower::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function lineTotal(): int
    {
        return $this->unit_price * $this->quantity;
    }

    public function displayName(): string
    {
        if ($this->item_type === 'bouquet') {
            return $this->bouquet_name ?? 'オリジナル花束';
        }

        return $this->flower?->name ?? '花';
    }
}
