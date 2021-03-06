function buildCart() {
    // Очищаем корзину
    $('#cart').empty();
    var $triangle = $('<div />').attr('class', 'triangle triangle__in-cart');
    $('#cart').append($triangle);
    // Отправляем запрос на получение списка товаров в корзине
    $.ajax({
        url: 'http://localhost:3000/cart',
        dataType: 'json',
        success: function (cart) {
            var $total = $('<div />').attr('class', 'total_price');
            $total.html('<span>TOTAL</span> <span id="total"></span>');
            var $buttons_cart = $('<div />').attr('class', 'buttons_cart');
            var $a_checkout = $('<a />').attr({href: 'chekout.html', class: "checkout"});
            $a_checkout.text('Checkout');
            var $a_shopping = $('<a />').attr({href: 'shopping_cart.html', class: "go-to-cart"});
            $a_shopping.text('Go to cart');
            $buttons_cart.append($a_checkout);
            $buttons_cart.append($a_shopping);


            // Переменная для хранения стоимости товаров в корзине
            var amount = 0;
            var total_quantity = 0;
            // Перебираем товары
            cart.forEach(function (item) {

                var $item_in_cart = $('<div />').attr('class', 'item_in_cart');
                var $img_item = $('<img />').attr('src', item.imgurl);
                var $img_itemSC = $('<img />').attr('src', item.imgurl);
                var $product_in_cart = $('<div />').attr('class', 'product_in_cart_text ml_text');
                var $buttonAction = $('<div />').attr('class', 'action action__incart');
                var $a = $('<a />').attr('href', 'single_page.html');
                var $aInAction = $('<a />', {
                    class: 'delete',
                    'data-id': item.id,
                    'data-quantity': item.quantity,
                }).attr('href', '#');
                var $star = $('<div />').attr('class', 'star');
                var $span = $('<span />', {text: item.quantity + ' x ' + item.price + ' $'});
                var $h3 = $('<h3 />', {text: item.name});
                var $i = $('<i />').attr('class', 'fas fa-times-circle');
                $star.html('<p>*****</p>');
                // Суммируем
                total_quantity += +item.quantity;

                amount += +item.quantity * +item.price;

                // Добавляем все в dom
                $aInAction.append($i);
                $buttonAction.append($aInAction);
                $a.append($h3);
                $product_in_cart.append($a);
                $product_in_cart.append($star);
                $product_in_cart.append($span);
                $item_in_cart.append($img_item);
                $item_in_cart.append($product_in_cart);
                $item_in_cart.append($buttonAction);
                $('#cart').append($item_in_cart);

                //Разметка для страницы shopping_cart
                var $a_2 = $('<a />').attr('href', 'single_page.html');
                var $h3_2 = $('<h3 />', {text: item.name});
                var $i2 = $('<i />').attr('class', 'fas fa-times-circle');
                var $aInAction2 = $('<a />', {
                    class: 'deleteSC',
                    'data-id': item.id,
                    'data-quantity': item.quantity,
                }).attr('href', '#');
                var $product_in_cartSC = $('<div />').attr('class', 'product_in_cart');
                var $product_in_cart_viewSC = $('<div />').attr('class', 'product_in_cart_view');
                var $product_in_cart_indexSC = $('<div />').attr('class', 'product_in_cart_index');
                var $product_in_cart_textSC = $('<div />').attr('class', 'product_in_cart_text');
                var $price_in_cart = $('<div />').attr('class', 'price_in_cart');
                var $quantity = $('<div />').attr('class', 'quantity');
                var $inputQuantity = $('<input />', {
                    type: 'number',
                    class: "quantity_in_cart",
                    min: '1',
                    value: item.quantity,
                    'data-id': item.id,
                    'data-quantity': item.quantity,
                    'data-price': item.price

                });
                // $quantity.html('<input type="number" id="quantity_in_cart" min="1">');
                var $shipping = $('<div />').attr('class', 'shipping');
                var $subtotal = $('<div />').attr('class', 'subtotal');
                var $action = $('<div />').attr('class', 'action');
                //var $buttonPlusMinus = $('<div />').attr('class', 'buttonPlusMinus');
                // var $buttonP = $('<button />', {text:'+'}).attr('class', 'buttonPM');
                // var $buttonM = $('<button />', {text:'-'}).attr('class', 'buttonPM');
                var $span_price = $('<span />', {text: '$ ' + item.price});
                $product_in_cart_textSC.html('<p>Color: <span>Red</span><br>Size: <span>Xll</span></p>');
                $shipping.html('<span>FREE</span>');


                //для большой корзины
                $a_2.append($h3_2);
                $aInAction2.append($i2);
                $product_in_cart_viewSC.append($img_itemSC);
                $product_in_cart_textSC.prepend($a_2);
                $product_in_cart_viewSC.append($product_in_cart_textSC);
                $action.append($aInAction2);
                $product_in_cart_indexSC.append($price_in_cart);
                $price_in_cart.append($span_price);
                $product_in_cart_indexSC.append($quantity);
                $product_in_cart_indexSC.append($shipping);
                $product_in_cart_indexSC.append($subtotal);
                $product_in_cart_indexSC.append($action);
                $quantity.append($inputQuantity);
                //$buttonPlusMinus.append($buttonP);
                // $buttonPlusMinus.append($buttonM);
                $subtotal.append('$ ' + item.subtotal);

                //$a.append($h3);
                $product_in_cartSC.append($product_in_cart_viewSC);
                $product_in_cartSC.append($product_in_cart_indexSC);
                $('#itemInCart').append($product_in_cartSC);
                $('#subtotal').text('$ ' + amount);
                $('#grandSubtotal').text('$ ' + amount)

            });
            // Добавляем все в dom
            if (total_quantity) {
                $('#number').css('display', 'flex');
                $('#number span').text(total_quantity);
            } else {
                $('#number').css('display', 'none');
                $('#number span').text(total_quantity);
            }

            $('#cart').append($total);
            $('#cart').append($buttons_cart);
            $('#total').append(amount + ' $');


        }
    })
}

