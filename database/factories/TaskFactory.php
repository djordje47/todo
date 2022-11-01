<?php

namespace Database\Factories;

use App\Models\TaskList;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class TaskFactory extends Factory
{
  /**
   * Define the model's default state.
   *
   * @return array
   */
  public function definition()
  {
    return [
      'title' => $this->faker->realText(100),
      'subtitle' => $this->faker->realText(200),
      'notes' => $this->faker->realText,
      'files' => null,
      'list_id' => TaskList::all()->random()->id,
      'user_id' => User::all()->random()->id
    ];
  }
}
