@extends('template.template')
@section('content')


<link href="{{url('theme/build/css/license.css')}}?<?php echo config('app.version');?>" rel="stylesheet">

<main role="main">

    <section class="">
        <div class="container-fluid ">
            <div class="row">
                <div class="col-12 li-pad">
                    <p class=" li-text">
                        New Research
                    </p>
                    <hr class="line-1">
                </div>
            </div>
            <div class="data setup">
                <div class="row">
                    <div class="col-sm-12">
                        <h3> <span class="active"> View Results </span></h3>
                    </div>
                </div>
                <div class=" ">
                    <table>
                        <thead>
                            <tr>
                                <th>Id</th>
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
                                        <td>{{ $job->id }}</td>
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
            </div>
        </div>
    </section>

</main>
@endsection('content')