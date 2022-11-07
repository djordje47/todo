<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class TaskList extends Model
{
  use HasFactory;

  protected $table = 'lists';
  protected $fillable = [
    'name', 'subtitle', 'background', 'thumbnail', 'description', 'user_id'
  ];

  /**
   * @return \Illuminate\Database\Eloquent\Relations\HasMany
   */
  public function tasks(): HasMany
  {
    return $this->hasMany(Task::class, 'list_id', 'id');
  }
}
