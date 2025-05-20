<?php

namespace Database\Seeders;

use App\Models\User;
use Database\Seeders\Portfolio\AboutSeeder;
use Database\Seeders\Portfolio\CategorySeeder;
use Database\Seeders\Portfolio\ProjectSeeder;
use Database\Seeders\Portfolio\ExperienceSeeder;
use Database\Seeders\Portfolio\SkillSeeder;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();


        User::factory()->create([
            'name' => 'Daniel Botchway',
            'email' => 'admin@gmail.com',
        ]);

        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);

        $this->call([
            ProjectSeeder::class,
            ExperienceSeeder::class,
            CategorySeeder::class,
            SkillSeeder::class,
            AboutSeeder::class,
        ]);
    }
}
