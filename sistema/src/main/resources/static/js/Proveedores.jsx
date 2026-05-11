// Módulo Proveedores
const { useState } = React;

const EMPTY_PROV = { nombre: "", contacto: "", direccion: "", telefono: "", email: "", productos: [] };

function Proveedores({ proveedores, setProveedores, role }) {
  const esAdmin = role === "admin";
  const [busqueda, setBusqueda] = useState("");
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState(EMPTY_PROV);
  const [editando, setEditando] = useState(null);
  const [prodInput, setProdInput] = useState("");

  const filtrados = proveedores.filter(p =>
    !busqueda || p.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  function abrirAdd() {
    setForm({ ...EMPTY_PROV, id: `PRV-${String(proveedores.length + 1).padStart(3, "0")}` });
    setEditando(null); setModal("form");
  }

  function abrirEdit(p) { setForm({ ...p }); setEditando(p.id); setModal("form"); }

  function guardar() {
    if (!form.nombre || !form.telefono) return;
    const backendProv = {
      nombre: form.nombre,
      contacto: form.contacto,
      direccion: form.direccion,
      telefono: form.telefono,
      email: form.email,
      productos: form.productos || []
    };
    if (editando) {
      fetch(`http://localhost:8080/api/suppliers/${parseInt(editando)}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(backendProv)
      })
      .then(res => res.json())
      .then(data => {
        const actualizado = { id: String(data.id), nombre: data.nombre, contacto: data.contacto, direccion: data.direccion, telefono: data.telefono, email: data.email, productos: data.productos || [] };
        setProveedores(ps => ps.map(p => p.id === editando ? actualizado : p));
      });
    } else {
      fetch('http://localhost:8080/api/suppliers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(backendProv)
      })
      .then(res => res.json())
      .then(data => {
        const nuevo = { id: String(data.id), nombre: data.nombre, contacto: data.contacto, direccion: data.direccion, telefono: data.telefono, email: data.email, productos: data.productos || [] };
        setProveedores(ps => [...ps, nuevo]);
      });
    }
    setModal(null);
  }


  function eliminar(id) {
    if (confirm("¿Eliminar este proveedor?")) {
      fetch(`http://localhost:8080/api/suppliers/${parseInt(id)}`, {
        method: 'DELETE'
      })
      .then(() => {
        setProveedores(ps => ps.filter(p => p.id !== id));
        setModal(null);
      });
    }
  }


  function addProd() {
    if (!prodInput.trim()) return;
    setForm(f => ({ ...f, productos: [...(f.productos || []), prodInput.trim()] }));
    setProdInput("");
  }

  function removeProd(i) { setForm(f => ({ ...f, productos: f.productos.filter((_, idx) => idx !== i) })); }

  return (
    <div style={prvStyles.wrap}>
      <div style={prvStyles.header}>
        <div>
          <h1 style={prvStyles.h1}>Proveedores</h1>
          <p style={prvStyles.sub}>{proveedores.length} proveedores registrados</p>
        </div>
        {esAdmin && <Btn onClick={abrirAdd}>+ Nuevo Proveedor</Btn>}
      </div>

      {/* Búsqueda */}
      <div style={{ position: "relative", maxWidth: 400, marginBottom: 20 }}>
        <svg style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)" }} width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        <input style={prvStyles.search} placeholder="Buscar por nombre…" value={busqueda} onChange={e => setBusqueda(e.target.value)} />
      </div>

      {/* Grid de tarjetas */}
      <div style={prvStyles.grid}>
        {filtrados.map(p => (
          <div key={p.id} style={prvStyles.card}>
            <div style={prvStyles.cardTop}>
              <div style={prvStyles.avatar}>{p.nombre.charAt(0)}</div>
              <div style={{ flex: 1 }}>
                <div style={prvStyles.cardNombre}>{p.nombre}</div>
                <div style={prvStyles.cardContacto}>{p.contacto}</div>
              </div>
              <span style={prvStyles.idTag}>{p.id}</span>
            </div>
            <div style={prvStyles.cardInfo}>
              {[
                { icon: "📍", val: p.direccion },
                { icon: "📞", val: p.telefono },
                { icon: "✉", val: p.email || "—" },
              ].map(({ icon, val }) => (
                <div key={icon} style={prvStyles.infoRow}><span style={{ minWidth: 18 }}>{icon}</span><span style={{ color: "#6b7280", fontSize: 13 }}>{val}</span></div>
              ))}
            </div>
            {p.productos?.length > 0 && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: 5, paddingTop: 10, borderTop: "1px solid #f0f0f0" }}>
                {p.productos.map((cat, i) => <Tag key={i}>{cat}</Tag>)}
              </div>
            )}
            <div style={{ display: "flex", gap: 8, marginTop: 14 }}>
              {esAdmin && <Btn variant="ghost" style={{ flex: 1, fontSize: 13 }} onClick={() => abrirEdit(p)}>Editar</Btn>}
              {esAdmin && <Btn variant="danger" style={{ fontSize: 13 }} onClick={() => eliminar(p.id)}>Eliminar</Btn>}
              {!esAdmin && <div style={{ fontSize: 12, color: "#9ca3af", paddingTop: 4 }}>Solo lectura</div>}
            </div>
          </div>
        ))}
        {filtrados.length === 0 && (
          <div style={{ gridColumn: "1/-1", textAlign: "center", padding: 48, color: "#9ca3af", fontSize: 14 }}>
            No se encontraron proveedores.
          </div>
        )}
      </div>

      {/* Modal */}
      {modal === "form" && (
        <Modal title={editando ? "Editar Proveedor" : "Nuevo Proveedor"} onClose={() => setModal(null)}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 16px" }}>
            <div style={{ gridColumn: "1/-1" }}><Input label="Nombre del proveedor *" value={form.nombre} onChange={e => setForm(f => ({ ...f, nombre: e.target.value }))} placeholder="Ej. Distribuidora Industrial S.A." /></div>
            <Input label="Nombre de Contacto" value={form.contacto} onChange={e => setForm(f => ({ ...f, contacto: e.target.value }))} placeholder="Nombre completo" />
            <Input label="Teléfono *" value={form.telefono} onChange={e => setForm(f => ({ ...f, telefono: e.target.value }))} placeholder="0000-0000" />
            <div style={{ gridColumn: "1/-1" }}><Input label="Correo electrónico" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="correo@proveedor.com" /></div>
            <div style={{ gridColumn: "1/-1" }}><Textarea label="Dirección" value={form.direccion} onChange={e => setForm(f => ({ ...f, direccion: e.target.value }))} placeholder="Dirección completa" /></div>
          </div>
          <div style={{ marginBottom: 14 }}>
            <label style={{ display: "block", fontSize: 12.5, fontWeight: 600, color: "#374151", marginBottom: 5 }}>Categorías de productos que suministra</label>
            <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
              <input style={{ flex: 1, padding: "8px 10px", border: "1.5px solid #e5e7eb", borderRadius: 7, fontSize: 13.5, outline: "none", fontFamily: "inherit" }} placeholder="Ej. Herramientas" value={prodInput} onChange={e => setProdInput(e.target.value)} onKeyDown={e => e.key === "Enter" && addProd()} />
              <Btn onClick={addProd}>Añadir</Btn>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {(form.productos || []).map((cat, i) => (
                <span key={i} style={{ background: "#f3f4f6", borderRadius: 5, padding: "3px 8px", fontSize: 12.5, display: "flex", alignItems: "center", gap: 5 }}>
                  {cat}
                  <button onClick={() => removeProd(i)} style={{ background: "none", border: "none", cursor: "pointer", color: "#9ca3af", fontSize: 13, lineHeight: 1 }}>×</button>
                </span>
              ))}
            </div>
          </div>
          <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
            <Btn variant="secondary" onClick={() => setModal(null)}>Cancelar</Btn>
            <Btn onClick={guardar}>Guardar</Btn>
          </div>
        </Modal>
      )}
    </div>
  );
}

