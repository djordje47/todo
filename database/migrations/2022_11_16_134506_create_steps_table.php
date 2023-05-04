<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateStepsTable extends Migration
{
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {
    Schema::create('steps', function (Blueprint $table) {
      $table->id();
      $table->string('name');
      $table->boolean('is_completed')->default(false);
      $table->foreignId('task_id')->references('id')->on('tasks');
      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   *
   * @return void
   */
  public function down()
  {
    Schema::dropIfExists('steps');
  }
}
