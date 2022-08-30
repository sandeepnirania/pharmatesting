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

    <section class="questionaire-wrapper">
        <div class="card">
            <div class="card-header p-0">
                <h2 class="card-heading">New Research</h2>
            </div>
            <div class="card-body data">
                <div class="row">
                    <div class="col-sm-12">
                        <h3 class="cardInner-heading purple"> 
                            <span> Job Setup </span> -> 
                            <span> Jurisdictions </span> -> 
                            <span class="active yellow"> Questionnaire </span> 
                        </h3> 
                        <button type="button" class="btn common-btn" id="clear_all_questionnaire">Clear All</button>
                    </div>
                </div>
                <div class=" ">
                    <form action="{{ url('/new-research/review') }}" method="post" id="mange-job-research">
                        @csrf
                        <input type="hidden" name="step" value="questionaire">
                        <input type="hidden" name="research_job_id" value="{{ $jobResearch->id }}">
                        <div class="form-row flex-column">

                            {!! $formFields !!}
                            
                            <hr>
                        </div>
                        <button type="button" class="btn common-btn" id="save_questionnaires">Next</button>
                    </form>
                </div>
            </div>
        </div>
    </section>
    <script>
        BASE_URL = "{{ url('/') }}";
    </script>
    <script src="{{url('theme/build/js/research.js')}}?{{ config('app.version') }}"></script>
</main>
@endsection('content')