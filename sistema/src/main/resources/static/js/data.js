// Mock data for Sistema de Gestión Ferretería
const CATEGORIAS = ["Todas", "Herramientas", "Tornillos y Fijaciones", "Electricidad", "Plomería", "Pinturas", "Seguridad"];

const PRODUCTOS_INIT = [
  { id: "P-001", nombre: "Martillo de acero 16oz", descripcion: "Martillo de carpintero con mango de fibra de vidrio", categoria: "Herramientas", precio: 12.50, stock: 45, stockMin: 10 },
  { id: "P-002", nombre: "Destornillador Phillips #2", descripcion: "Destornillador de punta Phillips magnética", categoria: "Herramientas", precio: 4.75, stock: 3, stockMin: 15 },
  { id: "P-003", nombre: "Llave ajustable 10\"", descripcion: "Llave inglesa ajustable cromada", categoria: "Herramientas", precio: 9.99, stock: 22, stockMin: 8 },
  { id: "P-004", nombre: "Tornillo hexagonal M8x30", descripcion: "Tornillo hexagonal galvanizado, caja 100 unidades", categoria: "Tornillos y Fijaciones", precio: 6.20, stock: 2, stockMin: 20 },
  { id: "P-005", nombre: "Clavo de acero 3\"", descripcion: "Clavos de acero punta diamante, bolsa 1kg", categoria: "Tornillos y Fijaciones", precio: 3.80, stock: 60, stockMin: 25 },
  { id: "P-006", nombre: "Taladro eléctrico 600W", descripcion: "Taladro percutor con velocidad variable", categoria: "Herramientas", precio: 55.00, stock: 8, stockMin: 5 },
  { id: "P-007", nombre: "Cable eléctrico THHN #12", descripcion: "Cable de cobre sólido, rollo 100m", categoria: "Electricidad", precio: 28.00, stock: 4, stockMin: 10 },
  { id: "P-008", nombre: "Interruptor doble", descripcion: "Interruptor doble para empotrar, 15A", categoria: "Electricidad", precio: 2.50, stock: 35, stockMin: 20 },
  { id: "P-009", nombre: "Codo PVC 3/4\"", descripcion: "Codo de PVC presión 90°", categoria: "Plomería", precio: 0.85, stock: 1, stockMin: 50 },
  { id: "P-010", nombre: "Llave de paso 1/2\"", descripcion: "Llave de bola cromada para agua", categoria: "Plomería", precio: 7.40, stock: 18, stockMin: 10 },
  { id: "P-011", nombre: "Pintura látex blanca 1gal", descripcion: "Pintura interior para pared, blanco mate", categoria: "Pinturas", precio: 14.90, stock: 25, stockMin: 12 },
  { id: "P-012", nombre: "Casco de seguridad", descripcion: "Casco HDPE tipo II blanco", categoria: "Seguridad", precio: 8.50, stock: 12, stockMin: 8 },
  { id: "P-013", nombre: "Guantes de cuero", descripcion: "Guantes de trabajo cuero reforzado", categoria: "Seguridad", precio: 5.30, stock: 7, stockMin: 10 },
  { id: "P-014", nombre: "Tubo PVC 1\" x 6m", descripcion: "Tubo PVC presión, 200 PSI", categoria: "Plomería", precio: 4.60, stock: 30, stockMin: 15 },
  { id: "P-015", nombre: "Broca para concreto 3/8\"", descripcion: "Broca SDS para taladradora percutora", categoria: "Herramientas", precio: 3.20, stock: 5, stockMin: 12 },
];

const PROVEEDORES_INIT = [
  { id: "PRV-001", nombre: "Distribuidora Industrial S.A.", contacto: "Carlos Méndez", direccion: "Calle 5, Zona Industrial, Bloque 12", telefono: "2234-5678", email: "ventas@distindustrial.com", productos: ["Herramientas", "Tornillos y Fijaciones"] },
  { id: "PRV-002", nombre: "ElectroSupply Co.", contacto: "María Rodríguez", direccion: "Ave. Comercial 78, Local 3", telefono: "2256-1234", email: "maria@electrosupply.com", productos: ["Electricidad"] },
  { id: "PRV-003", nombre: "Plomería y Más", contacto: "Juan García", direccion: "Barrio Los Olivos, Casa 22", telefono: "2278-9012", email: "jgarcia@plomeriaymas.com", productos: ["Plomería"] },
  { id: "PRV-004", nombre: "Pinturas del Norte", contacto: "Ana López", direccion: "Km 15 Carretera Norte", telefono: "2290-3456", email: "ana@pinturasnorte.com", productos: ["Pinturas"] },
  { id: "PRV-005", nombre: "SafeWork Solutions", contacto: "Roberto Díaz", direccion: "Centro Empresarial Torre A, Piso 3", telefono: "2212-7890", email: "roberto@safework.com", productos: ["Seguridad"] },
];

