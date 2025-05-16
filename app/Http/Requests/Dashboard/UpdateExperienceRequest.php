<?php

namespace App\Http\Requests\Dashboard;

use Illuminate\Foundation\Http\FormRequest;

class UpdateExperienceRequest extends FormRequest
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
        return [
            'job_title' => ['required', 'string'],
            'company' => ['required', 'string'],
            'location' => ['nullable', 'string'],
            'start_date' => ['required', 'date'],
            'end_date' => ['nullable', 'date'],
            'description' => ['nullable', 'string'],
            'website' => ['nullable', 'string'],
            'logo' => ['nullable', 'image', 'mimes:jpg,jpeg,png,gif,svg', 'max:10240'],
            'achievements' => ['nullable', 'array'],
            'achievements.*' => ['nullable', 'string'],
            'type' => ['required', 'string', 'in:job,internship,volunteer'],
            'published' => ['nullable', 'boolean'],
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
            'job_title' => 'Job Title',
            'company' => 'Company',
            'location' => 'Location',
            'start_date' => 'Start Date',
            'end_date' => 'End Date',
            'description' => 'Description',
            'website' => 'Website',
            'logo' => 'Logo',
            'achievements' => 'Achievements',
            'type' => 'Type',
            'published' => 'Published',
        ];
    }

    /**
     * Get custom validation messages.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'job_title.required' => 'The :attribute field is required.',
            'company.required' => 'The :attribute field is required.',
            'location.string' => 'The :attribute must be a string.',
            'start_date.required' => 'The :attribute field is required.',
            'end_date.date' => 'The :attribute must be a valid date.',
            'description.string' => 'The :attribute must be a string.',
            'website.string' => 'The :attribute must be a string.',
            'logo.image' => 'The :attribute must be an image.',
            'achievements.array' => 'The :attribute must be an array.',
            'achievements.*.string' => 'Each achievement must be a string.',
            'type.required' => 'The :attribute field is required.',
            'type.in' => 'The selected :attribute is invalid.',
            'published.boolean' => 'The :attribute must be true or false.',
        ];
    }
}
