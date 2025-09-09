<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="csrf-token" content="{{ csrf_token() }}">
  <title>CRUD Clientes y Vehículos</title>

  <!-- Tailwind + DaisyUI -->
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://cdn.jsdelivr.net/npm/daisyui@4.12.10/dist/full.min.css" rel="stylesheet" type="text/css" />

  <!-- Font Awesome para iconos -->
  <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">

  <!-- SweetAlert2 -->
  <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>

  <style>
    body {
      background-color: #f5f5f5;
      padding: 20px;
    }
    .container-section {
      background-color: white;
      padding: 30px;
      border-radius: 10px;
      box-shadow: 0 0 15px rgba(0,0,0,0.1);
      margin-bottom: 30px;
    }
    .cliente-info {
      background-color: #f8f9fa;
      padding: 15px;
      border-radius: 8px;
      margin-top: 10px;
    }
    .info-row {
      display: flex;
      margin-bottom: 5px;
    }
    .info-label {
      font-weight: 600;
      min-width: 120px;
      color: #495057;
    }
    input,select{
        margin: 5px 0;
    }

  </style>
</head>
<body>
  <!-- Sección de Clientes -->
  <div class="container-section">
    <h2 class="mb-4 text-xl font-bold">Gestión de Clientes</h2>

    <div class="flex justify-between items-center mb-4">
      <h4 class="text-lg font-semibold">Listado de Clientes</h4>
      <button class="btn btn-success" onclick="abrirModalCrearCliente()">
        <i class="fas fa-plus"></i> Crear Cliente
      </button>
    </div>

    <div class="overflow-x-auto">
      <table class="table table-zebra w-full">
        <thead class="bg-gray-200">
          <tr>
            <th>Número Documento</th>
            <th>Tipo Documento</th>
            <th>Nombre</th>
            <th>Apellidos</th>
            <th>Correo</th>
            <th>Teléfono</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody id="tablaClientes">
          <tr>
            <td>12345678</td>
            <td>DNI</td>
            <td>Juan</td>
            <td>Pérez García</td>
            <td>juan.perez@email.com</td>
            <td>987654321</td>
            <td class="flex gap-2">
              <button class="btn btn-sm btn-info" onclick="editarCliente(this)">
                <i class="fas fa-edit"></i>
              </button>
              <button class="btn btn-sm btn-error" onclick="eliminarCliente(this)">
                <i class="fas fa-trash"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <!-- Sección de Vehículos -->
  <div class="container-section">
    <h2 class="mb-4 text-xl font-bold">Gestión de Vehículos</h2>

    <div class="flex justify-between items-center mb-4">
      <h4 class="text-lg font-semibold">Listado de Vehículos</h4>
      <button class="btn btn-success" onclick="abrirModalCrearVehiculo()">
        <i class="fas fa-plus"></i> Crear Vehículo
      </button>
    </div>

    <div class="overflow-x-auto">
      <table class="table table-zebra w-full">
        <thead class="bg-gray-200">
        </thead>
        <tbody id="tablaVehiculos">

        </tbody>
      </table>
    </div>
  </div>

  <!-- Modal Cliente -->
  <dialog id="modalCliente" class="modal">
    <div class="modal-box w-96">
      <h3 id="modalClienteLabel" class="font-bold text-lg">Crear Cliente</h3>
        <div id="numeroDocumentoContainer" class="mt-8 mb-8">
          <input type="text" id="numeroDocumento" required class="input input-bordered w-full" placeholder="Número de Documento">
        </div>
        <div id="numeroDocumentoLabelContainer" class="hidden mb-8">
          <label>Número de Documento:</label>
          <span id="numeroDocumentoLabel" class="font-bold"></span>
        </div>
        <select id="tipoDocumento" class="select select-bordered w-full mb-8" required>
          <option value="">Seleccione...</option>
          <option value="DNI">DNI</option>
          <option value="CE">Carnet de Extranjería</option>
          <option value="Pasaporte">Pasaporte</option>
          <option value="RUC">RUC</option>
        </select>
        <input type="text" id="nombre" placeholder="Nombre" required class="input input-bordered w-full mb-8">
        <input type="text" id="apellidos" placeholder="Apellidos" required class="input input-bordered w-full mb-8">
        <input type="email" id="correo" placeholder="Correo" required class="input input-bordered w-full mb-8">
        <input type="tel" id="telefono" placeholder="Teléfono" required class="input input-bordered w-full mb-8" maxlength="9">
      <div class="modal-action">
        <button class="btn" onclick="modalCliente.close()">Cancelar</button>
        <button class="btn btn-primary" onclick="guardarCliente()">Guardar</button>
      </div>
    </div>
  </dialog>

  <!-- Modal Vehículo -->
  <dialog id="modalVehiculo" class="modal">
    <div class="modal-box w-11/12 max-w-2xl">
      <h3 id="modalVehiculoLabel" class="font-bold text-lg">Crear Vehículo</h3>
        <div id="placaContainer" class="mt-8 mb-8">
          <label class="block">Placa</label>
          <input type="text" id="placa" required class="input input-bordered w-full">
        </div>
        <div id="placaLabelContainer" class="hidden mt-8 mb-8">
          <label>Placa:</label>
          <span id="placaLabel" class="font-bold"></span>
        </div>
        <input type="text" id="marca" placeholder="Marca" required class="input input-bordered w-full mb-8">
        <input type="text" id="modelo" placeholder="Modelo" required class="input input-bordered w-full mb-8">
        <input type="number" id="anioFabricacion" min="1900" max="2024" placeholder="Año de Fabricación" required class="input input-bordered w-full mb-8">
        <select id="nroDocumentoCliente" class="select select-bordered w-full mb-8" onchange="mostrarDatosCliente()">
          <option value="">Seleccione un cliente...</option>
        </select>
        <div id="infoClienteContainer" class="cliente-info hidden">
          <h6 class="font-bold mb-8"><i class="fas fa-user"></i> Datos del Cliente</h6>
          <div class="info-row"><span class="info-label">Documento:</span><span id="infoDocumento"></span></div>
          <div class="info-row"><span class="info-label">Tipo:</span><span id="infoTipoDoc"></span></div>
          <div class="info-row"><span class="info-label">Nombre:</span><span id="infoNombre"></span></div>
          <div class="info-row"><span class="info-label">Apellidos:</span><span id="infoApellidos"></span></div>
          <div class="info-row"><span class="info-label">Correo:</span><span id="infoCorreo"></span></div>
          <div class="info-row"><span class="info-label">Teléfono:</span><span id="infoTelefono"></span></div>
        </div>
      <div class="modal-action">
        <button class="btn" onclick="modalVehiculo.close()">Cancelar</button>
        <button class="btn btn-primary" onclick="guardarVehiculo()">Guardar</button>
      </div>
    </div>
  </dialog>

  <!-- Tu JS -->
  <script src="{{ asset('js/index.js') }}" defer></script>
</body>
</html>
