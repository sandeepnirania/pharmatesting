<style>
.danger-button{
    left:20;
}

@media screen and (min-width: 1920px){

.modal-alert {
    width: 80% !important ; 
    left: 13rem !important ;
}
.offset-lg-4 {
    margin-left: 36.333333% !important;
}
}
@media screen and (min-width: 1200px) and  (max-width: 1919px){

.modal-alert {
    width: 70% !important ; 
    left: 13rem !important ;
}
.offset-lg-4 {
    margin-left: 36.333333% !important;
}

}
@media screen and (min-width: 860px) and (max-width: 1199px){

.modal-alert {
    width: 70% !important ; 
    left: 10rem !important ;
}
.offset-lg-4 {
    margin-left: 36.333333% !important;
}

}


.progress {
  margin: 0 auto;
  width: 400px;
}

.progress {
  padding: 4px;
  background: rgba(0, 0, 0, 0.25);
  border-radius: 6px;
  -webkit-box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.25), 0 1px rgba(255, 255, 255, 0.08);
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.25), 0 1px rgba(255, 255, 255, 0.08);
}

.progress-bar {
  height: 8px;
  border-radius: 4px;
	background-image: -webkit-linear-gradient(top, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.05));
  background-image: -moz-linear-gradient(top, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.05));
  background-image: -o-linear-gradient(top, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.05));
  background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.05));
  -webkit-transition: 0.4s linear;
  -moz-transition: 0.4s linear;
  -o-transition: 0.4s linear;
  transition: 0.4s linear;
  -webkit-transition-property: width, background-color;
  -moz-transition-property: width, background-color;
  -o-transition-property: width, background-color;
  transition-property: width, background-color;
  -webkit-box-shadow: 0 0 1px 1px rgba(0, 0, 0, 0.25), inset 0 1px rgba(255, 255, 255, 0.1);
  box-shadow: 0 0 1px 1px rgba(0, 0, 0, 0.25), inset 0 1px rgba(255, 255, 255, 0.1);
}
</style>
<div class="modal modal-blur fade modal-alert modal-success" id="modal-success" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-sm modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-status bg-success"></div>
                <div class="modal-body text-center py-4">
                    <!-- Download SVG icon from http://tabler-icons.io/i/circle-check -->
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon mb-2 text-green icon-lg" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <circle cx="12" cy="12" r="9" />
                        <path d="M9 12l2 2l4 -4" />
                    </svg>
                    <div class="text-muted" id="text_success">Details Saved Successfully</div>
                </div>
                <div class="modal-footer">
                    <div class="w-100">
                        <div class="row">
                            <div class="col-3"></div>
                            <div class="col-6 danger-button" style="text-align:center;" id="confirm-div">
                                <a id='successok' href="#" class="btn btn-success w-50" data-dismiss="modal" aria-label="Close">
                                    Ok
                                </a></div>
                                <div class="col-3"></div>
                        </div>
                    </div>

                    <!-- <div class="w-100">
                        <div class="row">
                            <div class="col-6 offset-lg-4 danger-button" id="confirm-div"><a id='successok' href="#" class="btn btn-success w-50" data-dismiss="modal" aria-label="Close">
                                    Ok
                                </a></div>
                        </div>
                    </div> -->
                </div>
            </div>
        </div>
    </div>
    <div class="modal modal-blur fade modal-alert modal-danger" id="modal-danger" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-sm modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-status bg-danger"></div>
                <div class="modal-body text-center py-4">
                    <!-- Download SVG icon from http://tabler-icons.io/i/alert-triangle -->
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon mb-2 text-danger icon-lg" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M12 9v2m0 4v.01" />
                        <path d="M5 19h14a2 2 0 0 0 1.84 -2.75l-7.1 -12.25a2 2 0 0 0 -3.5 0l-7.1 12.25a2 2 0 0 0 1.75 2.75" />
                    </svg>
                    <div class="text-muted" id="text_error"></div>
                    
                </div>
                <div class="modal-footer">
                    <div class="w-100">
                        <div class="row">
                            <div class="col" id="confirm-div">
                            <a href="#" class="btn btn-danger w-100"  id="modal-danger-ok" >
                                    Ok
                            </a></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="modal modal-blur fade modal-alert modal-danger" id="modal-spinner" tabindex="-1" role="dialog" aria-hidden="true" style="width: 60%;left: 14rem;" data-backdrop="static">
        <div class="modal-dialog modal-sm modal-dialog-centered" role="document">
            <div class="modal-content" style="background-color: #fafcfc !important;">
                <div class="modal-status"></div>
                <div class="modal-body text-center py-4">
                    <div  id="text_spinner">
                     <img style="width:80px;height: 80px;" src="{{ asset('images/Loader2.gif') }}" alt=""> 
                </div>
                </div>
                <div class="modal-footer">
                    <div class="w-100">
                        <div class="row">
                            <div class="col text-center company">
                                Loading Please Wait..
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>

    <div class="modal modal-blur fade modal-alert modal-danger" id="process-bar" tabindex="-1" role="dialog" aria-hidden="true" style="width: 60%;left: 14rem;">
        <div class="modal-dialog modal-sm modal-dialog-centered" role="document">
            <div class="modal-content" style="background-color: #fafcfc !important;">
                <div class="modal-status"></div>
                <div class="modal-body text-center py-4">
                <div  id="text_spinner">
                    <img style="width:300px;height: 180px;" src="{{url('images/filetransfer.gif')}}" alt="">
                </div>
                </div>
                <div style="text-align: center;"> <span id="percentage">0%</span>&nbsp;Completed&nbsp;<span id="savedfile">0</span>&nbsp; of &nbsp;<span id="total_uploadfile">0</span>&nbsp; Saved</div>
                <div style="text-align: center;"> <span id="filename"></span></div>
                
                <div class="modal-footer">
                    <div class="progress">
                        <div class="progress-bar"></div>
                    </div>
                </div>
        </div>
    </div>
    </div>
    <script>
        $(document).ready(function(){
            var arrval=[
                'This Company cannot be marked as CURRENT, since the associated Client has a status as FORMER',
                'This Facility cannot be marked as CURRENT, since the associated Client or Company has a status as FORMER',
                'Client Name already exists',
                'Client Code already exists',
                'Company Name already exists',
                'Facility Name already exists',
                'License Name already exists',
                'License Status Name already exists',
                'License Standing Name already exists',
                'Task Standing Name already exists',
                'Task Type Name already exists',
                'Document Category Name already exists',
                'Document Type Name already exists',
                'Document Name already exists',
                'Document Status Name already exists',
                'Please Choose Document Confidential',
                'Help Balloon Text Should Less Then 2000 Charactor',
                'User already exists',
                'Login already exists',
                'You do not have access to this feature. Please contact Hub administrator.'
        ];

            $('#modal-danger-ok').click(function(){     
                $('#modal-danger').modal('hide');               
                        
                if($.inArray($('#text_error').text(),arrval) == -1){
                    $('.modal').modal('hide');
                }
               
            });
        });
    </script>