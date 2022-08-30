<?php

namespace App\Providers;

use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;
use Kitar\Dynamodb\Model\AuthUserProvider;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array
     */
    protected $policies = [
        // 'App\Models\Model' => 'App\Policies\ModelPolicy',
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();

        \Auth::provider('dynamodb', function ($app, array $config) {
            return new AuthUserProvider(
                $app['hash'],
                $config['model'],
                $config['api_token_name'] ?? null,
                $config['api_token_index'] ?? null
            );
        });
    }
}
