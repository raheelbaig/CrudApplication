function post() {
  let name = document.getElementById("name").value
  let email = document.getElementById("email").value
  let pass = document.getElementById("pass").value

  axios.post('https://mongodbserver1.herokuapp.com/users', {
    name: name,
    email: email,
    pass: pass
  })
    .then(function (response) {
      document.getElementById("alert1").innerHTML = `<div class="alert alert-success" role="alert">
        user created succesfully</div>`
      get()

    })
    .catch(function (error) {
      document.getElementById("alert1").innerHTML = `<div class="alert alert-danger" role="alert">
        400 (Bad Request) </div>`
    });
  setTimeout(() => {
    document.getElementById("alert1").innerHTML = '';
  }, 3000)

  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("pass").value = "";
}


function get() {
  axios.get('https://mongodbserver1.herokuapp.com/users')
    .then(function (response) {
      document.getElementById('table-b').innerHTML = ''
      console.log(response.data)
      document.getElementById('table-b').innerHTML += response.data.map((e, index) => `
        <tr>
        <td scope="col">${e._id}</td>
        <td scope="col">${e.name}</td>
        <td scope="col">${e.email}</td>
        <td scope="col">${e.pass}</td>
        <td>
              <button onclick="edit('${e._id}',${index},'${e.name}','${e.email}','${e.pass}')" type="button" class="btn btn-success"><i class="fa fa-edit"></i></button>
            
            <button type="button" onclick="dlt('${e._id}')" class="del" data-bs-toggle="modal" data-bs-target="#${"staticBackdrop" + e._id}"><i class="fa fa-trash"></i>
</button>
<!-- Modal -->
<div class="modal fade" id="${"staticBackdrop" + e._id}" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content ">
      <div class="modal-header ">
        <h5 class="modal-title " id="${"staticBackdropLabel" + e._id}">Delete User</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body modaltl">
        Do You Want To Delete This User
      </div>
      <div class="modal-footer">
        <button type="button" class="edt" data-bs-dismiss="modal">No</button>
        <button type="button" class="del" data-bs-dismiss="modal" onClick="delbut('${e._id}')">Yes</button>
      </div>
    </div>
  </div>
</div>
            </td>
  </tr>`).join(" ")
    })
    .catch(function (error) {

      console.log(error);
    })
}

function dlt(_id) {

  axios.delete(`https://mongodbserver1.herokuapp.com/users/${_id}`)
    .then(function (res) {
      get()
      alert("user deleted");
    })

    .catch(function (error) {

      alert(error);
    })
  document.getElementById("id").value = " ";
}

function edit(_id, index, name, email, pass) {
  console.log(_id, index)


  document.getElementById('table-b').innerHTML = `
<tr>
        <td scope="col">${_id}</td>
        <td scope="col"> <input type="text" class="form-control" id="name1" value="${name}"></td>
        <td scope="col"><input type="email" class="form-control" id="email1" value="${email}"></td>
        <td scope="col"><input type="pass" class="form-control" id="pass1" value="${pass}"></td>
        <td>
         <button onclick="update('${_id}')" type="button" class="btn btn-success">update</button>
         <button onclick="cancel('${_id}')" type="button" class="btn btn-danger">cancel</button>
       
            </td>
  </tr>`

}
get()
function update(_id) {
  let name = document.getElementById("name1").value
  let email = document.getElementById("email1").value
  let pass = document.getElementById("pass1").value
  axios.put(`https://mongodbserver1.herokuapp.com/users/${_id}`, { name, email, pass })

    .then(function (response) {
      console.log(response);

        get();
    })
    .catch(function (error)
     {

    })
}
function cancel()
{
  get()
}