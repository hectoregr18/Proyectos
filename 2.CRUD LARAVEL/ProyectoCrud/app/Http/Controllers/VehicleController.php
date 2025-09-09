<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Vehicles;

class VehicleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return view('index');
    }
    public function listarvehiculos(){

        $clientes = Vehicles::all();

        return response()->json([
            'success' => true,
            'data' => $clientes
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'placa' => 'required|unique:vehiculos,placa',
            'marca' => 'required',
            'modelo' => 'required',
            'anio_fabricacion' => 'required',
            'nro_documento_cliente' => 'nullable'
        ]);

        $cliente = Vehicles::create([
            'placa' => $request->placa,
            'marca' => $request->marca,
            'modelo' => $request->modelo,
            'anio_fabricacion' => $request->anio_fabricacion,
            'nro_documento_cliente' => $request->nro_documento_cliente
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Cliente registrado correctamente',
            'data'    => $cliente
        ], 200); // 201 Created
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $nro_documento)
    {
        $request->validate([
            'placa' => 'required|unique:vehiculos,placa,' . $request->placa . ',placa',
            'marca' => 'required',
            'modelo' => 'required',
            'anio_fabricacion' => 'required',
            'nro_documento_cliente' => 'nullable',
        ]);

        $cliente = Vehicles::findOrFail($nro_documento);

        $cliente->update([
            'placa' => $request->placa,
            'marca' => $request->marca,
            'modelo' => $request->modelo,
            'anio_fabricacion' => $request->anio_fabricacion,
            'nro_documento_cliente' => $request->nro_documento_cliente,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Cliente actualizado correctamente',
            'data'    => $cliente
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $placa)
    {
        $vehiculo = Vehicles::where('placa', $placa)->first();

        if (!$vehiculo) {
            return response()->json([
                'success' => false,
                'message' => 'Cliente no encontrado'
            ], 404);
        }

        $vehiculo->delete();

        return response()->json([
            'success' => true,
            'message' => 'Cliente eliminado correctamente'
        ], 200);
    }
}
