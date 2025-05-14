<?php

namespace App\Http\Requests\Dashboard;

use App\Models\Category;
use Illuminate\Foundation\Http\FormRequest;

class StoreSkillRequest extends FormRequest
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
            'name' => ['required', 'string'],
            'level' => ['nullable', 'integer'],
            'description' => ['nullable', 'string'],
            'category' => ['nullable', 'exists:categories,slug'],
            'published' => ['nullable', 'boolean'],
        ];
    }

    /**
     * Get custom attributes for validator errors.
     */
    public function attributes(): array
    {
        return [
            'name' => 'skill name',
            'level' => 'skill level',
            'description' => 'skill description',
            'category' => 'category',
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
            'name.required' => 'The :attribute field is required.',
            'level.integer' => 'The :attribute must be an integer.',
            'description.string' => 'The :attribute must be a string.',
            'category.exists' => 'The selected :attribute is invalid.',
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

        $this->normalizeKeys($validated, 'category', 'category_id');

        //? fetch the categories and change id for slug
        if (isset($validated['category_id'])) {
            $category = Category::where('slug', $validated['category_id'])->first();
            if ($category) {
                $validated['category_id'] = $category->id;
            } else {
                $validated['category_id'] = null;
            }
        }

        return $validated;
    }

    private function normalizeKeys(array &$validated, string $originalKey, string $normalizedKey): void
    {
        if (isset($validated[$originalKey])) {
            $validated[$normalizedKey] = trim($validated[$originalKey]);
            unset($validated[$originalKey]);
        }
    }
}