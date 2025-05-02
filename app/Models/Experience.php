<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\AsArrayObject;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Experience extends Model
{
    /** @use HasFactory<\Database\Factories\ExperienceFactory> */
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'job_title',
        'company',
        'location',
        'start_date',
        'end_date',
        'description',
        'website',
        'logo',
        'achievements',
        'type',
        'user_id'
    ];

    protected function casts()
    {
        return [
            'achievements' => AsArrayObject::class,
            'start_date' => 'date',
            'end_date' => 'date',
        ];
    }
}