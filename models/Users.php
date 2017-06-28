<?php
/**
 * Created by PhpStorm.
 * User: ursus
 * Date: 16.06.17
 * Time: 19:42
 */

namespace app\models;


use yii\db\ActiveRecord;


/**
 * Class Users
 * @property int $id [int(11)]
 * @property string $first_name
 * @property string $last_name
 * @property string $username
 * @property string $password
 * @property int $type
 */
class Users extends ActiveRecord
{

    const TYPE_ADMIN = 1;
    const TYPE_USER = 2;


    const SCENARIO_LOGIN = 'login';
    const SCENARIO_UPDATE = 'update';
    const SCENARIO_CREATE = 'create';
    const SCENARIO_DELETE = 'delete';

    public function scenarios()
    {
        $scenarios = parent::scenarios();
        $scenarios[self::SCENARIO_LOGIN] = ['username', 'password'];
        $scenarios[self::SCENARIO_UPDATE] = ['id', 'username', 'first_name', 'last_name'];
        $scenarios[self::SCENARIO_CREATE] = [ 'username', 'first_name', 'last_name', 'password', 'type'];
        $scenarios[self::SCENARIO_DELETE] = [ 'id'];
        return $scenarios;
    }

    public function rules()
    {
      return [
          [['username', 'password'], 'required',  'on' => self::SCENARIO_LOGIN],
          [['username', 'first_name', 'last_name', 'password'], 'required',  'on' => self::SCENARIO_CREATE],
          [['type'], 'default', 'value' => self::TYPE_USER, 'on' => self::SCENARIO_CREATE],
          [['username', 'first_name', 'last_name'], 'filter', 'filter' => 'trim' ,'on' => self::SCENARIO_CREATE],
          ['username', 'unique',  'on' => self::SCENARIO_CREATE],
          [['id', 'username', 'first_name', 'last_name'], 'required',  'on' => self::SCENARIO_UPDATE],
          [['username', 'first_name', 'last_name'], 'filter', 'filter' => 'trim' ,'on' => self::SCENARIO_UPDATE],
          ['username', 'unique', 'when' => function ($model, $attribute) {
              return $model->{$attribute} !== $model->getOldAttribute($attribute);
          }, 'on' => self::SCENARIO_UPDATE],
          [['id'], 'required',  'on' => self::SCENARIO_DELETE],
      ];
    }

    public function fields(){
        return [
            'id',
            'username',
            'first_name',
            'last_name',
            'type'
        ];
    }


}