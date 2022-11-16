<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Step extends Model
{
  use HasFactory;

  protected $fillable = ['name', 'isCompleted', 'task_id'];
  protected $casts = ['isCompleted' => 'boolean'];

  public function task(): BelongsTo
  {
    return $this->belongsTo(Task::class);
  }
}
