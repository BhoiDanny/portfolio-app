<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Category extends Model
{
    protected $fillable = [
        'name',
        'slug',
    ];

    protected function casts()
    {
        return [
            'name' => 'string',
        ];
    }

    //? adds a slug to the name
    protected static function booted()
    {
        static::creating(function ($category) {
            $category->slug = str($category->name)->slug();
        });
    }

    //? There are many skills in a category
    public function skills(): HasMany
    {
        return $this->hasMany(Skill::class);
    }
}
