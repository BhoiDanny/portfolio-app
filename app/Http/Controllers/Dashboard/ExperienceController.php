<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Experience;
use App\Http\Requests\Dashboard\StoreExperienceRequest;
use App\Http\Requests\Dashboard\UpdateExperienceRequest;
use Inertia\Inertia;
use Illuminate\Support\Str;


class ExperienceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('dashboard/experience/index', [
            'experiences' => Experience::paginate()->sortByDesc('created_at')->toResourceCollection(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreExperienceRequest $request)
    {
        $validated = $request->validated();

        try {

            // Handle file upload
            if ($request->hasFile('logo')) {
                $validated['logo'] = $request->file('logo')->storeAs('experience_logos', Str::uuid() . '.' . $request->file('logo')->getClientOriginalExtension());
            }
            auth()->user()->experiences()->create($validated);
            return to_route('dashboard.experiences.index');
        } catch (\Exception $e) {
            return back()->with('error', 'Failed to create experience: ' . $e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Experience $experience)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Experience $experience)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateExperienceRequest $request, Experience $experience)
    {
        $validated = $request->validated();

        try {
            // Handle file upload
            if ($request->hasFile('logo')) {
                //? if the experience already has an image, delete it
                if ($experience->logo) {
                    $experience->deleteLogo();
                }
                $validated['logo'] = $request->file('logo')->storeAs('experience_logos', Str::uuid() . '.' . $request->file('logo')->getClientOriginalExtension());
            }

            $experience->update($validated);
            return to_route('dashboard.experiences.index');
        } catch (\Exception $e) {
            return back()->with('error', 'Failed to update experience: ' . $e->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Experience $experience)
    {
        try {
            if ($experience->logo) {
                $experience->deleteLogo();
            }

            // Delete the experience from the database
            $experience->forceDelete();

            return to_route('dashboard.experiences.index');
        } catch (\Exception $e) {
            return back()->with('error', 'Failed to delete experience: ' . $e->getMessage());
        }
    }
}