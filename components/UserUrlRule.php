<?php
namespace app\components;

use Yii;
use yii\web\UrlRuleInterface;
use yii\base\Object;


class UserUrlRule  extends Object implements UrlRuleInterface
{
    public $controller;
    public function createUrl($manager, $route, $params)
    {
        $request = Yii::$app->request;
        if(!$request->isAjax){
            return 'site/index';
        }
        return false;  // данное правило не применимо
    }

    public function parseRequest($manager, $request)
    {

        if(!$request->isAjax){
            return ['site/index', []];
        }
        return false;  // данное правило не применимо
    }
}