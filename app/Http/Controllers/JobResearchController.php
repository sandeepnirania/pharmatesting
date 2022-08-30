<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\JobResearch ;

class JobResearchController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    // public function __construct()
    // {
    //     $this->middleware('auth');
    // }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function addResearch(Request $request, $step = 'job-setup'){

        if($step === "job-setup"){
            $allJobs = JobResearch::all();
            $incompletedJobs = JobResearch::filter('status', '=', 0)->scan();
            return view('research.setup', compact('allJobs', 'incompletedJobs'));
        }
        $cJobResearch = false ;
        if($step === "juridictions"){
            if( $request->isMethod('post') ){
                if( $request->get('type') === "new" ){
                    // var_dump([
                    //     'id' => JobResearch::getNextId(),
                    //     'name' => $request->get('job_research_name'),
                    //     'user_id' => auth()->user()->id,
                    //     'status' => 0
                    // ]);
                    // die;
                    $jobResearch = JobResearch::create([
                        'id' => JobResearch::getNextId(),
                        'name' => $request->get('job_research_name'),
                        'user_id' => auth()->user()->id,
                        'status' => 0
                    ]);
                }
                
                if($request->get('type') === "process_incomplete"){
                    $jobResearch = JobResearch::filter('id', '=', $request->get('incomplete_job_id'))->scan();
                    $jobResearch = $jobResearch[0];
                    if($request->get('job_research_name') && $request->get('job_research_name') !== ""){
                        $jobResearch->update([
                            'name' => $request->get('job_research_name')
                        ]);
                    }
                }

                if($request->get('type') === "copy_from"){
                    $jobResearch = JobResearch::create([
                        'id' => JobResearch::getNextId(),
                        'name' => $request->get('job_research_name'),
                        'user_id' => auth()->user()->id,
                        'status' => 0
                    ]);
                    $cJobResearch = JobResearch::filter('id', '=', $request->get('copy_from_job_id'))->scan();
                    $cJobResearch = $cJobResearch[0];
                }
            }else{
                $jobResearch = JobResearch::filter('id', '=', $request->get('research_job_id'))->scan();
                $jobResearch = $jobResearch[0];
            }
            if(!$cJobResearch){
                $cJobResearch = $jobResearch ;
            }
            $states = JobResearch::states();
            return view('research.juricdictions', compact('states', 'jobResearch', 'cJobResearch'));
        }

        if( $step === "questionaire" ){

            if( $request->isMethod('post') ){
                $jobResearch = JobResearch::filter('id', '=', $request->get('research_job_id'))->scan();
                $jobResearch = $jobResearch[0];
                $jobResearch->update([
                    'resident_state' => $request->get('resident_state'),
                    'juricdictions' => $request->get('juricdictions'),
                    'requirements_checks_include' => $request->get('requirements_checks_include'),
                ]);
                
            }else{
                $jobResearch = JobResearch::filter('id', '=', $request->get('research_job_id'))->scan();
                $jobResearch = @$jobResearch[0];
            }

            if( $request->get('copy_from_job_id') ){
                $cJobResearch = JobResearch::filter('id', '=', $request->get('copy_from_job_id'))->scan();
                $cJobResearch = @$cJobResearch[0];
            }

            if(!$cJobResearch){
                $cJobResearch = $jobResearch ;
            }
            
            $questionaireContent = file_get_contents(public_path('forms/Job_Setup_Questionnaire_Hierarchy.json'));
            $questionaire = json_decode($questionaireContent);
            $formFields = $this->prepareFormFields($questionaire, $cJobResearch);
            return view('research.questionaire', compact('questionaire', 'formFields', 'jobResearch'));
        }

        if( $step === "review" ){
            if( $request->isMethod('post') ){
                $jobResearch = JobResearch::filter('id', '=', $request->get('research_job_id'))->scan();
                $jobResearch = $jobResearch[0];
                $jobResearch->update([
                    'questionnairs' => $request->get('questionnaire')
                ]);
                $jobResearch = JobResearch::filter('id', '=', $request->get('research_job_id'))->scan();
                $jobResearch = @$jobResearch[0];
            }else{
                $jobResearch = JobResearch::filter('id', '=', "2")->scan();
                $jobResearch = @$jobResearch[0];
            }
            $questionaireContent = file_get_contents(public_path('forms/Job_Setup_Questionnaire_Hierarchy.json'));
            $questionaire = json_decode($questionaireContent);
            $formFields = $this->reviewFormFields($questionaire, $jobResearch);
            $states = JobResearch::states();
            return view('research.review', compact('questionaire', 'formFields', 'jobResearch', 'states'));
        }

        if($step == "save"){
            $jobResearch = JobResearch::filter('id', '=', $request->get('research_job_id'))->scan();
            $jobResearch = $jobResearch[0];
            $jobResearch->update([
                'status' => "1"
            ]);
            if($request->get('submit_type') === "save"){
                return redirect('new-research/job-setup');   
            }
            if($request->get('submit_type') === "submit"){
                return redirect('research-results');
            }
        }

        if($step == "check-name"){
            $researchJob = JobResearch::filter('name', '=', $request->name)->filterIn('status',[ "1", "2"])->scan();
            if( count($researchJob) ){
                return json_encode(['status'=> false, 'message' => "Resarch job Name already taken"]);
            }
            return json_encode(['status'=> true, 'message' => "Resarch job Name available"]);
        }
    }

    private function prepareFormFields($questionaire, $jobResearch){
        $html = "";
        foreach($questionaire as $question){
            $html .= '<div class="col-sm-12 '. strtolower($question->short) .'">
                <h4 class="card-header">'. $question->title .'</h4>
            </div>';
            $short = $question->short;
            if(isset($question->$short) && count($question->$short)){
                foreach($question->$short as $sub){
                    $html .= $this->getInnerFields($sub, $jobResearch);
                }
            }
        }
        return $html ;
    }

    private function getInnerFields($question, $jobResearch){
        $questionnairs = false ;
        if(@$jobResearch->questionnairs){
            $questionnairs = $jobResearch->questionnairs;
        }
        $field = '<ul>
                    <li class="question-container">';
                if($question->type == "radio"){
                    $field .= '<label> <i class="fas fa-arrow-right"></i>'. $question->question .'</label><span>';
                    foreach($question->options as $option){
                        $field .= '<input type="radio" name="questionnaire['.$question->label.']" id="'.$question->label.'_'.$option->val.'" class="questionnaire_input" value="'.$option->val.'" '.(@$questionnairs[$question->label] && $questionnairs[$question->label] == $option->val ? "checked" : "").'> <label for="'.$question->label.'_'.$option->val.'">'.$option->label.'</label>';
                    }
                    $field .= "</span>";
                }else if($question->type == "checkbox"){
                    $field .= '<label for="'.$question->label.'"> <i class="fas fa-arrow-right"></i>'. $question->question .'</label>';
                    $field .= '<input type="checkbox" name="questionnaire['.$question->label.']" id="'.$question->label.'" value="Yes" class="questionnaire_input" '.( @$questionnairs[$question->label] && $questionnairs[$question->label] == "Yes" ? "checked" : "").'>';
                }else{
                    $field .= '<label> <i class="fas fa-arrow-right"></i>'. $question->question .'</label>';
                }
                
                $label = $question->label;
                if(isset($question->$label) && count($question->$label)){
                    foreach($question->$label as $sub){
                        $field .= $this->getInnerFields($sub, $jobResearch);
                    }
                }
        $field .= '</li></ul>' ;
        return $field;
    }

    private function reviewFormFields($questionaire, $jobResearch){
        $html = "";
        foreach($questionaire as $question){
            $html .= '<div class="col-lg-4 '. strtolower($question->short) .'">
                <h4 class="card-header">'. $question->title .'</h4>';
            $short = $question->short;
            if(isset($question->$short) && count($question->$short)){
                foreach($question->$short as $sub){
                    $html .= $this->reviewInnerFields($sub, $jobResearch);
                }
            }
            $html .= '</div>';
        }
        return $html ;
    }

    private function reviewInnerFields($question, $jobResearch){
        $questionnairs = false ;
        if(@$jobResearch->questionnairs){
            $questionnairs = $jobResearch->questionnairs;
        }
        $field = '<ul class="qa-ulList">
                    <li class="question-container"><div>';
                if(@$questionnairs[$question->label] == "Y" || @$questionnairs[$question->label] == "Yes"){
                    $result = "Yes";
                }else{
                    $result = "No";
                }
                if($question->type == "radio" || $question->type == "checkbox"){
                    $field .= '<div class="qa-outer"><i class="fas fa-arrow-right"></i><h5>'. $question->question .'</h5> <p>'.($result).'</p></div>';
                }else{
                    $field .= '<div><h5>'. $question->question .'</h5></div>';
                }
                
                $label = $question->label;
                if(isset($question->$label) && count($question->$label)){
                    foreach($question->$label as $sub){
                        $field .= $this->reviewInnerFields($sub, $jobResearch);
                    }
                }
        $field .= '</div></li></ul>' ;
        return $field;
    }

    public function researchResults(){
        $allJobs = JobResearch::filterIn('status',[ "1", "2"])->scan();
        return view('research.results', compact('allJobs'));
    }

}
