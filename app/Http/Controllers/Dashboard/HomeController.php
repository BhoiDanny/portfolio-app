<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Project;
use App\Models\Skill;
use App\Models\Experience;
use Inertia\Inertia;

class HomeController extends Controller
{

    public function index()
    {
        return Inertia::render('dashboard/index', [
            'counts' => [
                'projects' => Project::count(),
                'skills' => Skill::count(),
                'experiences' => Experience::count(),
            ],
            'projects' => Project::latest()->take(5)->get()->toResourceCollection(),
        ]);
    }

    public function analytics()
    {
        return Inertia::render('dashboard/analytics');
    }

    // public function aboutMe()
    // {
    //     return Inertia::render('dashboard/about');
    // }

    public function settings()
    {
        return Inertia::render('dashboard/settings');
    }
}