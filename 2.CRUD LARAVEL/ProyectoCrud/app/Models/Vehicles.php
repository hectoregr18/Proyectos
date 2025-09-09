<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Vehicles extends Model
{
    protected $table = 'vehiculos';
    protected $primaryKey = 'placa';
    public $incrementing = false; // porque placa no es auto_increment
    protected $keyType = 'string';

    protected $fillable = [
        'placa',
        'marca',
        'modelo',
        'anio_fabricacion',
        'nro_documento_cliente'
    ];
    public $timestamps = false;
}
