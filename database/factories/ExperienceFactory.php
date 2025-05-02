<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Experience>
 */
class ExperienceFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'job_title' => fake()->jobTitle(),
            'company' => fake()->company(),
            'location' => fake()->location(),
            'start_date' => fake()->dateTimeBetween('-5 years', 'now'),
            'end_date' => fake()->dateTimeBetween('now', '+5 years'),
            'description' => fake()->paragraph(),
            'website' => fake()->url(),
            'logo' => fake()->imageUrl(),
            'achievements' => json_encode([
                fake()->sentence(),
                fake()->sentence(),
                fake()->sentence(),
            ]),
            'type' => fake()->randomElement(['job', 'internship', 'volunteer']),
            'user_id' => User::class,
        ];
    }
}