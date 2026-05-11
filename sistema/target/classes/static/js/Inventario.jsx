// Módulo Inventario
const { useState, useMemo } = React;

function StockBar({ stock, stockMin }) {
  const pct = Math.min(100, Math.round((stock / (stockMin * 2)) * 100));
  const low = stock < stockMin;
  const color = low ? (stock === 0 ? "#ef4444" : "#f97316") : "#22c55e";
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <div style={{ flex: 1, height: 6, background: "#f3f4f6", borderRadius: 4, overflow: "hidden" }}>
        <div style={{ width: `${pct}%`, height: "100%", background: color, borderRadius: 4, transition: "width 0.3s" }} />
      </div>
      <span style={{ fontSize: 12, color: "#6b7280", minWidth: 28, textAlign: "right" }}>{stock}</span>
    </div>
  );
}

const EMPTY_PROD = { nombre: "", descripcion: "", id: "", categoria: "Herramientas", precio: "", stock: "", stockMin: "" };

function Inventario({ productos, setProductos, role }) {
  const esAdmin = role === "admin";
  const [catActiva, setCatActiva] = useState("Todas");
  const [busqueda, setBusqueda] = useState("");
  const [soloStockBajo, setSoloStockBajo] = useState(false);
  const [modal, setModal] = useState(null); // null | "add" | producto
  const [form, setForm] = useState(EMPTY_PROD);
  const [editando, setEditando] = useState(null);

  const stockBajoCount = productos.filter(p => p.stock < p.stockMin).length;

  const filtrados = useMemo(() => {
    return productos.filter(p => {
      const matchCat = catActiva === "Todas" || p.categoria === catActiva;
      const q = busqueda.toLowerCase();
      const matchQ = !busqueda || p.nombre.toLowerCase().includes(q) || p.id.toLowerCase().includes(q) || p.descripcion.toLowerCase().includes(q);
      const matchStock = !soloStockBajo || p.stock < p.stockMin;
      return matchCat && matchQ && matchStock;
    });
  }, [productos, catActiva, busqueda, soloStockBajo]);

  function abrirAdd() { setForm({ ...EMPTY_PROD, id: `P-${String(productos.length + 1).padStart(3, "0")}` }); setEditando(null); setModal("form"); }
  function abrirEdit(p) { setForm({ ...p }); setEditando(p.id); setModal("form"); }

  function guardar() {
    if(!form.nombre || !form.precio || !form.stock) return;
      const prod  = {...form, precio: parseFloat(form.precio), stock: parseInt(form.stock), stockMin: parseInt(form.stockMin) || 10};

    const backendProd = {
      name: prod.nombre,
      description: prod.descripcion,
      category: prod.categoria,
      price: prod.precio,
      stock: prod.stock,
      minStock: prod.stockMin

    };
    if (editando){
      fetch(`http://localhost:8080/api/products/${parseInt(editando)}`,{
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(backendProd)
      })
      .then(res => res.json())
      .then(data => {
        const actualizado = {id: String(data.id), nombre: data.name, descripcion: data.description, categoria: data.category, precio: data.price, stock: data.stock, stockMin: data.minStock};
        setProductos(ps => ps.map(p => p.id === editando ? actualizado : p));
      });
    }else{
      fetch('http://localhost:8080/api/products',{
        method: 'POST',
        headers:{'Content-Type': 'application/json'},
        body: JSON.stringify(backendProd)
      })
      .then(res => res.json())
      .then(data => {
        const nuevo = {id: String(data.id), nombre: data.name, descripcion: data.description, categoria: data.category, precio: data.price, stock: data.stock, stockMin: data.minStock};
        setProductos(ps => [nuevo, ...ps]);
      })
    }
    setModal(null);
  }

    function eliminar(id) {
    fetch(`http://localhost:8080/api/products/${parseInt(id)}`, {
      method: 'DELETE'
    })
    .then(() => {
      setProductos(ps => ps.filter(p => p.id !== id));
      setModal(null);
    });
  }

  return (
    <div style={invStyles.wrap}>
      {/* Header */}
      <div style={invStyles.header}>
        <div>
          <h1 style={invStyles.h1}>Inventario</h1>
          <p style={invStyles.sub}>{productos.length} productos · {stockBajoCount > 0 && <span style={{ color: "#ef4444", fontWeight: 600 }}>Stock Bajo ({stockBajoCount})</span>}</p>
        </div>
        {esAdmin && <Btn onClick={abrirAdd}>+ Añadir Producto</Btn>}
      </div>

      {/* Categorías */}
      <div style={invStyles.cats}>
        {CATEGORIAS.map(cat => (
          <button key={cat} onClick={() => setCatActiva(cat)}
            style={{ ...invStyles.catBtn, ...(catActiva === cat ? invStyles.catBtnActive : {}) }}>
            {cat}
          </button>
        ))}
      </div>

      {/* Barra de búsqueda */}
      <div style={invStyles.toolbar}>
        <div style={invStyles.searchWrap}>
          <svg style={invStyles.searchIcon} width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input style={invStyles.search} placeholder="Buscar por nombre, ID o palabra clave…" value={busqueda} onChange={e => setBusqueda(e.target.value)} />
        </div>
        <button onClick={() => setSoloStockBajo(v => !v)}
          style={{ ...invStyles.filterBtn, ...(soloStockBajo ? invStyles.filterBtnActive : {}) }}>
          ⚠ Stock Bajo {stockBajoCount > 0 && `(${stockBajoCount})`}
        </button>
      </div>

      {/* Tabla */}
      <div style={invStyles.tableWrap}>
        {filtrados.length === 0 ? (
          <div style={invStyles.empty}>No se encontraron productos que coincidan con la búsqueda.</div>
        ) : (
          <table style={invStyles.table}>
            <thead>
              <tr>
                {["ID", "Producto", "Categoría", "Precio", "Stock", "Estado", ""].map(h => (
                  <th key={h} style={invStyles.th}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtrados.map(p => {
                const bajo = p.stock < p.stockMin;
                return (
                  <tr key={p.id} style={invStyles.tr(bajo)}>
                    <td style={invStyles.td}><span style={invStyles.idTag}>{p.id}</span></td>
                    <td style={invStyles.td}>
                      <div style={{ fontWeight: 600, color: "#111827", fontSize: 13.5 }}>{p.nombre}</div>
                      <div style={{ color: "#9ca3af", fontSize: 12, marginTop: 1 }}>{p.descripcion}</div>
                    </td>
                    <td style={invStyles.td}><Tag>{p.categoria}</Tag></td>
                    <td style={{ ...invStyles.td, fontWeight: 600, color: "#111827" }}>${p.precio.toFixed(2)}</td>
                    <td style={{ ...invStyles.td, minWidth: 140 }}>
                      <StockBar stock={p.stock} stockMin={p.stockMin} />
                      <div style={{ fontSize: 11, color: "#9ca3af", marginTop: 2 }}>Mín: {p.stockMin}</div>
                    </td>
                    <td style={invStyles.td}>
                      {bajo
                        ? <Tag color={p.stock === 0 ? "red" : "orange"}>Stock Bajo</Tag>
                        : <Tag color="green">OK</Tag>}
                    </td>
                    {esAdmin && (
                      <td style={{ ...invStyles.td, textAlign: "right" }}>
                        <button onClick={() => abrirEdit(p)} style={invStyles.actionBtn}>Modificar</button>
                      </td>
                    )}
                    {!esAdmin && <td />}
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal Add/Edit */}
      {modal === "form" && (
        <Modal title={editando ? "Modificar Producto" : "Añadir Producto"} onClose={() => setModal(null)}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 16px" }}>
            <div style={{ gridColumn: "1/-1" }}><Input label="Nombre del producto *" value={form.nombre} onChange={e => setForm(f => ({ ...f, nombre: e.target.value }))} placeholder="Ej. Martillo de acero 16oz" /></div>
            <div style={{ gridColumn: "1/-1" }}><Textarea label="Descripción" value={form.descripcion} onChange={e => setForm(f => ({ ...f, descripcion: e.target.value }))} placeholder="Descripción breve del producto" /></div>
            <Input label="ID Producto" value={form.id} onChange={e => setForm(f => ({ ...f, id: e.target.value }))} disabled={!!editando} />
            <Select label="Categoría" value={form.categoria} onChange={e => setForm(f => ({ ...f, categoria: e.target.value }))} options={CATEGORIAS.filter(c => c !== "Todas")} />
            <Input label="Precio ($) *" type="number" step="0.01" value={form.precio} onChange={e => setForm(f => ({ ...f, precio: e.target.value }))} placeholder="0.00" />
            <Input label="Stock actual *" type="number" value={form.stock} onChange={e => setForm(f => ({ ...f, stock: e.target.value }))} placeholder="0" />
            <Input label="Stock mínimo" type="number" value={form.stockMin} onChange={e => setForm(f => ({ ...f, stockMin: e.target.value }))} placeholder="10" />
          </div>
          <div style={{ display: "flex", gap: 8, justifyContent: "flex-end", marginTop: 8 }}>
            {editando && <Btn variant="danger" onClick={() => { if (confirm("¿Eliminar este producto?")) eliminar(editando); }}>Eliminar</Btn>}
            <Btn variant="secondary" onClick={() => setModal(null)}>Cancelar</Btn>
            <Btn onClick={guardar}>Guardar</Btn>
          </div>
        </Modal>
      )}
    </div>
  );
}

const invStyles = {
  wrap: { padding: "28px 32px", maxWidth: 1100 },
  header: { display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 20 },
  h1: { margin: "0 0 4px", fontSize: 22, fontWeight: 800, color: "#111827" },
  sub: { margin: 0, color: "#6b7280", fontSize: 13.5 },
  cats: { display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 16 },
  catBtn: { padding: "6px 14px", border: "1.5px solid #e5e7eb", borderRadius: 20, background: "white", color: "#6b7280", cursor: "pointer", fontSize: 13, fontWeight: 500, transition: "all 0.15s" },
  catBtnActive: { background: "oklch(0.72 0.15 55)", borderColor: "oklch(0.72 0.15 55)", color: "white", fontWeight: 700 },
  toolbar: { display: "flex", gap: 10, marginBottom: 16, alignItems: "center" },
  searchWrap: { flex: 1, position: "relative" },
  searchIcon: { position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" },
  search: { width: "100%", padding: "9px 10px 9px 32px", border: "1.5px solid #e5e7eb", borderRadius: 8, fontSize: 13.5, outline: "none", boxSizing: "border-box", fontFamily: "inherit" },
  filterBtn: { padding: "8px 14px", border: "1.5px solid #e5e7eb", borderRadius: 8, background: "white", color: "#6b7280", cursor: "pointer", fontSize: 13, fontWeight: 600, whiteSpace: "nowrap" },
  filterBtnActive: { background: "#fff7ed", borderColor: "#f97316", color: "#ea580c" },
  tableWrap: { background: "white", borderRadius: 12, border: "1.5px solid #f0f0f0", overflow: "hidden" },
  table: { width: "100%", borderCollapse: "collapse" },
  th: { padding: "11px 14px", textAlign: "left", fontSize: 12, fontWeight: 700, color: "#6b7280", background: "#fafafa", borderBottom: "1.5px solid #f0f0f0", textTransform: "uppercase", letterSpacing: "0.04em" },
  tr: (bajo) => ({ borderBottom: "1px solid #f9f9f9", background: bajo ? "rgba(249,115,22,0.03)" : "white" }),
  td: { padding: "12px 14px", verticalAlign: "middle", fontSize: 13.5, color: "#374151" },
  idTag: { fontFamily: "monospace", fontSize: 12, background: "#f3f4f6", color: "#374151", padding: "2px 6px", borderRadius: 4 },
  actionBtn: { padding: "5px 12px", border: "1.5px solid #e5e7eb", borderRadius: 6, background: "white", color: "#374151", cursor: "pointer", fontSize: 12.5, fontWeight: 600 },
  empty: { padding: "48px 24px", textAlign: "center", color: "#9ca3af", fontSize: 14 },
};

Object.assign(window, { Inventario });
