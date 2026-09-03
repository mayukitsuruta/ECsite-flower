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

    public function isMessageCard(): bool
    {
        return $this->item_type === 'message_card'
            || ($this->bouquet_name === 'メッセージカード' && (int) $this->unit_price === 0);
    }

    public function displayName(): string
    {
        if ($this->isMessageCard()) {
            return 'メッセージカード';
        }

        if ($this->item_type === 'bouquet') {
            return $this->bouquet_name ?? 'オリジナル花束';
        }

        return $this->flower?->name ?? '花';
    }

    public function messageTexts(): array
    {
        if (! $this->isMessageCard()) {
            return [];
        }

        $items = $this->bouquet_items ?? [];

        return array_map(
            fn ($row) => is_array($row) ? (string) ($row['text'] ?? '') : (string) $row,
            $items
        );
    }

    public function parentCartItemId(): ?int
    {
        if (! $this->isMessageCard()) {
            return null;
        }

        $first = $this->bouquet_items[0] ?? [];

        if (is_array($first) && isset($first['parent_cart_item_id'])) {
            return (int) $first['parent_cart_item_id'];
        }

        return null;
    }

    public function attachedName(): ?string
    {
        if (! $this->isMessageCard()) {
            return null;
        }

        if ($this->flower?->name) {
            return $this->flower->name;
        }

        $first = $this->bouquet_items[0] ?? [];

        if (is_array($first) && ! empty($first['attached_name'])) {
            return (string) $first['attached_name'];
        }

        return null;
    }

    public function attachmentMeta(): array
    {
        $first = $this->bouquet_items[0] ?? [];

        if (! is_array($first)) {
            return [];
        }

        $meta = [];

        if (isset($first['parent_cart_item_id'])) {
            $meta['parent_cart_item_id'] = (int) $first['parent_cart_item_id'];
        }

        if (! empty($first['attached_name'])) {
            $meta['attached_name'] = (string) $first['attached_name'];
        }

        return $meta;
    }
}
