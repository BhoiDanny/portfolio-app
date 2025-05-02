<?php

use App\Http\Controllers\Dashboard\HomeController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('home');
})->name('home');


Route::middleware(['auth', 'verified'])->group(function () {
    Route::prefix('/dashboard')->group(function () {
        Route::get('/', [HomeController::class, 'index'])->name('dashboard');
        Route::get('/projects', [HomeController::class, 'projects'])->name('dashboard.projects');
        Route::get('/skills', [HomeController::class, 'skills'])->name('dashboard.skills');
        Route::get('/experiences', [HomeController::class, 'experience'])->name('dashboard.experience');
        Route::get('/profile', [HomeController::class, 'profile'])->name('dashboard.profile');
        Route::get('/settings', [HomeController::class, 'settings'])->name('dashboard.settings');
    });
});

// require __DIR__.'/settings.php';
require __DIR__ . '/auth.php';