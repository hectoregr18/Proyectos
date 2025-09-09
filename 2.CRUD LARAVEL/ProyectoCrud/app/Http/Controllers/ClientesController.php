<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Clientes;

class ClientesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return view('index');
    }
    public function listarclientes(){

        $clientes = Clientes::all();

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
            'nro_documento' => 'required|unique:clientes,nro_documento',
            'tipo_documento' => 'required',
            'nombre' => 'required',
            'apellidos' => 'required',
            'correo' => 'nullable|email',
            'telefono' => 'required'
        ]);

        $cliente = Clientes::create([
            'nro_documento' => $request->nro_documento,
            'tipo_documento' => $request->tipo_documento,
            'nombre' => $request->nombre,
            'apellidos' => $request->apellidos,
            'correo' => $request->correo,
            'telefono' => $request->telefono,
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
            'nro_documento' => 'required|unique:clientes,nro_documento,' . $request->nro_documento . ',nro_documento',
            'tipo_documento' => 'required',
            'nombre' => 'required',
            'apellidos' => 'required',
            'correo' => 'nullable|email',
            'telefono' => 'required'
        ]);

        $cliente = Clientes::findOrFail($nro_documento);

        $cliente->update([
            'nro_documento' => $request->nro_documento,
            'tipo_documento' => $request->tipo_documento,
            'nombre' => $request->nombre,
            'apellidos' => $request->apellidos,
            'correo' => $request->correo,
            'telefono' => $request->telefono,
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
    public function destroy(string $nro_documento)
    {
        $cliente = Clientes::where('nro_documento', $nro_documento)->first();

        if (!$cliente) {
            return response()->json([
                'success' => false,
                'message' => 'Cliente no encontrado'
            ], 404);
        }

        $cliente->delete();

        return response()->json([
            'success' => true,
            'message' => 'Cliente eliminado correctamente'
        ], 200);
    }
}
