<?php

namespace app\controllers\user;

interface UserInterface{

    public function create();
    public function delete();
    public function update();
    public function getById();
    public function login();
    public function logout();
    public function getList();

}