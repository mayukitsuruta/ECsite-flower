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

        if ($request->filled('purpose')) {
            $keywords = $this->purposeKeywords((string) $request->input('purpose'));
            if ($keywords !== []) {
                $query->where(function ($q) use ($keywords) {
                    foreach ($keywords as $word) {
                        $q->orWhere('flower_language', 'like', "%{$word}%")
                            ->orWhere('name', 'like', "%{$word}%");
                    }
                });
            }
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
            default => $query->orderByRaw("category = 'bouquet' desc")->orderByDesc('is_seasonal')->orderBy('id'),
        };

        $priceMin = (int) Flower::active()->min('price');
        $priceMax = (int) Flower::active()->max('price');

        $paginated = $query->paginate(16)->withQueryString();

        return Inertia::render('Flowers/Index', [
            'flowers' => $paginated,
            'categories' => Flower::categories(),
            'filters' => $request->only(['category', 'color', 'search', 'seasonal', 'price_min', 'price_max', 'sort', 'purpose']),
            'priceRange' => ['min' => $priceMin ?: 0, 'max' => $priceMax ?: 5000],
            'featured' => Flower::active()->orderByDesc('is_seasonal')->limit(3)->get(),
            'ranking' => Flower::active()
                ->where('category', 'bouquet')
                ->where('is_seasonal', false)
                ->orderBy('id')
                ->limit(5)
                ->get(),
            'totalCount' => $paginated->total(),
        ]);
    }

    /**
     * @return list<string>
     */
    private function purposeKeywords(string $purpose): array
    {
        return match ($purpose) {
            'birthday' => ['幸福', '喜び', '輝き', '無邪気'],
            'gift' => ['感謝', '思いやり', '優美'],
            'wedding' => ['愛', '純潔', '永遠', '祝福'],
            'sympathy' => ['威厳', '清らか'],
            'anniversary' => ['愛情', '持続', '永遠'],
            'opening' => ['希望', '新しい'],
            'visit' => ['穏やか', '誠実', '明るい'],
            default => [],
        };
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
