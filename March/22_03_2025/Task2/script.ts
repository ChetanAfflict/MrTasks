interface Item {
    id: number;
    name: string;
}

let items: Item[] = JSON.parse(localStorage.getItem("items") || "[]");

const itemList = document.getElementById("itemList") as HTMLUListElement;
const itemInput = document.getElementById("itemInput") as HTMLInputElement;

function renderItems() {
    itemList.innerHTML = "";
    items.forEach((item) => {
        const li = document.createElement("li");
        li.innerHTML = `
            <span>${item.name}</span>
            <button onclick="editItem(${item.id})">Edit</button>
            <button onclick="deleteItem(${item.id})">Delete</button>
        `;
        itemList.appendChild(li);
    });
}

function addItem() {
    const name = itemInput.value.trim();
    if (name) {
        const newItem: Item = { id: Date.now(), name };
        items.push(newItem);
        localStorage.setItem("items", JSON.stringify(items));
        itemInput.value = "";
        renderItems();
    }
}

function editItem(id: number) {
    const newName = prompt("Edit item:", items.find(item => item.id === id)?.name);
    if (newName) {
        items = items.map(item => item.id === id ? { ...item, name: newName } : item);
        localStorage.setItem("items", JSON.stringify(items));
        renderItems();
    }
}

function deleteItem(id: number) {
    items = items.filter(item => item.id !== id);
    localStorage.setItem("items", JSON.stringify(items));
    renderItems();
}

// Initial render
renderItems();
