<?php

    $clientname = $_POST['clientname'];
    $phone = $_POST['phone'];
    $street = $_POST['street'];
    $house = $_POST['house'];
    $housing = $_POST['housing'];
    $floor = $_POST['floor'];
    $message = $_POST['message'];
    $pay = $_POST['pay-choise'];
    $distrub = $_POST['dont-distrub'];
    $distrub  = isset($distrub) ? 'Нет' : 'Да';

    $mail_message = '
    <html>
        <head>
            <title>Заказ</title>
        </head>
        <body>
            <h2>Заказ</h2>
            <ul>
                <li>Имя: ' . $clientname . '</li>
                <li>Телефон: ' . $phone . '</li>
                <li>Улица: ' . $street . '</li>
                <li>Дом: ' . $house . '</li>
                <li>Корпус: ' . $housing . '</li>
                <li>Этаж: ' . $floor . '</li>
                <li>Комментарий: ' . $message . '</li>
                <li>Cпособ оплаты: ' . $pay . '</li>
                <li></li>
                <li></li>                
            </ul>
        </body>
    </html>
    ';

    echo $mail_message;