<?php

namespace Database\Seeders;

use App\Models\Brand;
use App\Models\Category;
use App\Models\Customer;
use App\Models\Product;
use App\Models\Supplier;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();
        Category::factory(10)->create();
        Supplier::factory(13)->create();
        Brand::factory(18)->create();
        Customer::factory(13)->create();
        Product::factory(50)->create();

        User::factory()->create([
            'name' => 'lahiru',
            'email' => 'lahiruv85@gmail.com',
        ]);
    }
}
