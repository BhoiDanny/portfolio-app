<?php

namespace Database\Seeders\Portfolio;

use App\Models\About;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AboutSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $about = [
            'title' => 'Passionate Web Developer Creating Digital Experiences',
            'description' => [
                "I'm a Full Stack Developer with over 5 years of experience, specializing in building responsive and performant web applications that solve real-world problems.",
                'My journey began with a deep curiosity for how things work on the web, which led me to master both frontend and backend technologies. I pride myself on writing clean, maintainable code and creating intuitive user experiences.',
                "When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, or mentoring aspiring developers.",
            ],
            'statistics' => [
                ['value' => '50+', 'label' => 'Projects Completed'],
                ['value' => '15+', 'label' => 'Happy Clients'],
            ],
            'social_links' => [
                ['platform' => 'LinkedIn', 'url' => 'https://www.linkedin.com/in/yourprofile'],
                ['platform' => 'GitHub', 'url' => 'http://github.com'],
                ['platform' => 'Twitter', 'url' => 'https://twitter.com/yourprofile'],
                ['platform' => 'Facebook', 'url' => 'https://www.facebook.com/yourprofile'],
                ['platform' => 'Instagram', 'url' => 'https://www.instagram.com/yourprofile'],
                ['platform' => 'YouTube', 'url' => 'https://www.youtube.com/yourprofile'],
            ],
            'email' => 'admin@gmail.com',
            'phone' => '+1234567890',
            'address' => '123 Main St, City, Country',
            'location' => 'City, Country',
            'trusted_by' => [
                ['name' => 'Company A', 'logo' => '/placeholder.svg'],
                ['name' => 'Company B', 'logo' => '/placeholder.svg'],
                ['name' => 'Company C', 'logo' => '/placeholder.svg'],
                ['name' => 'Company D', 'logo' => '/placeholder.svg'],
            ],
            'profile_picture' => 'placeholder.svg',
        ];

        About::create($about);
    }
}
