({
    block: 'b-page',
    'x-ua-compatible': false,
    title: 'Карточная игра "Пьяница"',
    head: [
        { elem: 'js', url: '../../js/jquery-1.10.0.min.js'},
        { elem: 'css', url: '../merged/merged.css'}
    ],
    content: [
        {
            block: 'b-content',
            content: [
                {
                    elem: 'header',
                    content: [
                        {
                            block: 'b-form-control',
                            mods: {type: 'text'},
                            cls: 'i-inline',
                            help: '(2..13)',
                            label: 'Количество игроков: ',
                            placeholder: '4'
                        },
                        {
                            block: 'b-link',
                            mix: {block: 'b-content', elem: 'link'},
                            cls: 'i-btn',
                            url: '#',
                            content: 'Сдать карты'
                        }
                    ]
                },
                {
                    elem: 'main'
                },
                {
                    elem: 'footer'
                }
            ]
        },
        {
            block: 'b-footer',
            content: 'Нажмите на игровое поле, чтобы осуществить следующий ход!!!'
        },
        {
            block: 'b-scripts',
            content: [
                { elem: 'js', url:'../merged/_merged.js'}
            ]
        }
    ]
})
