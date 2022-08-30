<?php
return [
    'region' => env('AWS_REGION', 'us-east-1'),
    'version' => 'latest',
    'debug' => false,
    'ua_append' => [
        'L5MOD/',
    ],
    'tags' => [
        [ 'Key' => 'standardKey', 'Value' => 'standardValue' ],
        [ 'Key' => 'secondKey', 'Value' => 'secondValue' ],
    ]
];