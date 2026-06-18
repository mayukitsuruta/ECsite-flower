<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Order extends Model
{
    protected $fillable = [
        'user_id',
        'order_number',
        'status',
        'subtotal',
        'total',
        'fulfillment_type',
        'pickup_store',
        'pickup_at',
        'recipient_name',
        'recipient_phone',
        'delivery_address',
        'message_card',
        'notes',
    ];

    protected function casts(): array
    {
        return [
            'pickup_at' => 'datetime',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function items(): HasMany
    {
        return $this->hasMany(OrderItem::class);
    }

    public static function statusLabels(): array
    {
        return [
            'pending' => '受付済み',
            'confirmed' => '制作中',
            'ready' => '店舗受取可能',
            'completed' => '完了',
            'cancelled' => 'キャンセル',
        ];
    }
}
