
const db = new PouchDB('productos');
fetchData();
document.getElementById('saveData').addEventListener('click', async () => {
  const id = new Date().toISOString();
  const doc = { _id: id, nombre: document.getElementById('nombre').value, descripcion: document.getElementById('descripcion').value, precio: document.getElementById('precio').value, cantidad: document.getElementById('cantidad').value };
  await db.put(doc);
  alert('Dato guardado');
  fetchData();
});

async function updateData(id) {
    const doc = await db.get(id);
    doc.nombre = document.getElementById(`nombre-${id}`).value;
    doc.descripcion = document.getElementById(`descripcion-${id}`).value;
    doc.precio = document.getElementById(`precio-${id}`).value;
    doc.cantidad = document.getElementById(`cantidad-${id}`).value;
    await db.put(doc);
    fetchData();
}


async function fetchData() {
    const dataList = document.getElementById('dataList');
    dataList.innerHTML = ``;
    const allDocs = await db.allDocs({ include_docs: true });
    allDocs.rows.forEach(row => {   
      const ul = document.createElement('ul');
      const id = row.doc._id
      ul.appendChild(fieldGenerator(id, id , 'id'));
      ul.appendChild(fieldGenerator(row.doc.nombre, id, 'nombre'));
      ul.appendChild(fieldGenerator(row.doc.descripcion, id, 'descripcion'));
      ul.appendChild(fieldGenerator(row.doc.precio, id, 'precio'));
      ul.appendChild(fieldGenerator(row.doc.cantidad, id, 'cantidad'));
      const updateButton = ul.appendChild(document.createElement('button'));
      updateButton.onclick = () => updateData(id);
      const deleteButton = ul.appendChild(document.createElement('button'));
      deleteButton.onclick = () => deleteData(id);
    });
}

async function deleteData(id) {
    const doc = await db.get(id);
    await db.remove(doc);
    fetchData();
}

function fieldGenerator(value, id, fieldType) {
    const field = document.createElement('input');
    field.type = 'text';
    field.id = `${fieldType}-${id}`;
    field.value = value
    return field;
}
//nombre descripcion precio cantidad