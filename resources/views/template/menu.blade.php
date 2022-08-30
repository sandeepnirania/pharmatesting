 <!--
    Function Description: set first URI segment to coockie for grid reloads
    Author: Satish K
    Last Edited:
-->
<link href="{{url('theme/build/css/menu.css')}}?<?php echo config('app.version');?>" rel="stylesheet">
 <?php $page = Request::segment(1); ?>
 <script>
     document.cookie = "page = {{$page}}";
     var page = '{{$page}}';
 </script>
 <style>
 
</style>

<?php 
   $active_menu = 0;
   $page = Request::segment(1);
if ($page == 'Dashboard')
      {
         $active_menu = 1;
      }else if (($page == 'license')  ||  ($page == 'licenseActivity') || ($page == 'Tasks')){
         $active_menu = 2;
      }else if($page == 'Document'){
         $active_menu = 3;
      }else if($page == 'CompanyProfile' ){
         $active_menu = 4;
      }else if(($page == 'Notifications')  ||  ($page == 'DocNotifications') || ($page == 'LicenseExpiryNotifications')){
        $active_menu = 5;
     }else {
         $active_menu = 6;
      }

      $MenuState = !empty(session('MenuState'))?session('MenuState'):'0';
?>
 
<div id="wrapper" class="<?php if($MenuState == 1){ echo 'toggled'; }?> toggled-right">
      <!-- Sidebar -->
      <div class="menuNavLeft <?php if($MenuState == 1){ echo 'display-none'; }?>" data-toggle="collapse" id="menu-toggle-left">
            <div class="triangle-left"></div>
        </div>
        <div class="menuNavRight  <?php if($MenuState != 1){ echo 'display-none'; }?>" data-toggle="collapse" id="menu-toggle-right" >
            <div class="triangle-right"></div>
        </div>
      <div id="sidebar-wrapper" class="show table-responsive-sidepanel <?php if($MenuState == 1){ echo 'toggled'; }?>">

         <ul class="sidebar-nav nav-pills nav-stacked" id="menu">
         <li class="nav-head">
            </li>

            <li class="menu-icon active-ul">
               <a href="#"><span class="fa-stack fa-lg "> <img class="nav-img mr-2 " src="{{url('theme/build/images/Group 920_p.svg')}}" alt=""></span>Research <i class="right fas fa-angle-right pull-right"></i></a>
               <ul class="nav-pills nav-stacked active-ul" style="list-style-type:none; ">
                  <li ><a href="{{url('/new-research/job-setup')}}" class="{{ Request::segment(1) == 'new-research' ? 'active-li': '' }}"><span class="fa-stack fa-lg"><i class="right fas fa-angle-right"></i></span>New Research</a></li>
                  <li ><a href="{{url('/research-results')}}" class="{{ Request::segment(1) == 'research-results' ? 'active-li': '' }}"><span class="fa-stack fa-lg"><i class="right fas fa-angle-right"></i></span>View Results</a></li>
               </ul>
            </li>
            
         </ul>
      </div>

 
  <!--
    Function Description: menu basr ends here
    Author: Satish K
    Last Edited:
  -->

  <script src="{{url('theme/build/js/menu.js')}}?<?php echo config('app.version');?>"></script>
<script>

/* $('li a').click(function() {
  
   
   $('.active-ul i').addClass('fa-angle-down');
   $('.active-ul i').removeClass('fa-angle-right');

}); */
</script>
