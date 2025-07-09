<?php

namespace Database\Factories;

use App\Models\Brand;
use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
             'name' => $this->faker->words(3, true),
            'description' => $this->faker->paragraph(),
            'image' => $this->faker->imageUrl(640, 480, 'technics', true, 'Product'),
            'sku' => strtoupper(Str::random(10)),

            // Assuming you have brands & categories seeded
            'brand_id' => Brand::inRandomOrder()->first()?->id ?? Brand::factory(),
            'category_id' => Category::inRandomOrder()->first()?->id ?? Category::factory(),

            'cost_price' => $this->faker->randomFloat(2, 10, 100),
            'selling_price' => function (array $attributes) {
                return $attributes['cost_price'] + $this->faker->randomFloat(2, 5, 50);
            },
            'stock_quantity' => $this->faker->numberBetween(0, 100),
            'reorder_level' => $this->faker->numberBetween(5, 20),

            'status' => $this->faker->randomElement(['available', 'unavailable', 'production']),
        ];
    }
}
