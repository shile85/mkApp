<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Car extends Model
{
    use HasFactory;

    protected $fillable = [
        'model',
        'registration',
        'user_id',
        'image_path',
        'document_path',
    ];

    public function user()
    {
        return $this->belongsTo('App\User');
    }
}