function buildGoodsList_1to6() {
    // Запрашиваем список товаров на складе
    $.ajax({
        url: 'http://localhost:3000/items?_page=1&_limit=6',
        dataType: 'json',
        success: function (cart) {
            var $divItemPreview = $('<div />').attr('class', 'items_preview');


            // Перебираем список товаров
            cart.forEach(function (item) {
                var $div = $('<div />').attr('class', 'item');
                var $divPosition = $('<div />').attr('class', 'position_add_to_cart');
                var $a = $('<a />').attr("href", "single_page.html");
                var $aShop = $('<a />').attr("href", "#");
                var $divImageItem = $('<div />').attr('class', 'img_items');
                var $divPricePlace = $('<div />').attr('class', 'price_place');
                var $nameItem = $('<H3 />');
                var $price = $('<H4 />');
                var $img = $('<img >');
                var $imgShop = $('<img >').attr('src', 'img/Forma_cart_white.svg');
                var $addToCart = $('<div >').attr('class', 'add_to_cart');
                $addToCart.attr("data-id", item.id);
                $addToCart.attr("data-name", item.name);
                $addToCart.attr("data-price", item.price);
                $addToCart.attr("data-imgurl", item.imgurl);
                $div.attr('id', item.id);
                $img.attr('src', item.imgurl);
                $nameItem.text(item.name);
                $price.text('$ ' + item.price);

                // Добавляем все в dom

                $divItemPreview.append($div);


                $div.append($a);
                $a.append($divImageItem);
                $a.append($divPricePlace);
                $divImageItem.append($img);
                $divPricePlace.append($nameItem);
                $divPricePlace.append($price);
                $div.append($divPosition);
                $divPosition.append($addToCart);
                $addToCart.append($aShop);
                $aShop.text('Add to Cart');
                $aShop.prepend($imgShop);
            });
            // Добавляем все в dom
            $('#goods').append($divItemPreview);

        }
    });
    $('#1').css({color: '#ef5b70'});
}

