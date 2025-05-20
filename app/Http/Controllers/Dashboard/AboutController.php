<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Requests\Dashboard\UpdateAboutRequest;
use App\Http\Resources\AboutResource;
use App\Models\About;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class AboutController extends Controller
{
    public function index()
    {
        return Inertia::render('dashboard/about', [
            'about' => AboutResource::make(About::first()),
        ]);
    }

    public function update(UpdateAboutRequest $request)
    {
        $validated = $request->validated();

        try {

            //? check if the about exists
            $about = About::first();
            if (!$about) {
                return back()->with('error', 'About not found');
            }

            //? check and delete logos that exists already are not in trustedby logo
            if (isset($validated['trusted_by'])) {
                foreach ($about->trusted_by as $key => $item) {
                    if (isset($item['logo'])) {
                        $logo = $item['logo'];
                        if (!in_array($logo, array_column($validated['trusted_by'], 'logo'))) {
                            Storage::disk('public')->delete($logo);
                        }
                    }
                }
            }

            $about->update($validated);

            return to_route('dashboard.about.index')->with('success', 'About updated successfully');
        } catch (\Exception $e) {
            //? delete the files if exists
            if ($request->hasFile('profile_picture') && isset($validated['profile_picture'])) {
                Storage::disk('public')->delete($validated['profile_picture']);
            }
            if ($request->hasFile('trusted_by.*.logo') && isset($validated['trusted_by'])) {
                foreach ($validated['trusted_by'] as $key => $item) {
                    if (isset($item['logo'])) {
                        Storage::disk('public')->delete($item['logo']);
                    }
                }
            }

            return back()->with('error', $e->getMessage());
        }
    }
}