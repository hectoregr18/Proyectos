<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Clientes extends Model
{
    protected $table = 'clientes';
    protected $primaryKey = 'nro_documento';
    public $incrementing = false; // porque nro_documento no es auto_increment
    protected $keyType = 'string';

    protected $fillable = [
        'nro_documento',
        'tipo_documento',
        'nombre',
        'apellidos',
        'correo',
        'telefono'
    ];
    public $timestamps = false;
}
