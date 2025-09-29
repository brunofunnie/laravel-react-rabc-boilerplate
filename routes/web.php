<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\UserController;
use App\Http\Controllers\RoleController;

Route::get('/', function () {
    return to_route('login');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    // User Management
    Route::resource('users', UserController::class)
        ->only(['create', 'store'])
        ->middleware('permission:users.create');
    Route::resource('users', UserController::class)
        ->only(['edit', 'update'])
        ->middleware('permission:users.edit');
    Route::resource('users', UserController::class)
        ->only(['delete'])
        ->middleware('permission:users.delete');
    Route::resource('users', UserController::class)
        ->only(['index', 'show'])
        ->middleware('permission:users.view|users.create|users.edit|users.delete');

    // Role Management
    Route::resource('roles', RoleController::class)
        ->only(['create', 'store'])
        ->middleware('permission:roles.create');
    Route::resource('roles', RoleController::class)
        ->only(['edit', 'update'])
        ->middleware('permission:roles.edit');
    Route::resource('roles', RoleController::class)
        ->only(['delete'])
        ->middleware('permission:roles.delete');
    Route::resource('roles', RoleController::class)
        ->only(['index', 'show'])
        ->middleware('permission:roles.view|roles.create|roles.edit|roles.delete');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
