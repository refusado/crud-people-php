<?php

require 'config/Database.php';

class DatabaseConnection
{
    public static function start(): \PDO
    {
        $conn = "mysql";
        $conn .= ":host=" . DB_HOST;
        $conn .= ";dbname=" . DB_NAME;

        return new \PDO($conn, DB_USER, DB_PASS);
    }
}
