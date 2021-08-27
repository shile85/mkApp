<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;

    protected $fillable = [
        'projectManagerId',
        'projectName',
        'company_id',
        'desc',
        'budget',
        'spent',
        'start',
        'end',
    ];
}
