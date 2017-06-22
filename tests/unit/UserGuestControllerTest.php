<?php


class UserGuestControllerTest extends \Codeception\Test\Unit
{
    /**
     * @var \UnitTester
     */
    protected $tester;

    use \Codeception\Specify;

    protected function _before()
    {

    }

    protected function _after()
    {
    }

    // tests
    public function testUserAccess()
    {

        $this->specify('create - forbidden', function(){
            $controller = new \app\controllers\user\GuestController();
           try{
               $controller->create();
           } catch (\yii\web\ForbiddenHttpException $e){
               expect($e->statusCode)->equals(403);
           }
        });
        $this->specify('update - forbidden', function(){
            $controller = new \app\controllers\user\GuestController();
            try{
                $controller->update();
            } catch (\yii\web\ForbiddenHttpException $e){
                expect($e->statusCode)->equals(403);
            }
        });
        $this->specify('delete - forbidden', function(){
            $controller = new \app\controllers\user\GuestController();
            try{
                $controller->delete();
            } catch (\yii\web\ForbiddenHttpException $e){
                expect($e->statusCode)->equals(403);
            }
        });
        $this->specify('getById - forbidden', function(){
            $controller = new \app\controllers\user\GuestController();
            try{
                $controller->getById();
            } catch (\yii\web\ForbiddenHttpException $e){
                expect($e->statusCode)->equals(403);
            }
        });
        $this->specify('getList - forbidden', function(){
            $controller = new \app\controllers\user\GuestController();
            try{
                $controller->getList();
            } catch (\yii\web\ForbiddenHttpException $e){
                expect($e->statusCode)->equals(403);
            }
        });

    }
}