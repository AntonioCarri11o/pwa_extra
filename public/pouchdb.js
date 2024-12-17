const db = new PouchDB('product-cache-database');
fetchData();
document.getElementById('form').addEventListener('submit', function(event){
    event.preventDefault();
});
async function saveProduct() {
    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;    
    const quantity = document.getElementById('quantity').value;
    const price = document.getElementById('price').value;
    const id = generateId();
    const doc = {_id: id, name: name, description: description, quantity: quantity, price: price}
    await db.put(doc);
    fetchData();
}
async function deleteProduct(id) {
    await db.get(id).then(doc => {
        return db.remove(doc);
    }).then(result => {
        alert('Producto eliminado');
        fetchData();
    });
}

async function fetchData() {
    const tableBody = document.getElementById('databody');
    tableBody.innerHTML = '';
    const allDocs = await db.allDocs({include_docs: true});
    allDocs.rows.forEach(row => {
        const th = tableBody.appendChild(document.createElement('tr'));
        const id = row.doc._id;
        th.innerHTML = `
        <th>${row.doc._id}</th>
        <th><input type="text" id="${id}_name" class="form-control" value="${row.doc.name}"></th>
        <th><input type="text" id="${id}_desc" class="form-control" value="${row.doc.description}"></th>
        <th><input type="number" id="${id}_price" class="form-control" value="${row.doc.price}"></th>
        <th><input type="number" id="${id}_quantity" class="form-control" value="${row.doc.quantity}"></th>
        <th class="d-flex justify-content-between">
            <button class="btn btn-success bi bi-pencil" id="editBtn" onclick="updateProduct('${id}')"></button>
            <button class="btn btn-danger bi bi-trash" id="deleteBtn" onclick="deleteProduct('${id}')"></button>
        </th>
    `;    
    });
}

async function updateProduct(id) {
    const name = document.getElementById(`${id}_name`).value;
    const description = document.getElementById(`${id}_desc`).value;
    const price = document.getElementById(`${id}_price`).value;
    const quantity = document.getElementById(`${id}_quantity`).value;
    await db.get(id).then(doc => {
        doc.name = name;
        doc.description = description;
        doc.price = price;
        doc.quantity = quantity;
        return db.put(doc);
    }).then(result => {
        alert('Producto actualziado');
        fetchData();
    });
}


function notZero(value) {
    return value != null && value > 0
}

function generateId() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let id = '';
    for (let i = 0; i < 5; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        id += characters[randomIndex];
    }
    return id;
}

function generateRow(row) {

}