<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Task extends Model
{
  use HasFactory;

  protected $fillable = [
    'title',
    'subtitle',
    'notes',
    'files',
    'is_favorite',
    'is_completed',
    'due_date',
    'user_id',
    'list_id',
  ];

  protected $casts = [
    'is_favorite' => 'boolean',
    'is_completed' => 'boolean',
  ];

  protected $dates = ['due_date'];

  public function taskList(): BelongsTo
  {
    return $this->belongsTo(TaskList::class);
  }

  public function steps(): HasMany
  {
    return $this->hasMany(Step::class);
  }
}
