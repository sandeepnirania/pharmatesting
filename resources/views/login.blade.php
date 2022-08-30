<!doctype html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="author" content="">

    
    <link rel="icon" type="image/png" sizes="16x16" href="{{asset('/images/favicon-16x16.png')}}">
    <link rel="icon" type="image/png" sizes="32x32" href="{{asset('/images/favicon-32x32.png')}}">
    <title>Login</title>

    <!-- Bootstrap core CSS -->
    <script src="https://use.fortawesome.com/349cfdf6.js"></script>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/fontawesome.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/solid.min.css" integrity="sha512-jQqzj2vHVxA/yCojT8pVZjKGOe9UmoYvnOuM/2sQ110vxiajBU+4WkyRs1ODMmd4AfntwUEV4J+VfM6DkfjLRg==" crossorigin="anonymous" />
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <link href="{{ asset('css/login.css') }}?<?php echo config('app.version');?>" rel="stylesheet">

</head>
<style>
.error_msg{
    color: red;
    font-family: 'Roboto';  
    font-size: 12.5px;
}
</style>

    <!-- jQuery first, then Popper.js, then Bootstrap JS -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous">
    </script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous">
    </script>
    <?php 
    
    ?>
@include('modals.alertModals')
@if(isset($return_code) && $return_code==29)

    <script>
    $(document).ready(function() {       
           
                // $('#modal-success .text-muted').html('It is recommended to Change your Temporary Password to a secure Password of your choice immediately');
                // $('#modal-success').modal('show');

                $('#modal-danger #text_error').html('<p>Your device or network is not recognized. <br>For security reasons, we have sent a temporary password to your email id.<br><br> Please login using that temporary password to proceed.</p>');
                $('#modal-danger').modal('show');
                        
        });        
     </script>
@endif
@if(isset($return_code) && $return_code==28)
  
<script>
    $(document).ready(function() {       
           
                // $('#modal-success .text-muted').html('It is recommended to Change your Temporary Password to a secure Password of your choice immediately');
                // $('#modal-success').modal('show');

                $('#modal-danger #text_error').html('<p>The system is currently under maintenance please try again later</p>');
                $('#modal-danger').modal('show');
                        
        });        
     </script>
@endif
<body>
    <section>
        <div class="container-fluid  pl-5  main">
            <div class="row  pl-5">
                <div class=" pad  col-12">
                    <div class="col-12 ">
                        <img src="{{ asset('images/logo.svg')}}" class="img-1 " alt="">
                    </div>
                    
                    <div class="col-12 pt-5">
                    <div class="pad col-12">
                    <!-- <p class="welcome"> Welcome to Pharma Solutions Hub! please login to proceed...</p> -->
                    @if(!(isset($return_code) && $return_code==29))
                                <p class="error_msg">
                                    <?php
                                    if(isset($message))
                                    {
                                    echo $message;
                                    }
                                    ?>
                                </p>
                                @if(Session::has('message'))
                                <div class="alert {{ Session::get('alert-class', 'alert-info') }}">
                                    <ul>
                                        <li>{{ Session::get('message') }}</li>
                                    </ul>
                                </div>
                                @endif
                    @endif
                </div>
                        <form method="POST" action="{{ url('validateLogin') }}">
                        @csrf
                            <div class="form-group  pl-0">
                                <input type="text" class="form-control py-3 @error('username') is-invalid @enderror" id="username" aria-describedby="emailHelp" placeholder="Email" name="username" value="{{ old('username') }}" required autocomplete="username" autofocus>
                            </div>
                            @if(!(isset($return_code) && $return_code==29))
                            @error('email')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                            @endif
                            <div class="form-group  pl-0 pt-2">
                                <input type="password" class="form-control py-3 @error('password') is-invalid @enderror" id="password" placeholder="Password" name="password" required autocomplete="current-password">
                            </div>
                            <div class="row pt-3">

                                <div class="col-6 ">
                                    <button type="RESET" class="btn btn-primary-1 ">CANCEL</button>
                                </div>
                                <div class="col-6">
                                    <button type="submit" class="btn btn-primary-1 ">LOGIN</button>
                                </div>
                            </div>
                            <div class="row pt-3">
                                <div class="col-12" style="text-align: center;">
                                    {{-- <button type="button" onclick='window.location.href = "<?php echo url('/forget-password');?>"' class="btn btn-primary-1" style = "width: inherit;" >Forget Password</button> --}}
                                    <a href="{{url('/forget-password')}}">Login Assistance</a>
                                </div>

                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-12 back"></div>
    </section>

<script>

if((navigator.userAgent.indexOf("Opera") || navigator.userAgent.indexOf('OPR')) != -1 ) 
    {
    }
    else if(navigator.userAgent.indexOf("Edg") != -1 )
    {
    }
    else if(navigator.userAgent.indexOf("Chrome") != -1 )
    {
    }
    else if(navigator.userAgent.indexOf("Safari") != -1)
    {
        alert('Atlas is currently not available on this browser. Please login with Chrome, Edge or Firefox.');
        var win = window.open("about:blank", "_self");
        win.close();
        window.location.close();
    }
    else if(navigator.userAgent.indexOf("Firefox") != -1 ) 
    {
    }
    else if((navigator.userAgent.indexOf("MSIE") != -1 ) || (!!document.documentMode == true )) //IF IE > 10
    {
    }  
</script>

   
</body>
</html>