function buildGoodsListSlider() {
    // Запрашиваем список товаров на складе
    $.ajax({
        url: 'http://localhost:3000/items',
        dataType: 'json',
        success: function (cart) {
            var $divItemPreviewSP = $('#you_may');


            // Перебираем список товаров
            cart.forEach(function (item) {
                var $div = $('<div />').attr('class', 'item');
                var $divPosition = $('<div />').attr('class', 'position_add_to_cart');
                var $a = $('<a />').attr("href", "single_page.html");
                var $aShop = $('<a />').attr("href", "#");
                var $divImageItem = $('<div />').attr('class', 'img_items');
                var $divPricePlace = $('<div />').attr('class', 'price_place');
                var $nameItem = $('<H3 />');
                var $price = $('<H4 />');
                var $img = $('<img >');
                var $imgShop = $('<img >').attr('src', 'img/Forma_cart_white.svg');
                var $addToCart = $('<div >').attr('class', 'add_to_cart');
                $addToCart.attr("data-id", item.id);
                $addToCart.attr("data-name", item.name);
                $addToCart.attr("data-price", item.price);
                $addToCart.attr("data-imgurl", item.imgurl);
                $div.attr('id', item.id);
                $img.attr('src', item.imgurl);
                $nameItem.text(item.name);
                $price.text('$ ' + item.price);

                // Добавляем все в dom

                $divItemPreviewSP.append($div);

                $div.append($a);
                $a.append($divImageItem);
                $a.append($divPricePlace);
                $divImageItem.append($img);
                $divPricePlace.append($nameItem);
                $divPricePlace.append($price);
                $div.append($divPosition);
                $divPosition.append($addToCart);
                $addToCart.append($aShop);
                $aShop.text('Add to Cart');
                $aShop.prepend($imgShop);
            });
            // Добавляем все в dom
            $('#you_may').slick({
                slidesToShow: 4,
                slidesToScroll: 1,
                autoplay: true,
                autoplaySpeed: 2000,
            });

        }
    });

}

function buildGoodsListMain() {
    // Запрашиваем список товаров на складе
    $.ajax({
        url: 'http://localhost:3000/items?_page=1&_limit=8',
        dataType: 'json',
        success: function (cart) {
            var $divItemPreviewM = $('<div />').attr('class', 'items_preview');


            // еребираем список товаров
            cart.forEach(function (item) {
                var $div = $('<div />').attr('class', 'item');
                var $divPosition = $('<div />').attr('class', 'position_add_to_cart');
                var $a = $('<a />').attr("href", "single_page.html");
                var $aShop = $('<a />').attr("href", "#");
                var $divImageItem = $('<div />').attr('class', 'img_items');
                var $divPricePlace = $('<div />').attr('class', 'price_place');
                var $nameItem = $('<H3 />');
                var $price = $('<H4 />');
                var $img = $('<img >');
                var $imgShop = $('<img >').attr('src', 'img/Forma_cart_white.svg');
                var $addToCart = $('<div >').attr('class', 'add_to_cart');
                $addToCart.attr("data-id", item.id);
                $addToCart.attr("data-name", item.name);
                $addToCart.attr("data-price", item.price);
                $addToCart.attr("data-imgurl", item.imgurl);
                $div.attr('id', item.id);
                $img.attr('src', item.imgurl);
                $nameItem.text(item.name);
                $price.text('$ ' + item.price);

                // Добавляем все в dom
                $divItemPreviewM.append($div);


                $div.append($a);
                $a.append($divImageItem);
                $a.append($divPricePlace);
                $divImageItem.append($img);
                $divPricePlace.append($nameItem);
                $divPricePlace.append($price);
                $div.append($divPosition);
                $divPosition.append($addToCart);
                $addToCart.append($aShop);
                $aShop.text('Add to Cart');
                $aShop.prepend($imgShop);

            });
            // Добавляем все в dom
            $('#goods_main').append($divItemPreviewM);


        }
    });

}

