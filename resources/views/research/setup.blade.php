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

    <section class="setup-wrapper">
        <div class="">
            <div class="card">
                <div class="card-header p-0">
                    <h2 class="card-heading">New Research</h2>
                </div>
                <div class="card-body data setup">
                    <div class="row">
                        <div class="col-sm-12">
                            <h3 class="cardInner-heading purple"> <span class="active"> Job <span class="yellow">Setup</span> </span></h3>
                        </div>
                    </div>
                    <div class=" ">
                        <form action="{{ url('/new-research/juridictions') }}" method="post" id="mange-job-research">
                            @csrf
                            <input type="hidden" name="step" value="job-setup">
                            <div class="form-row">
                                <div class="col-lg-4 col-md-6">
                                    <div class="mb-3">
                                        <label class="form-label big-label">Name your research job <span class="red"> *</span></label>
                                        <input type="text" class="form-control" name="job_research_name" id="job-research-name" required>
                                        <input type="hidden" name="type" id="entry_type">
                                    </div>
                                </div>
                            </div>

                            <div class="form-row">
                                <div class="col-xl-5">
                                    <div class="card mb-4 border-0">
                                        <div class="table-responsive table-outer">
                                            <table class="table border-0">
                                                <tr>
                                                    <td class="light-bg align-middle big-arrow">
                                                        <i class="fa fa-arrow-right" aria-hidden="true"></i>
                                                    </td>
                                                    <td>
                                                        <div class="inner-box">
                                                            <h4>New Job</h4>
                                                            <p>
                                                                If you are starting a new research job that will be a new set of answers to the questionnaire, we suggest you start with this option which will help you configure and submit a unique new research job.
                                                            </p>
                                                        </div>
                                                    </td>
                                                    <td class="align-middle">
                                                        <div class="btn-outer">
                                                            <button id="submit-new" value="new" class="btn common-btn w-100">Next</button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </table>
                                        </div>
                                    </div>
                                    <div class="card mb-4 border-0">
                                        <div class="table-responsive table-outer">
                                            <table class="table">
                                                <tr>
                                                    <td class="align-middle">
                                                        <h6 class="">Finish <br/>Incompleted <br/>Jobs</h6>
                                                    </td>
                                                    <td class="p-0">
                                                        <div class="table-responsive">
                                                            <table class="table-inner w-100">
                                                                <thead>
                                                                    <tr>
                                                                        <th></th>
                                                                        <th>Name</th>
                                                                        <th>Created</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    @if(count($incompletedJobs))
                                                                        @foreach($incompletedJobs as $job)
                                                                            <tr>
                                                                                <td><input type="radio" value="{{ $job->id }}" name="incomplete_job_id"></td>
                                                                                <td>{{$job->name}}</td>
                                                                                <td>{{$job->created_at}}</td>
                                                                            </tr>
                                                                        @endforeach
                                                                    @else
                                                                        <tr>
                                                                            <td colspan="3">No Incomplete Research Jobs Found</td>
                                                                        </tr>
                                                                    @endif
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </td>
                                                    <td class="align-middle">
                                                        <div class="btn-outer">
                                                            <button type="button" value="incomplete" id="incomplete_research_job" class="btn common-btn w-100">Next</button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="col-xl-7">
                                    <div class="card mb-4 border-0">
                                        <div class="table-responsive table-outer">
                                            <table class="table">
                                                <tr>
                                                    <td class="light-bg align-middle big-arrow">
                                                        <i class="fa fa-arrow-right" aria-hidden="true"></i>
                                                    </td>
                                                    <td>
                                                        <div class="inner-box">
                                                            <h4>New Job from Previous Answeres</h4>
                                                            <p>
                                                                If you want to submit a new research job, but already have of the answers to
                                                                the questionnaire in a previous job you have run, you can start with this option, and 
                                                                all of your previous jurisdictions and questionnaire answers will be auto-filled in, and 
                                                                you will be provided the opportunity to edit any of the previous information before 
                                                                submitting a new research job, or simply resubmit the same information as a new 
                                                                job to see if any requirements have changes since the last time you ran the job.
                                                            </p>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </table>
                                        </div>
                                    </div>
                                    <div class="card mb-4 border-0">
                                        <div class="table-outer p-4">
                                            <h4>Select a job below to start with</h4>
                                            <div class="table-responsive scrollBar">
                                                <table class="table table-inner">
                                                    <thead>
                                                        <tr>
                                                            <th></th>
                                                            <th>Name</th>
                                                            <th>Created</th>
                                                            <th>Last Run</th>
                                                            <th>Status</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        @if(count($allJobs))
                                                            @foreach($allJobs as $job)
                                                                <tr>
                                                                    <td><input type="radio" value="{{ $job->id }}" name="copy_from_job_id"></td>
                                                                    <td>{{$job->name}}</td>
                                                                    <td>{{$job->created_at}}</td>
                                                                    <td>{{$job->created_at}}</td>
                                                                    <td>{{$job->status == 0 ? "Incomplete" : "New"}}</td>
                                                                </tr>
                                                            @endforeach
                                                        @else
                                                            <tr>
                                                                <td colspan="5">No Research Jobs Found</td>
                                                            </tr>
                                                        @endif
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div class="btn-outer">
                                                <button type="button" value="new-prev" id="copyfrom_research_job" class="btn common-btn mt-4">Next</button>
                                            </div>
                                        </div>
                                        
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