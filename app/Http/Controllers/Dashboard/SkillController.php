<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Requests\Dashboard\StoreSkillRequest;
use App\Models\Category;
use App\Models\Skill;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SkillController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('dashboard/skills/index', [
            'categories' => Category::all()->toResourceCollection(),
            //? paginate
            'skills' => Skill::with('category')->paginate(15)->toResourceCollection(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreSkillRequest $request)
    {
        $validated = $request->validated();

        try {
            Skill::create($validated);

            return to_route('dashboard.skills.index');
        } catch (\Throwable $th) {
            return back()->with('error', 'Something went wrong');
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Skill $skill)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Skill $skill)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(StoreSkillRequest $request, Skill $skill)
    {
        $validated = $request->validated();
        try {
            $skill->update($validated);

            return to_route('dashboard.skills.index');
        } catch (\Throwable $th) {
            return back()->with('error', 'Something went wrong');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Skill $skill)
    {
        try {
            $skill->forceDelete();

            return to_route('dashboard.skills.index');
        } catch (\Throwable $th) {
            return back()->with('error', 'Something went wrong');
        }
    }
}