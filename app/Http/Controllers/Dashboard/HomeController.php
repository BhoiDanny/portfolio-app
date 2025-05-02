<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{

    public function index()
    {
        return Inertia::render('dashboard/index');
    }

    public function projects()
    {
        return Inertia::render('dashboard/projects');
    }

    public function skills()
    {
        return Inertia::render('dashboard/skills');
    }

    public function experience()
    {
        return Inertia::render('dashboard/experiences');
    }

    public function profile()
    {
        return Inertia::render('dashboard/profile');
    }

    public function settings()
    {
        return Inertia::render('dashboard/settings');
    }
}