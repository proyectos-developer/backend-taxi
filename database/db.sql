CREATE DATABASE admin_taxi_huaraz;

USE admin_taxi_huaraz;

/**Usuarios página**/
CREATE TABLE users(
    id INT(11) NOT NULL,
    correo VARCHAR (100) NOT NULL,
    password VARCHAR (60) NOT NULL,
    usuario VARCHAR (100) NOT NULL
);

ALTER TABLE users
    ADD PRIMARY KEY(id);

ALTER TABLE users
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

DESCRIBE users;

/**Tokens dispositivos usuarios **/
CREATE TABLE tokens_usuarios(
    id INT(11) NOT NULL,
    usuario VARCHAR (100) NOT NULL,
    tipo_usuario VARCHAR (100) NOT NULL,
    tokens_usuario VARCHAR (100) NOT NULL,
    created_at timestamp NOT NULL DEFAULT current_timestamp 
);

ALTER TABLE tokens_usuarios
    ADD PRIMARY KEY(id);

ALTER TABLE tokens_usuarios
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

DESCRIBE tokens_usuarios;

/**Marcas carros **/
CREATE TABLE marcas_carros(
    id INT(11) NOT NULL,
    marca VARCHAR (100) NOT NULL,
    created_at timestamp NOT NULL DEFAULT current_timestamp 
);

ALTER TABLE marcas_carros
    ADD PRIMARY KEY(id);

ALTER TABLE marcas_carros
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

DESCRIBE marcas_carros;

/**Modelos carros **/
CREATE TABLE modelos_carros(
    id INT(11) NOT NULL,
    id_marca INT (11) NOT NULL,
    modelo VARCHAR (100) NOT NULL,
    created_at timestamp NOT NULL DEFAULT current_timestamp 
);

ALTER TABLE modelos_carros
    ADD PRIMARY KEY(id);

ALTER TABLE modelos_carros
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

DESCRIBE modelos_carros;

/**Cupones de decuento **/
CREATE TABLE cupones(
    id INT(11) NOT NULL,
    viajero VARCHAR (100) NOT NULL,
    cupon VARCHAR (100) NOT NULL,
    disponible TINYINT,
    created_at timestamp NOT NULL DEFAULT current_timestamp 
);

ALTER TABLE cupones
    ADD PRIMARY KEY(id);

ALTER TABLE cupones
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

DESCRIBE cupones;

/**Calificaciones **/
CREATE TABLE calificaciones(
    id INT(11) NOT NULL,
    viajero VARCHAR (100) NOT NULL,
    conductor VARCHAR (100) NOT NULL,
    id_viaje INT(11) NOT NULL,
    calificacion DOUBLE,
    comentario VARCHAR (300) NOT NULL,
    created_at timestamp NOT NULL DEFAULT current_timestamp 
);

ALTER TABLE calificaciones
    ADD PRIMARY KEY(id);

ALTER TABLE calificaciones
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

DESCRIBE calificaciones;

/**Direcciones **/
CREATE TABLE direcciones_guardadas(
    id INT(11) NOT NULL,
    direccion VARCHAR (200) NOT NULL,
    created_at timestamp NOT NULL DEFAULT current_timestamp 
);

ALTER TABLE direcciones_guardadas
    ADD PRIMARY KEY(id);

ALTER TABLE direcciones_guardadas
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

DESCRIBE direcciones_guardadas;

/**Viajeros página**/
CREATE TABLE viajeros(
    id INT(11) NOT NULL,
    correo VARCHAR (100) NOT NULL,
    password VARCHAR (60) NOT NULL,
    usuario VARCHAR (100) NOT NULL
);

ALTER TABLE viajeros
    ADD PRIMARY KEY(id);

ALTER TABLE viajeros
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

DESCRIBE viajeros;

/**Viajes**/
CREATE TABLE viajes(
    id INT(11) NOT NULL,
    longitude_origen DOUBLE NOT NULL,
    longitude_destino DOUBLE NOT NULL,
    latitude_origen DOUBLE NOT NULL,
    latitude_destino DOUBLE NOT NULL,
    viajero VARCHAR (100) NOT NULL,
    conductor VARCHAR (100) NOT NULL,
    direccion_origen VARCHAR (200) NOT NULL,
    direccion_destino VARCHAR (200) NOT NULL
);

