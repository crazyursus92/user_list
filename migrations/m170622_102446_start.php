<?php

use yii\db\Migration;
use yii\db\Schema;

class m170622_102446_start extends Migration
{
    public function safeUp()
    {
        $this->createTable('users',[
           'id' => $this->primaryKey(11)." auto_increment",
            'username' => $this->string(255)->notNull(),
            'first_name' => $this->string(255)->notNull(),
            'last_name' => $this->string(255)->notNull(),
            'password' => $this->string(255)->notNull(),
            'type' => $this->integer(11)->notNull()->defaultValue(\app\models\Users::TYPE_USER)
        ]);
        $this->createIndex('users_username_uindex', 'users', 'username', true);
        $this->insert('users', [
            'username' => 'admin',
            'first_name' => 'Admin',
            'last_name' => 'Admin',
            'password' => '12345',
            'type' => \app\models\Users::TYPE_ADMIN
        ]);
    }

    public function safeDown()
    {
        echo "m170622_102446_start cannot be reverted.\n";
        $this->dropTable('users');
        return false;
    }

    /*
    // Use up()/down() to run migration code without a transaction.
    public function up()
    {

    }

    public function down()
    {
        echo "m170622_102446_start cannot be reverted.\n";

        return false;
    }
    */
}
