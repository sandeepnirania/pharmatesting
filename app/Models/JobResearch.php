<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Notifications\Notifiable;
use App\Models\BaseModel;

class JobResearch extends BaseModel
{
    use HasFactory, Notifiable;

    protected $table = 'JobsResearch';
    protected $primaryKey = 'id';
    // protected $sortKey = 'name';
    // protected $sortKeyDefault = 'profile';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'id',
        'name',
        'user_id',
        'status',
        'resident_state',
        'juricdictions',
        'requirements_checks_include',
        'questionnairs'
    ];

    public static function states(){
        return [
            'alabama' => 'Alabama',
            'alaska' => 'Alaska',
            'arizona' => 'Arizona',
            'arkansas' => 'Arkansas',
            'california' => 'California',
            'colorado' => 'Colorado',
            'connecticut' => 'Connecticut',
            'delaware' => 'Delaware',
            'florida' => 'Florida',
            'georgia' => 'Georgia',
            'hawaii' => 'Hawaii',
            'idaho' => 'Idaho',
            'illinoise' => 'Illinoise',
            'indiana' => 'Indiana',
            'lowa' => 'Lowa',
            'kansas' => 'Kansas',
            'kentucky' => 'Kentucky',
            'louisiana' => 'Louisiana',
            'maine' => 'Maine',
            'meryland' => 'Meryland',
            'massachusetts' => 'Massachusetts',
            'michigan' => 'Michigan',
            'minnesota' => 'Minnesota',
            'mississippi' => 'Mississippi',
            'missouri' => 'Missouri',
            'montana' => 'Montana',
            'nebraska' => 'Nebraska',
            'nevada' => 'Nevada',
            'new_hampshire' => 'New Hampshire',
            'new_jersey' => 'New Jersey',
            'new_mexico' => 'New Mexico',
            'new_york' => 'New York',
            'north_carolina' => 'North Carolina',
            'north_dakota' => 'North Dakota',
            'ohio' => 'Ohio',
            'oklahoma' => 'Oklahoma',
            'oregon' => 'Oregon',
            'pennsylvania' => 'Pennsylvania',
            'rhode_island' => 'Rhode Island',
            'south_carolina' => 'South Carolina',
            'south_dakota' => 'South Dakota',
            'tennessee' => 'Tennessee',
            'texas' => 'Texas',
            'utah' => 'Utah',
            'vermont' => 'Vermont',
            'virginia' => 'Virginia',
            'washington' => 'Washington',
            'west_virginia' => 'West Virginia',
            'wisconsin' => 'Wisconsin',
            'wyoming' => 'Wyoming',
            'washington_dc' => 'Washington DC',
            'puerto_rico' => 'Puerto Rico',
        ];
    }
    
}
