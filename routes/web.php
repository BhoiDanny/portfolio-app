<?php

use App\Http\Controllers\Dashboard\HomeController;
use App\Http\Controllers\Dashboard\ProjectController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('home');
})->name('home');


Route::middleware(['auth', 'verified'])->group(function () {
    Route::name('dashboard.')->prefix('/dashboard')->group(function () {
        Route::get('/', [HomeController::class, 'index'])->name('home');
        Route::get('/skills', [HomeController::class, 'skills'])->name('skills');
        Route::get('/experiences', [HomeController::class, 'experience'])->name('experience');
        Route::get('/profile', [HomeController::class, 'profile'])->name('profile');
        Route::get('/settings', [HomeController::class, 'settings'])->name('settings');

        Route::name('projects.')->prefix('/projects')->group(function () {
            Route::get('/', [ProjectController::class, 'index'])->name('index');
            Route::post('/create/project', [ProjectController::class, 'create'])->name('create');
            Route::put('/update/project/{project}', [ProjectController::class, 'update'])->name('update');
            Route::delete('/delete/project/{project}', [ProjectController::class, 'destroy'])->name('delete');
            Route::get('/trashed', [ProjectController::class, 'trashed'])->name('trashed');
            Route::put('/restore/project/{project}', [ProjectController::class, 'restore'])->name('restore');
            Route::delete('/delete/project/{project}/permanent', [ProjectController::class, 'forceDelete'])->name('delete.permanent');
        });
    });
});

// require __DIR__.'/settings.php';
require __DIR__ . '/auth.php';