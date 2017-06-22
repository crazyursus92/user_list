<?php
/**
 * Created by PhpStorm.
 * User: ursus
 * Date: 19.06.17
 * Time: 18:55
 */

namespace app\controllers\user;


use yii\web\ForbiddenHttpException;

class GuestController extends BaseController
{
    public function create()
    {
        throw new ForbiddenHttpException();
    }

    public function delete()
    {
        throw new ForbiddenHttpException();
    }

    public function update()
    {
        throw new ForbiddenHttpException();
    }

    public function getById()
    {
        throw new ForbiddenHttpException();
    }

    public function getList()
    {
        throw new ForbiddenHttpException();
    }


}