<?php
namespace api\app;

use api\config\Database;

class Connection
{
    public static function start(): \PDO
    {
        $conn = "mysql";
        $conn .= ":host=" . Database::DB_HOST;
        $conn .= ";dbname=" . Database::DB_NAME;

        return new \PDO($conn, Database::DB_USER, Database::DB_PASS);
    }
}
