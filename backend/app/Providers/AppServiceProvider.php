<?php

namespace App\Providers;

use App\Services\LevelService;
use App\Services\DeveloperService;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->singleton(LevelService::class, function ($app) {
            return new LevelService();
        });
        $this->app->singleton(DeveloperService::class, function ($app) {
            return new DeveloperService();
        });
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }
}
