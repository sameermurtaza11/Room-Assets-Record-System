function showDiv(id) {
  document.getElementById(id).classList.remove('hidden');
}

function closeDiv(id) {
  document.getElementById(id).classList.add('hidden');
}

function toggleFormFields() {
  const type = document.getElementById("item-type").value;
  const modelInput = document.getElementById("item-model");

  if (type === "Furniture") {
    modelInput.value = "-";
    modelInput.disabled = true;
  } else {
    modelInput.value = "";
    modelInput.disabled = false;
  }
}

function resetForm() {
  document.getElementById("item-id").value = "";
  document.getElementById("item-name").value = "";
  document.getElementById("item-model").value = "";
  document.getElementById("item-quantity").value = "";
  document.getElementById("item-type").value = "";
  toggleFormFields();
}

function saveItem() {
  const itemType = document.getElementById("item-type").value;
  const itemId = document.getElementById("item-id").value;
  const itemName = document.getElementById("item-name").value;
  const itemModel = document.getElementById("item-model").value;
  const quantity = document.getElementById("item-quantity").value;

  if (!itemType || !itemName || !quantity) {
    alert("Fill in all fields");
    return;
  }

  fetch("/api/assets", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      room_id: window.currentRoomId,
      item_type: itemType,
      item_name: itemName,
      quantity: quantity,
      model: itemModel
    })
  })
    .then(res => res.json())
    .then(data => {
      alert(data.status);
      resetForm();
      closeDiv("third-div");
      loadAssets(window.currentRoomId);
    });
}



document.addEventListener("DOMContentLoaded", function () {
  loadRooms();
});

function loadRooms() {
  fetch("/api/rooms")
    .then(res => res.json())
    .then(data => {
      const tbody = document.getElementById("room-table-body");
      tbody.innerHTML = "";
      data.forEach(room => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${room.id}</td>
          <td>${room.name}</td>
          <td>${room.location}</td>
          <td><button onclick="loadAssets(${room.id})">View</button></td>
        `;
        tbody.appendChild(row);
      });
    });
}

function loadAssets(roomId) {
  showDiv("secondary-div");
  fetch(`/api/assets/${roomId}`)
    .then(res => res.json())
    .then(data => {
      const assetTable = document.getElementById("asset-table-body");
      assetTable.innerHTML = "";
      data.forEach(asset => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${asset.id}</td>
          <td>${asset.item_type}</td>
          <td>${asset.item_name}</td>
          <td>${asset.quantity}</td>
          <td>${asset.model}</td>
          <td>
            <button>Edit</button>
            <button>Remove</button>
          </td>
        `;
        assetTable.appendChild(row);
      });

      // Set the current room ID globally for adding items
      window.currentRoomId = roomId;
    });
}
