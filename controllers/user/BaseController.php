<?php


namespace app\controllers\user;

/**
 * Created by PhpStorm.
 * User: ursus
 * Date: 19.06.17
 * Time: 18:37
 */
use app\models\Users;
use Yii;
use yii\web\NotFoundHttpException;

class BaseController implements UserInterface
{

    protected $current_user;

    function __construct()
    {
        $current_user_id = isset($_SESSION['user_id']) ? $_SESSION['user_id'] : null;
        $this->current_user = new Users(['id' => $current_user_id]);
    }

    public function create()
    {
        $request = Yii::$app->request;
        $user = new Users($request->post());
        $user->scenario = Users::SCENARIO_CREATE;
        if ($user->validate()) {
            $user->save();
            $user = Users::findOne(['username' => $user->username]);
            return [
                'status' => 'success',
                'response' => $user
            ];
        } else {
            return [
                'status' => 'error',
                'response' => $user
            ];
        }
    }

    public function delete()
    {

        $request = Yii::$app->request;
        $id = $request->post('id');
        if ($id !== $this->current_user->id) {
            $user = Users::findOne($id);
            $user->scenario = Users::SCENARIO_DELETE;
            if ($user->validate()) {
                $user->delete();
                return [
                    'status' => 'success',
                    'response' => true
                ];
            } else {
                return [
                    'status' => 'error',
                    'response' => $user->errors
                ];
            }
        }
    }

    public function getById()
    {
        $request = Yii::$app->request;
        $id = $request->get('id');
        $user = Users::findOne($id);
        if ($user && $user->id) {
            return [
                'status' => 'success',
                'response' => $user
            ];
        } else {
            return [
                'status' => 'error',
                'response' => 'User not found'
            ];
        }

    }

    public function getList()
    {
        $result = [];
        $request = Yii::$app->request;
        $limit = $request->get('limit');
        $offset = $request->get('offset');
        $result['users'] = Users::find()->limit($limit)->offset($offset)->orderBy('id')->all();
        $result['count'] = Users::find()->count();
        return [
            'status' => 'success',
            'response' => $result
        ];
    }

    public function login()
    {

        $request = Yii::$app->request;
        $user = Users::findOne([
            'username' => $request->post('username')
        ]);
        var_dump($user);
        if (!$user) {
            /**
             * @todo Подобрать правильный код ощибки
             */
            throw new NotFoundHttpException("User not found");
        }
        if($user->password !== $request->post('password')){
            throw new NotFoundHttpException("Password fail");
        }
        $_SESSION['user_id'] = $user->id;
        return [
            'status' => 'success',
            'response' => $user
        ];
    }

    public function logout()
    {
        $_SESSION['user_id'] = null;
        return [
            'status' => 'success',
            'response' => true
        ];
    }

    /**
     * @return array
     */
    public function update()
    {
        $request = Yii::$app->request;
        $id = $request->post('id');
        $user = Users::findOne($id);
        foreach ($request->post() as $key => $value){
            if($value){
                $user->setAttribute($key, $value);
            }
        }
        $user->scenario = Users::SCENARIO_UPDATE;
        if ($user->validate()) {
            $user->save();
            return [
                'status' => 'success',
                'response' => $user
            ];

        } else {
            return [
                'status' => 'error',
                'response' => $user->errors
            ];
        }

    }

}