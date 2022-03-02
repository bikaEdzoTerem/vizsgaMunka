<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "edzoterem";

$GLOBALS['$eszkozok_tomb'] = array();

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
  die("Hiba: " . $conn->connect_error);
}
echo "Sikeres kapcsolat";

$sql = "SELECT * FROM eszkozs";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
  // output data of each row
  while($row = $result->fetch_assoc()) {
    //q mentén spilt-elni
    array_push(
        $eszkozok_tomb,
            "Eszöz neve:" . $row["eszkoz_neve"].
            "Q"
            . "Kép:" . $row["kep"].
            "Q"
            . "Súly:" . $row["suly"]
    ); 
  }
} else {echo "0 results";}
$conn->close();
?>