<?php

namespace Database\Seeders\Portfolio;

use App\Models\Category;
use App\Models\Skill;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SkillSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $skills = [
            ['name' => 'JavaScript', 'level' => 90, 'category' => 'frontend'],
            ['name' => 'TypeScript', 'level' => 85, 'category' => 'frontend'],
            ['name' => 'React', 'level' => 90, 'category' => 'frontend'],
            ['name' => 'Next.js', 'level' => 80, 'category' => 'frontend'],
            ['name' => 'CSS/SCSS', 'level' => 85, 'category' => 'frontend'],
            ['name' => 'Tailwind CSS', 'level' => 90, 'category' => 'frontend'],
            ['name' => 'Node.js', 'level' => 85, 'category' => 'backend'],
            ['name' => 'Express', 'level' => 80, 'category' => 'backend'],
            ['name' => 'MongoDB', 'level' => 75, 'category' => 'backend'],
        ];

        foreach ($skills as $skill) {
            Skill::create([
                'name' => $skill['name'],
                'level' => $skill['level'],
                'description' => fake()->sentence(2),
                'category_id' =>  rand(1, Category::count()),
            ]);
        }

        $this->command->info('Skills seeded successfully!');
    }
}