(function ($) {
    $(function () {
        // Рисуем корзину
        buildCart();
        // Рисуем список товаров
        buildGoodsList_1to6();
        buildGoodsListMain();
        buildGoodsListSlider();

        // Слушаем нажатия на удаление товара из корзины
        $('#1').on('click', function (event) {
            event.preventDefault();
            $('#goods').empty();
            buildGoodsList_1to6();
            $('.number_nav>a').css({color: '#c4c4c4'});
            $('#1').css({color: '#ef5b70'});
        });
        $('#2').on('click', function (event) {
            event.preventDefault();
            $('#goods').empty();
            $.ajax({
                url: 'http://localhost:3000/items?_page=2&_limit=6',
                dataType: 'json',
                success: function (cart) {
                    var $divItemPreview = $('<div />').attr('class', 'items_preview');


                    // Перебираем список товаров
                    cart.forEach(function (item) {
                        var $div = $('<div />').attr('class', 'item');
                        var $divPosition = $('<div />').attr('class', 'position_add_to_cart');
                        var $a = $('<a />').attr("href", "single_page.html");
                        var $aShop = $('<a />').attr("href", "#");
                        var $divImageItem = $('<div />').attr('class', 'img_items');
                        var $divPricePlace = $('<div />').attr('class', 'price_place');
                        var $nameItem = $('<H3 />');
                        var $price = $('<H4 />');
                        var $img = $('<img >');
                        var $imgShop = $('<img >').attr('src', 'img/Forma_cart_white.svg');
                        var $addToCart = $('<div >').attr('class', 'add_to_cart');
                        $addToCart.attr("data-id", item.id);
                        $addToCart.attr("data-name", item.name);
                        $addToCart.attr("data-price", item.price);
                        $addToCart.attr("data-imgurl", item.imgurl);
                        $div.attr('id', item.id);
                        $img.attr('src', item.imgurl);
                        $nameItem.text(item.name);
                        $price.text('$ ' + item.price);

                        // Добавляем все в dom

                        $divItemPreview.append($div);


                        $div.append($a);
                        $a.append($divImageItem);
                        $a.append($divPricePlace);
                        $divImageItem.append($img);
                        $divPricePlace.append($nameItem);
                        $divPricePlace.append($price);
                        $div.append($divPosition);
                        $divPosition.append($addToCart);
                        $addToCart.append($aShop);
                        $aShop.text('Add to Cart');
                        $aShop.prepend($imgShop);
                    });
                    // Добавляем все в dom
                    $('#goods').append($divItemPreview);

                }
            });
            $('.number_nav>a').css({color: '#c4c4c4'});
            $('#2').css({color: '#ef5b70'});
        });
        $('#3').on('click', function (event) {
            event.preventDefault();
            $('#goods').empty();
            $.ajax({
                url: 'http://localhost:3000/items?_page=3&_limit=6',
                dataType: 'json',
                success: function (cart) {
                    var $divItemPreview = $('<div />').attr('class', 'items_preview');


                    // Перебираем список товаров
                    cart.forEach(function (item) {
                        var $div = $('<div />').attr('class', 'item');
                        var $divPosition = $('<div />').attr('class', 'position_add_to_cart');
                        var $a = $('<a />').attr("href", "single_page.html");
                        var $aShop = $('<a />').attr("href", "#");
                        var $divImageItem = $('<div />').attr('class', 'img_items');
                        var $divPricePlace = $('<div />').attr('class', 'price_place');
                        var $nameItem = $('<H3 />');
                        var $price = $('<H4 />');
                        var $img = $('<img >');
                        var $imgShop = $('<img >').attr('src', 'img/Forma_cart_white.svg');
                        var $addToCart = $('<div >').attr('class', 'add_to_cart');
                        $addToCart.attr("data-id", item.id);
                        $addToCart.attr("data-name", item.name);
                        $addToCart.attr("data-price", item.price);
                        $addToCart.attr("data-imgurl", item.imgurl);
                        $div.attr('id', item.id);
                        $img.attr('src', item.imgurl);
                        $nameItem.text(item.name);
                        $price.text('$ ' + item.price);

                        // Добавляем все в dom

                        $divItemPreview.append($div);


                        $div.append($a);
                        $a.append($divImageItem);
                        $a.append($divPricePlace);
                        $divImageItem.append($img);
                        $divPricePlace.append($nameItem);
                        $divPricePlace.append($price);
                        $div.append($divPosition);
                        $divPosition.append($addToCart);
                        $addToCart.append($aShop);
                        $aShop.text('Add to Cart');
                        $aShop.prepend($imgShop);
                    });
                    // Добавляем все в dom
                    $('#goods').append($divItemPreview);

                }
            });
            $('.number_nav>a').css({color: '#c4c4c4'});
            $('#3').css({color: '#ef5b70'});

        });
        $('#4').on('click', function (event) {
            event.preventDefault();
            $('#goods').empty();
            $.ajax({
                url: 'http://localhost:3000/items?_page=4&_limit=6',
                dataType: 'json',
                success: function (cart) {
                    var $divItemPreview = $('<div />').attr('class', 'items_preview');


                    // Перебираем список товаров
                    cart.forEach(function (item) {
                        var $div = $('<div />').attr('class', 'item');
                        var $divPosition = $('<div />').attr('class', 'position_add_to_cart');
                        var $a = $('<a />').attr("href", "single_page.html");
                        var $aShop = $('<a />').attr("href", "#");
                        var $divImageItem = $('<div />').attr('class', 'img_items');
                        var $divPricePlace = $('<div />').attr('class', 'price_place');
                        var $nameItem = $('<H3 />');
                        var $price = $('<H4 />');
                        var $img = $('<img >');
                        var $imgShop = $('<img >').attr('src', 'img/Forma_cart_white.svg');
                        var $addToCart = $('<div >').attr('class', 'add_to_cart');
                        $addToCart.attr("data-id", item.id);
                        $addToCart.attr("data-name", item.name);
                        $addToCart.attr("data-price", item.price);
                        $addToCart.attr("data-imgurl", item.imgurl);
                        $div.attr('id', item.id);
                        $img.attr('src', item.imgurl);
                        $nameItem.text(item.name);
                        $price.text('$ ' + item.price);

                        // Добавляем все в dom

                        $divItemPreview.append($div);


                        $div.append($a);
                        $a.append($divImageItem);
                        $a.append($divPricePlace);
                        $divImageItem.append($img);
                        $divPricePlace.append($nameItem);
                        $divPricePlace.append($price);
                        $div.append($divPosition);
                        $divPosition.append($addToCart);
                        $addToCart.append($aShop);
                        $aShop.text('Add to Cart');
                        $aShop.prepend($imgShop);
                    });
                    // Добавляем все в dom
                    $('#goods').append($divItemPreview);

                }
            });
            $('.number_nav>a').css({color: '#c4c4c4'});
            $('#4').css({color: '#ef5b70'});
        });
        $('#5').on('click', function (event) {
            event.preventDefault();
            $('#goods').empty();
            $.ajax({
                url: 'http://localhost:3000/items?_page=5&_limit=6',
                dataType: 'json',
                success: function (cart) {
                    var $divItemPreview = $('<div />').attr('class', 'items_preview');


                    // Перебираем список товаров
                    cart.forEach(function (item) {
                        var $div = $('<div />').attr('class', 'item');
                        var $divPosition = $('<div />').attr('class', 'position_add_to_cart');
                        var $a = $('<a />').attr("href", "single_page.html");
                        var $aShop = $('<a />').attr("href", "#");
                        var $divImageItem = $('<div />').attr('class', 'img_items');
                        var $divPricePlace = $('<div />').attr('class', 'price_place');
                        var $nameItem = $('<H3 />');
                        var $price = $('<H4 />');
                        var $img = $('<img >');
                        var $imgShop = $('<img >').attr('src', 'img/Forma_cart_white.svg');
                        var $addToCart = $('<div >').attr('class', 'add_to_cart');
                        $addToCart.attr("data-id", item.id);
                        $addToCart.attr("data-name", item.name);
                        $addToCart.attr("data-price", item.price);
                        $addToCart.attr("data-imgurl", item.imgurl);
                        $div.attr('id', item.id);
                        $img.attr('src', item.imgurl);
                        $nameItem.text(item.name);
                        $price.text('$ ' + item.price);

                        // Добавляем все в dom

                        $divItemPreview.append($div);


                        $div.append($a);
                        $a.append($divImageItem);
                        $a.append($divPricePlace);
                        $divImageItem.append($img);
                        $divPricePlace.append($nameItem);
                        $divPricePlace.append($price);
                        $div.append($divPosition);
                        $divPosition.append($addToCart);
                        $addToCart.append($aShop);
                        $aShop.text('Add to Cart');
                        $aShop.prepend($imgShop);
                    });
                    // Добавляем все в dom
                    $('#goods').append($divItemPreview);

                }
            });
            $('.number_nav>a').css({color: '#c4c4c4'});
            $('#5').css({color: '#ef5b70'});
        });
        $('#6').on('click', function (event) {
            event.preventDefault();
            $('#goods').empty();
            $.ajax({
                url: 'http://localhost:3000/items?_page=6&_limit=6',
                dataType: 'json',
                success: function (cart) {
                    var $divItemPreview = $('<div />').attr('class', 'items_preview');


                    // Перебираем список товаров
                    cart.forEach(function (item) {
                        var $div = $('<div />').attr('class', 'item');
                        var $divPosition = $('<div />').attr('class', 'position_add_to_cart');
                        var $a = $('<a />').attr("href", "single_page.html");
                        var $aShop = $('<a />').attr("href", "#");
                        var $divImageItem = $('<div />').attr('class', 'img_items');
                        var $divPricePlace = $('<div />').attr('class', 'price_place');
                        var $nameItem = $('<H3 />');
                        var $price = $('<H4 />');
                        var $img = $('<img >');
                        var $imgShop = $('<img >').attr('src', 'img/Forma_cart_white.svg');
                        var $addToCart = $('<div >').attr('class', 'add_to_cart');
                        $addToCart.attr("data-id", item.id);
                        $addToCart.attr("data-name", item.name);
                        $addToCart.attr("data-price", item.price);
                        $addToCart.attr("data-imgurl", item.imgurl);
                        $div.attr('id', item.id);
                        $img.attr('src', item.imgurl);
                        $nameItem.text(item.name);
                        $price.text('$ ' + item.price);

                        // Добавляем все в dom

                        $divItemPreview.append($div);


                        $div.append($a);
                        $a.append($divImageItem);
                        $a.append($divPricePlace);
                        $divImageItem.append($img);
                        $divPricePlace.append($nameItem);
                        $divPricePlace.append($price);
                        $div.append($divPosition);
                        $divPosition.append($addToCart);
                        $addToCart.append($aShop);
                        $aShop.text('Add to Cart');
                        $aShop.prepend($imgShop);
                    });
                    // Добавляем все в dom
                    $('#goods').append($divItemPreview);

                }
            });
            $('.number_nav>a').css({color: '#c4c4c4'});
            $('#6').css({color: '#ef5b70'});
        });
        $('#view_all').on('click', function (event) {
            event.preventDefault();
            $('#goods').empty();
            $.ajax({
                url: 'http://localhost:3000/items',
                dataType: 'json',
                success: function (cart) {
                    var $divItemPreview = $('<div />').attr('class', 'items_preview');


                    // Перебираем список товаров
                    cart.forEach(function (item) {
                        var $div = $('<div />').attr('class', 'item');
                        var $divPosition = $('<div />').attr('class', 'position_add_to_cart');
                        var $a = $('<a />').attr("href", "single_page.html");
                        var $aShop = $('<a />').attr("href", "#");
                        var $divImageItem = $('<div />').attr('class', 'img_items');
                        var $divPricePlace = $('<div />').attr('class', 'price_place');
                        var $nameItem = $('<H3 />');
                        var $price = $('<H4 />');
                        var $img = $('<img >');
                        var $imgShop = $('<img >').attr('src', 'img/Forma_cart_white.svg');
                        var $addToCart = $('<div >').attr('class', 'add_to_cart');
                        $addToCart.attr("data-id", item.id);
                        $addToCart.attr("data-name", item.name);
                        $addToCart.attr("data-price", item.price);
                        $addToCart.attr("data-imgurl", item.imgurl);
                        $div.attr('id', item.id);
                        $img.attr('src', item.imgurl);
                        $nameItem.text(item.name);
                        $price.text('$ ' + item.price);

                        // Добавляем все в dom

                        $divItemPreview.append($div);


                        $div.append($a);
                        $a.append($divImageItem);
                        $a.append($divPricePlace);
                        $divImageItem.append($img);
                        $divPricePlace.append($nameItem);
                        $divPricePlace.append($price);
                        $div.append($divPosition);
                        $divPosition.append($addToCart);
                        $addToCart.append($aShop);
                        $aShop.text('Add to Cart');
                        $aShop.prepend($imgShop);
                    });
                    // Добавляем все в dom
                    $('#goods').append($divItemPreview);

                }
            });
        });
        $('#cart').on('click', '.delete', function (event) {
            event.preventDefault();
            // Получаем id товара, который пользователь хочет удалить
            var id = $(this).attr('data-id');
            // Отправляем запрос на удаление
            $.ajax({
                url: 'http://localhost:3000/cart/' + id,
                type: 'DELETE',
                success: function () {
                    // Перерисовываем корзины
                    buildCart();
                }
            })
        });
        // Слушаем нажатия на удаление товара из корзины на странице корзины
        $('#itemInCart').on('click', '.deleteSC', function (event) {
            event.preventDefault();
            // Получаем id товара, который пользователь хочет удалить
            var id = $(this).attr('data-id');
            // Отправляем запрос на удаление
            $.ajax({
                url: 'http://localhost:3000/cart/' + id,
                type: 'DELETE',
                success: function () {
                    // Перерисовываем корзины
                    buildCart();
                }
            });
            location.reload(true);
        });
        // Слушаем нажатия на кнопку Купить
        $('#goods').on('click', '.add_to_cart', function (event) {
            event.preventDefault();
            // Определяем id товара, который пользователь хочет удалить
            var id = $(this).attr('data-id');
            // Пробуем найти такой товар в карзине
            var entity = $('#cart [data-id="' + id + '"]');
            var price = +$(this).attr('data-price');
            var quant = +$(entity).attr('data-quantity') + 1;
            if (entity.length) {
                // Товар в корзине есть, отправляем запрос на увеличение количества
                $.ajax({
                    url: 'http://localhost:3000/cart/' + id,
                    type: 'PATCH',
                    headers: {
                        'content-type': 'application/json',
                    },
                    data: JSON.stringify({
                        quantity: +$(entity).attr('data-quantity') + 1,
                        subtotal: +quant * price
                    }),
                    success: function () {
                        // Перестраиваем корзину
                        buildCart();
                    }
                })
            } else {
                // Товара в корзине нет - создаем в количестве 1
                $.ajax({
                    url: 'http://localhost:3000/cart',
                    type: 'POST',
                    headers: {
                        'content-type': 'application/json',
                    },
                    data: JSON.stringify({
                        id: id,
                        quantity: 1,
                        name: $(this).attr('data-name'),
                        price: $(this).attr('data-price'),
                        imgurl: $(this).attr('data-imgurl'),
                        subtotal: $(this).attr('data-price'),
                    }),
                    success: function () {
                        // Перерисовываем корзину
                        buildCart();
                    }
                })
            }
        });
        $('#goods_main').on('click', '.add_to_cart', function (event) {
            event.preventDefault();
            // Определяем id товара, который пользователь хочет удалить
            var id = $(this).attr('data-id');
            // Пробуем найти такой товар в карзине
            var entity = $('#cart [data-id="' + id + '"]');
            var price = +$(this).attr('data-price');
            var quant = +$(entity).attr('data-quantity') + 1;
            if (entity.length) {
                // Товар в корзине есть, отправляем запрос на увеличение количества
                $.ajax({
                    url: 'http://localhost:3000/cart/' + id,
                    type: 'PATCH',
                    headers: {
                        'content-type': 'application/json',
                    },
                    data: JSON.stringify({
                        quantity: +$(entity).attr('data-quantity') + 1,
                        subtotal: +quant * price
                    }),
                    success: function () {
                        // Перестраиваем корзину
                        buildCart();
                    }
                })
            } else {
                // Товара в корзине нет - создаем в количестве 1
                $.ajax({
                    url: 'http://localhost:3000/cart',
                    type: 'POST',
                    headers: {
                        'content-type': 'application/json',
                    },
                    data: JSON.stringify({
                        id: id,
                        quantity: 1,
                        name: $(this).attr('data-name'),
                        price: $(this).attr('data-price'),
                        imgurl: $(this).attr('data-imgurl'),
                        subtotal: $(this).attr('data-price'),
                    }),
                    success: function () {
                        // Перерисовываем корзину
                        buildCart();
                    }
                })
            }
        });
        $('#you_may').on('click', '.add_to_cart', function (event) {
            event.preventDefault();
            // Определяем id товара, который пользователь хочет удалить
            var id = $(this).attr('data-id');
            // Пробуем найти такой товар в карзине
            var entity = $('#cart [data-id="' + id + '"]');
            var price = +$(this).attr('data-price');
            var quant = +$(entity).attr('data-quantity') + 1;
            if (entity.length) {
                // Товар в корзине есть, отправляем запрос на увеличение количества
                $.ajax({
                    url: 'http://localhost:3000/cart/' + id,
                    type: 'PATCH',
                    headers: {
                        'content-type': 'application/json',
                    },
                    data: JSON.stringify({
                        quantity: +$(entity).attr('data-quantity') + 1,
                        subtotal: +quant * price
                    }),
                    success: function () {
                        // Перестраиваем корзину
                        buildCart();
                    }
                })
            } else {
                // Товара в корзине нет - создаем в количестве 1
                $.ajax({
                    url: 'http://localhost:3000/cart',
                    type: 'POST',
                    headers: {
                        'content-type': 'application/json',
                    },
                    data: JSON.stringify({
                        id: id,
                        quantity: 1,
                        name: $(this).attr('data-name'),
                        price: $(this).attr('data-price'),
                        imgurl: $(this).attr('data-imgurl'),
                        subtotal: $(this).attr('data-price'),
                    }),
                    success: function () {
                        // Перерисовываем корзину
                        buildCart();
                    }
                })
            }
        });
        // Слушаем нажатия на кнопку изменения количества
        $('#itemInCart').on('change', '.quantity_in_cart', function (event) {
            event.preventDefault();
            // Определяем id товара, который пользователь хочет удалить
            var id = $(this).attr('data-id');
            // Пробуем найти такой товар в карзине
            var entity = $('#cart [data-id="' + id + '"]');
            var price = +$(this).attr('data-price');
            var quant = +$(this).val();
            var $itemSubtotal = quant * price;
            if (entity.length) {
                // Товар в корзине есть, отправляем запрос на увеличение количества
                $.ajax({
                    url: 'http://localhost:3000/cart/' + id,
                    type: 'PATCH',
                    headers: {
                        'content-type': 'application/json',
                    },
                    data: JSON.stringify({
                        quantity: quant,
                        subtotal: +quant * price
                    }),
                    success: function () {
                        $('#itemInCart').empty();
                        // не работает $(this).parent().parent().find('.subtotal').text($itemSubtotal);
                        // Перестраиваем корзину
                        buildCart();

                    }
                });
            } else {
                console.log("елсе сработал")
            }
            //location.reload(true)
        });
        $('#clear_cart').on('click', function (event) {
            event.preventDefault();
            $.ajax({
                url: 'http://localhost:3000/cart',
                dataType: 'json',
                success: function (cart) {
                    cart.forEach(function (item) {
                        if (item.id) {
                            $.ajax({
                                url: 'http://localhost:3000/cart/' + item.id,
                                type: 'DELETE',
                                success: function () {
                                    // Перерисовываем корзины
                                    console.log(item.id);
                                    buildCart();
                                }
                            })
                        }
                    });
                    location.reload(true)
                }
            });
            // Отправляем запрос на удаление

        })

    });
})(jQuery);
//    color: #ef5b70