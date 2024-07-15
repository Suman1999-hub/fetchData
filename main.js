let url = "https://reqres.in/api/users";
let currentEditId = null;

const dip = async function dataFunc() {
  try {
    document.getElementById("loading").style.display = "block";
    const res = await fetch(url);
    console.log(res);
    const data = await res.json();
    data.data.forEach((e) => {
      let { id, avatar, email, first_name, last_name } = e;
      tbody.innerHTML += `<tr id="data1${id}">
                <td>${id}</td>
                <td><img src="${avatar}" style="border-radius: 30px; height:80px" /></td>
                <td>${email}</td>
                <td>${first_name}</td>
                <td>${last_name}</td>
                <td>
                    <div>
                        <button style="height:50px;width:100px;background-color:green;color:white;border-radius:10px" onclick="editBtn(${id})">Edit</button>
                        <button style="height:50px;width:110px;background-color:red;color:white;border-radius:10px" onclick="deleteBtn(${id})">Delete</button>
                    </div>
                </td>
            </tr>`;

      document.getElementById("loading").style.display = "none";
    });
  } catch (e) {
    console.log(e);
    document.getElementById("loading").style.display = "none";
  }
};

dip();

function editBtn(id) {
  currentEditId = id;
  let row = document.getElementById(`data1${id}`);
  let col = row.getElementsByTagName("td");
  let firstName = col[3].innerText;
  let lastName = col[4].innerText;
  let email = col[2].innerText;

  document.getElementById("firstName").value = firstName;
  document.getElementById("lastName").value = lastName;
  document.getElementById("email").value = email;
  let modal = document.getElementById("editModal");
  modal.style.display = "block";
}

async function deleteBtn(id) {
  try {
    const res = await fetch(`${url}/${id}`, {
      method: "DELETE",
    });
    console.log(res.status);
    if (res.status === 204) {
      let row = document.getElementById(`data1${id}`);
      row.remove();
      console.log("delete successfully");
    } else {
      console.log("Fail");
    }
  } catch (e) {
    console.log(e);
  }
}

async function saveChanges() {
  let firstName = document.getElementById("firstName").value;
  let lastName = document.getElementById("lastName").value;
  let email = document.getElementById("email").value;

  if (currentEditId !== null) {
    try {
      const res = await fetch(`${url}/${currentEditId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          email: email,
        }),
      });
      if (res.ok) {
        let row = document.getElementById(`data1${currentEditId}`);
        let col = row.getElementsByTagName("td");
        col[3].innerText = firstName;
        col[4].innerText = lastName;
        col[2].innerText = email;

        let modal = document.getElementById("editModal");
        modal.style.display = "none";
      } else {
        console.log("Failed update");
      }
    } catch (e) {
      console.log(e);
    }
  }
}

var modal = document.getElementById("editModal");

var span = document.getElementsByClassName("close")[0];
span.onclick = function () {
  modal.style.display = "none";
};
