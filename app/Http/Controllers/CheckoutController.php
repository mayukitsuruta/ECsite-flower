<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\User;
use App\Services\CartService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Inertia\Response;

class CheckoutController extends Controller
{
    public function start(CartService $cart): Response|RedirectResponse
    {
        if ($cart->items()->isEmpty()) {
            return redirect()->route('cart.index')->with('error', 'カートが空です。');
        }

        return Inertia::render('Checkout/Start');
    }

    public function index(CartService $cart): Response|RedirectResponse
    {
        if ($cart->items()->isEmpty()) {
            return redirect()->route('cart.index')->with('error', 'カートが空です。');
        }

        $items = $cart->items()->map(fn ($item) => [
            'id' => $item->id,
            'display_name' => $item->displayName(),
            'line_total' => $item->lineTotal(),
            'item_type' => $item->isMessageCard() ? 'message_card' : $item->item_type,
        ]);

        $messageFromCart = $cart->items()
            ->filter(fn ($item) => $item->isMessageCard())
            ->flatMap(fn ($item) => $item->messageTexts())
            ->filter()
            ->implode("\n\n");

        return Inertia::render('Checkout/Index', [
            'items' => $items,
            'subtotal' => $cart->subtotal(),
            'messageFromCart' => $messageFromCart,
            'stores' => [
                'omoi-shibuya' => '想い束 渋谷店（東京都渋谷区神南1-1-1）',
                'omoi-nakameguro' => '想い束 中目黒店（東京都目黒区上目黑2-2-2）',
            ],
        ]);
    }

    public function store(Request $request, CartService $cart): RedirectResponse
    {
        if ($cart->items()->isEmpty()) {
            return redirect()->route('cart.index')->with('error', 'カートが空です。');
        }

        $validated = $request->validate([
            'fulfillment_type' => ['required', 'in:pickup,delivery'],
            'pickup_store' => ['required_if:fulfillment_type,pickup', 'nullable', 'string'],
            'pickup_at' => ['required_if:fulfillment_type,pickup', 'nullable', 'date', 'after:now'],
            'recipient_name' => ['required', 'string', 'max:100'],
            'recipient_phone' => ['required', 'string', 'max:20'],
            'delivery_address' => ['required_if:fulfillment_type,delivery', 'nullable', 'string', 'max:500'],
            'message_card' => ['nullable', 'string', 'max:2000'],
            'notes' => ['nullable', 'string', 'max:500'],
        ]);

        $subtotal = $cart->subtotal();
        $deliveryFee = $validated['fulfillment_type'] === 'delivery' ? 800 : 0;
        $total = $subtotal + $deliveryFee;

        $order = DB::transaction(function () use ($request, $cart, $validated, $subtotal, $total) {
            $user = $request->user();

            if (! $user) {
                $user = User::create([
                    'name' => $validated['recipient_name'],
                    'email' => 'guest-'.str()->uuid().'@guest.omoibouquet.jp',
                    'password' => Hash::make(str()->random(32)),
                ]);
                Auth::login($user);
                $cart->mergeGuestCart($user->id);
            }

            $order = Order::create([
                'user_id' => $user->id,
                'order_number' => 'OM-'.now()->format('Ymd').'-'.strtoupper(str()->random(6)),
                'status' => 'pending',
                'subtotal' => $subtotal,
                'total' => $total,
                'fulfillment_type' => $validated['fulfillment_type'],
                'pickup_store' => $validated['pickup_store'] ?? null,
                'pickup_at' => $validated['pickup_at'] ?? null,
                'recipient_name' => $validated['recipient_name'],
                'recipient_phone' => $validated['recipient_phone'],
                'delivery_address' => $validated['delivery_address'] ?? null,
                'message_card' => $validated['message_card']
                    ?: ($cart->items()
                        ->filter(fn ($item) => $item->isMessageCard())
                        ->flatMap(fn ($item) => $item->messageTexts())
                        ->filter()
                        ->implode("\n\n") ?: null),
                'notes' => $validated['notes'] ?? null,
            ]);

            foreach ($cart->items() as $item) {
                OrderItem::create([
                    'order_id' => $order->id,
                    'item_type' => $item->item_type,
                    'flower_id' => $item->flower_id,
                    'name' => $item->displayName(),
                    'bouquet_items' => $item->bouquet_items,
                    'quantity' => $item->quantity,
                    'unit_price' => $item->unit_price,
                    'line_total' => $item->lineTotal(),
                ]);
            }

            $cart->clear();

            return $order;
        });

        return redirect()->route('orders.show', $order)->with('success', 'ご注文を承りました。');
    }
}
