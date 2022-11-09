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
      'title' => $this->faker->realText(10),
      'subtitle' => $this->faker->realText(20),
      'notes' => $this->faker->realText(100),
      'files' => null,
      'steps' => null,
      'is_favorite' => $this->faker->boolean(50),
      'is_completed' => $this->faker->boolean(50),
      'due_date' => $this->faker->dateTimeThisMonth,
      'list_id' => TaskList::all()->random()->id,
      'user_id' => User::all()->random()->id
    ];
  }
}
