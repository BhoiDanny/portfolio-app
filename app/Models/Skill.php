<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class Skill extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'name',
        'level',
        'description',
        'category_id',
        'published',
    ];

    protected function casts()
    {
        return [
            'level' => 'integer',
            'published' => 'boolean'
        ];
    }

    //? A skill can belong to a category
    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }
}