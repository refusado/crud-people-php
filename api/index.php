<?php

require "../vendor/autoload.php";
use Api\App\Person;

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

$data = [];

$fn     = $_REQUEST["fn"]   ?? null;
$id     = $_REQUEST["id"]   ?? 0;
$name   = $_REQUEST["name"] ?? null;
$age    = $_REQUEST["age"]  ?? null;

$person = new Person();
$person->setId($id);

if ($fn === "create" && $name !== null && $age !== null) {
    $person->setName($name);
    $person->setAge($age);
    $data["person"] = $person->create();
}

if ($fn === "read") {
    $data["person"] = $person->read();
}

if ($fn === "update" && $id > 0 && $name !== null && $age !== null) {
    $person->setName($name);
    $person->setAge($age);
    $data["person"] = $person->update();
}

if ($fn === "delete" && $id > 0) {
    $data["person"] = $person->delete();
}

if ($fn === "count") {
    $data["totalPersons"] = $person->count();
}

die(json_encode($data));
