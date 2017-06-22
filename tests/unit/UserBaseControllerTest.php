<?php

use app\controllers\user\BaseController;

class UserBaseControllerTest extends \Codeception\Test\Unit
{

    use \Codeception\Specify;
    /**
     * @var \UnitTester
     */
    protected $tester;

    protected function _before()
    {

    }

    protected function _after()
    {
    }

    // tests
    public function testCreate()
    {
        $this->specify('if not validate return error', function () {
            $controller = new BaseController();
            $result = $controller->create();
            $this->assertArrayHasKey('status', $result);
            $this->assertArrayHasKey('response', $result);
            expect($result['status'])->equals('error');
        });

        $this->specify('user created', function () {
            $controller = new BaseController();
            $this->mockRequest('post', [
                'username' => 'new_uniq_user',
                'first_name' => 'Ivan',
                'last_name' => 'Ivanov',
                'password' => '12345',
                'type' => 1
            ]);
            $result = $controller->create();
            $this->assertArrayHasKey('status', $result);
            $this->assertArrayHasKey('response', $result);
            expect($result['status'])->equals('success');
            expect($result['response']->username)->equals('new_uniq_user');
        });
    }

    public function testUpdate(){
        $this->specify('user id not found', function(){
            $controller = new BaseController();
            try{
                $controller->update();
            }catch (\yii\web\BadRequestHttpException $e){
                expect($e->statusCode)->equals(400);
            }
        });

        $this->specify('user not found', function(){
           $controller = new BaseController();
           $this->mockRequest('post', 666);
           try{
               $controller->update();
           }catch (\yii\web\NotFoundHttpException $e){
               expect($e->statusCode)->equals(404);
           }
        });

        $this->specify('no valid user', function (){
           $controller = new BaseController();
           //TODO убрать логику из теста
           $this->mockRequestCallback('post', function($name){

               $post = [
                   'id' => 1,
                   'username' => 'admin',
                    'password' => ''
               ];
               if(!$name){
                   return $post;
               }
               return isset($post[$name]) ? $post[$name] : 'str';
           });

           $result = $controller->update();
           $this->assertArrayHasKey('response', $result);
           $this->assertArrayHasKey('status', $result);
           expect($result['status'])->equals('error');

        });

        $this->specify('user updated', function(){
           $controller = new BaseController();
           $this->mockRequestCallback('post', function($name){
              $post = [
                  'id' => 1,
                  'username' => 'crazyursus',
                  'first_name' => 'Petr',
                  'last_name' => 'Ivanov',
                  'password' => '12345',
                  'type' => 2
              ];
              if(!$name){
                  return $post;
              }
              return $post[$name];
           });

           $result = $controller->update();
            $this->assertArrayHasKey('response', $result);
            $this->assertArrayHasKey('status', $result);
            expect($result['status'])->equals('success');
            expect($result['response']->first_name)->equals('Petr');
            $user = \app\models\Users::findOne(1);
            expect($user->first_name)->equals('Petr');
        });
    }

    public function testDelete()
    {

        $this->specify('delete id equal current user id', function () {
            $controller = new BaseController();
            $_SESSION['user_id'] = 1;
            $this->mockRequest('post', 1);
            try {
                $controller->delete();
            } catch (yii\web\BadRequestHttpException $e) {
                expect($e->statusCode)->equals(400);
            }
        });

        $this->specify('id is not define', function () {
            $controller = new BaseController();
            $_SESSION['user_id'] = 1;
            try {
                $controller->delete();
            } catch (yii\web\BadRequestHttpException $e) {
                expect($e->statusCode)->equals(400);
            }
        });

        $this->specify('user not found', function () {
            $controller = new BaseController();
            $_SESSION['user_id'] = 1;
            $this->mockRequest('post', 1231);
            try {
                $controller->delete();
            } catch (yii\web\NotFoundHttpException $e) {
                expect($e->statusCode)->equals(404);
            }
        });


        $this->specify('user deleted', function () {
            $controller = new BaseController();
            $_SESSION['user_id'] = 1;
            $this->mockRequest('post', 2);
            $result = $controller->delete();
            $this->assertArrayHasKey('status', $result);
            $this->assertArrayHasKey('response', $result);
            expect($result['status'])->equals('success');
            expect($result['response'])->true();
        });
    }

