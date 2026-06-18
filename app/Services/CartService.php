<?php

namespace App\Services;

use App\Models\CartItem;
use App\Models\Flower;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;

class CartService
{
    public function __construct(protected Request $request) {}

    public function query()
    {
        $query = CartItem::with('flower');

        if ($user = $this->request->user()) {
            return $query->where('user_id', $user->id);
        }

        return $query->where('session_id', $this->sessionId());
    }

    public function items(): Collection
    {
        return $this->query()->orderBy('created_at')->get();
    }

    public function count(): int
    {
        return (int) $this->query()->sum('quantity');
    }

    public function subtotal(): int
    {
        return $this->items()->sum(fn (CartItem $item) => $item->lineTotal());
    }

    public function addFlower(Flower $flower, int $quantity = 1): void
    {
        $existing = $this->query()
            ->where('item_type', 'flower')
            ->where('flower_id', $flower->id)
            ->first();

        if ($existing) {
            $existing->update([
                'quantity' => $existing->quantity + $quantity,
            ]);

            return;
        }

        CartItem::create([
            'user_id' => $this->request->user()?->id,
            'session_id' => $this->request->user() ? null : $this->sessionId(),
            'item_type' => 'flower',
            'flower_id' => $flower->id,
            'quantity' => $quantity,
            'unit_price' => $flower->price,
        ]);
    }

    public function addBouquet(string $name, array $composition, int $wrappingFee = 500): void
    {
        $total = $wrappingFee;
        $items = [];

        foreach ($composition as $row) {
            $flower = Flower::findOrFail($row['flower_id']);
            $qty = (int) $row['quantity'];
            $total += $flower->price * $qty;
            $items[] = [
                'flower_id' => $flower->id,
                'name' => $flower->name,
                'flower_language' => $flower->flower_language,
                'quantity' => $qty,
                'unit_price' => $flower->price,
            ];
        }

        CartItem::create([
            'user_id' => $this->request->user()?->id,
            'session_id' => $this->request->user() ? null : $this->sessionId(),
            'item_type' => 'bouquet',
            'bouquet_name' => $name,
            'bouquet_items' => $items,
            'quantity' => 1,
            'unit_price' => $total,
        ]);
    }

    public function updateQuantity(CartItem $item, int $quantity): void
    {
        if ($quantity < 1) {
            $item->delete();

            return;
        }

        $item->update(['quantity' => $quantity]);
    }

    public function clear(): void
    {
        $this->query()->delete();
    }

    public function mergeGuestCart(int $userId): void
    {
        $sessionId = $this->sessionId();

        CartItem::where('session_id', $sessionId)->update([
            'user_id' => $userId,
            'session_id' => null,
        ]);
    }

    protected function sessionId(): string
    {
        if (! $this->request->session()->has('cart_session_id')) {
            $this->request->session()->put('cart_session_id', (string) str()->uuid());
        }

        return $this->request->session()->get('cart_session_id');
    }
}
