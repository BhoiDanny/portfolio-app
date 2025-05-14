<?php

use App\Http\Controllers\Dashboard\HomeController;
use App\Http\Controllers\Dashboard\ProjectController;
use App\Http\Controllers\Dashboard\SkillController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('home');
})->name('home');


Route::middleware(['auth', 'verified'])->group(function () {
    Route::controller(HomeController::class)->prefix('/dashboard')->name('dashboard.')->group(function () {
        Route::get('/', 'index')->name('home');
        // Route::get('/skills', 'skills')->name('skills');
        Route::get('/experiences', 'experience')->name('experience');
        Route::get('/profile', 'profile')->name('profile');
        Route::get('/settings', 'settings')->name('settings');

        Route::controller(ProjectController::class)->prefix('/projects')->name('projects.')->group(function () {
            Route::get('/', 'index')->name('index');
            Route::post('/create/project', 'store')->name('create');
            Route::put('/update/project/{project}', 'update')->name('update');
            Route::delete('/delete/project/{project}', 'destroy')->name('delete');
            Route::get('/trashed', 'trashed')->name('trashed');
            Route::put('/restore/project/{project}', 'restore')->name('restore');
            Route::delete('/delete/project/{project}/permanent', 'forceDelete')->name('delete.permanent');
        });

        Route::controller(SkillController::class)->prefix('/skills')->name('skills.')->group(function () {
            Route::get('/', 'index')->name('index');
            Route::post('/create/skill', 'store')->name('create');
            Route::put('/update/skill/{skill}', 'update')->name('update');
            Route::delete('/delete/skill/{skill}', 'destroy')->name('delete');
            Route::get('/trashed', 'trashed')->name('trashed');
            Route::put('/restore/skill/{skill}', 'restore')->name('restore');
            Route::delete('/delete/skill/{skill}/permanent', 'forceDelete')->name('delete.permanent');
        });
    });
});

// require __DIR__.'/settings.php';
require __DIR__ . '/auth.php';
