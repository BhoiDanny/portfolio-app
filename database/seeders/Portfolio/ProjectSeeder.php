<?php

namespace Database\Seeders\Portfolio;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Project;
use App\Models\User;

class ProjectSeeder extends Seeder
{

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $projects = [
            [
                'id' => '1',
                'title' => 'E-commerce Platform',
                'description' => 'A full-featured e-commerce platform with product management, cart functionality, and payment processing.',
                'image' => '/placeholder.svg',
                'tags' => ['React', 'Node.js', 'MongoDB', 'Stripe'],
                'demoLink' => 'https://example.com',
                'githubLink' => 'https://github.com',
                'featured' => true,
                'details' => 'This project is a comprehensive e-commerce solution built with a React frontend and Node.js backend. It features user authentication, product catalog with search and filtering, shopping cart functionality, and Stripe payment integration. The application is fully responsive and follows accessibility best practices.',
            ],
            [
                'id' => '2',
                'title' => 'Task Management App',
                'description' => 'A collaborative task management application with real-time updates and team features.',
                'image' => '/placeholder.svg',
                'tags' => ['Vue.js', 'Firebase', 'Tailwind CSS'],
                'demoLink' => 'https://example.com',
                'githubLink' => 'https://github.com',
                'featured' => true,
                'details' => 'A task management application that allows teams to collaborate on projects in real-time. Features include task creation and assignment, due date tracking, comment threads, file attachments, and real-time notifications. Built with Vue.js and Firebase for backend and real-time functionality.',
            ],
            [
                'id' => '3',
                'title' => 'Fitness Tracking Dashboard',
                'description' => 'A comprehensive fitness tracking dashboard with data visualization and progress tracking.',
                'image' => '/placeholder.svg',
                'tags' => ['React', 'D3.js', 'Express', 'PostgreSQL'],
                'demoLink' => 'https://example.com',
                'githubLink' => 'https://github.com',
                'featured' => true,
                'details' => 'A fitness tracking application that helps users monitor their workout routines, nutrition, and overall progress. It includes interactive charts built with D3.js, custom workout planning tools, and integration with popular fitness devices. The backend is powered by Express and PostgreSQL for data storage.',
            ],
            [
                'id' => '4',
                'title' => 'Real Estate Listings',
                'description' => 'A real estate platform with property listings, search functionality, and user accounts.',
                'image' => '/placeholder.svg',
                'tags' => ['Angular', 'Node.js', 'MongoDB'],
                'demoLink' => 'https://example.com',
                'githubLink' => 'https://github.com',
                'featured' => false,
                'details' => 'A real estate listing platform that allows users to browse properties, save favorites, and contact agents. Features include advanced search with filters for property type, price range, and amenities, interactive maps, virtual tours, and user authentication.',
            ],
            [
                'id' => '5',
                'title' => 'Social Media Dashboard',
                'description' => 'An analytics dashboard for tracking social media performance across multiple platforms.',
                'image' => '/placeholder.svg',
                'tags' => ['React', 'Redux', 'Node.js'],
                'demoLink' => 'https://example.com',
                'githubLink' => 'https://github.com',
                'featured' => false,
                'details' => 'A social media analytics dashboard that aggregates data from multiple platforms (Facebook, Twitter, Instagram) into a unified interface. It provides insights on engagement, follower growth, content performance, and audience demographics with customizable reporting options.',
            ],
            [
                'id' => '6',
                'title' => 'Weather Application',
                'description' => 'A weather forecast application with location-based services and interactive maps.',
                'image' => '/placeholder.svg',
                'tags' => ['React Native', 'API Integration', 'Geolocation'],
                'demoLink' => 'https://example.com',
                'githubLink' => 'https://github.com',
                'featured' => false,
                'details' => 'A cross-platform weather application built with React Native that provides current conditions, forecasts, and severe weather alerts. Features include geolocation for automatic local weather, interactive radar maps, hourly and 7-day forecasts, and customizable notification settings.',
            ],
        ];


        //? upload projects to projects table 

        foreach ($projects as $project) {
            Project::create([
                'name' => $project['title'],
                'description' => $project['description'],
                'image' => $project['image'],
                'tags' => json_encode($project['tags']),
                'demo_link' => $project['demoLink'],
                'github_link' => $project['githubLink'],
                'featured' => $project['featured'],
                'details' => $project['details'],
                'user_id' => User::first()->id,
            ]);
        }
    }
}