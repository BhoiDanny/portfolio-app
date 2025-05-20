<?php

namespace App\Http\Requests\Dashboard;

use App\Models\About;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Str;

class UpdateAboutRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        //dd($this);
        return [
            'title' => ['required', 'string', 'max:255'],
            'profile_picture' => ['nullable', 'image', 'mimes:jpg,jpeg,png', 'max:5120'],
            'email' => ['nullable', 'email', 'max:255'],
            'phone' => ['nullable', 'string', 'max:255'],
            'address' => ['nullable', 'string'],
            'location' => ['nullable', 'string'],
            'description' => ['required', 'array'],
            'description.*' => ['nullable', 'string'],
            'trusted_by' => ['required', 'array'],
            'trusted_by.*' => ['nullable', 'array'],
            'trusted_by.*.name' => ['required', 'string'],
            'trusted_by.*.logo' => ['nullable', 'image', 'mimes:jpg,jpeg,png', 'max:5120'],
            'trusted_by.*.url' => ['nullable', 'string'],
            'statistics' => ['required', 'array'],
            'statistics.*' => ['nullable', 'array'],
            'statistics.*.label' => ['required', 'string'],
            'statistics.*.value' => ['required', 'string'],
            'social_links' => ['required', 'array'],
            'social_links.*' => ['nullable', 'array'],
            'social_links.*.platform' => ['required', 'string'],
            'social_links.*.url' => ['nullable', 'string'],
        ];
    }

    /**
     * Get custom attributes for validator errors.
     *
     * @return array<string, string>
     */
    public function attributes(): array
    {
        return [
            'title' => 'Title',
            'profile_picture' => 'Profile Picture',
            'email' => 'Email',
            'phone' => 'Phone',
            'address' => 'Address',
            'location' => 'Location',
            'description' => 'Description',
            'description.*' => 'Description Item',
            'trusted_by' => 'Trusted By',
            'trusted_by.*' => 'Trusted By Item',
            'trusted_by.*.name' => 'Trusted By Name',
            'trusted_by.*.logo' => 'Trusted By Logo',
            'trusted_by.*.url' => 'Trusted By URL',
            'statistics' => 'Statistics',
            'statistics.*' => 'Statistics Item',
            'statistics.*.label' => 'Statistics Label',
            'statistics.*.value' => 'Statistics Value',
            'social_links' => 'Social Links',
            'social_links.*' => 'Social Link Item',
            'social_links.*.platform' => 'Social Links Platform',
            'social_links.*.url' => 'Social Links URL',
        ];
    }

    /**
     * Get the error messages for the defined validation rules.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'title.required' => 'The :attribute field is required.',
            'title.string' => 'The :attribute field must be a string.',
            'title.max' => 'The :attribute field must not exceed :max characters.',
            'profile_picture.image' => 'The :attribute field must be an image.',
            'profile_picture.mimes' => 'The :attribute field must be a file of type: :values.',
            'profile_picture.max' => 'The :attribute field must not exceed :max kilobytes.',
            'email.email' => 'The :attribute field must be a valid email address.',
            'email.max' => 'The :attribute field must not exceed :max characters.',
            'phone.string' => 'The :attribute field must be a string.',
            'phone.max' => 'The :attribute field must not exceed :max characters.',
            'address.string' => 'The :attribute field must be a string.',
            'location.string' => 'The :attribute field must be a string.',
            'description.required' => 'The :attribute field is required.',
            'description.array' => 'The :attribute field must be an array.',
            'description.*.string' => 'The :attribute field must be a string.',
            'trusted_by.required' => ':attribute cannot be empty, please add at least one.',
            'trusted_by.array' => 'The :attribute field must be an array.',
            'trusted_by.*.array' => 'The :attribute field must be an array.',
            'trusted_by.*.name.required' => 'The :attribute field is required.',
            'trusted_by.*.name.string' => 'The :attribute field must be a string.',
            'trusted_by.*.logo.image' => 'The :attribute field must be an image.',
            'trusted_by.*.logo.mimes' => 'The :attribute field must be a file of type: :values.',
            'trusted_by.*.logo.max' => 'The :attribute field must not exceed :max kilobytes.',
            'trusted_by.*.url.string' => 'The :attribute field must be a string.',
            'statistics.required' => ':attribute cannot be empty, please add at least one.',
            'statistics.array' => 'The :attribute field must be an array.',
            'statistics.*.array' => 'The :attribute field must be an array.',
            'statistics.*.label.required' => 'The :attribute field is required.',
            'statistics.*.label.string' => 'The :attribute field must be a string.',
            'statistics.*.value.required' => 'The :attribute field is required.',
            'statistics.*.value.string' => 'The :attribute field must be a string.',
            'social_links.required' => ':attribute cannot be empty, please add at least one.',
            'social_links.array' => 'The :attribute field must be an array.',
            'social_links.*.array' => 'The :attribute field must be an array.',
            'social_links.*.platform.required' => 'The :attribute field is required.',
            'social_links.*.platform.string' => 'The :attribute field must be a string.',
            'social_links.*.url.string' => 'The :attribute field must be a string.',
        ];
    }

    public function validated($key = null, $default = null)
    {
        $validated = parent::validated($key, $default);

        $about = About::first();

        if (isset($validated['description'])) {
            $validated['description'] = array_filter($validated['description']);
        }

        if (isset($validated['statistics'])) {
            $validated['statistics'] = array_filter($validated['statistics']);
        }

        if (isset($validated['social_links'])) {
            $validated['social_links'] = array_filter($validated['social_links']);
        }

        if (isset($validated['trusted_by'])) {
            $validated['trusted_by'] = array_filter($validated['trusted_by']);
        }

        if ($this->hasFile('profile_picture')) {
            //? delete the old file if exists
            if ($about && $about->profile_picture) {
                $about->deleteProfilePicture();
            }
            $validated['profile_picture'] = $this->file('profile_picture')->storeAs('about', 'profile_' . Str::uuid() . '.' . $this->file('profile_picture')->getClientOriginalExtension());
        }

        if ($this->hasFile('trusted_by.*.logo')) {
            foreach ($validated['trusted_by'] as $key => $item) {
                if ($this->hasFile('trusted_by.' . $key . '.logo')) {
                    //? find the difference in the array thats deleted and delete its logo files 
                    if ($about && isset($about->trusted_by[$key]['logo']) && $about->trusted_by[$key]['logo'] !== $item['logo']) {
                        $about->deleteTrustedByLogo($about->trusted_by[$key]['logo']);
                    }

                    //? delete the old file if exists
                    if ($about && isset($about->trusted_by[$key]['logo'])) {
                        $about->deleteTrustedByLogo($about->trusted_by[$key]['logo']);
                    }

                    $validated['trusted_by'][$key]['logo'] = $this->file('trusted_by.' . $key . '.logo')->storeAs('about', 'company_logo_' . Str::uuid() . '.' . $this->file('trusted_by.' . $key . '.logo')->getClientOriginalExtension());
                }
            }
        }

        //? if its null unset it
        if ($validated['profile_picture'] === null || $validated['profile_picture'] === '') {
            unset($validated['profile_picture']);
        }


        //? if trusted by logo is null unset it 
        if ($validated['trusted_by'] !== null && is_array($validated['trusted_by'])) {
            foreach ($validated['trusted_by'] as $key => $item) {
                if (!array_key_exists('logo', $item) || $item['logo'] === null || $item['logo'] === '') {
                    //? check if exist on about 
                    if ($about && isset($about->trusted_by[$key]['logo'])) {
                        $validated['trusted_by'][$key]['logo'] = $about->trusted_by[$key]['logo'];
                    } else {
                        //? unset the logo if not exist on about
                        unset($validated['trusted_by'][$key]['logo']);
                    }
                }
            }
        }

        return $validated;
    }
}