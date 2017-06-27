<?php
/**
 * Created by PhpStorm.
 * User: ursus
 * Date: 19.06.17
 * Time: 13:16
 */

namespace app\controllers;



use Yii;
use yii\web\BadRequestHttpException;
use yii\web\NotFoundHttpException;
use yii\web\Response;
use app\models\Users;
use yii\base\Module;
use yii\web\Controller;
use app\controllers\user;

class UserController extends Controller
{
    private $current_user;
    /**
     * @var user\UserInterface
     */
    private $state;

    public function __construct($id, Module $module, array $config = [])
    {
        parent::__construct($id, $module, $config);
        $this->enableCsrfValidation = false;
        session_start();
        $this->stateInit();
    }

    private function stateInit(){
        $current_user_id = isset($_SESSION['user_id']) && $_SESSION['user_id'] ? $_SESSION['user_id'] : null;

        if(!is_null($current_user_id)){
            $this->current_user = Users::findOne($current_user_id);
            if(!$this->current_user){
                $_SESSION['user_id'] = null;
                $this->state = new user\GuestController();
                throw new BadRequestHttpException('user deleted');
            }
            if($this->current_user->type === Users::TYPE_ADMIN){
                $this->state = new user\ManagerController();
            }elseif ($this->current_user->type === Users::TYPE_USER){
                $this->state = new user\UserController();
            }
        }else {
            $this->state = new user\GuestController();
        }
    }

    public function actionLogin(){
        return $this->response($this->state->login());
    }

    public function actionLogout(){
        $result = $this->state->logout();
        if($result['status'] === 'success'){
            $this->current_user = new user\GuestController();
        }
        return $this->response($result);
    }

    public function actionCreate(){
        return $this->response($this->state->create());
    }

    public function actionGetById(){
        return $this->response($this->state->getById());
    }

    public function actionList(){

        return $this->response($this->state->getList());
    }

    public function actionUpdate(){
        return $this->response($this->state->update());
    }

    public function actionDelete(){
        return $this->response($this->state->delete());
    }

    public function actionCurrentUser(){
        return $this->response(['status' => 'success', 'response' => $this->current_user]);
    }

    private function response($data, $code = 200){
        \Yii::$app->response->format = Response::FORMAT_JSON;
        return [
            'response' => $data['response'],
            'user' => $this->current_user,
            'code' => $code,
            'status' => $data['status']
        ];
    }

    public function actionError(){

        if (($exception = Yii::$app->getErrorHandler()->exception) === null) {
            $exception = new NotFoundHttpException(Yii::t('yii', 'Page not found.'));
        }
        $message = $exception->getMessage();
        if(!$message){
            $message = $exception->getName();
        }
        return $this->response(['response'=> $message, 'status' => 'error'], $exception->statusCode);
    }

}