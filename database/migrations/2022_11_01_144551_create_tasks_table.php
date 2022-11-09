<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTasksTable extends Migration
{
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {
    Schema::create('tasks', function (Blueprint $table) {
      $table->id();
      $table->string('title');
      $table->string('subtitle')->nullable();
      $table->text('notes')->nullable();
      $table->json('steps')->nullable();
      $table->dateTime('due_date')->nullable();
      $table->boolean('is_favorite')->default(false);
      $table->boolean('is_completed')->default(false);
      $table->json('files')->nullable();
      $table->foreignId('user_id')->references('id')->on('users');
      $table->foreignId('list_id')->references('id')->on('lists');
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
    Schema::dropIfExists('tasks');
  }
}
