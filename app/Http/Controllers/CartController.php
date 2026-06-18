<?php

namespace App\Http\Controllers;

use App\Models\CartItem;
use App\Models\Flower;
use App\Services\CartService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CartController extends Controller
{
    public function index(CartService $cart): Response
    {
        $items = $cart->items()->map(function (CartItem $item) {
            return [
                'id' => $item->id,
                'item_type' => $item->item_type,
                'display_name' => $item->displayName(),
                'quantity' => $item->quantity,
                'unit_price' => $item->unit_price,
                'line_total' => $item->lineTotal(),
                'flower' => $item->flower,
                'bouquet_name' => $item->bouquet_name,
                'bouquet_items' => $item->bouquet_items,
            ];
        });

        return Inertia::render('Cart/Index', [
            'items' => $items,
            'subtotal' => $cart->subtotal(),
        ]);
    }

    public function store(Request $request, CartService $cart): RedirectResponse
    {
        $validated = $request->validate([
            'flower_id' => ['required', 'exists:flowers,id'],
            'quantity' => ['integer', 'min:1', 'max:99'],
        ]);

        $flower = Flower::active()->findOrFail($validated['flower_id']);
        $cart->addFlower($flower, $validated['quantity'] ?? 1);

        return back()->with('success', 'カートに追加しました。');
    }

    public function update(Request $request, CartItem $cartItem, CartService $cart): RedirectResponse
    {
        $this->authorizeCartItem($cartItem, $cart);

        $validated = $request->validate([
            'quantity' => ['required', 'integer', 'min:0', 'max:99'],
        ]);

        $cart->updateQuantity($cartItem, $validated['quantity']);

        return back()->with('success', 'カートを更新しました。');
    }

    public function destroy(CartItem $cartItem, CartService $cart): RedirectResponse
    {
        $this->authorizeCartItem($cartItem, $cart);
        $cartItem->delete();

        return back()->with('success', 'カートから削除しました。');
    }

    protected function authorizeCartItem(CartItem $item, CartService $cart): void
    {
        $owned = $cart->items()->contains('id', $item->id);
        abort_unless($owned, 403);
    }
}
