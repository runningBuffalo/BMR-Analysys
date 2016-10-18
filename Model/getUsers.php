<?php
$DB_HOST = 'localhost';
$DB_USER = 'publicUser';
$DB_PASS = '!Panton!';
$DB_NAME = 'pantonweb';

$mysqli = new mysqli($DB_HOST, $DB_USER, $DB_PASS, $DB_NAME);

$getUsers = "SELECT * FROM `users`";

$result = $mysqli->query($getUsers) or die($mysqli->error.__LINE__);

$arr = array();

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $arr[] = $row;
    }
}

echo $json_response = json_encode($arr);

?>
