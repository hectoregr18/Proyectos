<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ClientesController;
use App\Http\Controllers\VehicleController;

Route::get('/',[ClientesController::class,'index'])->name('index');
Route::post('/store_client',[ClientesController::class,'store'])->name('store_client');
Route::get('/list_client',[ClientesController::class,'listarclientes'])->name('list_client');
Route::POST('/update_client/{id}', [ClientesController::class, 'update'])->name('update');
Route::POST('/delete_client/{id}', [ClientesController::class, 'destroy'])->name('destroy');

Route::post('/store_vehicle',[VehicleController::class,'store'])->name('store_vehicle');
Route::get('/list_vehicle',[VehicleController::class,'listarvehiculos'])->name('list_vehicle');
Route::POST('/update_vehicle/{id}', [VehicleController::class, 'update'])->name('update');
Route::POST('/delete_vehicle/{id}', [VehicleController::class, 'destroy'])->name('destroy');
