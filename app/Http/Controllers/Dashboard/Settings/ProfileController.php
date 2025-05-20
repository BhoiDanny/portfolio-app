<?php

namespace App\Http\Controllers\Dashboard\Settings;

use App\Http\Controllers\Controller;
use App\Http\Requests\Dashboard\Settings\ProfileUpdateRequest;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Illuminate\Support\Str;

class ProfileController extends Controller
{
    public function edit()
    {
        return Inertia::render('dashboard/profile');
    }

    public function update(ProfileUpdateRequest $request)
    {
        $validated = $request->validated();
        try {

            $request->user()->update($validated);

            return to_route('dashboard.profile.edit');
        } catch (\Exception $e) {
            //? Delete the file if it exists
            if ($request->hasFile('avatar') && isset($validated['avatar'])) {
                Storage::disk('public')->delete($validated['avatar']);
            }
            if ($request->hasFile('resume_url') && isset($validated['resume_url'])) {
                Storage::disk('public')->delete($validated['resume_url']);
            }

            return back()->with('error', $e->getMessage());
        }
    }
}
