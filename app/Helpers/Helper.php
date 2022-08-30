<?php
namespace App\Helpers ;

class Helper{

    public static function uuid($name) {
        $hash = sha1($name, false);
        return sprintf(
            '%s-%s-5%s-%s-%s',
            substr($hash,  0,  8),
            substr($hash,  8,  4),
            substr($hash, 17,  3),
            substr($hash, 24,  4),
            substr($hash, 32, 12)
        );
    }
}