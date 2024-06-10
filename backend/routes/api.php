<?php

use App\Http\Controllers\LevelController;
use App\Http\Controllers\DeveloperController;
use Illuminate\Support\Facades\Route;

Route::apiResource('niveis', LevelController::class);
Route::apiResource('desenvolvedores', DeveloperController::class);

