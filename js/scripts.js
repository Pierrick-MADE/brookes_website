/* ----- Storage initialisation ------------------------ */
var cart = [];
localStorage.setItem("cart",JSON.stringify(cart));

/* ----- Navigation Bar -------------------------------- */
function toggle_menu(){
    var items = document.getElementsByClassName("navbar-item");
    var icon_toggle = document.getElementsByClassName("navbar-toggle")[0];
    document.getElementsByTagName("main")[0].classList.toggle("toggled");
    for (var i = 0; i < items.length; i++){
        items[i].classList.toggle("toggled");
    }
    if (icon_toggle.classList.toggle("toggled")){
        icon_toggle.innerHTML = "<i class=\"fas fa-angle-up\"></i>";
    }else{
        icon_toggle.innerHTML = "<i class=\"fas fa-bars\"></i>"
    }
}

/* ----- Common functions ------------------------------ */
function scrollWell(element){
    var elementRect = element.getBoundingClientRect();
    var elementHeight = elementRect.bottom - elementRect.top;
    if (elementHeight < window.innerHeight){ /* scroll to get the element at the middle of the screen*/
        var elementPosition = (elementRect.bottom-elementRect.top)/2 + elementRect.top + window.pageYOffset;
        var middle = elementPosition - (window.innerHeight / 2);
        window.scrollTo(0, middle);
    } else { /* scroll to get the top of the element at the top of the screen*/
        window.scrollTo(0, elementRect.top + window.pageYOffset - 51);
    }
}

/* ----- Home ------------------------------------------ */
function discoverProductsHome(){
    var productOverview = document.getElementById("discover-products");
    scrollWell(productOverview);
}
function showProducts(type){
    localStorage.setItem("homeFilter", type);
    location.assign("products.html");
}

