<?php

class Person {

    private $id = 0;
    private $name = null;
    private $age = null;

    public function setId(int $id): void {
        $this->id = $id;
    }

    public function getId(): int {
        return $this->id;
    }

    public function setName(string $name): void {
        $this->name = $name;
    }

    public function getName(): string {
        return $this->name;
    }

    public function setAge(int $age): void {
        $this->age = $age;
    }

    public function getAge(): int {
        return $this->age;
    }

    private function connection(): \PDO {
        return new \PDO("mysql:host=localhost;dbname=api_crud", "root", "");
    }

    public function create(): array {

        $conn = $this->connection();
        $stmt = $conn->prepare("INSERT INTO person VALUES (NULL, :_name, :_age)");
        $stmt->bindValue(":_name", $this->getName(), \PDO::PARAM_STR);
        $stmt->bindValue(":_age", $this->getAge(), \PDO::PARAM_INT);

        if ($stmt->execute()) {
            $this->setId($conn->lastInsertId());
            return $this->read();
        }

        return[];
    }

    public function read(): array {

        $conn = $this->connection();

        if ($this->getId() === 0) {
            $stmt = $conn->prepare("SELECT * FROM person");
            
            if ($stmt->execute()) {
                return $stmt->fetchAll(\PDO::FETCH_ASSOC);
            }
        } else if ($this->getId() > 0) {
            $stmt = $conn->prepare("SELECT * FROM person WHERE id = :_id");
            $stmt->bindValue(":_id", $this->getId(), \PDO::PARAM_INT);
            
            if ($stmt->execute()) {
                return $stmt->fetchAll(\PDO::FETCH_ASSOC);
            }
        }

        return[];
    }

    public function update(): array {

        $conn = $this->connection();
        $stmt = $conn->prepare("UPDATE person SET name = :_name, age = :_age WHERE id = :_id");
        $stmt->bindValue(":_name", $this->getName(), \PDO::PARAM_STR);
        $stmt->bindValue(":_age", $this->getAge(), \PDO::PARAM_INT);
        $stmt->bindValue(":_id", $this->getId(), \PDO::PARAM_INT);

        if ($stmt->execute()) {
            return $this->read();
        }

        return[];
    }

    public function delete(): array {

        $person = $this->read();

        $conn = $this->connection();
        $stmt = $conn->prepare("DELETE FROM person WHERE id = :_id");
        $stmt->bindValue(":_id", $this->getId(), \PDO::PARAM_INT);

        if ($stmt->execute()) {
            return $person;
        }

        return[];
    }
}