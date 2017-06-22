<?php


use app\models\Users;

class UsersTest extends \Codeception\Test\Unit
{
    /**
     * @var \UnitTester
     */
    protected $tester;

    private $user;

    protected function _before()
    {
    }

    protected function _after()
    {
    }

    // tests
    public function testValidationLoginUsernameNotFound()
    {
        $user = new Users();
        $user->scenario = Users::SCENARIO_LOGIN;
        $user->password = '12345';
        $this->assertFalse($user->validate());
        $this->assertArrayHasKey('username', $user->errors);


    }

    public function testValidationLoginPasswordNotFound(){
        $user = new Users();
        $user->scenario = Users::SCENARIO_LOGIN;
        $user->username = 'admin';
        $this->assertFalse($user->validate());
        $this->assertArrayHasKey('password', $user->errors);
    }

    public function testValidationLoginSuccess(){
        $user = new Users();
        $user->scenario = Users::SCENARIO_LOGIN;
        $user->username = 'admin';
        $user->password = '12345';
        $this->assertTrue($user->validate());
    }

    public function testValidationUpdateRequiredFields(){
        $user = new Users();
        $user->scenario = Users::SCENARIO_UPDATE;
        $this->assertFalse($user->validate());
        $this->assertArrayHasKey('id', $user->errors);
        $this->assertArrayHasKey('username', $user->errors);
        $this->assertArrayHasKey('first_name', $user->errors);
        $this->assertArrayHasKey('last_name', $user->errors);
    }

    public function testValidationUpdateUsernameUnique(){
        $user = new Users();
        $user->scenario = Users::SCENARIO_UPDATE;
        $user->id = 1;
        $user->username = 'admin';
        $user->first_name = 'Ivan';
        $user->last_name = 'Ivanov';
        $this->assertFalse($user->validate());
        $this->assertArrayHasKey('username', $user->errors);
        $this->assertArrayNotHasKey('id', $user->errors);
        $this->assertArrayNotHasKey('first_name', $user->errors);
        $this->assertArrayNotHasKey('last_name', $user->errors);
    }

    public function testValidationUpdateSuccess(){
        $user = new Users();
        $user->scenario = Users::SCENARIO_UPDATE;
        $user->id = 1;
        $user->username = 'new_uniq_id';
        $user->first_name = 'Ivan';
        $user->last_name = 'Ivanov';
        $this->assertTrue($user->validate());
    }

    public function testValidationCreateRequiredFields(){
        $user = new Users();
        $user->scenario = Users::SCENARIO_CREATE;
        $this->assertFalse($user->validate());
        $this->assertArrayHasKey('first_name', $user->errors);
        $this->assertArrayHasKey('last_name', $user->errors);
        $this->assertArrayHasKey('password', $user->errors);
        $this->assertArrayHasKey('username', $user->errors);
    }

    public function testValidationCreateUsernameUnique(){
        $user = new Users();
        $user->scenario = Users::SCENARIO_UPDATE;
        $user->username = 'admin';
        $user->first_name = 'Ivan';
        $user->last_name = 'Ivanov';
        $user->password = '12345';
        $this->assertFalse($user->validate());
        $this->assertArrayHasKey('username', $user->errors);
        $this->assertArrayNotHasKey('password', $user->errors);
        $this->assertArrayNotHasKey('first_name', $user->errors);
        $this->assertArrayNotHasKey('last_name', $user->errors);
    }

    public function testValidationCreateSuccess(){
        $user = new Users();
        $user->scenario = Users::SCENARIO_CREATE;
        $user->username = 'user_uniq_username';
        $user->first_name = 'Ivan';
        $user->last_name = 'Ivanov';
        $user->password = '12345';
        $this->assertTrue($user->validate());
    }

    public function testValidationDeleteRequiredId(){
        $user = new Users();
        $user->scenario = Users::SCENARIO_DELETE;
        $this->assertFalse($user->validate());
        $this->assertArrayHasKey('id', $user->errors);
    }

    public function testValidationDeleteSuccess(){
        $user = new Users();
        $user->scenario = Users::SCENARIO_DELETE;
        $user->id = 25;
        $this->assertTrue($user->validate());
    }

    public function testUserToArrayWithoutPassword(){
        $user = new Users();
        $user->id = 1;
        $user->username = 'user_uniq_username';
        $user->first_name = 'Ivan';
        $user->last_name = 'Ivanov';
        $user->password = '12345';
        $user->type = 1;
        $user_fields = $user->toArray();
        $this->assertArrayHasKey('id', $user_fields);
        $this->assertArrayHasKey('username', $user_fields);
        $this->assertArrayHasKey('first_name', $user_fields);
        $this->assertArrayHasKey('last_name', $user_fields);
        $this->assertArrayHasKey('type', $user_fields);
        $this->assertArrayNotHasKey('password', $user_fields);
    }



}