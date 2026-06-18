<?php

namespace App\Http\Controllers;

use App\Models\Flower;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class FlowerController extends Controller
{
    public function index(Request $request): Response
    {
        $query = Flower::active();

        if ($request->filled('category')) {
            $query->where('category', $request->category);
        }

        if ($request->filled('color')) {
            $query->where('color', $request->color);
        }

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('flower_language', 'like', "%{$search}%");
            });
        }

        if ($request->boolean('seasonal')) {
            $query->seasonal();
        }

        if ($request->filled('price_max')) {
            $query->where('price', '<=', (int) $request->price_max);
        }

        if ($request->filled('price_min')) {
            $query->where('price', '>=', (int) $request->price_min);
        }

        match ($request->get('sort', 'default')) {
            'price_asc' => $query->orderBy('price'),
            'price_desc' => $query->orderByDesc('price'),
            'name' => $query->orderBy('name'),
            default => $query->orderBy('category')->orderBy('name'),
        };

        $priceMin = (int) Flower::active()->min('price');
        $priceMax = (int) Flower::active()->max('price');

        $paginated = $query->paginate(12)->withQueryString();

        return Inertia::render('Flowers/Index', [
            'flowers' => $paginated,
            'categories' => Flower::categories(),
            'filters' => $request->only(['category', 'color', 'search', 'seasonal', 'price_min', 'price_max', 'sort']),
            'priceRange' => ['min' => $priceMin ?: 0, 'max' => $priceMax ?: 5000],
            'featured' => Flower::active()->orderByDesc('is_seasonal')->limit(3)->get(),
            'totalCount' => $paginated->total(),
        ]);
    }

    public function show(Flower $flower): Response
    {
        abort_unless($flower->is_active, 404);

        return Inertia::render('Flowers/Show', [
            'flower' => $flower,
            'related' => Flower::active()
                ->where('category', $flower->category)
                ->where('id', '!=', $flower->id)
                ->limit(4)
                ->get(),
        ]);
    }
}