ALTER TABLE viajes
    ADD PRIMARY KEY(id);

ALTER TABLE viajes
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

DESCRIBE viajes;

/**Conductores**/
CREATE TABLE conductores(
    id INT(11) NOT NULL,
    nombres VARCHAR (100) NOT NULL,
    apellidos VARCHAR (100) NOT NULL,
    fecha_nacimiento VARCHAR (100) NOT NULL,
    tipo_documento VARCHAR (100) NOT NULL,
    nro_documento VARCHAR (100) NOT NULL,
    nro_telefono VARCHAR (100) NOT NULL,
    correo VARCHAR (100) NOT NULL,
    habilitado TINYINT(1) NOT NULL,
    licencia VARCHAR (100) NOT NULL,
    placa VARCHAR (100) NOT NULL,
    clase VARCHAR (5) NOT NULL,
    categoria VARCHAR (100),
    fecha_expedicion DATE NOT NULL,
    fecha_revalidacion DATE NOT NULL,
    marca_carro VARCHAR (100) NOT NULL,
    modelo_carro VARCHAR (100) NOT NULL,
    nro_placa VARCHAR (100) NOT NULL,
    foto_perfil LONGTEXT NOT NULL,
    foto_dni LONGTEXT NOT NULL,
    foto_licencia LONGTEXT NOT NULL,
    created_at timestamp NOT NULL DEFAULT current_timestamp 
);

ALTER TABLE conductores
    ADD PRIMARY KEY(id);

ALTER TABLE conductores
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

DESCRIBE conductores;

/**Usuarios viajeros**/
CREATE TABLE usuarios_viajeros(
    id INT(11) NOT NULL,
    nombres VARCHAR (100) NOT NULL,
    fecha_nacimiento VARCHAR (100) NOT NULL,
    nro_documento VARCHAR (100) NOT NULL,
    nro_telefono VARCHAR (100) NOT NULL,
    correo VARCHAR (100) NOT NULL,
    habilitado TINYINT(1) NOT NULL,
    foto LONGTEXT NOT NULL,
    created_at timestamp NOT NULL DEFAULT current_timestamp 
);

ALTER TABLE usuarios_viajeros
    ADD PRIMARY KEY(id);

ALTER TABLE usuarios_viajeros
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

DESCRIBE usuarios_viajeros;

/**Productos**/
CREATE TABLE productos(
    id INT(11) NOT NULL,
    codigo VARCHAR (50) NOT NULL,
    producto VARCHAR (100) NOT NULL,
    descripcion VARCHAR (500) NOT NULL,
    proveedor VARCHAR (100) NOT NULL,
    categoria VARCHAR (500) NOT NULL,
    subcategoria VARCHAR (500) NOT NULL,
    unidad VARCHAR (500) NOT NULL,
    stock BIGINT (11) NOT NULL,
    precio DOUBLE NOT NULL,
    porcentaje DOUBLE NOT NULL,
    descuento DOUBLE NOT NULL,
    dimensiones VARCHAR (50) NOT NULL,
    peso VARCHAR (50) NOT NULL,
    informacion VARCHAR (500) NOT NULL,
    created_at timestamp NOT NULL DEFAULT current_timestamp 
);

ALTER TABLE productos
    ADD PRIMARY KEY(id);

ALTER TABLE productos
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

DESCRIBE productos;

/**Categorías**/
CREATE TABLE categorias(
    id INT(11) NOT NULL,
    codigo VARCHAR (50) NOT NULL,
    categoria VARCHAR (100) NOT NULL,
    descripcion VARCHAR (500) NOT NULL,
    prioridad INT (11) NOT NULL,
    created_at timestamp NOT NULL DEFAULT current_timestamp 
);

ALTER TABLE categorias
    ADD PRIMARY KEY(id);

ALTER TABLE categorias
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

DESCRIBE categorias;

/**Sub categorías**/
CREATE TABLE subcategorias(
    id INT(11) NOT NULL,
    codigo VARCHAR (50) NOT NULL,
    subcategoria VARCHAR (100) NOT NULL,
    idcategoria VARCHAR (100) NOT NULL,
    categoria VARCHAR (100) NOT NULL,
    descripcion VARCHAR (500) NOT NULL,
    prioridad INT (11) NOT NULL,
    created_at timestamp NOT NULL DEFAULT current_timestamp 
);

