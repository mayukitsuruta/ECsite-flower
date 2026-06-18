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
            'seasonalFlowers' => Flower::active()
                ->seasonal()
                ->orderBy('name')
                ->limit(6)
                ->get(),
            'popularFlowers' => Flower::active()
                ->orderBy('price')
                ->limit(4)
                ->get(),
        ]);
    }
}
