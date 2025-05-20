<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\AsArrayObject;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class About extends Model
{
    protected $fillable = [
        'title',
        'description',
        'profile_picture',
        'statistics',
        'social_links',
        'email',
        'phone',
        'address',
        'location',
        'trusted_by',
    ];

    protected function casts()
    {
        return [
            'description' => AsArrayObject::class,
            'statistics' => AsArrayObject::class,
            'social_links' => AsArrayObject::class,
            'trusted_by' => AsArrayObject::class,
        ];
    }

    public function getProfilePictureUrlAttribute()
    {
        return $this->profile_picture ? asset('storage/' . $this->profile_picture) : '/placeholder.svg';
    }

    public function deleteProfilePicture()
    {
        if ($this->profile_picture) {
            Storage::disk('public')->delete($this->profile_picture);
        }
    }

    public function deleteTrustedByLogo($logo)
    {
        if ($logo) {
            Storage::disk('public')->delete($logo);
        }
    }
}