ALTER TABLE subcategorias
    ADD PRIMARY KEY(id);

ALTER TABLE subcategorias
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

DESCRIBE subcategorias;

/**Unidades**/
CREATE TABLE unidades(
    id INT(11) NOT NULL,
    codigo VARCHAR (50) NOT NULL,
    unidad VARCHAR (50) NOT NULL,
    simbolo VARCHAR (50) NOT NULL,
    descripcion VARCHAR (500) NOT NULL,
    created_at timestamp NOT NULL DEFAULT current_timestamp 
);

ALTER TABLE unidades
    ADD PRIMARY KEY(id);

ALTER TABLE unidades
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

DESCRIBE unidades;

/**Compras**/
CREATE TABLE compras(
    id INT(11) NOT NULL,
    nro_compra BIGINT NOT NULL,
    id_proveedor INT (11) NOT NULL,
    fecha VARCHAR (100) NOT NULL,
    hora VARCHAR (100) NOT NULL,
    nro_productos INT (11) NOT NULL,
    total_compra DOUBLE NOT NULL,
    notas VARchar (500) NOT NULL,
    created_at timestamp NOT NULL DEFAULT current_timestamp 
);

ALTER TABLE compras
    ADD PRIMARY KEY(id);

ALTER TABLE compras
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

DESCRIBE compras;

/**Productos comprados**/
CREATE TABLE productos_compra(
    id INT(11) NOT NULL,
    id_compra INT (11) NOT NULL,
    id_producto INT(11) NOT NULL,
    cantidad INT (11) NOT NULL,
    precio_producto_unidad DOUBLE NOT NULL,
    precio_producto_total DOUBLE NOT NULL,
    created_at timestamp NOT NULL DEFAULT current_timestamp 
);

ALTER TABLE productos_compra
    ADD PRIMARY KEY(id);

ALTER TABLE productos_compra
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

DESCRIBE productos_compra;

/**Ventas**/
CREATE TABLE ventas(
    id INT(11) NOT NULL,
    nro_venta BIGINT NOT NULL,
    fecha VARCHAR (100) NOT NULL,
    hora VARCHAR (100) NOT NULL,
    nro_productos INT (11) NOT NULL,
    total_venta DOUBLE NOT NULL,
    notas VARchar (500) NOT NULL,
    created_at timestamp NOT NULL DEFAULT current_timestamp 
);

ALTER TABLE ventas
    ADD PRIMARY KEY(id);

ALTER TABLE ventas
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

DESCRIBE ventas;

/**Productos vendidos**/
CREATE TABLE productos_venta(
    id INT(11) NOT NULL,
    id_venta INT (11) NOT NULL
    id_producto INT(11) NOT NULL,
    cantidad INT (11) NOT NULL,
    precio_producto_unidad DOUBLE NOT NULL,
    precio_producto_total DOUBLE NOT NULL,
    created_at timestamp NOT NULL DEFAULT current_timestamp 
);

ALTER TABLE productos_venta
    ADD PRIMARY KEY(id);

ALTER TABLE productos_venta
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

DESCRIBE productos_venta;

/**Favoritos**/
CREATE TABLE favoritos(
    id INT(11) NOT NULL,
    id_producto INT(11) NOT NULL,
    usuario VARCHAR (100) NOT NULL,
    created_at timestamp NOT NULL DEFAULT current_timestamp 
);

ALTER TABLE favoritos
    ADD PRIMARY KEY(id);

ALTER TABLE favoritos
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

DESCRIBE favoritos;

/**Calificaciones**/
CREATE TABLE calificaciones(
    id INT(11) NOT NULL,
    id_producto INT(11) NOT NULL,
    usuario VARCHAR (100) NOT NULL,
    calificacion DOUBLE NOT NULL,
    comentarios VARCHAR (500) NOT NULL,
    created_at timestamp NOT NULL DEFAULT current_timestamp 
);

ALTER TABLE calificaciones
    ADD PRIMARY KEY(id);

ALTER TABLE calificaciones
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

DESCRIBE calificaciones;

