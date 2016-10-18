<?php

//if ($_SERVER['REMOTE_ADDR'] == "50.194.165.2"){
/*	
	$DB_HOST = 'localhost';
	$DB_USER = 'root';
	$DB_PASS = 'root';
	$DB_NAME = 'pantonweb';
*/	

	$DB_HOST = 'localhost';
	$DB_USER = 'publicUser';
	$DB_PASS = '!Panton!';
	$DB_NAME = 'pantonweb';

	$mysqli = new mysqli($DB_HOST, $DB_USER, $DB_PASS, $DB_NAME);

	$check = "SELECT `auto`, `ip`, `date`, `city`, `region`, `country`, `map`, `suspectCompany`, COUNT( * ) AS  `total` 
		FROM  `visitor` 
		GROUP BY  `ip`
		ORDER BY `total`
		DESC";
		
	$result = $mysqli->query($check) or die($mysqli->error.__LINE__);

	$arr = array();

	if($result->num_rows > 0) {
		while($row = $result->fetch_assoc()) {
			$arr[] = $row;	
		}
	}

	echo $json_response = json_encode($arr);
//}
?>