/** @requires BEM */
/** @requires BEM.DOM */

(function(undefined) {
    BEM.DOM.decl('b-content', {
        onSetMod : {
            'js' : function() {
                var bemThis = this;
                cards = new Array();
                player = [];
                count = '';
                stek = [];


                function shuffle(a) { // перетасовка массива
                    var d,
                        c,
                        b = a.length;
                    while (b) {
                        c = Math.floor(Math.random() * b);
                        d = a[--b];
                        a[b] = a[c];
                        a[c] = d;
                    }
                    return a;
                }

                function compare(deck){
                    var n = 0;
                    var j = []; // массив значаний индексов игроков с равными значениями карт
                    if (deck.length == count){
                        for (var i = 0; i < deck.length; i++){
                            bemThis.delMod(bemThis.elem('card').eq(i), 'suit');
                            bemThis.delMod(bemThis.elem('card').eq(i), 'heft');
                            bemThis.delMod(bemThis.elem('card').eq(i), 'state');
                            bemThis.elem('card').eq(i).html('');
                            if (deck[i].heft == 0){
                                bemThis.setMod(bemThis.elem('card').eq(i), 'state', 'disabled');
                            } else {
                                bemThis.setMod(bemThis.elem('card').eq(i), 'suit', deck[i].suit);
                                bemThis.setMod(bemThis.elem('card').eq(i), 'heft', deck[i].heft);
                            }
                            if (n < deck[i].heft){ // находим максимальное значение карты
                                n = deck[i].heft;
                            }
                            stek.push(deck[i]);
                        }
                        for (var i = 0; i < deck.length; i++){
                            if ( n == deck[i].heft) {
                                j.push(i); // собираем индексы игроков с картами максимального веса
                            }
                        }
                        for(var i = 0; i < count; i++){
                            if (player[i].length == 51){
                                alert('Игрок №'+(i+1)+' выиграл');
                            }
                        }
                        if (j.length == 1){
                            shuffle(stek);
                            while(s = stek.shift()){
                                if (s.heft != 0){
                                    player[j[0]].push(s);
                                }
                            }
                        } else {
                            var comp = [];
                            for (var i = 0; i < j.length; i++){
                                bemThis.setMod(bemThis.elem('card').eq(j[i]), 'state', 'war');
                                if (player[j[i]].length != 0){
                                    stek.push(player[j[i]].shift()); // кладем по одной карте спорящих "рубашкой" вверх
                                }
                                if (player[j[i]].length == 0){ // создаем массив спорящих
                                    player[j[i]].heft = 0;
                                    player[j[i]].suit = '';
                                    comp.push(player[j[i]]);
                                } else {
                                    comp.push(player[j[i]].shift());
                                }
                            }
                            compare(comp);
                        }
                    } else {
                        for (var i = 0; i < deck.length; i++){
                            var arr = bemThis.elem('card', 'state', 'war');
                            var list = arr.eq(i);
                            var item = document.createElement('div');
                            item.className = 'b-content__war';
                            list.append(item);
                            if (deck[i].heft == 0){
                                $('.b-content__war').eq(i).addClass('b-content__war_state_disabled');
                            } else {
                                $('.b-content__war').eq(i).addClass('b-content__war_suit_'+deck[i].suit).addClass('b-content__war_heft_'+deck[i].heft);
                            }
                            if (n < deck[i].heft){ // находим максимальное значение карты
                                n = deck[i].heft;
                            }
                            stek.push(deck[i]);
                        }
                        for (var i = 0; i < deck.length; i++){
                            var arr = bemThis.elem('card', 'state', 'war');
                            var index = $(arr[i]).index('.b-content__card');
                            if ( n == deck[i].heft) {
                                j.push(index); // собираем индексы игроков с картами максимального веса
                            }
                        }
                        if (j.length == 1){
                            shuffle(stek);
                            while(s = stek.shift()){
                                if (s.heft != 0){
                                    player[j[0]].push(s);
                                }
                            }
                        } else {
                            alert('Спор внутри спора. Данную ситуацию обработать не успел.');
                            // var comp = [];
                            // for (var i = 0; i < j.length; i++){
                            //     bemThis.setMod(bemThis.elem('card').eq(j[i]), 'state', 'war');
                            //     if (player[j[i]].length != 0){
                            //         stek.push(player[j[i]].shift()); // кладем по одной карте спорящих "рубашкой" вверх
                            //     }
                            //     if (player[j[i]].length == 0){ // создаем массив спорящих
                            //         player[j[i]].heft = 0;
                            //         player[j[i]].suit = '';
                            //         comp.push(player[j[i]]);
                            //     } else {
                            //         comp.push(player[j[i]].shift());
                            //     }
                            // }
                            // compare(comp);
                        }
                    }
                }

                function getCardsFromDeck(){ // собираем массив, состоящий из первых карт у каждого игрока
                    var comp = [];
                    for (var i = 0; i < count; i++){
                        if (player[i].length == 0){
                            player[i].heft = 0;
                            player[i].suit = '';
                            comp.push(player[i]);
                        } else {
                            comp.push(player[i].shift());
                        }

                    }
                    compare(comp);
                }

                bemThis.elem('link').click(function(e){
                    e.preventDefault();
                    count = parseInt(bemThis.findBlockInside('b-form-control').elem('input').val());
                    if (isNaN(count)) {
                        count = 4;
                    }
                    if (count < 2) {
                        count = 2;
                    }
                    if (count > 13) {
                        count = 13;
                    }
                    bemThis.findBlockInside('b-form-control').elem('input').val(count);

                    // заполняем массив картами
                    for (var i = 0; i < 4; i++){
                        for (var j = 0; j < 13; j++){
                            cards[i*13 + j] = new Object();
                            cards[i*13 + j].heft = j+2;
                            if (i == 0){
                                cards[i*13 + j].suit = 'clubs';
                            }
                            if (i == 1){
                                cards[i*13 + j].suit = 'diamonds';
                            }
                            if (i == 2){
                                cards[i*13 + j].suit = 'spades';
                            }
                            if (i == 3){
                                cards[i*13 + j].suit = 'hearts';
                            }
                        }
                    }

                    // перемешиваем массив карт
                    shuffle(cards);

                    // раздаем карты на всех играков

                    for(var i = 0; i < count; i++){
                       player[i] = []; //создаем игроков
                    }

                    var deck = Math.floor(cards.length/count)+1;
                    for (var i = 0; i < deck; i++){
                        for (var j = 0; j < count; j++){
                            c = cards.shift()
                            if(c != undefined){
                                player[j].push(c); //раздаем карты игрокам
                            }
                        }
                    }

                    // добавляем элементы на поле
                    var list = bemThis.elem('main');
                    list = list.html('');
                    for (var i = 0; i < count; i++){
                        var item = document.createElement('div');
                        item.className = 'b-content__card';
                        list.append(item);
                    }

                    $('.b-content__card').addClass('i-inline');
                });

                bemThis.elem('main').click(function(e){
                    e.preventDefault();
                    getCardsFromDeck();
                });

            }


        }
    });
})();
