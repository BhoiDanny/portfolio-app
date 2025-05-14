<?php

namespace Database\Seeders\Portfolio;

use App\Models\Category;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $category = [
            [
                'name' => 'Web Development',
                'slug' => 'web-development',
            ],
            [
                'name' => 'Mobile Development',
                'slug' => 'mobile-development',
            ],
            [
                'name' => 'UI/UX Design',
                'slug' => 'ui-ux-design',
            ],
            [
                'name' => 'Data Science',
                'slug' => 'data-science',
            ],
            [
                'name' => 'Machine Learning',
                'slug' => 'machine-learning',
            ],
            [
                'name' => 'Game Development',
                'slug' => 'game-development',
            ],
            [
                'name' => 'Cloud Computing',
                'slug' => 'cloud-computing',
            ],
            [
                'name' => 'Cybersecurity',
                'slug' => 'cybersecurity',
            ],

        ];


        foreach ($category as $cat) {
            Category::create([
                'name' => $cat['name'],
                'slug' => $cat['slug'],
            ]);
        }

        $this->command->info('Categories seeded successfully!');
        $this->command->info('Categories count: ' . Category::count());
        $this->command->info('Categories: ' . Category::all()->pluck('name')->implode(', '));
    }
}
