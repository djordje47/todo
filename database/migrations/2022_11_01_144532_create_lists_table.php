<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateListsTable extends Migration
{
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {
    Schema::create('lists', function (Blueprint $table) {
      $table->id();
      $table->string('name');
      $table->string('subtitle')->nullable();
      $table->string('background')->default('#ececec')->nullable();
      $table->string('thumbnail')->nullable();
      $table->text('description')->nullable();
      $table->foreignId('user_id')->references('id')->on('users');
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
    Schema::dropIfExists('lists');
  }
}
