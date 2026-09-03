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
                'item_type' => $item->isMessageCard() ? 'message_card' : $item->item_type,
                'display_name' => $item->displayName(),
                'quantity' => $item->quantity,
                'unit_price' => $item->unit_price,
                'line_total' => $item->lineTotal(),
                'flower' => $item->flower,
                'flower_id' => $item->flower_id,
                'attached_flower_name' => $item->isMessageCard() ? $item->attachedName() : null,
                'attached_to_id' => $item->isMessageCard()
                    ? ($item->flower_id ?? $item->parentCartItemId())
                    : ($item->flower_id ?? $item->id),
                'sort_group' => $item->isMessageCard()
                    ? ($item->flower_id ? 'f-'.$item->flower_id : 'b-'.$item->parentCartItemId())
                    : ($item->item_type === 'flower' ? 'f-'.$item->flower_id : 'b-'.$item->id),
                'bouquet_name' => $item->bouquet_name,
                'bouquet_items' => $item->bouquet_items,
                'message_texts' => $item->messageTexts(),
            ];
        });

        return Inertia::render('Cart/Index', [
            'items' => $items,
            'subtotal' => $cart->subtotal(),
        ]);
    }

    public function store(Request $request, CartService $cart): RedirectResponse
    {
        if ($request->input('item_type') === 'message_card') {
            $validated = $request->validate([
                'flower_id' => ['required', 'exists:flowers,id'],
                'quantity' => ['integer', 'min:1', 'max:99'],
                'message' => ['nullable', 'string', 'max:200'],
            ]);

            $flower = Flower::active()->findOrFail($validated['flower_id']);
            $cart->addFlowerWithMessageCard(
                $flower,
                $validated['quantity'] ?? 1,
                $validated['message'] ?? ''
            );

            return redirect()->route('cart.index')->with('success', '商品とメッセージカードをカートに追加しました。');
        }

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

        if ($request->has('message_texts')) {
            abort_unless($cartItem->isMessageCard(), 403);

            $validated = $request->validate([
                'message_texts' => ['required', 'array', 'min:1', 'max:20'],
                'message_texts.*' => ['nullable', 'string', 'max:200'],
            ]);

            $cart->updateMessageTexts($cartItem, $validated['message_texts']);

            return back()->with('success', 'メッセージを更新しました。');
        }

        $validated = $request->validate([
            'quantity' => ['required', 'integer', 'min:0', 'max:99'],
        ]);

        $cart->updateQuantity($cartItem, $validated['quantity']);

        return back()->with('success', 'カートを更新しました。');
    }

    public function destroy(CartItem $cartItem, CartService $cart): RedirectResponse
    {
        $this->authorizeCartItem($cartItem, $cart);

        // 商品を削除したら、付属のメッセージカードも削除
        if ($cartItem->isMessageCard()) {
            $cartItem->delete();
        } elseif ($cartItem->item_type === 'flower' && $cartItem->flower_id) {
            $flowerId = $cartItem->flower_id;
            $cartItem->delete();
            $cart->items()
                ->filter(fn (CartItem $item) => $item->isMessageCard() && (int) $item->flower_id === (int) $flowerId)
                ->each->delete();
        } elseif ($cartItem->item_type === 'bouquet') {
            $bouquetId = $cartItem->id;
            $cartItem->delete();
            $cart->items()
                ->filter(fn (CartItem $item) => $item->isMessageCard() && $item->parentCartItemId() === $bouquetId)
                ->each->delete();
        } else {
            $cartItem->delete();
        }

        return back()->with('success', 'カートから削除しました。');
    }

    protected function authorizeCartItem(CartItem $item, CartService $cart): void
    {
        $owned = $cart->items()->contains('id', $item->id);
        abort_unless($owned, 403);
    }
}
