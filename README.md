Install
============================

1) composer install
2) npm install
3) Обновляем файл httpd-vhosts.conf
    SITE_DIR - заменить на папку с сайтами (проектами) 
    
```apacheconfig
<VirtualHost *:80>
    ServerAdmin admin
    DocumentRoot "SITE_DIR/user_list/web/"
    ServerName user_list
    <Directory "SITE_DIR/user_list/web/">
        Options Indexes FollowSymLinks Includes execCGI
        AllowOverride All
        Require all granted
        RewriteEngine On
        RewriteCond %{SCRIPT_FILENAME} !-d
        RewriteCond %{SCRIPT_FILENAME} !-f
        RewriteRule ^(.*)$ ./index.php?route=$1
    </Directory>
</VirtualHost>
```

4) Прописываем hosts

    127.0.0.1 user_list
    
5) Создаем бузу данных user_list
6) php yii migrate
7) Для тестов создаем базу тестов user_list_test и импортируем туда файл /migrations/db_test.sql
8) Перезапуск apache
9) В консоли выставляем права


```bash
    chmod 0777 -R ./
```

10) Заходим на [http://user_list/](http://user_list/)
11) login: admin password: 12345
12) Для backed тестов запускаеи unit_test.sh
13) Для фронтенд тестов запускаем npm test