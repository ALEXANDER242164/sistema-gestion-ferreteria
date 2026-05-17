// Módulo Reportes
const { useState, useMemo } = React;

function Reportes({ ventas, ordenes, setOrdenes, proveedores, productos }) {
  const [tab, setTab] = useState("ventas"); // ventas | ordenes | todas | reportes
  const [detalleVenta, setDetalleVenta] = useState(null);
  const [detalleOrden, setDetalleOrden] = useState(null);
  const [modalOrden, setModalOrden] = useState(false);
  const [periodo, setPeriodo] = useState("mensual");
  const [formOrden, setFormOrden] = useState({ proveedor: "", productos: [] });
  const [orProdNuevo, setOrProdNuevo] = useState({ nombre: "", cantidad: 1, precio: "" });

  const tabs = [
    { id: "ventas", label: "Historial de Ventas" },
    { id: "ordenes", label: "Órdenes de Compra" },
    { id: "todas", label: "Todas las Transacciones" },
    { id: "reportes", label: "Reporte de Ventas" },
  ];

  function crearOrden() {
    if (!formOrden.proveedor || formOrden.productos.length === 0) { alert("Selecciona un proveedor y añade al menos un producto."); return; }
    const total = formOrden.productos.reduce((s, p) => s + p.cantidad * p.precio, 0);
    const body = {
      fecha: new Date().toISOString().slice(0, 10),
      proveedor: formOrden.proveedor,
      estado: "Pendiente",
      productos: formOrden.productos,
      total: total,
    };
    fetch('http://localhost:8080/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })
    .then(res => res.json())
    .then(data => {
      const nueva = { id: String(data.id), fecha: data.fecha, proveedor: data.proveedor, estado: data.estado, productos: data.productos || [], total: data.total };
      setOrdenes(o => [...o, nueva]);
      setModalOrden(false);
      setFormOrden({ proveedor: "", productos: [] });
    });
  }

  function addOrdenProd() {
    if (!orProdNuevo.nombre || !orProdNuevo.precio) return;
    setFormOrden(f => ({ ...f, productos: [...f.productos, { ...orProdNuevo, cantidad: parseInt(orProdNuevo.cantidad), precio: parseFloat(orProdNuevo.precio) }] }));
    setOrProdNuevo({ nombre: "", cantidad: 1, precio: "" });
  }

  // Datos reporte
  const ventasPorPeriodo = useMemo(() => {
    const hoy = new Date();
    const filtro = v => {
      const f = new Date(v.fecha);
      if (periodo === "diario") return f.toDateString() === hoy.toDateString();
      if (periodo === "semanal") return (hoy - f) / 86400000 <= 7;
      if (periodo === "mensual") return f.getMonth() === hoy.getMonth() && f.getFullYear() === hoy.getFullYear();
      return f.getFullYear() === hoy.getFullYear();
    };
    return ventas.filter(filtro);
  }, [ventas, periodo]);

  const totalReporte = ventasPorPeriodo.reduce((s, v) => s + v.total, 0);

  return (
    <div style={repStyles.wrap}>
      <div style={repStyles.header}>
        <h1 style={repStyles.h1}>Reportes</h1>
        {tab === "ordenes" && <Btn onClick={() => setModalOrden(true)}>+ Nueva Orden de Compra</Btn>}
      </div>

      {/* Tabs */}
      <div style={repStyles.tabs}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            style={{ ...repStyles.tab, ...(tab === t.id ? repStyles.tabActive : {}) }}>
            {t.label}
          </button>
        ))}
      </div>

      {/* Historial de Ventas */}
      {tab === "ventas" && (
        <div style={repStyles.tableWrap}>
          <table style={repStyles.table}>
            <thead>
              <tr>{["ID Venta", "Fecha", "Empleado", "Cliente", "Método de Pago", "Total", ""].map(h => <th key={h} style={repStyles.th}>{h}</th>)}</tr>
            </thead>
            <tbody>
              {ventas.map(v => (
                <tr key={v.id} style={repStyles.tr}>
                  <td style={repStyles.td}><span style={repStyles.mono}>{v.id}</span></td>
                  <td style={repStyles.td}>{v.fecha}</td>
                  <td style={repStyles.td}>{v.empleado}</td>
                  <td style={repStyles.td}>{v.cliente || "-"}</td>
                  <td style={repStyles.td}><Tag color={v.metodoPago === "Efectivo" ? "green" : "blue"}>{v.metodoPago}</Tag></td>
                  <td style={{ ...repStyles.td, fontWeight: 700, color: "#111827" }}>${v.total.toFixed(2)}</td>
                  <td style={repStyles.td}><button onClick={() => setDetalleVenta(v)} style={repStyles.verBtn}>Ver detalle</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Órdenes de Compra */}
      {tab === "ordenes" && (
        <div style={repStyles.tableWrap}>
          <table style={repStyles.table}>
            <thead>
              <tr>{["ID Orden", "Fecha", "Proveedor", "Estado", "Total", ""].map(h => <th key={h} style={repStyles.th}>{h}</th>)}</tr>
            </thead>
            <tbody>
              {ordenes.map(o => (
                <tr key={o.id} style={repStyles.tr}>
                  <td style={repStyles.td}><span style={repStyles.mono}>{o.id}</span></td>
                  <td style={repStyles.td}>{o.fecha}</td>
                  <td style={repStyles.td}>{o.proveedor}</td>
                  <td style={repStyles.td}><Tag color={o.estado === "Recibido" ? "green" : "amber"}>{o.estado}</Tag></td>
                  <td style={{ ...repStyles.td, fontWeight: 700, color: "#111827" }}>${o.total.toFixed(2)}</td>
                  <td style={repStyles.td}><button onClick={() => setDetalleOrden(o)} style={repStyles.verBtn}>Ver detalle</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Todas las Transacciones */}
      {tab === "todas" && (
        <div style={repStyles.tableWrap}>
          <table style={repStyles.table}>
            <thead>
              <tr>{["Tipo", "Identificador", "Fecha", "Total"].map(h => <th key={h} style={repStyles.th}>{h}</th>)}</tr>
            </thead>
            <tbody>
              {[
                ...ventas.map(v => ({ tipo: "Venta", id: v.id, fecha: v.fecha, total: v.total })),
                ...ordenes.map(o => ({ tipo: "Compra", id: o.id, fecha: o.fecha, total: o.total })),
              ].sort((a, b) => new Date(b.fecha) - new Date(a.fecha)).map((t, i) => (
                <tr key={i} style={repStyles.tr}>
                  <td style={repStyles.td}><Tag color={t.tipo === "Venta" ? "blue" : "orange"}>{t.tipo}</Tag></td>
                  <td style={repStyles.td}><span style={repStyles.mono}>{t.id}</span></td>
                  <td style={repStyles.td}>{t.fecha}</td>
                  <td style={{ ...repStyles.td, fontWeight: 700, color: "#111827" }}>${t.total.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Reporte de Ventas */}
      {tab === "reportes" && (
        <div>
          <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
            {["diario", "semanal", "mensual", "anual"].map(p => (
              <button key={p} onClick={() => setPeriodo(p)}
                style={{ ...repStyles.periodoBtn, ...(periodo === p ? repStyles.periodoBtnActive : {}) }}>
                {p.charAt(0).toUpperCase() + p.slice(1)}
              </button>
            ))}
          </div>

          <div style={repStyles.statsGrid}>
            <div style={repStyles.statCard}>
              <div style={repStyles.statLabel}>Total ventas</div>
              <div style={repStyles.statVal}>${totalReporte.toFixed(2)}</div>
            </div>
            <div style={repStyles.statCard}>
              <div style={repStyles.statLabel}>Transacciones</div>
              <div style={repStyles.statVal}>{ventasPorPeriodo.length}</div>
            </div>
            <div style={repStyles.statCard}>
              <div style={repStyles.statLabel}>Promedio por venta</div>
              <div style={repStyles.statVal}>${ventasPorPeriodo.length ? (totalReporte / ventasPorPeriodo.length).toFixed(2) : "0.00"}</div>
            </div>
          </div>

          <div style={repStyles.tableWrap}>
            <table style={repStyles.table}>
              <thead><tr>{["ID", "Fecha", "Cliente", "Total"].map(h => <th key={h} style={repStyles.th}>{h}</th>)}</tr></thead>
              <tbody>
                {ventasPorPeriodo.map(v => (
                  <tr key={v.id} style={repStyles.tr}>
                    <td style={repStyles.td}><span style={repStyles.mono}>{v.id}</span></td>
                    <td style={repStyles.td}>{v.fecha}</td>
                    <td style={repStyles.td}>{v.cliente || "-"}</td>
                    <td style={{ ...repStyles.td, fontWeight: 700 }}>${v.total.toFixed(2)}</td>
                  </tr>
                ))}
                {ventasPorPeriodo.length === 0 && <tr><td colSpan={4} style={{ ...repStyles.td, textAlign: "center", color: "#9ca3af", padding: 32 }}>Sin ventas en este período.</td></tr>}
              </tbody>
            </table>
            {ventasPorPeriodo.length > 0 && (
              <div style={{ padding: "12px 16px", borderTop: "1.5px solid #f0f0f0", display: "flex", justifyContent: "flex-end" }}>
                <Btn variant="ghost" onClick={() => alert("Exportando reporte…")}>Exportar reporte</Btn>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Detalle Venta */}
      {detalleVenta && (
        <Modal title={`Detalle — ${detalleVenta.id}`} onClose={() => setDetalleVenta(null)}>
          <div style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: 13.5, marginBottom: 14 }}>
            {[["Fecha", detalleVenta.fecha], ["Empleado", detalleVenta.empleado], ["Cliente", detalleVenta.cliente || "—"], ["Método de pago", detalleVenta.metodoPago]].map(([k, v]) => (
              <div key={k} style={{ display: "flex", gap: 8 }}><span style={{ color: "#6b7280", minWidth: 130 }}>{k}</span><span style={{ fontWeight: 600 }}>{v}</span></div>
            ))}
          </div>
          <table style={{ ...repStyles.table, marginBottom: 12 }}>
            <thead><tr>{["Producto","Cant.","Precio","Subtotal"].map(h => <th key={h} style={repStyles.th}>{h}</th>)}</tr></thead>
            <tbody>{detalleVenta.productos.map((p, i) => (
              <tr key={i} style={repStyles.tr}>
                <td style={repStyles.td}>{p.nombre}</td>
                <td style={{ ...repStyles.td, textAlign: "center" }}>{p.cantidad}</td>
                <td style={{ ...repStyles.td, textAlign: "right" }}>${p.precio.toFixed(2)}</td>
                <td style={{ ...repStyles.td, textAlign: "right", fontWeight: 600 }}>${(p.precio * p.cantidad).toFixed(2)}</td>
              </tr>
            ))}</tbody>
          </table>
          <div style={{ display: "flex", flexDirection: "column", gap: 4, fontSize: 13, borderTop: "1.5px solid #f0f0f0", paddingTop: 12 }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}><span>Subtotal</span><span>${detalleVenta.subTotal.toFixed(2)}</span></div>
            {detalleVenta.descuento > 0 && <div style={{ display: "flex", justifyContent: "space-between", color: "#ea580c" }}><span>Descuento ({detalleVenta.descuento}%)</span><span>−${(detalleVenta.subTotal * detalleVenta.descuento / 100).toFixed(2)}</span></div>}
            <div style={{ display: "flex", justifyContent: "space-between" }}><span>IVA (13%)</span><span>${detalleVenta.iva.toFixed(2)}</span></div>
            <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 800, fontSize: 15 }}><span>Total</span><span>${detalleVenta.total.toFixed(2)}</span></div>
          </div>
        </Modal>
      )}

      {/* Detalle Orden */}
      {detalleOrden && (
        <Modal title={`Orden — ${detalleOrden.id}`} onClose={() => setDetalleOrden(null)}>
          <div style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: 13.5, marginBottom: 14 }}>
            {[["Proveedor", detalleOrden.proveedor], ["Fecha", detalleOrden.fecha], ["Estado", detalleOrden.estado]].map(([k, v]) => (
              <div key={k} style={{ display: "flex", gap: 8 }}><span style={{ color: "#6b7280", minWidth: 100 }}>{k}</span><span style={{ fontWeight: 600 }}>{v}</span></div>
            ))}
          </div>
          <table style={{ ...repStyles.table, marginBottom: 12 }}>
            <thead><tr>{["Producto","Cant.","Precio","Subtotal"].map(h => <th key={h} style={repStyles.th}>{h}</th>)}</tr></thead>
            <tbody>{detalleOrden.productos.map((p, i) => (
              <tr key={i} style={repStyles.tr}>
                <td style={repStyles.td}>{p.nombre}</td>
                <td style={{ ...repStyles.td, textAlign: "center" }}>{p.cantidad}</td>
                <td style={{ ...repStyles.td, textAlign: "right" }}>${p.precio.toFixed(2)}</td>
                <td style={{ ...repStyles.td, textAlign: "right", fontWeight: 600 }}>${(p.precio * p.cantidad).toFixed(2)}</td>
              </tr>
            ))}</tbody>
          </table>
          <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 800, fontSize: 15, borderTop: "1.5px solid #f0f0f0", paddingTop: 12 }}><span>Total</span><span>${detalleOrden.total.toFixed(2)}</span></div>
        </Modal>
      )}

      {/* Modal Nueva Orden */}
      {modalOrden && (
        <Modal title="Nueva Orden de Compra" onClose={() => setModalOrden(false)} width={560}>
          <Select label="Proveedor *" value={formOrden.proveedor} onChange={e => setFormOrden(f => ({ ...f, proveedor: e.target.value }))}
            options={[{ value: "", label: "Selecciona un proveedor…" }, ...proveedores.map(p => ({ value: p.nombre, label: p.nombre }))]} />
          <div style={{ background: "#fafafa", borderRadius: 8, padding: 14, marginBottom: 12 }}>
            <div style={{ fontWeight: 700, fontSize: 12.5, color: "#6b7280", marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.04em" }}>Añadir Producto</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 80px 90px auto", gap: 8, alignItems: "flex-end" }}>
              <Input label="Nombre" value={orProdNuevo.nombre} onChange={e => setOrProdNuevo(f => ({ ...f, nombre: e.target.value }))} placeholder="Producto" />
              <Input label="Cant." type="number" value={orProdNuevo.cantidad} onChange={e => setOrProdNuevo(f => ({ ...f, cantidad: e.target.value }))} />
              <Input label="Precio ($)" type="number" step="0.01" value={orProdNuevo.precio} onChange={e => setOrProdNuevo(f => ({ ...f, precio: e.target.value }))} placeholder="0.00" />
              <Btn onClick={addOrdenProd} style={{ marginBottom: 14 }}>+</Btn>
            </div>
            {formOrden.productos.length > 0 && (
              <table style={{ width: "100%", borderCollapse: "collapse", marginTop: 4 }}>
                <thead><tr>{["Producto","Cant.","Precio"].map(h => <th key={h} style={repStyles.th}>{h}</th>)}</tr></thead>
                <tbody>{formOrden.productos.map((p, i) => (
                  <tr key={i} style={repStyles.tr}>
                    <td style={repStyles.td}>{p.nombre}</td>
                    <td style={{ ...repStyles.td, textAlign: "center" }}>{p.cantidad}</td>
                    <td style={{ ...repStyles.td, textAlign: "right" }}>${p.precio.toFixed(2)}</td>
                  </tr>
                ))}</tbody>
              </table>
            )}
          </div>
          <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
            <Btn variant="secondary" onClick={() => setModalOrden(false)}>Cancelar</Btn>
            <Btn onClick={crearOrden}>Crear Orden</Btn>
          </div>
        </Modal>
      )}
    </div>
  );
}

const repStyles = {
  wrap: { padding: "28px 32px", maxWidth: 1100 },
  header: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 },
  h1: { margin: 0, fontSize: 22, fontWeight: 800, color: "#111827" },
  tabs: { display: "flex", gap: 2, marginBottom: 20, background: "#f3f4f6", borderRadius: 10, padding: 4, width: "fit-content" },
  tab: { padding: "7px 16px", border: "none", borderRadius: 7, background: "transparent", color: "#6b7280", cursor: "pointer", fontSize: 13.5, fontWeight: 500 },
  tabActive: { background: "white", color: "#111827", fontWeight: 700, boxShadow: "0 1px 4px rgba(0,0,0,0.08)" },
  tableWrap: { background: "white", borderRadius: 12, border: "1.5px solid #f0f0f0", overflow: "hidden" },
  table: { width: "100%", borderCollapse: "collapse" },
  th: { padding: "11px 14px", textAlign: "left", fontSize: 12, fontWeight: 700, color: "#6b7280", background: "#fafafa", borderBottom: "1.5px solid #f0f0f0", textTransform: "uppercase", letterSpacing: "0.04em" },
  tr: { borderBottom: "1px solid #f9f9f9" },
  td: { padding: "12px 14px", fontSize: 13.5, color: "#374151", verticalAlign: "middle" },
  mono: { fontFamily: "monospace", fontSize: 12, background: "#f3f4f6", color: "#374151", padding: "2px 6px", borderRadius: 4 },
  verBtn: { padding: "4px 10px", border: "1.5px solid #e5e7eb", borderRadius: 6, background: "white", color: "#374151", cursor: "pointer", fontSize: 12.5, fontWeight: 600 },
  statsGrid: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14, marginBottom: 20 },
  statCard: { background: "white", borderRadius: 12, border: "1.5px solid #f0f0f0", padding: "18px 20px" },
  statLabel: { fontSize: 12, fontWeight: 600, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: 6 },
  statVal: { fontSize: 26, fontWeight: 800, color: "#111827" },
  periodoBtn: { padding: "7px 16px", border: "1.5px solid #e5e7eb", borderRadius: 8, background: "white", color: "#6b7280", cursor: "pointer", fontSize: 13, fontWeight: 500 },
  periodoBtnActive: { background: "oklch(0.72 0.15 55)", borderColor: "oklch(0.72 0.15 55)", color: "white", fontWeight: 700 },
};

Object.assign(window, { Reportes });