const CLIENTES_INIT = [
  { id: "CLI-001", nombre: "Miguel Ángel Torres", telefono: "8712-3456", email: "mtorres@gmail.com", historial: [
    { id: "VEN-426536", fecha: "2026-04-15", total: 45.80, productos: [{ nombre: "Martillo de acero 16oz", cantidad: 2, precio: 12.50 }, { nombre: "Broca para concreto 3/8\"", cantidad: 3, precio: 3.20 }] },
    { id: "VEN-312847", fecha: "2026-03-22", total: 28.00, productos: [{ nombre: "Cable eléctrico THHN #12", cantidad: 1, precio: 28.00 }] },
  ]},
  { id: "CLI-002", nombre: "Constructora López & Hijos", telefono: "2234-5678", email: "compras@lopezehijos.com", historial: [
    { id: "VEN-198234", fecha: "2026-04-10", total: 220.00, productos: [{ nombre: "Taladro eléctrico 600W", cantidad: 2, precio: 55.00 }, { nombre: "Casco de seguridad", cantidad: 4, precio: 8.50 }, { nombre: "Guantes de cuero", cantidad: 6, precio: 5.30 }] },
  ]},
  { id: "CLI-003", nombre: "Rosa Elena Fuentes", telefono: "7890-1234", email: "", historial: [
    { id: "VEN-087432", fecha: "2026-04-18", total: 19.75, productos: [{ nombre: "Pintura látex blanca 1gal", cantidad: 1, precio: 14.90 }, { nombre: "Codo PVC 3/4\"", cantidad: 5, precio: 0.85 }] },
  ]},
  { id: "CLI-004", nombre: "Taller Mecánico El Yunque", telefono: "2256-7890", email: "elyunque@taller.com", historial: [] },
];

const VENTAS_INIT = [
  { id: "VEN-426536", fecha: "2026-04-15 10:23", empleado: "Pedro Alvarado", cliente: "Miguel Ángel Torres", metodoPago: "Efectivo", productos: [{ nombre: "Martillo de acero 16oz", cantidad: 2, precio: 12.50 }, { nombre: "Broca para concreto 3/8\"", cantidad: 3, precio: 3.20 }], subtotal: 34.60, iva: 4.50, descuento: 0, total: 39.10 },
  { id: "VEN-312847", fecha: "2026-03-22 14:05", empleado: "Laura Sánchez", cliente: "Miguel Ángel Torres", metodoPago: "Tarjeta", productos: [{ nombre: "Cable eléctrico THHN #12", cantidad: 1, precio: 28.00 }], subtotal: 28.00, iva: 3.64, descuento: 0, total: 31.64 },
  { id: "VEN-198234", fecha: "2026-04-10 09:40", empleado: "Pedro Alvarado", cliente: "Constructora López & Hijos", metodoPago: "Tarjeta", productos: [{ nombre: "Taladro eléctrico 600W", cantidad: 2, precio: 55.00 }, { nombre: "Casco de seguridad", cantidad: 4, precio: 8.50 }, { nombre: "Guantes de cuero", cantidad: 6, precio: 5.30 }], subtotal: 175.80, iva: 22.85, descuento: 10, total: 178.47 },
  { id: "VEN-087432", fecha: "2026-04-18 16:12", empleado: "Laura Sánchez", cliente: "Rosa Elena Fuentes", metodoPago: "Efectivo", productos: [{ nombre: "Pintura látex blanca 1gal", cantidad: 1, precio: 14.90 }, { nombre: "Codo PVC 3/4\"", cantidad: 5, precio: 0.85 }], subtotal: 19.15, iva: 2.49, descuento: 0, total: 21.64 },
  { id: "VEN-054321", fecha: "2026-04-19 11:30", empleado: "Pedro Alvarado", cliente: "-", metodoPago: "Efectivo", productos: [{ nombre: "Tornillo hexagonal M8x30", cantidad: 2, precio: 6.20 }, { nombre: "Clavo de acero 3\"", cantidad: 1, precio: 3.80 }], subtotal: 16.20, iva: 2.11, descuento: 5, total: 17.38 },
];

const ORDENES_INIT = [
  { id: "ORD-001", fecha: "2026-04-12", proveedor: "Distribuidora Industrial S.A.", estado: "Recibido", productos: [{ nombre: "Destornillador Phillips #2", cantidad: 30, precio: 3.20 }, { nombre: "Broca para concreto 3/8\"", cantidad: 20, precio: 2.10 }], total: 138.00 },
  { id: "ORD-002", fecha: "2026-04-17", proveedor: "Plomería y Más", estado: "Pendiente", productos: [{ nombre: "Codo PVC 3/4\"", cantidad: 100, precio: 0.60 }, { nombre: "Tubo PVC 1\" x 6m", cantidad: 20, precio: 3.50 }], total: 130.00 },
  { id: "ORD-003", fecha: "2026-04-19", proveedor: "ElectroSupply Co.", estado: "Pendiente", productos: [{ nombre: "Cable eléctrico THHN #12", cantidad: 10, precio: 22.00 }], total: 220.00 },
];

// Expose to window
Object.assign(window, { CATEGORIAS, PRODUCTOS_INIT, PROVEEDORES_INIT, CLIENTES_INIT, VENTAS_INIT, ORDENES_INIT });
