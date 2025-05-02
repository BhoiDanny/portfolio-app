<?php

namespace Database\Seeders\Portfolio;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Experience;

class ExperienceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $experience = [
            [
                'id' => '1',
                'title' => 'Senior Frontend Developer',
                'company' => 'Tech Innovations Inc.',
                'location' => 'San Francisco, CA',
                'startDate' => '2021-06',
                'endDate' => null,
                'description' => 'Leading the frontend development team in building modern, responsive web applications.',
                'achievements' => [
                    "Redesigned the company's flagship product, improving user engagement by 35%",
                    'Implemented a component library that reduced development time by 40%',
                    'Mentored junior developers and established best practices for the team',
                ],
            ],
            [
                'id' => '2',
                'title' => 'Full Stack Developer',
                'company' => 'Digital Solutions',
                'location' => 'Austin, TX',
                'startDate' => '2019-03',
                'endDate' => '2021-05',
                'description' => 'Developed and maintained full-stack web applications for clients across various industries.',
                'achievements' => [
                    'Built a custom e-commerce platform that increased client sales by 25%',
                    'Optimized database queries, improving application performance by 50%',
                    'Implemented automated testing, reducing production bugs by 30%',
                ],
            ],
            [
                'id' => '3',
                'title' => 'Junior Web Developer',
                'company' => 'WebCraft Agency',
                'location' => 'Seattle, WA',
                'startDate' => '2017-09',
                'endDate' => '2019-02',
                'description' => 'Collaborated with designers and senior developers to create responsive websites for clients.',
                'achievements' => [
                    'Developed responsive frontends for 15+ client websites',
                    'Learned and implemented modern JavaScript frameworks',
                    'Participated in client meetings and requirement gathering sessions',
                ],
            ],
        ];

        foreach ($experience as $exp) {
            Experience::create([
                'job_title' => $exp['title'],
                'company' => $exp['company'],
                'location' => $exp['location'],
                'start_date' => $exp['startDate'],
                'end_date' => $exp['endDate'],
                'description' => $exp['description'],
                'achievements' => json_encode($exp['achievements']),
                'user_id' => User::first()->id,
            ]);
        }
        $this->command->info('Experience table seeded successfully!');
    }
}