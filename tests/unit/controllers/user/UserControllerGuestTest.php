<?php


namespace tests\controller\user;

use app\controllers\user;
use Yii;


class UserControllerGuestTest extends \Codeception\Test\Unit
{

    /**
     * @expectedException yii\web\ForbiddenHttpException
     */
    public function testExceptionCreate(){
        $controller = new user\GuestController();
        $controller->create();
    }

    /**
     * @expectedException yii\web\ForbiddenHttpException
     */
    public function testExceptionUpdate(){
        $controller = new user\GuestController();
        $controller->update();
    }

    /**
     * @expectedException yii\web\ForbiddenHttpException
     */
    public function testExceptionGet(){
        $controller = new user\GuestController();
        $controller->getById();
    }

    /**
     * @expectedException yii\web\ForbiddenHttpException
     */
    public function testExceptionList(){
        $controller = new user\GuestController();
        $controller->getList();
    }

    /**
     * @expectedException yii\web\ForbiddenHttpException
     */
    public function testExceptionDelete(){
        $controller = new user\GuestController();
        $controller->delete();
    }

//    public function testLogin(){
//
//        $request = $this->getMockBuilder('yii\web\Request')->getMock();
//        $request->method('post')->willReturnMap([
//            'username' => 'crazyursus',
//            'password' => 12345
//        ]);
//        $controller = new user\GuestController();
//      //  $controller->login();
//        expect($_SESSION['user_id'])->notNull();
//    }

    public function testLogout(){
        $_SESSION['user_id'] = 1;
        $controller = new user\GuestController();
        $controller->logout();
        expect($_SESSION['user_id'])->null();
    }
}