/**tabla clientes**/
CREATE TABLE clientes(
    id INT(11) NOT NULL,
    usuario VARCHAR (50) NOT NULL,
    nombres VARCHAR (60) NOT NULL,
    apellidos VARCHAR (60) NOT NULL,
    tipo_documento VARCHAR (60) NOT NULL,
    nro_documento INT(11) NOT NULL,
    tipo_telefono VARCHAR (60) NOT NULL,
    nro_telefono INT(11) NOT NULL,
    pais VARCHAR(20) NOT NULL,
    provincia VARCHAR(20) NOT NULL,
    distrito VARCHAR(20) NOT NULL,
    direccion VARCHAR(200) NOT NULL,
    referencia VARCHAR (200) NOT NULL,
    latitud DOUBLE NOT NULL,
    longitud DOUBLE NOT NULL,
    habilitado TINYINT(1) NOT NULL,
    foto VARCHAR(500) NOT NULL,
    created_at timestamp NOT NULL DEFAULT current_timestamp
);

ALTER TABLE clientes
    ADD PRIMARY KEY(id);

ALTER TABLE clientes
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

DESCRIBE clientes;

/**Areas empresa**/
CREATE TABLE areas_empresa(
    id INT(11) NOT NULL,
    codigo VARCHAR (50) NOT NULL,
    nombre_area VARCHAR (100) NOT NULL,
    descripcion_area VARCHAR (500) NOT NULL,
    foto VARCHAR(500) NOT NULL,
    created_at timestamp NOT NULL DEFAULT current_timestamp 
);

ALTER TABLE areas_empresa
    ADD PRIMARY KEY(id);

ALTER TABLE areas_empresa
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

DESCRIBE areas_empresa;

/**tabla trabajadores**/
CREATE TABLE trabajadores(
    id INT(11) NOT NULL,
    nombres VARCHAR (100) NOT NULL,
    apellidos VARCHAR (100) NOT NULL,
    documento VARCHAR (50) NOT NULL,
    tipo_documento VARCHAR (100) NOT NULL,
    nro_documento BIGINT (11) NOT NULL,
    tipo_telefono VARCHAR(100) NOT NULL,
    nro_telefono BIGINT(11) NOT NULL,
    fecha_nacimiento VARCHAR (10) NOT NULL,
    correo VARCHAR (100) NOT NULL,
    foto VARCHAR (500) NOT NULL,
    direccion VARCHAR (50) NOT NULL,
    distrito VARCHAR (50) NOT NULL,
    provincia VARCHAR (50) NOT NULL,
    pais VARCHAR (50) NOT NULL,
    estudios VARCHAR (100) NOT NULL,
    centroestudios VARCHAR (100) NOT NULL,
    titulo VARCHAR (100) NOT NULL,
    area_trabajo VARCHAR (100) NOT NULL,
    created_at timestamp NOT NULL DEFAULT current_timestamp
);

ALTER TABLE trabajadores
    ADD PRIMARY KEY(id);

ALTER TABLE trabajadores
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

DESCRIBE trabajadores;

/**tabla planillas**/
CREATE TABLE planillas(
    id INT(11) NOT NULL,
    codigo VARCHAR (100) NOT NULL,
    nombres VARCHAR (100) NOT NULL,
    nro_documento INT (11) NOT NULL,
    tipo_pensiones VARCHAR (50) NOT NULL,
    nombre_afp BIGINT (11) NOT NULL,
    comision VARCHAR (10) NOT NULL,
    sueldo DOUBLE NOT NULL,
    asignacion_familiar DOUBLE NOT NULL,
    comisiones DOUBLE NOT NULL,
    otros DOUBLE NOT NULL,
    total_ingresos DOUBLE NOT NULL,
    aportes_afp_tres DOUBLE NOT NULL,
    seguros_cuatro DOUBLE NOT NULL,
    comision_cinco DOUBLE NOT NULL,
    total_afp DOUBLE NOT NULL,
    total_onp DOUBLE NOT NULL,
    bono DOUBLE NOT NULL,
    quinta_categoria DOUBLE NOT NULL,
    adelantos DOUBLE NOT NULL,
    neto_pagar DOUBLE NOT NULL,
    created_at timestamp NOT NULL DEFAULT current_timestamp
);

ALTER TABLE planillas
    ADD PRIMARY KEY(id);

ALTER TABLE planillas
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

DESCRIBE planillas;

