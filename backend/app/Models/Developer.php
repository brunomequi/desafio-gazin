<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use mysql_xdevapi\Table;

class Developer extends Model
{
    use HasFactory;

    protected $table = 'desenvolvedores';
    protected $fillable = [
        'nivel_id',
        'nome',
        'sexo',
        'data_nascimento',
        'idade',
        'hobby'
    ];

    public function level(): BelongsTo
    {
        return $this->belongsTo(Level::class,'nivel_id','id');
    }
}
