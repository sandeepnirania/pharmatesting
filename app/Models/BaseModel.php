<?php

namespace App\Models;

use Kitar\Dynamodb\Model\Model;

class BaseModel extends Model
{
    public static function getNextId(){
        return (string) (self::all()->count() + 1);
    }
}
