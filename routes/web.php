<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::get('/wordbase/import', function () {
    return Inertia::render('wordbase/WordbaseSubmit');
})->name('wordbase.import');

Route::get('/anagram/search', function () {
    return Inertia::render('anagram/AnagramSearch');
})->name('anagram.search');
