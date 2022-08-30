<?php
namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Session;
use Config;
use Mail;
use App\Helpers\Helper ;


use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    use AuthenticatesUsers;

    public function index()
    {
        // User::create([
        //     'id' => User::getNextId(),
        //     'name' => "Demo User 1",
        //     'email' => "demo.user1@pharma.solutions",
        //     'password' => Hash::make("shanky@1234"),
        //     'type' => 'user'
        // ]);
        // return User::all();
        return view('login');
    }

    public function welcome()
    {
        return view('welcome');
    }

    function signInHelp()
    {
        return view('signInHelp');
    }


    function validateLogin(Request $request)
    {
        $username = $request->username;
        $password = $request->password;
        
        $userRow = User::filter('email', '=', $username)->scan();
        
        try {
            $userRow = $userRow[0];
            if (!$userRow) {
                $user['status'] = 0;
                $user['code'] = 27;           
                $ret_msg= "User is not registered with us";
                $user['message']=$ret_msg['return_obj']['Message'];
                $user['sessionId'] = null;
                return view('login', $user);
            } else {
                if (!Hash::check($password, $userRow->password)) {
                    $user['status'] = 0;
                    $user['code'] = 27;           
                    $ret_msg = "Email or password are wrong.";
                    $user['message']=$ret_msg['return_obj']['Message'];
                    $user['sessionId'] = null;

                    return view('login', $user);
                } 
                Auth::login($userRow);
                return redirect('new-research/job-setup');
            }
            
        } catch (\Exception $ex) {
            DB::rollback();
            $response['status'] = 0;
            $response['code'] = 2;           
            $response['message'] = "Something went worng! Please try again" ;
            $response['sessionId'] = null;
            return view('login', $response);
        }
    }
}