/**tabla administradores**/
CREATE TABLE administradores(
    id INT(11) NOT NULL,
    id_trabajador INT(11) NOT NULL,
    habilitado TINYINT(1) NOT NULL,
    motivo VARCHAR (100) NOT NULL
    created_at timestamp NOT NULL DEFAULT current_timestamp
);

ALTER TABLE administradores
    ADD PRIMARY KEY(id);

ALTER TABLE administradores
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

DESCRIBE administradores;

/**tabla permisos**/
CREATE TABLE permisos(
    id INT(11) NOT NULL,
    id_trabajador INT(11) NOT NULL,

    proveedores_write TINYINT(1) NOT NULL,
    proveedores_read TINYINT(1) NOT NULL,
    productos_write TINYINT(1) NOT NULL,
    productos_read TINYINT(1) NOT NULL,
    categorias_write TINYINT(1) NOT NULL,
    categorias_read TINYINT(1) NOT NULL,
    subcategorias_write TINYINT(1) NOT NULL,
    subcategorias_read TINYINT(1) NOT NULL,
    unidades_write TINYINT(1) NOT NULL,
    unidades_read TINYINT(1) NOT NULL,
    inventario_write TINYINT(1) NOT NULL,
    inventario_read TINYINT(1) NOT NULL,
    
    compras_write TINYINT(1) NOT NULL,
    compras_read TINYINT(1) NOT NULL,
    ventas_write TINYINT(1) NOT NULL,
    ventas_read TINYINT(1) NOT NULL,
    favoritos_write TINYINT(1) NOT NULL,
    favoritos_read TINYINT(1) NOT NULL,
    mascomprados_write TINYINT(1) NOT NULL,
    mascomprados_read TINYINT(1) NOT NULL,
    calificaciones_write TINYINT(1) NOT NULL,
    calificaciones_read TINYINT(1) NOT NULL,
    finanzas_write TINYINT(1) NOT NULL,
    finanzas_read TINYINT(1) NOT NULL,
    
    compradores_write TINYINT(1) NOT NULL,
    compradores_read TINYINT(1) NOT NULL,
    
    agenda_write TINYINT(1) NOT NULL,
    agenda_read TINYINT(1) NOT NULL,
    areasempresa_write TINYINT(1) NOT NULL,
    areasempresa_read TINYINT(1) NOT NULL,
    trabajadores_write TINYINT(1) NOT NULL,
    trabajadores_read TINYINT(1) NOT NULL,
    planillas_write TINYINT(1) NOT NULL,
    planillas_read TINYINT(1) NOT NULL,
    reportes_write TINYINT(1) NOT NULL,
    reportes_read TINYINT(1) NOT NULL,
    administradores_write TINYINT(1) NOT NULL,
    administradores_read TINYINT(1) NOT NULL,

    configuraciones_write TINYINT(1) NOT NULL,
    configuraciones_read TINYINT(1) NOT NULL,

    created_at timestamp NOT NULL DEFAULT current_timestamp
);

ALTER TABLE permisos
    ADD PRIMARY KEY(id);

ALTER TABLE permisos
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

DESCRIBE permisos;

/**tabla ganancias**/
CREATE TABLE ganancias(
    id INT(11) NOT NULL,
    fecha DATE NOT NULL,
    total_venta DOUBLE NOT NULL,
    total_compra DOUBLE NOT NULL,
    created_at timestamp NOT NULL DEFAULT current_timestamp
);

ALTER TABLE ganancias
    ADD PRIMARY KEY(id);

ALTER TABLE ganancias
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

DESCRIBE ganancias;

/**usuarios users**/
CREATE TABLE users(
    id INT(11) NOT NULL,
    correo VARCHAR (100) NOT NULL,
    password VARCHAR (60) NOT NULL,
    usuario VARCHAR (100) NOT NULL
);

ALTER TABLE users
    ADD PRIMARY KEY(id);

ALTER TABLE users
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

DESCRIBE users;

/**tabla solicituded**/
CREATE TABLE solicitudes(
    id INT(11) NOT NULL,
    rubro VARCHAR (100) NOT NULL,
    contacto VARCHAR (100) NOT NULL,
    correo VARCHAR (100) NOT NULL,
    telefono VARCHAR(100) NOT NULL,
    nombre VARCHAR (100) NOT NULL,
    nro_ruc VARCHAR(100) NOT NULL,
    created_at timestamp NOT NULL DEFAULT current_timestamp
);

