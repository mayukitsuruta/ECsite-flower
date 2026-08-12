<?php

namespace App\Http\Controllers;

use App\Models\Flower;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Home', [
            'shopFlowers' => Flower::active()
                ->where('category', 'bouquet')
                ->where('is_seasonal', false)
                ->orderBy('id')
                ->get(),
            'seasonalFlowers' => Flower::active()
                ->where('category', 'bouquet')
                ->seasonal()
                ->orderBy('id')
                ->get(),
        ]);
    }
}
