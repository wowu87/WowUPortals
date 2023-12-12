<?php

return [

    'success' => [
        'added'             => ':type добавен!',
        'created'			=> ':type създаден!',
        'updated'           => ':type променен!',
        'deleted'           => ':type е изтрит/а!',
        'duplicated'        => ':type дублиран!',
        'imported'          => ':type импортиран!',
        'import_queued'     => ':type импортиране е насрочено! Ще получите имейл, когато приключи.',
        'exported'          => ':type е експортиран!',
        'export_queued'     => ':type експортиране на текущата страница е насрочено! Ще получите имейл, когато е готово за изтегляне.',
        'enabled'           => ':type включен!',
        'disabled'          => ':type изключен!',
        'connected'         => ':type свързан!',
        'invited'           => ':type поканен!',
        'ended'             => ':type приключил!',

        'clear_all'         => 'Страхотно! Изчистихте всичките си :type.',
    ],

    'error' => [
        'over_payment'      => 'Грешка: Плащането не е добавено! Сумата, която сте въвели минава общо: :amount',
        'not_user_company'  => 'Грешка: Не ви е позволено да управлявате тази компания!',
        'customer'          => 'Грешка: Потребителят не е създаден! :name вече използва този имейл адрес.',
        'no_file'           => 'Грешка: Няма избран файл!',
        'last_category'     => 'Грешка: Не може да изтриете последния :type категория!',
        'transfer_category' => 'Грешка: Не може да изтриете :type категория!',
        'change_type'       => 'Грешка: Не може да променяте типа, защото има свързани :text!',
        'invalid_apikey'    => 'Грешка: Невалиден код!',
        'empty_apikey'      => 'Грешка: Не сте въвели своя API ключ! <a href=":url" class="font-bold underline underline-offset-4">Щракнете тук</a>, за да въведете вашия API ключ.',
        'import_column'     => 'Грешк: :message Sheet name: :sheet. Line number: :line.',
        'import_sheet'      => 'Грешка: Невалидно име. Моля, прегледайте примерния файл.',
        'same_amount'       => 'Грешка: Общата сума на разделянето трябва да е точно същата като :transaction: :amount',
        'over_match'        => 'Грешка: :type не е свързан! Сумата, която сте въвели, не може да надвишава общата сума на плащането: :amount',
    ],

    'warning' => [
        'deleted'           => 'Предупреждение: Не ви е позволено да изтриете <b>:name</b>, защото има :text свързан.',
        'disabled'          => 'Предупреждение: Не ви е позволено да деактивирате <b>:name</b>, защото има :text свързан.',
        'reconciled_tran'   => 'Внимание:  Промени/Изтриване на транзакцията не е позволено, защото транзакцията е съгласувана.',
        'reconciled_doc'    => 'Внимание: Промени/Изтриване не е позволено, защото същото има съгласувани транзакции.',
        'disable_code'      => 'Предупреждение: Не ви е позволено да деактивирате или променяте валутата на <b>:name</b>, защото има :text свързан.',
        'payment_cancel'    => 'Предупреждение: Премахнахте следния метод за плащане :method!',
        'missing_transfer'  => 'Предупреждение: Преводът, свързан с тази транзакция, липсва. Трябва да обмислите изтриването на тази транзакция.',
    ],

];