ALTER TABLE solicitudes
    ADD PRIMARY KEY(id);

ALTER TABLE solicitudes
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

DESCRIBE solicitudes;

/**tabla info negocio**/
CREATE TABLE info_negocio(
    id INT(11) NOT NULL,
    razon_social VARCHAR (100) NOT NULL,
    nro_ruc VARCHAR (100) NOT NULL,
    correo VARCHAR (100) NOT NULL,
    nro_telefono VARCHAR(100) NOT NULL,
    nombre_contacto VARCHAR (100) NOT NULL,
    direccion VARCHAR(100) NOT NULL,
    pais VARCHAR(100) NOT NULL,
    provincia VARCHAR(100) NOT NULL,
    distrito VARCHAR(100) NOT NULL,
    foto LONGTEXT NOT NULL,
    created_at timestamp NOT NULL DEFAULT current_timestamp
);

ALTER TABLE info_negocio
    ADD PRIMARY KEY(id);

ALTER TABLE info_negocio
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

DESCRIBE info_negocio;

/**tabla historial**/
CREATE TABLE historial(
    id INT(11) NOT NULL,
    usuario VARCHAR (100) NOT NULL,
    admin VARCHAR (100) NOT NULL,
    tabla VARCHAR (100) NOT NULL,
    accion VARCHAR(100) NOT NULL,
    id_dato VARCHAR (100) NOT NULL,
    fecha VARCHAR(100) NOT NULL,
    hora VARCHAR (100) NOT NULL,
    created_at timestamp NOT NULL DEFAULT current_timestamp
);

ALTER TABLE historial
    ADD PRIMARY KEY(id);

ALTER TABLE historial
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

DESCRIBE historial;

/**lista universidades**/
CREATE TABLE universidades(
    id INT(11) NOT NULL,
    nombre VARCHAR (200) NOT NULL,
    abreviatura VARCHAR (50) NOT NULL,
    centro VARCHAR (100) NOT NULL,
    tipo VARCHAR (100) NOT NULL,
    pronvincia VARCHAR (100) NOT NULL,
    distrito VARCHAR (100) NOT NULL,
    created_at timestamp NOT NULL DEFAULT current_timestamp
);

ALTER TABLE universidades
    ADD PRIMARY KEY(id);

ALTER TABLE universidades
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

DESCRIBE universidades;

/**lista agenda**/
CREATE TABLE agenda(
    id INT(11) NOT NULL,
    dia VARCHAR (100) NOT NULL,
    hora_inicio VARCHAR (100) NOT NULL,
    hora_fin VARCHAR (100) NOT NULL,
    titutlo VARCHAR (100) NOT NULL,
    descripcion VARCHAR (100) NOT NULL,
    tipo VARCHAR (100) NOT NULL,
    jefe VARCHAR (100) NOT NULL,
    created_at timestamp NOT NULL DEFAULT current_timestamp
);

ALTER TABLE agenda
    ADD PRIMARY KEY(id);

ALTER TABLE agenda
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

DESCRIBE agenda;

/**lista trabajadores reunion**/
CREATE TABLE trabajadores_reunion(
    id INT(11) NOT NULL,
    id_trabajador VARCHAR (100) NOT NULL,
    area_trabajo VARCHAR (100) NOT NULL,
    correo VARCHAR (100) NOT NULL,
    nro_telefono VARCHAR (100) NOT NULL,
    id_reunion INT(11) NOT NULL,
    created_at timestamp NOT NULL DEFAULT current_timestamp
);

ALTER TABLE trabajadores_reunion
    ADD PRIMARY KEY(id);

ALTER TABLE trabajadores_reunion
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

DESCRIBE trabajadores_reunion;

/**lista proveedores reunion**/
CREATE TABLE proveedores_reunion(
    id INT(11) NOT NULL,
    id_proveedor VARCHAR (100) NOT NULL,
    categoria VARCHAR (100) NOT NULL,
    nombres VARCHAR (100) NOT NULL,
    correo VARCHAR (100) NOT NULL,
    nro_telefono VARCHAR (100) NOT NULL,
    id_reunion INT(11) NOT NULL,
    created_at timestamp NOT NULL DEFAULT current_timestamp
);

ALTER TABLE proveedores_reunion
    ADD PRIMARY KEY(id);

