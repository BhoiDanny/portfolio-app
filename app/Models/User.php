<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'occupation',
        'bio',
        'avatar',
        'resume_url',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function projects(): HasMany
    {
        return $this->hasMany(Project::class);
    }

    public function experiences(): HasMany
    {
        return $this->hasMany(Experience::class);
    }

    public function avatar()
    {
        return $this?->avatar ? asset('storage/' . $this->avatar) : '/placeholder.svg';
    }

    public function deleteAvatar(): void
    {
        if ($this->avatar) {
            \Storage::disk('public')->delete($this->avatar);
        }
    }

    public function resume()
    {
        return $this?->resume_url ? asset('storage/' . $this->resume_url) : '/placeholder.svg';
    }

    public function deleteResume(): void
    {
        if ($this->resume_url) {
            \Storage::disk('public')->delete($this->resume_url);
        }
    }
}
