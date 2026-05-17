// Módulo Ventas / POS
const { useState, useMemo, useRef, useEffect } = React;

const DESCUENTOS = [5, 10, 15, 20];

function ClienteAutocomplete({ clientes, value, telefono, onChange, onSelect }) {
  const [open, setOpen] = useState(false);
  const [focused, setFocused] = useState(false);
  const ref = useRef(null);

  const sugerencias = useMemo(() => {
    if (!value.trim()) return clientes;
    const q = value.toLowerCase();
    return clientes.filter(c =>
      c.nombre.toLowerCase().includes(q) || c.telefono.includes(q)
    );
  }, [clientes, value]);

  useEffect(() => {
    function handler(e) { if (ref.current && !ref.current.contains(e.target)) setOpen(false); }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} style={{ position: "relative", marginBottom: 14 }}>
      <label style={{ display: "block", fontSize: 12.5, fontWeight: 600, color: "#374151", marginBottom: 5 }}>
        Nombre del cliente
      </label>
      <input
        style={{ width: "100%", padding: "8px 10px", border: "1.5px solid #e5e7eb", borderRadius: 7, fontSize: 13.5, color: "#111827", outline: "none", boxSizing: "border-box", fontFamily: "inherit", background: "white" }}
        placeholder="Buscar cliente registrado o nombre libre…"
        value={value}
        onChange={e => { onChange(e.target.value, ""); setOpen(true); }}
        onFocus={() => { setOpen(true); setFocused(true); }}
        autoComplete="off"
      />
      {open && (
        <div style={{ position: "absolute", top: "calc(100% + 4px)", left: 0, right: 0, background: "white", border: "1.5px solid #e5e7eb", borderRadius: 9, boxShadow: "0 8px 24px rgba(0,0,0,0.1)", zIndex: 500, maxHeight: 220, overflowY: "auto" }}>
          {sugerencias.length === 0 && (
            <div style={{ padding: "10px 14px", fontSize: 13, color: "#9ca3af" }}>No hay clientes que coincidan — se registrará como nuevo.</div>
          )}
          {sugerencias.map(c => (
            <button key={c.id} onMouseDown={() => { onSelect(c); setOpen(false); }}
              style={{ display: "flex", alignItems: "center", gap: 10, width: "100%", padding: "10px 14px", border: "none", background: "none", cursor: "pointer", textAlign: "left", borderBottom: "1px solid #f9f9f9" }}>
              <div style={{ width: 32, height: 32, borderRadius: "50%", background: "oklch(0.93 0.06 250)", color: "oklch(0.45 0.15 250)", fontWeight: 700, fontSize: 11, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                {c.nombre.split(" ").map(w => w[0]).slice(0, 2).join("")}
              </div>
              <div>
                <div style={{ fontSize: 13.5, fontWeight: 600, color: "#111827" }}>{c.nombre}</div>
                <div style={{ fontSize: 12, color: "#9ca3af" }}>{c.telefono}{c.email ? ` · ${c.email}` : ""}</div>
              </div>
              {c.historial?.length > 0 && (
                <span style={{ marginLeft: "auto", fontSize: 11.5, color: "#6b7280", background: "#f3f4f6", borderRadius: 4, padding: "2px 6px" }}>{c.historial.length} compra{c.historial.length !== 1 ? "s" : ""}</span>
              )}
            </button>
          ))}
        </div>
      )}
      <label style={{ display: "block", fontSize: 12.5, fontWeight: 600, color: "#374151", marginBottom: 5, marginTop: 10 }}>Teléfono</label>
      <input
        style={{ width: "100%", padding: "8px 10px", border: "1.5px solid #e5e7eb", borderRadius: 7, fontSize: 13.5, color: "#111827", outline: "none", boxSizing: "border-box", fontFamily: "inherit", background: "white" }}
        placeholder="0000-0000"
        value={telefono}
        onChange={e => onChange(value, e.target.value)}
      />
    </div>
  );
}

function Ventas({ productos, setProductos, clientes, onVentaCreada }) {
  const [busqueda, setBusqueda] = useState("");
  const [catActiva, setCatActiva] = useState("Todas");
  const [carrito, setCarrito] = useState([]);
  const [descuento, setDescuento] = useState(null);
  const [modal, setModal] = useState(null); // null | "pago" | "recibo"
  const [cliente, setCliente] = useState({ nombre: "", telefono: "" });
  const [metodoPago, setMetodoPago] = useState(null);
  const [recibo, setRecibo] = useState(null);

  const prodsFiltrados = useMemo(() => {
    const q = busqueda.toLowerCase();
    return productos.filter(p => {
      const matchCat = catActiva === "Todas" || p.categoria === catActiva;
      const matchQ = !busqueda || p.nombre.toLowerCase().includes(q) || p.id.toLowerCase().includes(q);
      return matchCat && matchQ && p.stock > 0;
    });
  }, [productos, busqueda, catActiva]);

  function agregarAlCarrito(prod) {
    setCarrito(c => {
      const ex = c.find(i => i.id === prod.id);
      if (ex) {
        if (ex.cantidad >= prod.stock) return c;
        return c.map(i => i.id === prod.id ? { ...i, cantidad: i.cantidad + 1 } : i);
      }
      return [...c, { ...prod, cantidad: 1 }];
    });
  }

  function cambiarCantidad(id, delta) {
    setCarrito(c => c.map(i => i.id === id ? { ...i, cantidad: i.cantidad + delta } : i).filter(i => i.cantidad > 0));
  }

  function eliminarItem(id) { setCarrito(c => c.filter(i => i.id !== id)); }

  const subtotal = carrito.reduce((s, i) => s + i.precio * i.cantidad, 0);
  const descuentoAmt = descuento ? subtotal * (descuento / 100) : 0;
  const baseIva = subtotal - descuentoAmt;
  const iva = baseIva * 0.13;
  const total = baseIva + iva;

  function aplicarDescuento(pct) {
    if (descuento === pct) { if (confirm(`¿Retirar descuento del ${pct}%?`)) setDescuento(null); }
    else { if (confirm(`¿Aplicar descuento del ${pct}%?`)) setDescuento(pct); }
  }

function procesarPago() {
  if (!metodoPago) return;
  const body = {
    fecha: new Date().toLocaleString("es-GT"),
    empleado: "Pedro Alvarado",
    cliente: cliente.nombre || "-",
    metodoPago,
    subTotal: subtotal,
    iva,
    descuento: descuento || 0,
    total,
    items: carrito.map(i => ({
      productId: parseInt(i.id),
      nombre: i.nombre,
      cantidad: i.cantidad,
      precio: i.precio,
    })),
  };
  fetch('http://localhost:8080/api/sales', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  })
  .then(res => res.json())
  .then(data => {
    const venta = {
      id: String(data.id), fecha: data.fecha, empleado: data.empleado,
      cliente: data.cliente, metodoPago: data.metodoPago,
      productos: (data.items || []).map(i => ({ nombre: i.nombre, cantidad: i.cantidad, precio: i.precio })),
      subTotal: data.subTotal, iva: data.iva, descuento: data.descuento, total: data.total,
    };
    setProductos(ps => ps.map(p => {
      const item = carrito.find(i => i.id === p.id);
      return item ? { ...p, stock: p.stock - item.cantidad } : p;
    }));
    onVentaCreada(venta);
    setRecibo(venta);
    setModal("recibo");
  });
}


  function nuevaVenta() {
    setCarrito([]); setDescuento(null); setCliente({ nombre: "", telefono: "" });
    setMetodoPago(null); setRecibo(null); setModal(null);
  }

  return (
    <div style={posStyles.wrap}>
      {/* Panel izquierdo: catálogo */}
      <div style={posStyles.left}>
        <div style={posStyles.leftHeader}>
          <h1 style={{ margin: 0, fontSize: 20, fontWeight: 800, color: "#111827" }}>Punto de Venta</h1>
        </div>

        {/* Categorías */}
        <div style={posStyles.cats}>
          {CATEGORIAS.map(cat => (
            <button key={cat} onClick={() => setCatActiva(cat)}
              style={{ ...posStyles.catBtn, ...(catActiva === cat ? posStyles.catBtnActive : {}) }}>
              {cat}
            </button>
          ))}
        </div>

        {/* Búsqueda */}
        <div style={{ position: "relative", marginBottom: 14 }}>
          <svg style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)" }} width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input style={posStyles.search} placeholder="Buscar por nombre o ID…" value={busqueda} onChange={e => setBusqueda(e.target.value)} />
        </div>

        {/* Grid de productos */}
        <div style={posStyles.prodGrid}>
          {prodsFiltrados.length === 0
            ? <div style={posStyles.empty}>No se encontraron resultados.</div>
            : prodsFiltrados.map(p => (
              <button key={p.id} onClick={() => agregarAlCarrito(p)} style={posStyles.prodCard}>
                <div style={posStyles.prodNombre}>{p.nombre}</div>
                <div style={posStyles.prodCat}>{p.categoria}</div>
                <div style={posStyles.prodBottom}>
                  <span style={posStyles.prodPrecio}>${p.precio.toFixed(2)}</span>
                  <span style={{ fontSize: 11.5, color: p.stock < p.stockMin ? "#f97316" : "#9ca3af" }}>Stock: {p.stock}</span>
                </div>
              </button>
            ))
          }
        </div>
      </div>

      {/* Panel derecho: carrito */}
      <div style={posStyles.right}>
        <div style={posStyles.rightHeader}>
          <span style={{ fontWeight: 700, fontSize: 15, color: "#111827" }}>Carrito</span>
          <span style={{ fontSize: 13, color: "#9ca3af" }}>{carrito.length} ítems</span>
        </div>

        {/* Cliente */}
        <div style={posStyles.clienteSection}>
          <ClienteAutocomplete
            clientes={clientes || []}
            value={cliente.nombre}
            telefono={cliente.telefono}
            onChange={(nombre, telefono) => setCliente({ nombre, telefono })}
            onSelect={c => setCliente({ nombre: c.nombre, telefono: c.telefono })}
          />
        </div>

        {/* Items del carrito */}
        <div style={posStyles.cartItems}>
          {carrito.length === 0
            ? <div style={posStyles.emptyCart}>Selecciona productos del catálogo</div>
            : carrito.map(item => (
              <div key={item.id} style={posStyles.cartItem}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "#111827" }}>{item.nombre}</div>
                  <div style={{ fontSize: 12, color: "#9ca3af" }}>${item.precio.toFixed(2)} c/u</div>
                </div>
                <div style={posStyles.qtyControls}>
                  <button style={posStyles.qtyBtn} onClick={() => cambiarCantidad(item.id, -1)}>−</button>
                  <span style={posStyles.qtyNum}>{item.cantidad}</span>
                  <button style={posStyles.qtyBtn} onClick={() => { const p = productos.find(p => p.id === item.id); if (item.cantidad < p.stock) cambiarCantidad(item.id, 1); }}>+</button>
                </div>
                <div style={{ fontSize: 13.5, fontWeight: 700, color: "#111827", minWidth: 52, textAlign: "right" }}>${(item.precio * item.cantidad).toFixed(2)}</div>
                <button onClick={() => eliminarItem(item.id)} style={posStyles.trashBtn}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/></svg>
                </button>
              </div>
            ))
          }
        </div>

        {/* Descuentos */}
        {carrito.length > 0 && (
          <div style={posStyles.descSection}>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#6b7280", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.04em" }}>Descuentos</div>
            <div style={{ display: "flex", gap: 6 }}>
              {DESCUENTOS.map(pct => (
                <button key={pct} onClick={() => aplicarDescuento(pct)}
                  style={{ ...posStyles.descBtn, ...(descuento === pct ? posStyles.descBtnActive : {}) }}>
                  {pct}%
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Totales */}
        <div style={posStyles.totales}>
          <div style={posStyles.totalRow}><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
          {descuento && <div style={{ ...posStyles.totalRow, color: "#ea580c" }}><span>Descuento ({descuento}%)</span><span>−${descuentoAmt.toFixed(2)}</span></div>}
          <div style={posStyles.totalRow}><span>IVA (13%)</span><span>${iva.toFixed(2)}</span></div>
          <div style={posStyles.totalFinal}><span>Total</span><span>${total.toFixed(2)}</span></div>
        </div>

        <Btn onClick={() => setModal("pago")} disabled={carrito.length === 0} style={{ width: "100%", padding: "12px", fontSize: 15 }}>
          Procesar Pago
        </Btn>
      </div>

      {/* Modal Pago */}
      {modal === "pago" && (
        <Modal title="Seleccionar método de pago" onClose={() => setModal(null)} width={400}>
          <div style={{ fontSize: 13.5, color: "#6b7280", marginBottom: 16 }}>Total a cobrar: <strong style={{ color: "#111827", fontSize: 18 }}>${total.toFixed(2)}</strong></div>
          <div style={{ display: "flex", gap: 12, marginBottom: 24 }}>
            {["Efectivo", "Tarjeta"].map(m => (
              <button key={m} onClick={() => setMetodoPago(m)}
                style={{ ...posStyles.metodoBtn, ...(metodoPago === m ? posStyles.metodoBtnActive : {}) }}>
                {m === "Efectivo" ? "💵" : "💳"} {m}
              </button>
            ))}
          </div>
          <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
            <Btn variant="secondary" onClick={() => setModal(null)}>Cancelar</Btn>
            <Btn onClick={procesarPago} disabled={!metodoPago}>Confirmar Pago</Btn>
          </div>
        </Modal>
      )}

      {/* Modal Recibo */}
      {modal === "recibo" && recibo && (
        <Modal title="Recibo generado" onClose={nuevaVenta} width={460}>
          <div style={posStyles.recibo}>
            <div style={posStyles.reciboHeader}>
              <div style={{ fontWeight: 800, fontSize: 17 }}>Ferretería San José</div>
              <div style={{ color: "#6b7280", fontSize: 12 }}>Sistema de Gestión</div>
            </div>
            <div style={posStyles.reciboInfo}>
              <div><strong>Recibo:</strong> {recibo.id}</div>
              <div><strong>Fecha:</strong> {recibo.fecha}</div>
              <div><strong>Empleado:</strong> {recibo.empleado}</div>
              <div><strong>Cliente:</strong> {recibo.cliente}</div>
              <div><strong>Método de pago:</strong> {recibo.metodoPago}</div>
            </div>
            <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: 12 }}>
              <thead><tr>{["Producto","Cant.","Precio","Subtotal"].map(h => <th key={h} style={posStyles.reciboTh}>{h}</th>)}</tr></thead>
              <tbody>
                {recibo.productos.map((p, i) => (
                  <tr key={i} style={{ borderBottom: "1px solid #f0f0f0" }}>
                    <td style={posStyles.reciboTd}>{p.nombre}</td>
                    <td style={{ ...posStyles.reciboTd, textAlign: "center" }}>{p.cantidad}</td>
                    <td style={{ ...posStyles.reciboTd, textAlign: "right" }}>${p.precio.toFixed(2)}</td>
                    <td style={{ ...posStyles.reciboTd, textAlign: "right" }}>${(p.precio * p.cantidad).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div style={{ display: "flex", flexDirection: "column", gap: 4, fontSize: 13 }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}><span>Subtotal</span><span>${recibo.subTotal.toFixed(2)}</span></div>
              {recibo.descuento > 0 && <div style={{ display: "flex", justifyContent: "space-between", color: "#ea580c" }}><span>Descuento ({recibo.descuento}%)</span><span>−${(recibo.subTotal * recibo.descuento / 100).toFixed(2)}</span></div>}
              <div style={{ display: "flex", justifyContent: "space-between" }}><span>IVA (13%)</span><span>${recibo.iva.toFixed(2)}</span></div>
              <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 800, fontSize: 15, paddingTop: 6, borderTop: "2px solid #111827", marginTop: 4 }}><span>TOTAL</span><span>${recibo.total.toFixed(2)}</span></div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 8, justifyContent: "flex-end", marginTop: 16 }}>
            <Btn variant="ghost" onClick={() => window.print()}>Imprimir</Btn>
            <Btn variant="secondary" onClick={nuevaVenta}>Cerrar</Btn>
            <Btn onClick={nuevaVenta}>Nueva Venta</Btn>
          </div>
        </Modal>
      )}
    </div>
  );
}