const prvStyles = {
  wrap: { padding: "28px 32px", maxWidth: 1100 },
  header: { display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 20 },
  h1: { margin: "0 0 4px", fontSize: 22, fontWeight: 800, color: "#111827" },
  sub: { margin: 0, color: "#6b7280", fontSize: 13.5 },
  search: { width: "100%", padding: "9px 10px 9px 32px", border: "1.5px solid #e5e7eb", borderRadius: 8, fontSize: 13.5, outline: "none", boxSizing: "border-box", fontFamily: "inherit" },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 16 },
  card: { background: "white", borderRadius: 12, border: "1.5px solid #f0f0f0", padding: 18, display: "flex", flexDirection: "column", gap: 10 },
  cardTop: { display: "flex", alignItems: "flex-start", gap: 12 },
  avatar: { width: 42, height: 42, borderRadius: 10, background: "oklch(0.95 0.05 55)", color: "oklch(0.52 0.15 55)", fontWeight: 800, fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 },
  cardNombre: { fontWeight: 700, fontSize: 14, color: "#111827", lineHeight: 1.3 },
  cardContacto: { fontSize: 12.5, color: "#9ca3af", marginTop: 2 },
  idTag: { fontFamily: "monospace", fontSize: 11, background: "#f3f4f6", color: "#6b7280", padding: "2px 6px", borderRadius: 4, flexShrink: 0 },
  cardInfo: { display: "flex", flexDirection: "column", gap: 5 },
  infoRow: { display: "flex", gap: 8, alignItems: "flex-start", fontSize: 13 },
};

Object.assign(window, { Proveedores });
