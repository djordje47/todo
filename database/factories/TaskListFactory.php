<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class TaskListFactory extends Factory
{
  /**
   * Define the model's default state.
   *
   * @return array
   */
  public function definition()
  {
    return [
      'name' => $this->faker->realText(100),
      'subtitle' => $this->faker->realText(200),
      'background' => $this->faker->unique()->safeHexColor(),
      'thumbnail' => $this->faker->imageUrl(),
      'description' => $this->faker->realText,
      'user_id' => User::all()->random()->id
    ];
  }
}
