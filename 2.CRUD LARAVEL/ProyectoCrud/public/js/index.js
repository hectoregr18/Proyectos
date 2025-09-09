
  // ===============================
  // Helpers de modal (daisyUI <dialog>)
  // ===============================
    function abrirModal(id) {
        const dlg = document.getElementById(id);
        if (dlg && typeof dlg.showModal === 'function') {
            dlg.showModal();
        } else {
            // Fallback si el navegador no soporta <dialog>
            dlg.style.display = 'flex';
        }
        }
        function cerrarModal(id) {
        const dlg = document.getElementById(id);
        if (dlg && typeof dlg.close === 'function') {
            dlg.close();
        } else {
            dlg.style.display = 'none';
        }
    }

    function soloNumeros(e) {
        // Obtener el código de la tecla
        let key = e.key;

        // Permitir teclas especiales: borrar, flechas, tab, etc.
        if (
            key === "Backspace" ||
            key === "ArrowLeft" ||
            key === "ArrowRight" ||
            key === "Tab"
        ) {
            return true;
        }

        // Validar que sea número (del 0 al 9)
        if (!/^[0-9]$/.test(key)) {
            e.preventDefault(); // Bloquea la tecla
        }
    }

  // Asociar la función al input
  document.getElementById("numeroDocumento").addEventListener("keydown", soloNumeros);
  document.getElementById("telefono").addEventListener("keydown", soloNumeros);

  // ===============================
  // Variables para clientes
  // ===============================
  let modoEdicionCliente = false;
  let filaEditandoCliente = null;

  // ===============================
  // Variables para vehículos
  // ===============================
  let modoEdicionVehiculo = false;
  let filaEditandoVehiculo = null;

  // Base de datos temporal de clientes
  let clientesSelect = {};

  // ===============================
  // Funciones generales
  // ===============================

  // ===============================
  // CLIENTES
  // ===============================

  async function listarclientes(){
    try {

        let response = await fetch("list_client");
        let data = await response.json();

        if (data.success) {

            document.getElementById('tablaClientes').innerHTML="";
            lineas="";
            Object.entries(data.data).forEach(([key, value]) => {
                lineas+="<tr>";
                lineas+=`   <td>${value.nro_documento}</td>`;
                lineas+=`   <td>${value.tipo_documento}</td>`;
                lineas+=`   <td>${value.nombre}</td>`;
                lineas+=`   <td>${value.apellidos}</td>`;
                lineas+=`   <td>${value.correo}</td>`;
                lineas+=`   <td>${value.telefono}</td>`;
                lineas+=`   <td class="flex gap-2">
                                <button class="btn btn-sm btn-info" onclick="editarCliente(this)">
                                    <i class="fas fa-edit"></i>
                                </button>
                                <button class="btn btn-sm btn-error" onclick="eliminarCliente(${value.nro_documento})">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </td>`;
                lineas+="<tr>";
                clientesSelect[value.nro_documento]=value;
            });

            document.getElementById('tablaClientes').innerHTML=lineas;
            actualizarSelectClientes();

        } else {
            Swal.fire('¡Error!', 'Error al listar Clientes', 'error');
        }
    } catch (error) {
        console.error(error);
        Swal.fire('¡Error!', 'Error en la petición', 'error');
    }
  }

  async function actualizarSelectClientes() {

    const select = document.getElementById('nroDocumentoCliente');
    const valorActual = select.value;
    console.log(clientesSelect);
    select.innerHTML = '<option value="">Seleccione un cliente...</option>';
    Object.entries(clientesSelect).forEach(([key, value]) => {
      const cliente = clientesSelect[key];
      const option = document.createElement('option');
      option.value = key;
      option.textContent = key+" - "+value.nombre+" "+value.apellidos;
      select.appendChild(option);
    });
    if (valorActual) select.value = valorActual;
  }

  function mostrarDatosCliente() {
    const nroDoc = document.getElementById('nroDocumentoCliente').value;
    const infoContainer = document.getElementById('infoClienteContainer');

    if (nroDoc && clientesSelect[nroDoc]) {
      const c = clientesSelect[nroDoc];
      document.getElementById('infoDocumento').textContent = nroDoc;
      document.getElementById('infoTipoDoc').textContent = c.tipo_documento;
      document.getElementById('infoNombre').textContent = c.nombre;
      document.getElementById('infoApellidos').textContent = c.apellidos;
      document.getElementById('infoCorreo').textContent = c.correo;
      document.getElementById('infoTelefono').textContent = c.telefono;
      infoContainer.classList.remove('hidden');
    } else {
      infoContainer.classList.add('hidden');
    }
  }

  function abrirModalCrearCliente() {
    modoEdicionCliente = false;
    filaEditandoCliente = null;
    document.getElementById('modalClienteLabel').textContent = 'Crear Cliente';
    document.getElementById('numeroDocumento').value = "";
    document.getElementById('numeroDocumentoLabel').textContent = "";
    document.getElementById('tipoDocumento').value = "";
    document.getElementById('nombre').value = "";
    document.getElementById('apellidos').value = "";
    document.getElementById('correo').value = "";
    document.getElementById('telefono').value = "";

    document.getElementById('numeroDocumentoContainer').classList.remove('hidden');
    document.getElementById('numeroDocumentoLabelContainer').classList.add('hidden');

    abrirModal('modalCliente');
  }

  function editarCliente(boton) {
    modoEdicionCliente = true;
    filaEditandoCliente = boton.closest('tr');
    document.getElementById('modalClienteLabel').textContent = 'Editar Cliente';

    const c = filaEditandoCliente.cells;
    document.getElementById('numeroDocumento').value = c[0].textContent;
    document.getElementById('numeroDocumentoLabel').textContent = c[0].textContent;
    document.getElementById('tipoDocumento').value = c[1].textContent;
    document.getElementById('nombre').value = c[2].textContent;
    document.getElementById('apellidos').value = c[3].textContent;
    document.getElementById('correo').value = c[4].textContent;
    document.getElementById('telefono').value = c[5].textContent;

    document.getElementById('numeroDocumentoContainer').classList.add('hidden');
    document.getElementById('numeroDocumentoLabelContainer').classList.remove('hidden');

    abrirModal('modalCliente');
  }

  async function guardarCliente() {

    const numeroDocumento = modoEdicionCliente
      ? document.getElementById('numeroDocumentoLabel').textContent
      : document.getElementById('numeroDocumento').value;

    const tipoDocumento = document.getElementById('tipoDocumento').value;
    const nombre = document.getElementById('nombre').value;
    const apellidos = document.getElementById('apellidos').value;
    const correo = document.getElementById('correo').value;
    const telefono = document.getElementById('telefono').value;

    let formData = new FormData();
    formData.append("nro_documento", numeroDocumento);
    formData.append("tipo_documento", tipoDocumento);
    formData.append("nombre", nombre);
    formData.append("apellidos", apellidos);
    formData.append("correo", correo);
    formData.append("telefono", telefono);

    if(modoEdicionCliente){
        Guardareditar(formData,numeroDocumento);
    }else{
        try {
            let response = await fetch("store_client", {
            method: "POST",
            headers: {
                "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]').content
            },
            body: formData
            });

            let data = await response.json();

            if (data.success) {
                cerrarModal('modalCliente');
                Swal.fire('¡Creado!', 'Cliente registrado con éxito', 'success');

            } else {
                Swal.fire('¡Error!', 'Error al registrar', 'error');
            }
        } catch (error) {
            console.error(error);
            Swal.fire('¡Error!', 'Error en la petición', 'error');
        }
    }

    cerrarModal('modalCliente');
    actualizarSelectClientes();
    listarclientes();
  }

  async function Guardareditar(formData,numeroDocumento) {
    try {

        console.log("HOLA");
        let response = await fetch(`/update_client/${numeroDocumento}`, {
        method: "POST",
        headers: {
            "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]').content
        },
        body: formData
        });

        let data = await response.json();

        if (data.success) {
            cerrarModal('modalCliente');
            Swal.fire('¡EDITADO!', 'Cliente Editado con éxito', 'success');

        } else {
            Swal.fire('¡Error!', 'Error al registrar', 'error');
        }
    } catch (error) {
        console.error(error);
        Swal.fire('¡Error!', 'Error en la petición', 'error');
    }

  }

  async function eliminarCliente(identificador) {
    const numeroDocumento = identificador ?? "";

    Swal.fire({
      title: '¿Está seguro?',
      text: `¿Eliminar al cliente ${clientesSelect[numeroDocumento].nombre} ${clientesSelect[numeroDocumento].apellidos}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then(async (r) => {
      if (r.isConfirmed) {

        try {

            console.log("HOLA");
            let response = await fetch(`/delete_client/${numeroDocumento}`, {
                method: "POST",
                headers: {
                    "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]').content
                }
            });

            let data = await response.json();

            if (data.success) {
                Swal.fire('Eliminado', 'El cliente fue eliminado.', 'success');
            } else {
                Swal.fire('¡Error!', 'Error al eliminar', 'error');
            }
        } catch (error) {
            console.error(error);
            Swal.fire('¡Error!', 'Error en la petición', 'error');
        }
        listarclientes();
        actualizarSelectClientes();
      }
    });
  }

  // ===============================
  // VEHÍCULOS
  // ===============================
  async function listarvehiculos(){
    try {

        let response = await fetch("list_vehicle");
        let data = await response.json();

        if (data.success) {

            document.getElementById('tablaVehiculos').innerHTML="";
            lineas="";
            Object.entries(data.data).forEach(([key, value]) => {
                lineas+="<tr>";
                lineas+=`   <td>${value.placa}</td>`;
                lineas+=`   <td>${value.marca}</td>`;
                lineas+=`   <td>${value.modelo}</td>`;
                lineas+=`   <td>${value.anio_fabricacion}</td>`;
                lineas+=`   <td>${value.nro_documento_cliente}</td>`;
                lineas+=`   <td class="flex gap-2">
                                <button class="btn btn-sm btn-info" onclick="editarVehiculo(this)">
                                    <i class="fas fa-edit"></i>
                                </button>
                                <button class="btn btn-sm btn-error" onclick="eliminarVehiculo(\'${value.placa}\')">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </td>`;
                lineas+="<tr>";

            });

            document.getElementById('tablaVehiculos').innerHTML=lineas;

        } else {
            Swal.fire('¡Error!', 'Error al listar Clientes', 'error');
        }
    } catch (error) {
        console.error(error);
        Swal.fire('¡Error!', 'Error en la petición', 'error');
    }
  }
  function abrirModalCrearVehiculo() {
    modoEdicionVehiculo = false;
    filaEditandoVehiculo = null;
    document.getElementById('modalVehiculoLabel').textContent = 'Crear Vehículo';
    document.getElementById('placa').value = "";
    document.getElementById('placaLabel').textContent = "";
    document.getElementById('marca').value = "";
    document.getElementById('modelo').value = "";
    document.getElementById('anioFabricacion').value = "";
    document.getElementById('nroDocumentoCliente').value = "";

    document.getElementById('placaContainer').classList.remove('hidden');
    document.getElementById('placaLabelContainer').classList.add('hidden');

    document.getElementById('infoClienteContainer').classList.add('hidden');

    abrirModal('modalVehiculo');
  }

  function editarVehiculo(boton) {
    modoEdicionVehiculo = true;
    filaEditandoVehiculo = boton.closest('tr');
    document.getElementById('modalVehiculoLabel').textContent = 'Editar Vehículo';

    const c = filaEditandoVehiculo.cells;

    document.getElementById('placa').value = c[0].textContent;
    document.getElementById('placaLabel').textContent = c[0].textContent;
    document.getElementById('marca').value = c[1].textContent;
    document.getElementById('modelo').value = c[2].textContent;
    document.getElementById('anioFabricacion').value = c[3].textContent;
    document.getElementById('nroDocumentoCliente').value = c[4].textContent;

    mostrarDatosCliente();

    document.getElementById('placaContainer').classList.add('hidden');
    document.getElementById('placaLabelContainer').classList.remove('hidden');

    abrirModal('modalVehiculo');
  }

  async function guardarVehiculo() {

    const placa = modoEdicionVehiculo
      ? document.getElementById('placaLabel').textContent
      : document.getElementById('placa').value;
    const marca = document.getElementById('marca').value;
    const modelo = document.getElementById('modelo').value;
    const anioFabricacion = document.getElementById('anioFabricacion').value;
    const nroDocumentoCliente = document.getElementById('nroDocumentoCliente').value;

    let formData = new FormData();
    formData.append("placa", placa);
    formData.append("marca", marca);
    formData.append("modelo", modelo);
    formData.append("anio_fabricacion", anioFabricacion);
    formData.append("nro_documento_cliente", nroDocumentoCliente);

    if(modoEdicionVehiculo){
        Guardareditarvehicle(formData,placa);
    }else{
        try {
            let response = await fetch("store_vehicle", {
            method: "POST",
            headers: {
                "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]').content
            },
            body: formData
            });

            let data = await response.json();

            if (data.success) {
                cerrarModal('modalVehiculo');
                Swal.fire('¡Creado!', 'Vehiculo registrado con éxito', 'success');

            } else {
                Swal.fire('¡Error!', 'Error al registrar', 'error');
            }
        } catch (error) {
            console.error(error);
            Swal.fire('¡Error!', 'Error en la petición', 'error');
        }
    }

    listarvehiculos();
    cerrarModal('modalVehiculo');
  }

  async function Guardareditarvehicle(formData,placa) {
    try {

        let response = await fetch(`/update_vehicle/${placa}`, {
        method: "POST",
        headers: {
            "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]').content
        },
        body: formData
        });

        let data = await response.json();

        if (data.success) {
            cerrarModal('modalVehiculo');
            Swal.fire('¡EDITADO!', 'Vehiculo Editado con éxito', 'success');

        } else {
            Swal.fire('¡Error!', 'Error al registrar', 'error');
        }
    } catch (error) {
        console.error(error);
        Swal.fire('¡Error!', 'Error en la petición', 'error');
    }

  }

  function eliminarVehiculo(identificador) {
    const placa = identificador ?? "";

    Swal.fire({
      title: '¿Está seguro?',
      text: `¿Eliminar al vehiculo ${placa}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then(async (r) => {
      if (r.isConfirmed) {

        try {

            console.log("HOLA");
            let response = await fetch(`/delete_vehicle/${placa}`, {
                method: "POST",
                headers: {
                    "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]').content
                }
            });

            let data = await response.json();

            if (data.success) {
                Swal.fire('Eliminado', 'El Vehiculo fue eliminado.', 'success');
            } else {
                Swal.fire('¡Error!', 'Error al eliminar', 'error');
            }
        } catch (error) {
            console.error(error);
            Swal.fire('¡Error!', 'Error en la petición', 'error');
        }
        listarvehiculos();
      }
    });
  }

  // Inicializar select de clientes al cargar
  listarclientes();
  listarvehiculos();
