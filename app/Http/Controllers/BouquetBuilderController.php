<?php

namespace App\Http\Controllers;

use App\Models\Flower;
use App\Services\CartService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class BouquetBuilderController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Bouquet/Builder', [
            'flowers' => Flower::active()->orderBy('category')->orderBy('name')->get(),
            'categories' => Flower::categories(),
            'wrappingFee' => 500,
        ]);
    }

    public function store(Request $request, CartService $cart): RedirectResponse
    {
        $validated = $request->validate([
            'bouquet_name' => ['required', 'string', 'max:100'],
            'items' => ['required', 'array', 'min:1'],
            'items.*.flower_id' => ['required', 'exists:flowers,id'],
            'items.*.quantity' => ['required', 'integer', 'min:1', 'max:20'],
        ]);

        $composition = collect($validated['items'])
            ->filter(fn ($item) => $item['quantity'] > 0)
            ->values()
            ->all();

        if (empty($composition)) {
            return back()->withErrors(['items' => '花を1つ以上選んでください。']);
        }

        $cart->addBouquet($validated['bouquet_name'], $composition);

        return redirect()->route('cart.index')->with('success', 'オリジナル花束をカートに追加しました。');
    }
}
