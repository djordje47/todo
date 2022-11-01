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
    'user_id',
    'list_id',
  ];
}
