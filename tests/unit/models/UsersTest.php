<?php
namespace tests\models;
use app\models\Users;

class UsersTest extends \Codeception\Test\Unit{

    public function testConstructorId(){
        $user = new Users(['id' => 1]);
        expect($user->id)->equals(1);
    }

    public function testConstructorObject(){
        $user = new Users(['id' => 1]);
        $second_user = new Users($user);
        expect($second_user->id)->equals(1);
    }

    public function testGetById(){
        $user = Users::findOne(1);
        expect($user['username'])->equals('crazyursus');
    }
}