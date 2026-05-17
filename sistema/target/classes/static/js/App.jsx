// App.jsx - Punto de entrada principal
const { useState, useEffect } = React;

const STORAGE_KEY = "ferreteria_state";
const SESSION_KEY = "ferreteria_session";

function App() {
  const saved = (() => { try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; } catch { return {}; } })();
  const savedUser = (() => { try { return JSON.parse(localStorage.getItem(SESSION_KEY)) || null; } catch { return null; } })();

  const [user, setUser] = useState(savedUser);
  const [nav, setNav] = useState(saved.nav || "inventario");
  const [productos, setProductos] = useState([]);
  const [proveedores, setProveedores] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [ventas, setVentas] = useState([]);
  const [ordenes, setOrdenes] = useState([]);


  useEffect(() => {
    if(!user) return;
    fetch('http://localhost:8080/api/products')
      .then(res  => res.json())
      .then(data => setProductos(data.map(p => ({
        id: String(p.id),
        nombre: p.name,
        descripcion: p.description,
        categoria: p.category,
        precio: p.price,
        stock: p.stock,
        stockMin: p.minStock,
      }))));
    }, [user]);
    
  useEffect(() => {
    if (!user) return;
    fetch('http://localhost:8080/api/suppliers')
      .then(res => res.json())
      .then(data => setProveedores(data.map(s => ({
        id: String(s.id),
        nombre: s.nombre,
        contacto: s.contacto,
        direccion: s.direccion,
        telefono: s.telefono,
        email: s.email,
        productos: s.productosSuministrados || [],
      }))));
  }, [user]);

  useEffect(() => {
    if(!user) return;
    fetch('http://localhost:8080/api/customers')
      .then(res => res.json())
      .then(data => setClientes(data.map(c => ({
        id: String(c.id),
        nombre: c.nombre,
        telefono: c.telefono,
        email: c.email,
      }))))
  }, [user]);

  useEffect(() => {
    if (!user) return;
    fetch('http://localhost:8080/api/orders')
      .then(res => res.json())
      .then(data => setOrdenes(data.map(o => ({
        id: String(o.id),
        fecha: o.fecha,
        proveedor: o.proveedor,
        estado: o.estado,
        productos: o.productos || [],
        total: o.total,
      }))));
  }, [user]);
  
  useEffect(() => {
  if (!user) return;
  fetch('http://localhost:8080/api/sales')
    .then(res => res.json())
    .then(data => setVentas(data.map(v => ({
      id: String(v.id),
      fecha: v.fecha,
      empleado: v.empleado,
      cliente: v.cliente,
      metodoPago: v.metodoPago,
      subTotal: v.subTotal ?? v.subtotal,
      iva: v.iva,
      descuento: v.descuento,
      total: v.total,
      productos: (v.items || []).map(i => ({ nombre: i.nombre, cantidad: i.cantidad, precio: i.precio })),
    }))));
}, [user]);



  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ nav, productos, proveedores, clientes, ventas, ordenes }));
  }, [nav, productos, proveedores, clientes, ventas, ordenes]);

  function handleLogin(u) {
    setUser(u);
    localStorage.setItem(SESSION_KEY, JSON.stringify(u));
    setNav(u.role === "vendedor" ? "ventas" : "inventario");
  }

  function handleLogout() {
    setUser(null);
    localStorage.removeItem(SESSION_KEY);
  }

  const stockBajoCount = productos.filter(p => p.stock < p.stockMin).length;

  function handleVentaCreada(venta) {
    setVentas(vs => [venta, ...vs]);
  }

  useEffect(() => {
    if (user?.role === "vendedor" && nav === "reportes") setNav("ventas");
  }, [user, nav]);

  if (!user) return <Login onLogin={handleLogin} />;

  const role = user.role;

  const renderContent = () => {
    switch (nav) {
      case "inventario": return <Inventario productos={productos} setProductos={setProductos} role={role} />;
      case "ventas": return <Ventas productos={productos} setProductos={setProductos} clientes={clientes} onVentaCreada={handleVentaCreada} />;
      case "reportes": return role === "admin" ? <Reportes ventas={ventas} ordenes={ordenes} setOrdenes={setOrdenes} proveedores={proveedores} productos={productos} /> : null;
      case "proveedores": return <Proveedores proveedores={proveedores} setProveedores={setProveedores} role={role} />;
      case "clientes": return <Clientes clientes={clientes} setClientes={setClientes} role={role} ventas={ventas} />;
      default: return null;
    }
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar active={nav} onNav={setNav} stockBajoCount={stockBajoCount} user={user} onLogout={handleLogout} />
      <main style={{ marginLeft: 220, flex: 1, minHeight: "100vh", background: "#f4f5f7", overflowY: nav === "ventas" ? "hidden" : "auto" }}>
        {renderContent()}
      </main>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
