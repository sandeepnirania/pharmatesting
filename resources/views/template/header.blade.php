
    
    
<!doctype html>
<html lang="en">

    <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="author" content="">
    <title>Pharma Solution Atlas</title>
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link rel="icon" type="image/png" sizes="16x16" href="{{url('theme/build/images/favicon-16x16.png')}}">
    <link rel="icon" type="image/png" sizes="32x32" href="{{url('theme/build/images/favicon-32x32.png')}}">

    <!--
    Function Description: styles for font-awesome icons (downloaded to local)
    Author: Satish K
    Last Edited: 29-04-2022
    -->
    <link href="{{url('theme/build/css/bootstrap.min.css')}}?<?php echo config('app.version');?>" rel="stylesheet">
    <link href="{{url('theme/plugins/fontawesome6.1.1/css/fontawesome.min.css')}}?<?php echo config('app.version');?>" rel="stylesheet">
    <link href="{{url('theme/plugins/fontawesome6.1.1/css/solid.min.css')}}?<?php echo config('app.version');?>" rel="stylesheet">
    <link href="{{url('theme/build/css/style.css')}}?<?php echo config('app.version');?>" rel="stylesheet">
    
    <!--
    Function Description: styles for server-side datatables
    Author: Satish K
    Last Edited: 
    -->
    <link rel="stylesheet" href="{{url('theme/plugins/jquery-Datatable/DataTables-1.10.25/css/jquery.dataTables.min.css')}}?<?php echo config('app.version');?>">
    <link rel="stylesheet" href="{{url('theme/plugins/jquery-Datatable/FixedHeader-3.1.9/css/fixedHeader.dataTables.min.css')}}?<?php echo config('app.version');?>">
    <link rel="stylesheet" href="{{url('theme/plugins/jquery-Datatable/Buttons-1.7.1/css/buttons.dataTables.min.css')}}?<?php echo config('app.version');?>">
    <link href="{{url('theme/plugins/alertify/alertify.css')}}?<?php echo config('app.version');?>">
    <link href="{{url('theme/plugins/bootstrap-toggle/bootstrap4-toggle.min.css')}}?<?php echo config('app.version');?>" rel="stylesheet">

      <!--
    Function Description: styles for table row re-ordering
    Author: Satish K
    Last Edited: 
    -->
    <link href="{{url('theme/plugins/rowReorder1.2.8/rowReorder.dataTables.min.css')}}?<?php echo config('app.version');?>" rel="stylesheet">
    <!-- <link href="https://cdn.datatables.net/rowreorder/1.2.8/css/rowReorder.dataTables.min.css"> -->

    <!-- scripts starts here satish k 28-06-2021 -->
    <!-- <script src="https://code.jquery.com/jquery-3.4.1.min.js"></script> -->
    <script src="{{url('theme/build/js/jquery.min.js')}}?<?php echo config('app.version');?>"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.4/jquery-ui.min.js" type="text/javascript"></script>
    <script src="https://use.fortawesome.com/349cfdf6.js"></script>
    <!-- Popper JS -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"></script>
    <script src="{{url('theme/build/js/bootstrap.min.js')}}?<?php echo config('app.version');?>"></script>

    
    <!--
    Function Description: Scripts for server-side datatables
    Author: Satish K
    Last Edited: 
    -->
    <script src="{{url('theme/plugins/jquery-Datatable/DataTables-1.10.25/js/jquery.dataTables.min.js')}}?<?php echo config('app.version');?>"></script>
    <script src="{{url('theme/plugins/jquery-Datatable/FixedHeader-3.1.9/js/dataTables.fixedHeader.min.js')}}?<?php echo config('app.version');?>" type="text/javascript"></script>
    <!-- files for export  satish k 28-06-2021-->
    <script src="{{url('theme/plugins/jquery-Datatable/Buttons-1.7.1/js/dataTables.buttons.min.js')}}?<?php echo config('app.version');?>" type="text/javascript"></script>
    <script src="{{url('theme/plugins/jquery-Datatable/JSZip-2.5.0/jszip.min.js')}}?<?php echo config('app.version');?>" type="text/javascript"></script>
    <script src="{{url('theme/plugins/jquery-Datatable/Buttons-1.7.1/js/buttons.html5.min.js')}}?<?php echo config('app.version');?>" type="text/javascript"></script>
    <!--
    Function Description: Script all modal-popup related functions
    Author: Satish K
    Last Edited: 
    -->
    <script src="{{url('theme/build/js/ModalFunctions.js')}}?<?php echo config('app.version');?>"></script>
    <script src="{{url('theme/plugins/alertify/alertify.js')}}?<?php echo config('app.version');?>"></script>
    <script src="{{url('theme/build/js/common.js')}}?<?php echo config('app.version');?>"></script>
    <script src="{{url('theme/build/js/advancedSearch.js')}}?<?php echo config('app.version');?>"></script>
   
    
    
     
    <!--
    Function Description: scripts for table row re-ordering
    Author: Satish K
    Last Edited: 
    -->
    <script src="https://cdn.datatables.net/rowreorder/1.2.8/js/dataTables.rowReorder.min.js"></script> 

    <script src="https://cdn.jsdelivr.net/gh/gitbrent/bootstrap4-toggle@3.6.1/js/bootstrap4-toggle.min.js"></script>
    <!-- script added for typeahead in document module  Akshatha R 06-01-2022-->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-3-typeahead/4.0.2/bootstrap3-typeahead.min.js"></script>



