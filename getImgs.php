<?php
$images = [];
for ($i=0; $i < 300 ; $i++) {
  $prefixe = '000';
  if ($i>= 10) {
    $prefixe = '00';
  }
  if ($i>= 100) {
    $prefixe = '0';
  }
  $filename = 'images/images/PICT'.$prefixe.$i.'_JPG.jpg';
  if (file_exists($filename)) {
      $images[] = $filename;
  }
}
header('Content-Type: application/json');
echo json_encode($images);
?>
