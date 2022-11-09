<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

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
}