ALTER TABLE proveedores_reunion
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

DESCRIBE proveedores_reunion;

/**lista invitados reunion**/
CREATE TABLE invitados_reunion(
    id INT(11) NOT NULL,
    nombres VARCHAR (100) NOT NULL,
    correo VARCHAR (100) NOT NULL,
    nro_telefono VARCHAR (100) NOT NULL,
    id_reunion INT(11) NOT NULL,
    created_at timestamp NOT NULL DEFAULT current_timestamp
);

ALTER TABLE invitados_reunion
    ADD PRIMARY KEY(id);

ALTER TABLE invitados_reunion
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

DESCRIBE invitados_reunion;

/**lista sucursales**/
CREATE TABLE sucursales(
    id INT(11) NOT NULL,
    nombre VARCHAR (100) NOT NULL,
    direccion VARCHAR (100) NOT NULL,
    pais VARCHAR (100) NOT NULL,
    distrito VARCHAR(100) NOT NULL,
    provincia VARCHAR(100) NOT NULL,
    created_at timestamp NOT NULL DEFAULT current_timestamp
);

ALTER TABLE sucursales
    ADD PRIMARY KEY(id);

ALTER TABLE sucursales
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

DESCRIBE sucursales;

users

/**Tours**/
CREATE TABLE tours(
    id INT(11) NOT NULL,
    region VARCHAR (100) NOT NULL,
    provincia VARCHAR (100) NOT NULL,
    distrito VARCHAR (100) NOT NULL,
    codigo_recurso VARCHAR(100) NOT NULL,
    nombre_recurso VARCHAR(100) NOT NULL,
    categoria VARCHAR(100) NOT NULL,
    tipo_categoria VARCHAR(100) NOT NULL,
    tipo_sub_categoria VARCHAR(100) NOT NULL,
    latitud DOUBLE NOT NULL,
    longitud DOUBLE NOT NULL
);

ALTER TABLE tours
    ADD PRIMARY KEY(id);

ALTER TABLE tours
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

DESCRIBE tours;

/**Factura o boleta**/
CREATE TABLE facturacion(
    id INT(11) NOT NULL,
    tipo VARCHAR (100) NOT NULL,
    nombres VARCHAR (100) NOT NULL,
    nro_documento VARCHAR (100) NOT NULL,
    direccion_boleta VARCHAR (100) NOT NULL,
    correo_boleta VARCHAR(100) NOT NULL,
    razon_social VARCHAR (100) NOT NULL,
    nro_ruc VARCHAR (100) NOT NULL,
    direccion_factura VARCHAR (100) NOT NULL,
    correo_factura VARCHAR(100) NOT NULL,
    usuario VARCHAR(100) NOT NULL,
    created_at timestamp NOT NULL DEFAULT current_timestamp
);

ALTER TABLE facturacion
    ADD PRIMARY KEY(id);

ALTER TABLE facturacion
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

DESCRIBE facturacion;

/**Factura o boleta**/
CREATE TABLE boleta_factura(
    id INT(11) NOT NULL,
    tipo VARCHAR (100) NOT NULL,
    nro_boleta BIGINT NOT NULL,
    nro_factura BIGINT NOT NULL,
    monto FLOAT NOT NULL,
    fecha VARCHAR (100) NOT NULL,
    created_at timestamp NOT NULL DEFAULT current_timestamp
);

ALTER TABLE boleta_factura
    ADD PRIMARY KEY(id);

ALTER TABLE boleta_factura
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

DESCRIBE boleta_factura; 

/**Conductor cobrar**/
CREATE TABLE cobrar_conductor(
    id INT(11) NOT NULL,
    usuario VARCHAR (100) NOT NULL,
    medio_pago VARCHAR (100) NOT NULL,
    nro_yape VARCHAR (100) NOT NULL,
    nro_plin VARCHAR (100) NOT NULL,
    nombre_banco VARCHAR (100) NOT NULL,
    nro_cuenta VARCHAR (100) NOT NULL,
    cuenta_interbancaria VARCHAR (100) NOT NULL,
    created_at timestamp NOT NULL DEFAULT current_timestamp
);

ALTER TABLE cobrar_conductor
    ADD PRIMARY KEY(id);

ALTER TABLE cobrar_conductor
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

DESCRIBE cobrar_conductor; 