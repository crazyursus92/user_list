<?php

namespace tests\controller\user;

use app\controllers\user;
use app\controllers\UserController;
use app\models\Users;
use Yii;

class BaseControllerTest extends \Codeception\Test\Unit{

    function __construct()
    {
        parent::__construct();
        session_start();
    }

    public function testGetList(){
        $controller = new user\BaseController();
        $request = $this->getMockBuilder('yii\web\Request')->getMock();
        $request->method('get')->willReturnMap([
           'limit' => 10,
            'offset' => 0
        ]);
        $result = $controller->getList();
        $this->assertArrayHasKey('status', $result);
        $this->assertArrayHasKey('response', $result);
        $this->assertArrayHasKey('users', $result['response']);
        $this->assertArrayHasKey('count', $result['response']);
    }

    public function testLogin(){
        $controller = new user\BaseController();
        $request = $this->getMockBuilder('yii\web\Request')->getMock();
        $user = $this->getMockBuilder('app\models\Users')->getMock();
        $user->expects($this->any())->method('findOne')->will($this->returnValue(new Users(['username' => 'admin', 'password' => '12345', 'id' => 1])));
        $request->expects($this->any())->method('post')->will($this->returnCallback(function ($name){
            return $name === 'username' ? 'crazyursus' : '12345';
        }));
        Yii::$app->set('request', $request);
        $result = $controller->login();
        $this->assertArrayHasKey('user_id', $_SESSION);
        expect($_SESSION['user_id'])->notNull();
        $this->assertArrayHasKey('status', $result);
        $this->assertArrayHasKey('response', $result);
        expect($result['status'])->equals('success');
        expect($result['response']->id)->equals(1);
    }

    /**
     * @expectedException yii\web\NotFoundHttpException
     */
    public function testExceptionLoginUserNotFound(){
        $controller = new user\BaseController();
        $request = $this->getMockBuilder('yii\web\Request')->getMock();
        $user = $this->getMockBuilder('app\models\Users')->getMock();
        $user->method('findOne')->willReturn(null);
        $request->expects($this->any())->method('post')->will($this->returnCallback(function ($name){
            return $name === 'username' ? 'not_found_user' : '12345';
        }));
        Yii::$app->set('request', $request);
        $controller->login();
    }

    /**
     * @expectedException yii\web\NotFoundHttpException
     */
    public function testExceptionLoginPasswordFail(){
        $controller = new user\BaseController();
        $request = $this->getMockBuilder('yii\web\Request')->getMock();
        $user = $this->getMockBuilder('app\models\Users')->getMock();
        $user->method('findOne')->willReturn(new Users(['username' => 'admin', 'password' => '12345', 'id' => 1]));
        $request->expects($this->any())->method('post')->will($this->returnCallback(function ($name){
            return $name === 'username' ? 'crazyursus' : '1';
        }));
        $controller->login();

    }

    public function testLogout(){
        $controller = new user\BaseController();
        $request = $this->getMockBuilder('yii\web\Request')->getMock();
        $user = $this->getMockBuilder('app\models\Users')->getMock();
        $user->expects($this->any())->method('findOne')->will($this->returnValue(new Users(['username' => 'admin', 'password' => '12345', 'id' => 1])));
        $request->expects($this->any())->method('post')->will($this->returnCallback(function ($name){
            return $name === 'username' ? 'crazyursus' : '12345';
        }));
        Yii::$app->set('request', $request);
        $controller->login();
        $this->assertArrayHasKey('user_id', $_SESSION);
        expect($_SESSION['user_id'])->notNull();
        $controller->logout();
        expect($_SESSION['user_id'])->null();
    }
}