<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\AsArrayObject;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class Project extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'name',
        'description',
        'image',
        'tags',
        'demo_link',
        'github_link',
        'featured',
        'details',
    ];


    protected function casts(): array
    {
        return [
            'tags' => AsArrayObject::class,
            'featured' => 'boolean',
        ];
    }

    //? mutator
    // public function getImageAttribute($value): string
    // {
    //     return $value ? asset('storage/' . $value) : '/placeholder.svg';
    // }

    public function projectImage()
    {
        return $this->image ? asset('storage/' . $this->image) : '/placeholder.svg';
    }

    public function deleteImage(): void
    {
        if ($this->image) {
            \Storage::disk('public')->delete($this->image);
        }
    }


    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}