    public function testGetById()
    {
        $this->specify('not post param user id', function () {
            $controller = new BaseController();
            try {
                $controller->getById();
            } catch (\yii\web\BadRequestHttpException $e) {
                expect($e->statusCode)->equals(400);
            }
        });

        $this->specify('user not found', function () {
            $controller = new BaseController();
            $this->mockRequest('get', 1000);
            try {
                $controller->getById();
            } catch (\yii\web\NotFoundHttpException $e) {
                expect($e->statusCode)->equals(404);
            }
        });

        $this->specify('user received', function () {
            $controller = new BaseController();
            $this->mockRequest('get', 1);
            $result = $controller->getById();
            $this->assertArrayHasKey('status', $result);
            $this->assertArrayHasKey('response', $result);
            expect($result['status'])->equals('success');
            expect($result['response']->id)->equals(1);
        });
    }

    public function testGetList()
    {
        $this->specify('return values', function () {
            $controller = new BaseController();
            $this->mockRequest('get', 10);
            $result = $controller->getList();
            $this->assertArrayHasKey('status', $result);
            $this->assertArrayHasKey('response', $result);
            expect($result['status'])->equals('success');
            $this->assertArrayHasKey('count', $result['response']);
            $this->assertArrayHasKey('users', $result['response']);
            expect($result['response']['users'])->count(10);
        });


        $this->specify('limit and offset working', function(){
           $controller = new BaseController();
           $this->mockRequestCallback('get', function($name){
              return $name === 'limit' ? 5 : 30;
           });
           $result = $controller->getList();
           expect($result['response']['users'])->count(5);
        });
    }

    public function testLogin(){

        $this->specify('user not found', function(){
           $controller = new BaseController();
           try{
               $controller->login();
           }catch (\yii\web\NotFoundHttpException $e){
               expect($e->statusCode)->equals(404);
           }
        });

        $this->specify('password fail', function(){
           $container = new BaseController();
           $this->mockRequestCallback('post', function($name){
              return $name === 'username' ? 'admin' : 'fail_password';
           });
           try{
               $container->login();
           }catch (\yii\web\NotFoundHttpException $e){
               expect($e->statusCode)->equals(404);
           }
        });

        $this->specify('user login and return valid data', function(){
           $controller = new BaseController();
           $this->mockRequestCallback('post', function($name){
                return $name === 'username' ? 'admin' : '12345';
           });
           $_SESSION['user_id'] = null;
           $result = $controller->login();
           expect($_SESSION['user_id'])->notNull();
           $this->assertArrayHasKey('status', $result);
           $this->assertArrayHasKey('response', $result);
           expect($result['status'])->equals('success');
           expect($result['response']->username)->equals('admin');
        });
    }

    public function testLogout(){
        $_SESSION['user_id'] = 10;
        $controller = new BaseController();
        $result = $controller->logout();
        expect($_SESSION['user_id'])->null();
        $this->assertArrayHasKey('status', $result);
        $this->assertArrayHasKey('response', $result);
        expect($result['status'])->equals('success');
        expect($result['response'])->true();
    }



    private function mockRequest($method, $value)
    {
        $request = $this->getMockBuilder('yii\web\Request')->getMock();
        $request->expects($this->any())->method($method)->will($this->returnValue($value));
        Yii::$app->set('request', $request);
    }

    private function mockRequestCallback($method, $callback)
    {
        $request = $this->getMockBuilder('yii\web\Request')->getMock();
        $request->expects($this->any())->method($method)->will($this->returnCallback($callback));
        Yii::$app->set('request', $request);
    }
}