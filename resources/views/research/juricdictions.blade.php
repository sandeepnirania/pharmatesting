@extends('template.template')
@section('content')


<link href="{{url('theme/build/css/license.css')}}?<?php echo config('app.version');?>" rel="stylesheet">
<link href="{{url('theme/build/css/research.css')}}?<?php echo config('app.version');?>" rel="stylesheet">
<style>
#mange-job-research{
    margin-top: 15px;
}
</style>


<main role="main">

    <section class="jurisdictions-wrapper">
        <div class="">
            <div class="card">
                <div class="card-header p-0">
                    <h2 class="card-heading">
                        New Research
                    </h2>
                </div>

                <div class="card-body data setup">
                    <div class="row">
                        <div class="col-sm-12">
                            <h3 class="cardInner-heading purple"> <span> Job Setup </span> -> <span class="yellow active"> Jurisdictions </span></h3>
                        </div>
                    </div>
                    <div class=" ">
                        <form action="{{ url('/new-research/questionaire') }}" method="post" id="mange-job-research">
                            @csrf
                            <input type="hidden" name="step" value="juridictions">
                            <input type="hidden" name="research_job_id" value="{{ $jobResearch->id }}">
                            @if($cJobResearch->id !== $jobResearch->id)
                                <input type="hidden" name="copy_from_job_id" value="{{ $cJobResearch->id }}">
                            @endif
                            <div class="form-row">
                                <div class="col-lg-4 col-md-6">
                                    <div class="mb-3">
                                        <label class="form-label big-label">Please select your resident state <span class="red"> *</span></label>
                                        <select name="resident_state" class="form-control">
                                            @foreach($states as $key => $state)
                                                <option value="{{$key}}" {{ $cJobResearch->resident_state == $key ? "selected" : ""  }}>{{$state}}</option>
                                            @endforeach
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div class="form-row">
                                <div class="col-sm-12">
                                    <div class="card mb-3 border-0 card-pd">
                                        <div class="mb-4">
                                            <label class="form-label big-label">Please select all jurisdictions you would like to perform the reseach job on:</label>
                                            <br>
                                            <button type="button" id="jurisdictions_select_all" class="btn common-btn">Select All</button> 
                                            <button type="button" id="jurisdictions_unselect_all" class="btn common-btn common-border-btn">Clear All</button>
                                        </div>
                                        
                                        <div class="row">
                                            @php $temp = 0 ; @endphp
                                            @foreach( $states as $key => $state)
                                                @php $temp++ ; if($temp == 11){$temp=1;} @endphp
                                                @if($temp == 1)
                                                <div class="col-xl-2 col-md-4 col-sm-6 col-12 mb-4">
                                                @endif
                                                    <div class="list-checkbox">
                                                        <div class="d-flex">
                                                            <label for="{{$key}}" class="mr-1">{{$state}}</label>
                                                            <div class="ml-auto">
                                                                <input type="checkbox" name="juricdictions[]" value="{{$key}}" id="{{$key}}" class="jurisdictions_check" {{ @$cJobResearch->juricdictions && in_array($key , @$cJobResearch->juricdictions) ? "checked" : ""  }}>
                                                            </div>
                                                        </div>
                                                    </div>
                                                @if($temp == 10)
                                                </div>
                                                @endif
                                            @endforeach
                                        </div>
                                    </div>
                                
                                    <div class="my-3">
                                        <label class="form-label">Whould you like to include checks for requirements in jurisdictions that your product may end up in:</label><br/>
                                        <label for="requirements_checks_include_yes">Yes </label> <input type="radio" name="requirements_checks_include" id="requirements_checks_include_yes" value="yes" {{ @$cJobResearch && @$cJobResearch->requirements_checks_include == "yes" ? "checked" : "" }}>
                                        <label for="requirements_checks_include_no">No </label> <input type="radio" name="requirements_checks_include" id="requirements_checks_include_no" value="no" {{ @$cJobResearch && @$cJobResearch->requirements_checks_include == "no" ? "checked" : "" }}>
                                    </div>
                                    <div class="btn-outer">
                                        <button type="button" id="save_juricdis" class="btn common-btn">Next</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <script>
        BASE_URL = "{{ url('/') }}";
    </script>
    <script src="{{url('theme/build/js/research.js')}}?{{config('app.version')}}"></script>
      
    

</main>
@endsection('content')