</head>

<body>
    <!-- Header Start -->
    <style>
        .hide_adminmenu {
            display: none;
        }

        /* .modal.fade.ui-draggable-dragging {
        -moz-transition: none;
        -o-transition: none;
        -webkit-transition: none;
        transition: none;
    } */
    </style>
    <!--
    Function Description: set the base URL and token for ajax calls
    Author: Satish K
    Last Edited: 
    -->
    <script>
        var app_url = "{{url('/')}}";
        var token = '{{ csrf_token() }}';
    </script>
    <!--
    Function Description: Top Navbar Starts here
    Author: Satish K
    Last Edited: 
    -->
    <header class="nav-top">

        <nav class="navbar navbar-expand sp-5">
            <div class="col-4 col-xl-2 padding logs">
                <span><img class="logo" src="{{url('theme/build/images/new_atlas_psh_logo_converted.png')}}" alt="">
            </div>
            <div class="col-3 col-md-4 pt-0 pull-right">
                <!--
                    Function Description: if Environment is Staging display test "STAGING SITE" in red color
                    Author: Satish K
                    Last Edited: 25-11-2021
                    -->
                @if(config('app.env') == 'STAGING')
                <span class="server_env red company">STAGING SITE</span>
                @elseif(config('app.env') == 'DEV')
                <span class="server_env red company">QA SITE</span>
                @endif
            </div>

            <div class="collapse navbar-collapse">
                <ul class="navbar-nav ml-auto">
                    @if(!empty(session('sessionId')))
                    <li class="nav-item dropdown profile-name">
                        <a class="nav-link dropdown-toggle j-text" href="#" id="dropdown06" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                <circle cx="12" cy="12" r="9"></circle>
                                <line x1="12" y1="17" x2="12" y2="17.01"></line>
                                <path d="M12 13.5a1.5 1.5 0 0 1 1 -1.5a2.6 2.6 0 1 0 -3 -4"></path>
                            </svg>
                            Help <i class="fas fa-chevron-down down-2"></i>
                        </a>
                        <div class="dropdown-menu" aria-labelledby="dropdown06">
                            <a href="{{url('UserGuideUI')}}" class="btn btn-outline-white  dropdown-item" target="_blank" rel="noreferrer">User Guide</a>
                            <a href="mailto:ATLAS Support at Pharma Solutions<atlas.support@pharma.solutions>" class=" dropdown-item">Submit Helpdesk Ticket</a>
                        </div>
                    </li>
                    @endif

                    <!--
                    Function Description: block to Display both Task and Notifications Count
                    Author: Satish K
                    Last Edited: 25-11-2021
                    -->
                    
                    
                    <!--
                    Function Description: block for change-password and Log-out and profile
                    Author: Satish K
                    Last Edited: 25-11-2021
                    -->
                    <li class="nav-item dropdown profile-name">
                        <a class="nav-link dropdown-toggle j-text" href="#" id="dropdown06" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{{session()->get('UserFullName')}}<i class="fas fa-chevron-down down-2"></i></a>
                        <div class="dropdown-menu" aria-labelledby="dropdown06">
                            <a class="menu-item dropdown-item" href="{{url('change-password')}}">Change Password</a>
                            <a class=" menu-item dropdown-item" href="{{url('logout')}}">Logout</a>
                        </div>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link icon-profile" href="#"><span></span></a>
                    </li>
                </ul>

            </div>
        </nav>
        <!--
    Function Description: Top Navbar Ends here
    Author: Satish K
    Last Edited: 
    -->
    </header>
    <input type="hidden" id="myStateInput" name="myStateInput">