const posStyles = {
  wrap: { display: "flex", height: "100vh", overflow: "hidden" },
  left: { flex: 1, padding: "24px 24px 0", overflowY: "auto", display: "flex", flexDirection: "column" },
  leftHeader: { marginBottom: 16 },
  right: { width: 340, minWidth: 340, background: "white", borderLeft: "1.5px solid #f0f0f0", padding: "20px 18px", display: "flex", flexDirection: "column", gap: 0, overflowY: "auto" },
  rightHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14, paddingBottom: 12, borderBottom: "1.5px solid #f0f0f0" },
  cats: { display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 12 },
  catBtn: { padding: "5px 12px", border: "1.5px solid #e5e7eb", borderRadius: 20, background: "white", color: "#6b7280", cursor: "pointer", fontSize: 12.5, fontWeight: 500 },
  catBtnActive: { background: "oklch(0.72 0.15 55)", borderColor: "oklch(0.72 0.15 55)", color: "white", fontWeight: 700 },
  search: { width: "100%", padding: "9px 10px 9px 32px", border: "1.5px solid #e5e7eb", borderRadius: 8, fontSize: 13.5, outline: "none", boxSizing: "border-box", fontFamily: "inherit" },
  prodGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(170px, 1fr))", gap: 10, paddingBottom: 24 },
  prodCard: { background: "white", border: "1.5px solid #f0f0f0", borderRadius: 10, padding: "12px 14px", cursor: "pointer", textAlign: "left", transition: "all 0.15s", display: "flex", flexDirection: "column", gap: 4 },
  prodNombre: { fontWeight: 600, fontSize: 13, color: "#111827", lineHeight: 1.3 },
  prodCat: { fontSize: 11.5, color: "#9ca3af" },
  prodBottom: { display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 4 },
  prodPrecio: { fontWeight: 800, fontSize: 14, color: "oklch(0.62 0.15 55)" },
  clienteSection: { marginBottom: 6 },
  cartItems: { flex: 1, minHeight: 80, overflowY: "auto" },
  cartItem: { display: "flex", alignItems: "center", gap: 8, padding: "10px 0", borderBottom: "1px solid #f9f9f9" },
  qtyControls: { display: "flex", alignItems: "center", gap: 4 },
  qtyBtn: { width: 24, height: 24, border: "1.5px solid #e5e7eb", borderRadius: 5, background: "white", cursor: "pointer", fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, color: "#374151" },
  qtyNum: { minWidth: 22, textAlign: "center", fontSize: 13.5, fontWeight: 700, color: "#111827" },
  trashBtn: { background: "none", border: "none", cursor: "pointer", color: "#d1d5db", padding: 2 },
  emptyCart: { padding: "32px 0", textAlign: "center", color: "#d1d5db", fontSize: 13.5 },
  descSection: { padding: "12px 0", borderTop: "1.5px solid #f0f0f0", marginTop: 8 },
  descBtn: { flex: 1, padding: "7px 0", border: "1.5px solid #e5e7eb", borderRadius: 7, background: "white", cursor: "pointer", fontSize: 13, fontWeight: 600, color: "#6b7280" },
  descBtnActive: { background: "#fff7ed", borderColor: "#f97316", color: "#ea580c" },
  totales: { padding: "12px 0", borderTop: "1.5px solid #f0f0f0", marginBottom: 14, display: "flex", flexDirection: "column", gap: 6 },
  totalRow: { display: "flex", justifyContent: "space-between", fontSize: 13, color: "#6b7280" },
  totalFinal: { display: "flex", justifyContent: "space-between", fontSize: 16, fontWeight: 800, color: "#111827", paddingTop: 8, borderTop: "2px solid #111827", marginTop: 4 },
  metodoBtn: { flex: 1, padding: "14px", border: "2px solid #e5e7eb", borderRadius: 10, background: "white", cursor: "pointer", fontSize: 15, fontWeight: 600, color: "#374151" },
  metodoBtnActive: { borderColor: "oklch(0.72 0.15 55)", background: "oklch(0.97 0.05 55)", color: "oklch(0.52 0.15 55)" },
  recibo: { background: "#fafafa", borderRadius: 8, padding: 16, fontFamily: "monospace, monospace", fontSize: 13 },
  reciboHeader: { textAlign: "center", marginBottom: 12, paddingBottom: 10, borderBottom: "1px dashed #d1d5db" },
  reciboInfo: { display: "flex", flexDirection: "column", gap: 3, marginBottom: 12, fontSize: 12.5, fontFamily: "inherit" },
  reciboTh: { textAlign: "left", padding: "4px 6px", fontSize: 11.5, color: "#6b7280", fontWeight: 700, borderBottom: "1px solid #e5e7eb" },
  reciboTd: { padding: "6px 6px", fontSize: 12.5, verticalAlign: "middle" },
  empty: { gridColumn: "1/-1", textAlign: "center", padding: "32px", color: "#9ca3af", fontSize: 14 },
};

Object.assign(window, { Ventas });
