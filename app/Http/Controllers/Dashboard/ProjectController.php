<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Requests\Dashboard\StoreProjectRequest;
use App\Models\Project;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    public function create(StoreProjectRequest $request)
    {
        $validated = $request->validated();

        // Handle file upload
        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('projects', 'public');
        }

        // Store the project in the database
        auth()->user()->projects()->create($validated);

        // Redirect back with success message
        return to_route('dashboard.projects');
    }

    public function update(StoreProjectRequest $request, Project $project)
    {
        $validated = $request->validated();

        // Handle file upload
        if ($request->hasFile('image')) {
            //? if the project already has an image, delete it
            if($project->image) {
                \Storage::disk('public')->delete($project->image);
            }
            $validated['image'] = $request->file('image')->store('projects', 'public');
        }

        // Update the project in the database
        $project->update($validated);

        // Redirect back with success message
        return to_route('dashboard.projects');
    }

    public function destroy(Project $project)
    {

        //? if the project has an image, delete it
        if($project->image) {
            \Storage::disk('public')->delete($project->image);
        }

        // Delete the project from the database
        $project->delete();

        // Redirect back with success message
        return to_route('dashboard.projects');
    }
}
