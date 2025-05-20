<?php

namespace App\Http\Requests\Dashboard\Settings;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ProfileUpdateRequest extends FormRequest
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
            'name' => ['required', 'string', 'max:255'],
            'email' => [
                'required',
                'string',
                'lowercase',
                'email',
                'max:255',
                Rule::unique(User::class)->ignore($this->user()->id),
            ],
            'occupation' => ['required', 'string', 'max:255'],
            'bio' => ['nullable', 'string'],
            'avatar' => ['nullable', 'file', 'mimes:jpg,jpeg,png', 'max:10240'],
            'resume_url' => ['nullable', 'file', 'mimes:pdf,doc,docx', 'max:10240'],
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
            'name' => 'Name',
            'email' => 'Email',
            'occupation' => 'Occupation',
            'bio' => 'Bio',
            'avatar' => 'Avatar',
            'resume_url' => 'Resume',
        ];
    }

    /**
     * Get custom messages for validator errors.
     *
     * @return array<string, string
     */
    public function messages(): array
    {
        return [
            'name.required' => 'The :attribute field is required.',
            'email.required' => 'The :attribute field is required.',
            'occupation.required' => 'The :attribute field is required.',
            'bio.string' => 'The :attribute field must be a string.',
            'avatar.file' => 'The :attribute field must be a file.',
            'avatar.mimes' => 'The :attribute field must be a file of type: jpg, jpeg, png.',
            'avatar.max' => 'The :attribute field must not be greater than 10MB.',
            'resume_url.file' => 'The :attribute field must be a file.',
            'resume_url.mimes' => 'The :attribute field must be a file of type: pdf, doc, docx.',
            'resume_url.max' => 'The :attribute field must not be greater than 10MB.',
        ];
    }


    public function validated($key = null, $default = null)
    {
        $validated = parent::validated($key, $default);

        if ($this->hasFile('avatar')) {
            if ($this->user()->avatar) {
                $this->user()->deleteAvatar();
            }
            $validated['avatar'] = $this->file('avatar')->storeAs('avatars', \Str::uuid() . '.' . $this->file('avatar')->getClientOriginalExtension());
        }

        if ($this->hasFile('resume_url')) {
            if ($this->user()->resume_url) {
                $this->user()->deleteResume();
            }
            $validated['resume_url'] = $this->file('resume_url')->storeAs('resumes', \Str::uuid() . '.' . $this->file('resume_url')->getClientOriginalExtension());
        }

        //? if its null unset it 
        if ($validated['avatar'] === null || $validated['avatar'] === '') {
            unset($validated['avatar']);
        }
        if ($validated['resume_url'] === null || $validated['resume_url'] === '') {
            unset($validated['resume_url']);
        }


        return $validated;
    }
}
