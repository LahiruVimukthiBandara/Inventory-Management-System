<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Customer>
 */
class CustomerFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'phone'=> fake()->unique()->phoneNumber(),
            'email'=>fake()->unique()->email(),
            'status' => $this->faker->randomElement(['active', 'inactive', 'blocked']),
            'address' =>fake()->address(),
        ];
    }
}
