<?php

namespace App\Http\Requests\Dashboard;

use Illuminate\Foundation\Http\FormRequest;

class StoreProjectRequest extends FormRequest
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
            'title' =>  ['required', 'string'],
            'description' => ['required', 'string'],
            'image' => ['nullable', 'image', 'mimes:jpg,jpeg,png', 'max:2048'],
            'tags' => ['nullable', 'array'],
            'tags.*' => ['string'],
            'demoLink' => ['nullable', 'url'],
            'githubLink' => ['nullable', 'url'],
            'featured' => ['nullable', 'boolean'],
            'details' => ['nullable', 'string'],
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
            'title' => 'Project Name',
            'description' => 'Project Description',
            'image' => 'Project Image',
            'tags' => 'Project Tags',
            'demoLink' => 'Demo Link',
            'githubLink' => 'GitHub Link',
            'featured' => 'Featured',
            'details' => 'Project Details',
        ];
    }
    /**
     * Get custom messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'title.required' => 'The :attribute field is required.',
            'description.required' => 'The :attribute field is required.',
            'image.image' => 'The :attribute must be an image.',
            'image.mimes' => 'The :attribute must be a file of type: jpg, jpeg, png.',
            'image.max' => 'The :attribute may not be greater than 2MB.',
            'tags.array' => 'The :attribute must be an array.',
            'tags.*.string' => 'Each tag must be a string.',
            'demoLink.url' => 'The :attribute must be a valid URL.',
            'githubLink.url' => 'The :attribute must be a valid URL.',
        ];
    }



    /**
     * Get the data to be validated.
     *
     * @return array<string, mixed>
     */
   public function validated($key = null, $default = null): array
   {
       $validated = parent::validated($key, $default);

       $this->trimTags($validated);
       $this->normalizeLinks($validated, 'githubLink', 'github_link');
       $this->normalizeLinks($validated, 'demoLink', 'demo_link');
       $this->normalizeLinks($validated, 'title', 'name');

       //? if image already exists set it to empty


       return $validated;
   }

   private function trimTags(array &$validated): void
   {
       if (isset($validated['tags'])) {
           $validated['tags'] = array_map('trim', $validated['tags']);
       }
   }

   private function normalizeLinks(array &$validated, string $originalKey, string $normalizedKey): void
   {
       if (isset($validated[$originalKey])) {
           $validated[$normalizedKey] = trim($validated[$originalKey]);
           unset($validated[$originalKey]);
       }
   }
}
