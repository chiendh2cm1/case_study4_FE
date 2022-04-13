let currentUser = localStorage.getItem('currentUser');
currentUser = JSON.parse(currentUser);

function showNameUser(){
    let nameUser = "";
    nameUser = `<p class="d-block" href="#" style="color: white">Chào ${currentUser.username}</p>`
    $('#name-admin').html(nameUser);
}
$(document).ready(function () {
    showNameUser();
})

    function getAllBill() {
        $.ajax({
            url: `http://localhost:8080/bills`,
            type: 'GET',
            headers: {
                'Authorization': 'Bearer ' + currentUser.token
            },
            success: function (bills) {
                let content = '';
                for (let i = 0; i < bills.length; i++) {
                    content += `<tr>
        <td>${i + 1}</td>
        <td>${bills[i].receiver}</td>
        <td>${bills[i].address}</td>
        <td>${bills[i].email}</td>
        <td>${bills[i].phoneNumber}</td>
        <td>${bills[i].user == null ? '' : bills[i].user.username}</td>
        <td><button class="btn btn-primary"><i class="fa fa-edit" data-target="#create-bill" data-toggle="modal"
                                        type="button" onclick="showEditBill(${bills[i].id})"></i></button></td>
        <td><button class="btn btn-danger" data-target="#delete-bill" data-toggle="modal"
                                        type="button" onclick="showDeleteBill(${bills[i].id})"><i class="fa fa-trash"></i></button></td>
    </tr>`
                }
                $('#bill-list-content').html(content);
            }
        })
    }



    $(document).ready(function () {
        getAllBill();
    })


