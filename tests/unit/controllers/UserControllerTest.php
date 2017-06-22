<?php

namespace tests\controller;

use app\controllers\UserController;

class UsersTest extends \Codeception\Test\Unit{

    function __construct()
    {
        parent::__construct();
        session_start();
    }


}