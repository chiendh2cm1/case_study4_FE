let currentUser = localStorage.getItem('currentUser');
currentUser = JSON.parse(currentUser);// ep chuoi ve doi tuong

function showNameUser(){
    let nameUser = "";
    if (currentUser.username != null){
        nameUser = `<p style="color: black">Hello ${currentUser.username} /<a onclick="doLogout()">Sign out</a></p>`
    }else {
        nameUser =`<a href="#signin-modal" data-toggle="modal">Sign in / Sign up</a>`
    }
    $('#name-user').html(nameUser);
}
$(document).ready(function () {
    showNameUser();
})
function getProductByPage(page) {
    $.ajax({
        type: 'GET',
        url: `http://localhost:8080/products?page=${page}`,
        success: function (data) {
            let content = '';
            let products = data.content;
            for (let i = 0; i < products.length; i++) {
                content += `<div class="col-6 col-md-4 col-lg-4 col-xl-3">
                                    <div class="product product-11 text-center">
                                        <figure class="product-media">
                                            <a href="product.html">
                                                <img src="http://localhost:8080/image/${products[i].image}" alt="Product image" class="product-image">
                                                <img src="http://localhost:8080/image/${products[i].image}" alt="Product image" class="product-image-hover">
                                            </a>

                                            <div class="product-action-vertical">
                                                <a href="#" class="btn-product-icon btn-wishlist "><span>add to wishlist</span></a>
                                            </div><!-- End .product-action-vertical -->
                                        </figure><!-- End .product-media -->

                                        <div class="product-body">
                                            <div class="product-cat">
                                                <a href="#">Decor</a>
                                            </div><!-- End .product-cat -->
                                            <h3 class="product-title"><a href="product.html">${products[i].name}</a></h3><!-- End .product-title -->
                                            <div class="product-price">
                                                ${products[i].price} đ
                                            </div><!-- End .product-price -->
                                        </div><!-- End .product-body -->
                                        <div class="product-action">
                                            <a href="#" class="btn-product btn-cart"><span>add to cart</span></a>
                                        </div><!-- End .product-action -->
                                    </div><!-- End .product -->
                                </div><!-- End .col-sm-6 col-md-4 col-lg-3 -->`
            }
            $('#product-body').html(content);
            let page = `<button class="btn btn-primary" id="backup" onclick="getProductByPage(${data.pageable.pageNumber}-1)">Previous</button>
    <span>${data.pageable.pageNumber + 1} | ${data.totalPages}</span>
    <button class="btn btn-primary" id="next" onclick="getProductByPage(${data.pageable.pageNumber}+1)">Next</button>`
            $('#product-list-page').html(page);
            if (data.pageable.pageNumber === 0) {
                document.getElementById("backup").hidden = true
            }
            if (data.pageable.pageNumber + 1 === data.totalPages) {
                document.getElementById("next").hidden = true
            }
        }
    })
    event.preventDefault();
}

function findProductByName(page) {
    let q = $('#q').val();
    $.ajax({
        type: 'GET',
        url: `http://localhost:8080/products?q=${q}&page=${page}`,
        success: function (data) {
            let content = '';
            let products = data.content;
            for (let i = 0; i < products.length; i++) {
                content += `<div class="col-6 col-md-4 col-lg-4 col-xl-3">
                                    <div class="product product-11 text-center">
                                        <figure class="product-media">
                                            <a href="product.html">
                                                <img src="http://localhost:8080/image/${products[i].image}" alt="Product image" class="product-image">
                                                <img src="http://localhost:8080/image/${products[i].image}" alt="Product image" class="product-image-hover">
                                            </a>

                                            <div class="product-action-vertical">
                                                <a href="#" class="btn-product-icon btn-wishlist "><span>add to wishlist</span></a>
                                            </div><!-- End .product-action-vertical -->
                                        </figure><!-- End .product-media -->

                                        <div class="product-body">
                                            <div class="product-cat">
                                                <a href="#">Decor</a>
                                            </div><!-- End .product-cat -->
                                            <h3 class="product-title"><a href="product.html">${products[i].name}</a></h3><!-- End .product-title -->
                                            <div class="product-price">
                                                ${products[i].price} đ
                                            </div><!-- End .product-price -->
                                        </div><!-- End .product-body -->
                                        <div class="product-action">
                                            <a href="#" class="btn-product btn-cart"><span>add to cart</span></a>
                                        </div><!-- End .product-action -->
                                    </div><!-- End .product -->
                                </div><!-- End .col-sm-6 col-md-4 col-lg-3 -->`
            }
            $('#product-body').html(content);
            let page = `<button class="btn btn-primary" id="backup" onclick="getProductByPage(${data.pageable.pageNumber}-1)">Previous</button>
    <span>${data.pageable.pageNumber + 1} | ${data.totalPages}</span>
    <button class="btn btn-primary" id="next" onclick="getProductByPage(${data.pageable.pageNumber}+1)">Next</button>`
            $('#product-list-page').html(page);
            if (data.pageable.pageNumber === 0) {
                document.getElementById("backup").hidden = true
            }
            if (data.pageable.pageNumber + 1 === data.totalPages) {
                document.getElementById("next").hidden = true
            }
        }
    })
    event.preventDefault();
}

$(document).ready(function () {
    getProductByPage();
})
