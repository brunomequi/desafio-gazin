<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Level extends Model
{
    use HasFactory;

    protected $table = 'niveis';
    protected $fillable = ['nivel'];


    public function developers(): HasMany
    {
        return $this->hasMany(Developer::class,'nivel_id','id');
    }
}
