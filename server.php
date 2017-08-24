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
                <li>Квартира: ' . $flat . '</li>
                <li>Этаж: ' . $floor . '</li>                
                <li>Комментарий: ' . $message . '</li>
                <li>Cпособ оплаты: ' . $pay . '</li>
                <li>Нужно ли перезванивать клиенту: ' . $distrub . '</li>                
            </ul>
        </body>
    </html>
    ';

    $headers = "From: Администратор сайта <garipov.niiaz@gmail.com>\r\n".
    "MIME-Version: 1.0" . "\r\n" .
    "Content-type: text/html; charset=UTF-8" . "\r\n";
    
    $mail = mail('garipov.niiaz@gmail.com', 'Заказ', $mail_message, $headers);
    $data = [];
    
    if ($mail) {
        $data['status'] = "OK";
        $data['mes'] = "Письмо успешно отправлено";
    }else{
        $data['status'] = "NO";
        $data['mes'] = "На сервере произошла ошибка";
    }
    echo json_encode($data);
?>