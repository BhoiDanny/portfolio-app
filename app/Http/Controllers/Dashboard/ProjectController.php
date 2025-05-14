<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Requests\Dashboard\StoreProjectRequest;
use App\Models\Project;
use Inertia\Inertia;
use Throwable;

class ProjectController extends Controller
{
    /**
     * @throws Throwable
     */
    public function index()
    {
        return Inertia::render('dashboard/projects/index', [
            'projects' => Project::paginate()->sortByDesc('created_at')->toResourceCollection(),
            'trash_count' => Project::onlyTrashed()->count(),
        ]);
    }

    public function store(StoreProjectRequest $request)
    {
        $validated = $request->validated();

        // Handle file upload
        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('projects', 'public');
        }

        // Store the project in the database
        auth()->user()->projects()->create($validated);

        // Redirect back with success message
        return to_route('dashboard.projects.index');
    }

    public function update(StoreProjectRequest $request, Project $project)
    {
        $validated = $request->validated();

        // Handle file upload
        if ($request->hasFile('image')) {
            //? if the project already has an image, delete it
            if ($project->image) {
                $project->deleteImage();
            }
            $validated['image'] = $request->file('image')->store('projects', 'public');
        }

        //? check if image exist and not changed

        // Update the project in the database
        $project->update($validated);

        // Redirect back with success message
        return to_route('dashboard.projects.index');
    }

    public function destroy(Project $project)
    {

        // Delete the project from the database
        $project->delete();

        // Redirect back with success message
        return to_route('dashboard.projects.index');
    }

    /**
     * @throws Throwable
     */
    public function trashed()
    {
        return Inertia::render('dashboard/projects/trashed', [
            'projects' => Project::onlyTrashed()->paginate()->sortByDesc('created_at')->toResourceCollection(),
        ]);
    }

    public function restore($project)
    {
        // Find the project by ID
        $project = Project::onlyTrashed()->findOrFail($project);

        // Restore the project from the trash
        $project->restore();

        // Redirect back with success message
        return to_route('dashboard.projects.trashed');
    }

    public function forceDelete($project)
    {
        // Find the project by ID
        $project = Project::withTrashed()->findOrFail($project);

        //? Check if the project has an image and delete it
        if ($project->image) {
            $project->deleteImage();
        }

        // Permanently delete the project from the database
        $project->forceDelete();

        // Redirect back with success message
        return to_route('dashboard.projects.trashed');
    }
}