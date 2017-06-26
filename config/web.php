<?php

$params = require(__DIR__ . '/params.php');
$db = require(__DIR__ . '/db.php');

$config = [
    'id' => 'basic',
    'basePath' => dirname(__DIR__),
    'bootstrap' => ['log'],
    'components' => [
        'request' => [
            // !!! insert a secret key in the following (if it is empty) - this is required by cookie validation
            'cookieValidationKey' => 'fWtbFXtHkSveX_EVgkGXCJDN0dzS71ww',
        ],
//        'cache' => [
//            'class' => 'yii\caching\FileCache',
//        ],
        'user' => [
            'identityClass' => 'app\models\BaseUser',
            'enableAutoLogin' => true,
        ],
        'errorHandler' => [
            'errorAction' => 'user/error',
        ],
        'mailer' => [
            'class' => 'yii\swiftmailer\Mailer',
            // send all mails to a file by default. You have to set
            // 'useFileTransport' to false and configure a transport
            // for the mailer to send real emails.
            'useFileTransport' => true,
        ],
        'log' => [
            'traceLevel' => YII_DEBUG ? 3 : 0,
            'targets' => [
                [
                    'class' => 'yii\log\FileTarget',
                    'levels' => ['error', 'warning', 'trace', 'info', 'profile'],
                ],
            ],
        ],
        'db' => $db,

        'urlManager' => [
            'enablePrettyUrl' => true,
            'showScriptName' => false,
            'enableStrictParsing' => true,
            'rules' => [
                ['class' => 'app\components\UserUrlRule', 'controller' => 'user'],
                [
                    'pattern' => 'api/user/list/<offset:\d+>/<limit:\d+>',
                    'route' => 'user/list',
                    'defaults' => ['offset' => 0, 'limit' => 10],
                ],
                [
                    'pattern' => 'api/user/get/<id:\d+>',
                    'route' => 'user/get-by-id',
                ],
                [
                    'pattern' => 'api/user/current-user',
                    'route' => 'user/current-user',
                ],
                [
                    'pattern' => 'api/user/login',
                    'route' => 'user/login',
                ],
                [
                    'pattern' => 'api/user/logout',
                    'route' => 'user/logout',
                ],
                [
                    'pattern' => 'api/user/create',
                    'route' => 'user/create',
                ],
                [
                    'pattern' => 'api/user/update',
                    'route' => 'user/update',
                ],
                [
                    'pattern' => 'api/user/delete',
                    'route' => 'user/delete',
                ],
            ],
        ],


    ],
    'params' => $params,
];

if (YII_ENV_DEV) {
    // configuration adjustments for 'dev' environment
    $config['bootstrap'][] = 'debug';
    $config['modules']['debug'] = [
        'class' => 'yii\debug\Module',
        // uncomment the following to add your IP if you are not connecting from localhost.
        //'allowedIPs' => ['127.0.0.1', '::1'],
    ];

    $config['bootstrap'][] = 'gii';
    $config['modules']['gii'] = [
        'class' => 'yii\gii\Module',
        // uncomment the following to add your IP if you are not connecting from localhost.
        //'allowedIPs' => ['127.0.0.1', '::1'],
    ];
}

return $config;
