<?php
function getFiles($path) {
    if (is_dir($path)) {
        $res = array();
        foreach (array_filter(glob($path ."*"), 'is_file') as $file) {
            array_push($res, $file);
            // array_push($res, str_replace($path, "", $file));
        }
        return $res;
    }
    return false;
}
header('Content-Type: application/json');
echo json_encode(getFiles('images/images/'));
?>