/* ----- Products -------------------------------------- */
function seeProduct(product_id){

    closeAllProducts();

    var product = document.getElementById(product_id);
    var details = product.getElementsByClassName("product-details")[0];
    var description = product.getElementsByClassName("product-description")[0];
    var img = product.getElementsByClassName("product-img")[0];

    product.classList.add("product-toggled");
    details.classList.remove("hide");
    description.classList.remove("hide");
    img.setAttribute("onclick", "seePicture('" + img.getElementsByTagName("img")[0].getAttribute("src") + "')" );
    img.style.cursor = "zoom-in";

    /* Scroll to the item*/
    scrollWell(product);
    /*product.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});*/
}
function closeProduct(product_id){
    var product = document.getElementById(product_id);
    var details = product.getElementsByClassName("product-details")[0];
    var description = product.getElementsByClassName("product-description")[0];
    var img = product.getElementsByClassName("product-img")[0];

    product.classList.remove("product-toggled");
    details.classList.add("hide");
    description.classList.add("hide");
    img.setAttribute("onclick", "seeProduct('" + product_id + "')" );
    img.style.cursor = "pointer";
}
function closeAllProducts(){
    var already_toggled_products = document.getElementsByClassName("product-toggled");
    for(var i=0; i < already_toggled_products.length; i++){
        closeProduct(already_toggled_products[i].getAttribute("id"));
    }
}
function seePicture(img_path){
    var popup = document.getElementsByClassName("popup")[0];
    var img = popup.getElementsByTagName("img")[0];
    var body = document.getElementsByTagName("body")[0];
    img.setAttribute("src", img_path);
    popup.setAttribute("onclick", "seePicture('" + img_path + "')" );
    if (popup.classList.toggle("hide")){
        body.style.overflow = "auto";
    }else{
        body.style.overflow = "hidden";
    }
}
function filter(type){
    closeAllProducts();

    var products = document.getElementById("products").children;

    /*for each product : check if class contains type or not*/
    for (var i=0; i < products.length; i++){
        console.log("product", products[i]);
        if (products[i].classList.contains(type) || type === "all"){
            products[i].classList.remove("hide");
        }else{
            products[i].classList.add("hide");
        }
    }

    /* make the filter button used active (e.g. bold) */
    var buttons = document.getElementsByClassName("filter category")[0].children;
    for (var i = 1; i < buttons.length; i++){
        if (buttons[i].getAttribute("onclick") === "filter(\'"+type+"\')"){
            buttons[i].classList.add("active");
        }else{
            buttons[i].classList.remove("active");
        }
    }
}
function sort(sortType){
    closeAllProducts();

    var products = document.getElementById("products").children;
    var sorted = false;
    switch(sortType){
        case "featured":
            for (x=0; x<products.length && !sorted; x++){
                sorted = true;
                for (i=0; i<(products.length-x-1); i++){
                    var id1 = products[i].getAttribute("id");
                    var id2 = products[i+1].getAttribute("id");
                    if ( id1 > id2 ){
                        products[i].parentNode.insertBefore(products[i+1],
                                                            products[i]);
                        sorted = false;
                    }
                }
            }
            break;
        case "az":
            for (x=0; x<products.length && !sorted; x++){
                sorted = true;
                for (i=0; i<(products.length-x-1); i++){
                    var name1 = products[i].getElementsByClassName("product-title")[0].innerHTML.toLowerCase();
                    var name2 = products[i+1].getElementsByClassName("product-title")[0].innerHTML.toLowerCase();
                    if ( name1 > name2 ){
                        products[i].parentNode.insertBefore(products[i+1],
                                                            products[i]);
                        sorted = false;
                    }
                }
            }
            break;
        case "incPrice":
            for (x=0; x<products.length && !sorted; x++){
                sorted = true;
                for (i=0; i<(products.length-x-1); i++){
                    var price1 =
                        parseFloat(products[i].getElementsByClassName("price")[0].innerHTML);
                    var price2 =
                        parseFloat(products[i+1].getElementsByClassName("price")[0].innerHTML);
                    if ( price1 > price2 ){
                        products[i].parentNode.insertBefore(products[i+1],
                                                            products[i]);
                        sorted = false;
                    }
                }
            }
            break;
        case "decPrice":
            for (x=0; x<products.length && !sorted; x++){
                sorted = true;
                for (i=0; i<(products.length-x-1); i++){
                    var price1 =
                        parseFloat(products[i].getElementsByClassName("price")[0].innerHTML);
                    var price2 =
                        parseFloat(products[i+1].getElementsByClassName("price")[0].innerHTML);
                    if ( price1 < price2 ){
                        products[i].parentNode.insertBefore(products[i+1],
                                                            products[i]);
                        sorted = false;
                    }
                }
            }
            break;
        case "type":
            for (x=0; x<products.length && !sorted; x++){
                sorted = true;
                for (i=0; i<(products.length-x-1); i++){
                    var type1 =
                        products[i].getElementsByClassName("price")[0].innerHTML;
                    var type2 =
                        products[i+1].getElementsByClassName("price")[0].innerHTML;
                    if ( type1 > type2 ){
                        products[i].parentNode.insertBefore(products[i+1],
                                                            products[i]);
                        sorted = false;
                    }
                }
            }
            break;
        default:
            break;
    }
    /* make the filter button used active (e.g. bold) */
    var buttons = document.getElementsByClassName("filter sort")[0].children;
    for (var i = 1; i < buttons.length; i++){
        if (buttons[i].getAttribute("onclick") === "sort(\'"+sortType+"\')"){
            buttons[i].classList.add("active");
        }else{
            buttons[i].classList.remove("active");
        }
    }
}
function initData(){
    /*xml initialisation*/ /*help from w3schools*/
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            initProducts(xhttp.responseXML);
        }
    };
    xhttp.open("GET", "data/products.xml", true);
    xhttp.send(); 
}
function initProducts(xmlDoc){
    /* create a child for each product of the xml page*/
    /* and append this child to products */
    var productsTXT = "";
    var products = xmlDoc.getElementsByTagName("product");
    for (var i=0; i < products.length; i++){
        productsTXT += "<div id=\"";
        productsTXT += products[i].getAttribute("id");
        productsTXT += "\" class=\"";
        productsTXT += products[i].getAttribute("category");
        productsTXT += " c12 relative box-shadow\"><div class=\"col c6\"><div class=\"padding-20\"><div class=\"relative image-btn\"><a class=\"product-img\" onclick=\"seeProduct('";
        productsTXT += products[i].getAttribute("id");
        productsTXT += "')\"><img class=\"box-shadow loading\" src=\"img/";
        productsTXT += products[i].getElementsByTagName("img")[0].childNodes[0].nodeValue;
        productsTXT += ".jpg\" width=\"100%\" alt=\"";
        productsTXT += products[i].getElementsByTagName("name")[0].childNodes[0].nodeValue;
        productsTXT += "\"><div class=\"absolute onImage price text-title\">";
        productsTXT += products[i].getElementsByTagName("price")[0].childNodes[0].nodeValue;
        productsTXT += "</div></a></div></div></div><div class=\"col c6 hide product-details\"><div class=\"product-close-btn\"><a onclick=\"closeProduct('";
        productsTXT += products[i].getAttribute("id");
        productsTXT += "')\"><i class=\"fas fa-times\"></i></a></div><div class=\"padding-20\"><div class=\"text-title product-title\">";
        productsTXT += products[i].getElementsByTagName("name")[0].childNodes[0].nodeValue;
        productsTXT += "</div><button class=\"add-to-cart\" onclick=\"addToCart('";
        productsTXT += products[i].getAttribute("id");
        productsTXT += "')\">ADD to cart</button>";
        productsTXT += products[i].getElementsByTagName("short_description")[0].childNodes[0].nodeValue;
        productsTXT += "</div></div><div class=\"col c12 hide product-description\"><div style=\"padding: 0 20px 20px 20px\">";
        productsTXT += products[i].getElementsByTagName("full_description")[0].childNodes[0].nodeValue;
        productsTXT += "</div></div></div>";
    }
    productsTXT = productsTXT.replace(/\\n|\n/gm, "<br>");
    document.getElementById("products").innerHTML = productsTXT;
    homePageFilter();
}
function homePageFilter(){
    /*filters from home page*/
    var homeFilter = localStorage.getItem("homeFilter")
    if (homeFilter){
        filter(homeFilter);
    }
    localStorage.setItem("homeFilter","");

    var products = document.getElementById("products");
}
/* ----- Contact --------------------------------------- */
function submitMessage(){
   alert("An error occured with the form, please send us a mail directly at .....\nPlease excuse us for the inconvenience");
}


function disclaimer(){
    /* toggle disclaimer title/content hide or not */
    document.getElementsByClassName("disclaimer-title")[0].classList.toggle("hide");
    document.getElementsByClassName("disclaimer-content")[0].classList.toggle("hide");
    document.getElementsByClassName("disclaimer-btn-close")[0].classList.toggle("hide");
    document.getElementsByClassName("disclaimer-btn-open")[0].classList.toggle("hide");
}

/* ----- Shopping Cart --------------------------------- */
/*
function addToCart(product_id){
    var storedCart = JSON.parse(localStorage.getItem("cart"));

    var product = document.getElementById(product_id);
    var addBtn = product.getElementsByClassName("add-to-cart")[0];
    if (addBtn.classList.toggle("product-in-cart")){ add to cart
        addBtn.innerHTML = "REMOVE from cart";
        localStorage.setItem("cart", JSON.stringify(storedCart.push(product_id)));
    }else{ remove from cart
        addBtn.innerHTML = "ADD to cart";
        localStorage.setItem("cart", JSON.stringify(arrayRemove(storedCart, product_id)));
    }
    console.log("cart : ", JSON.parse(localStorage.getItem("cart")));
}*/
