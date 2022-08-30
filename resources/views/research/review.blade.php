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

    <section class="review-wrapper">
        <div class="card">
            <div class="card-header p-0">
                <h2 class="card-heading">New Research</h2>
            </div>
            <div class="card-body data setup">
                <div class="row">
                    <div class="col-sm-12">
                        <h3 class="cardInner-heading purple"> <span> Job Setup </span> -> <span> Jurisdictions </span> -> <span> Questionnaire </span> -> <span class="active yellow"> Save/Submit Job </span> </h3>
                    </div>
                </div>
                <div class=" ">
                    <form action="{{ url('/new-research/save') }}" method="post" id="mange-job-research">
                        @csrf
                        <input type="hidden" name="research_job_id" value="{{ $jobResearch->id }}">
                        <input type="hidden" id="submit_type" name="submit_type" value="">
                        <div class="form-row">
                            <div class="col-sm-12">
                                <div class="mb-3">
                                    <label>Name your research job :</label> <span class="purple">{{ $jobResearch->name }}</span>
                                </div>
                            </div>
                            <div class="col-sm-12">
                                <div class="mb-3">
                                    <label>Resident State :</label> <span class="purple">{{ @$states[$jobResearch->resident_state] }}</span>
                                </div>
                            </div>
                            <div class="col-sm-12">
                                <div class="mb-3">
                                    <label>Jurisdictions : </label> <a href="{{ url('new-research/juridictions?research_job_id='. $jobResearch->id  ) }}" class="btn common-btn">Change Jurisdictions</a>
                                </div>
                            </div>
                            <div class="col-sm-12">
                                <div class="card mb-3 border-0 card-pd">
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
                                                        <input type="checkbox" name="juricdictions[]" value="{{$key}}" id="{{$key}}" class="jurisdictions_check" {{ in_array($key, $jobResearch->juricdictions) ? "checked" : "" }}>
                                                    </div>
                                                </div>
                                            </div>

                                        @if($temp == 10)
                                            </div>
                                        @endif
                                    @endforeach
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-12">
                                <div class="mb-3">
                                    <label>Whould you like to include checks for requirements in jurisdictions that your product may end up in :</label> <span>{{ @$requirements_checks_include->resident_state?:"No" }}</span>
                                </div>
                            </div>

                            <div class="col-sm-12">
                                <div class="mb-3">
                                    <label>Questionnaire : </label> <a href="{{ url('new-research/questionaire?research_job_id='. $jobResearch->id  ) }}" class="btn common-btn">Change Questionnaire</a>
                                </div>
                                <div class="row">
                                    {!! $formFields !!}
                                </div>
                            </div>
                                


                        </div>

                        <button type="button" class="btn common-btn mr-3" id="save_research_job">Save Job</button>
                        <button type="button" class="btn common-border-btn" id="save_submit_job">Submit Job</button>

                    </form>
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