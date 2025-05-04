<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProjectResource;
use App\Http\Resources\UserResource;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Project;

class HomeController extends Controller
{

    public function index()
    {
        return Inertia::render('dashboard/index');
    }

    /**
     * @throws \Throwable
     */
    public function projects()
    {
        return Inertia::render('dashboard/projects', [
            'projects' => Project::paginate()->sortByDesc('created_at')->toResourceCollection(),
        ]);
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
