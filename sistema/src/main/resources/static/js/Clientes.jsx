// Módulo Clientes
const { useState } = React;

const EMPTY_CLI = { nombre: "", telefono: "", email: "" };

function Clientes({ clientes, setClientes, role }) {
  const esAdmin = role === "admin";
  const [busqueda, setBusqueda] = useState("");
  const [modal, setModal] = useState(null); // null | "form" | "historial"
  const [form, setForm] = useState(EMPTY_CLI);
  const [editando, setEditando] = useState(null);
  const [clienteDetalle, setClienteDetalle] = useState(null);

  const filtrados = clientes.filter(c =>
    !busqueda ||
    c.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    c.telefono.includes(busqueda)
  );

  function abrirAdd() {
    setForm({ ...EMPTY_CLI, id: `CLI-${String(clientes.length + 1).padStart(3, "0")}`, historial: [] });
    setEditando(null); setModal("form");
  }

  function abrirEdit(c) { setForm({ ...c }); setEditando(c.id); setModal("form"); }

 function guardar() {
  if (!form.nombre || !form.telefono) return;
  const body = { nombre: form.nombre, telefono: form.telefono, email: form.email };
  if (editando) {
    fetch(`http://localhost:8080/api/customers/${parseInt(editando)}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })
    .then(res => res.json())
    .then(data => {
      const actualizado = { id: String(data.id), nombre: data.nombre, telefono: data.telefono, email: data.email};
      setClientes(cs => cs.map(c => c.id === editando ? actualizado : c));
    });
  } else {
    fetch('http://localhost:8080/api/customers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })
    .then(res => res.json())
    .then(data => {
      const nuevo = { id: String(data.id), nombre: data.nombre, telefono: data.telefono, email: data.email};
      setClientes(cs => [...cs, nuevo]);
    });
  }
  setModal(null);
}

function eliminar(id) {
  if (confirm("¿Eliminar este cliente?")) {
    fetch(`http://localhost:8080/api/customers/${parseInt(id)}`, {
      method: 'DELETE'
    })
    .then(() => {
      setClientes(cs => cs.filter(c => c.id !== id));
      setModal(null);
    });
  }
}

  function verHistorial(c) { setClienteDetalle(c); setModal("historial"); }

  return (
    <div style={cliStyles.wrap}>
      <div style={cliStyles.header}>
        <div>
          <h1 style={cliStyles.h1}>Clientes</h1>
          <p style={cliStyles.sub}>{clientes.length} clientes registrados</p>
        </div>
        {esAdmin && <Btn onClick={abrirAdd}>+ Nuevo Cliente</Btn>}
      </div>

      {/* Búsqueda */}
      <div style={{ position: "relative", maxWidth: 400, marginBottom: 20 }}>
        <svg style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)" }} width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        <input style={cliStyles.search} placeholder="Buscar por nombre o teléfono…" value={busqueda} onChange={e => setBusqueda(e.target.value)} />
      </div>

      {/* Tabla */}
      <div style={cliStyles.tableWrap}>
        <table style={cliStyles.table}>
          <thead>
            <tr>{["ID", "Cliente", "Teléfono", "Correo", "Compras", ""].map(h => <th key={h} style={cliStyles.th}>{h}</th>)}</tr>
          </thead>
          <tbody>
            {filtrados.map(c => (
              <tr key={c.id} style={cliStyles.tr}>
                <td style={cliStyles.td}><span style={cliStyles.mono}>{c.id}</span></td>
                <td style={cliStyles.td}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={cliStyles.avatar}>{c.nombre.split(" ").map(w => w[0]).slice(0, 2).join("")}</div>
                    <span style={{ fontWeight: 600, color: "#111827", fontSize: 13.5 }}>{c.nombre}</span>
                  </div>
                </td>
                <td style={cliStyles.td}>{c.telefono}</td>
                <td style={cliStyles.td}>{c.email || <span style={{ color: "#d1d5db" }}>—</span>}</td>
                <td style={cliStyles.td}>
                  {c.historial?.length > 0
                    ? <Tag color="blue">{c.historial.length} compra{c.historial.length !== 1 ? "s" : ""}</Tag>
                    : <Tag color="gray">Sin historial</Tag>}
                </td>
                <td style={{ ...cliStyles.td, textAlign: "right" }}>
                  <div style={{ display: "flex", gap: 6, justifyContent: "flex-end" }}>
                    {c.historial?.length > 0 && (
                      <button onClick={() => verHistorial(c)} style={cliStyles.actionBtn}>Historial</button>
                    )}
                    {esAdmin && <button onClick={() => abrirEdit(c)} style={cliStyles.actionBtn}>Editar</button>}
                  </div>
                </td>
              </tr>
            ))}
            {filtrados.length === 0 && (
              <tr><td colSpan={6} style={{ ...cliStyles.td, textAlign: "center", color: "#9ca3af", padding: 48 }}>No se encontraron clientes.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal Formulario */}
      {modal === "form" && (
        <Modal title={editando ? "Editar Cliente" : "Nuevo Cliente"} onClose={() => setModal(null)} width={460}>
          <Input label="Nombre Completo *" value={form.nombre} onChange={e => setForm(f => ({ ...f, nombre: e.target.value }))} placeholder="Nombre y apellidos" />
          <Input label="Teléfono *" value={form.telefono} onChange={e => setForm(f => ({ ...f, telefono: e.target.value }))} placeholder="0000-0000" />
          <Input label="Correo electrónico (opcional)" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="correo@ejemplo.com" />
          <div style={{ display: "flex", gap: 8, justifyContent: "flex-end", marginTop: 8 }}>
            {editando && esAdmin && <Btn variant="danger" onClick={() => eliminar(editando)}>Eliminar</Btn>}
            <Btn variant="secondary" onClick={() => setModal(null)}>Cancelar</Btn>
            <Btn onClick={guardar}>Guardar</Btn>
          </div>
        </Modal>
      )}

      {/* Modal Historial */}
      {modal === "historial" && clienteDetalle && (
        <Modal title={`Historial — ${clienteDetalle.nombre}`} onClose={() => setModal(null)} width={580}>
          <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
            <div style={cliStyles.statBox}><div style={cliStyles.statLabel}>Total compras</div><div style={cliStyles.statVal}>{clienteDetalle.historial.length}</div></div>
            <div style={cliStyles.statBox}><div style={cliStyles.statLabel}>Gasto total</div><div style={cliStyles.statVal}>${clienteDetalle.historial.reduce((s, h) => s + h.total, 0).toFixed(2)}</div></div>
          </div>
          {clienteDetalle.historial.map((venta, vi) => (
            <div key={vi} style={cliStyles.ventaCard}>
              <div style={cliStyles.ventaHeader}>
                <span style={cliStyles.mono}>{venta.id}</span>
                <span style={{ color: "#6b7280", fontSize: 12.5 }}>{venta.fecha}</span>
                <span style={{ marginLeft: "auto", fontWeight: 700, color: "#111827" }}>${venta.total.toFixed(2)}</span>
              </div>
              <table style={{ width: "100%", borderCollapse: "collapse", marginTop: 8 }}>
                <thead><tr>{["Producto","Cant.","Precio"].map(h => <th key={h} style={{ ...cliStyles.th, background: "transparent" }}>{h}</th>)}</tr></thead>
                <tbody>
                  {venta.productos.map((p, pi) => (
                    <tr key={pi} style={{ borderBottom: "1px solid #f0f0f0" }}>
                      <td style={cliStyles.td}>{p.nombre}</td>
                      <td style={{ ...cliStyles.td, textAlign: "center" }}>{p.cantidad}</td>
                      <td style={{ ...cliStyles.td, textAlign: "right" }}>${p.precio.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </Modal>
      )}
    </div>
  );
}

const cliStyles = {
  wrap: { padding: "28px 32px", maxWidth: 1100 },
  header: { display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 20 },
  h1: { margin: "0 0 4px", fontSize: 22, fontWeight: 800, color: "#111827" },
  sub: { margin: 0, color: "#6b7280", fontSize: 13.5 },
  search: { width: "100%", padding: "9px 10px 9px 32px", border: "1.5px solid #e5e7eb", borderRadius: 8, fontSize: 13.5, outline: "none", boxSizing: "border-box", fontFamily: "inherit" },
  tableWrap: { background: "white", borderRadius: 12, border: "1.5px solid #f0f0f0", overflow: "hidden" },
  table: { width: "100%", borderCollapse: "collapse" },
  th: { padding: "11px 14px", textAlign: "left", fontSize: 12, fontWeight: 700, color: "#6b7280", background: "#fafafa", borderBottom: "1.5px solid #f0f0f0", textTransform: "uppercase", letterSpacing: "0.04em" },
  tr: { borderBottom: "1px solid #f9f9f9" },
  td: { padding: "12px 14px", fontSize: 13.5, color: "#374151", verticalAlign: "middle" },
  mono: { fontFamily: "monospace", fontSize: 12, background: "#f3f4f6", color: "#374151", padding: "2px 6px", borderRadius: 4 },
  avatar: { width: 32, height: 32, borderRadius: "50%", background: "oklch(0.93 0.06 250)", color: "oklch(0.45 0.15 250)", fontWeight: 700, fontSize: 12, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 },
  actionBtn: { padding: "5px 12px", border: "1.5px solid #e5e7eb", borderRadius: 6, background: "white", color: "#374151", cursor: "pointer", fontSize: 12.5, fontWeight: 600 },
  statBox: { flex: 1, background: "#fafafa", borderRadius: 10, padding: "12px 16px", border: "1.5px solid #f0f0f0" },
  statLabel: { fontSize: 11.5, color: "#6b7280", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: 4 },
  statVal: { fontSize: 20, fontWeight: 800, color: "#111827" },
  ventaCard: { background: "#fafafa", border: "1.5px solid #f0f0f0", borderRadius: 10, padding: "12px 14px", marginBottom: 12 },
  ventaHeader: { display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" },
};

Object.assign(window, { Clientes });
