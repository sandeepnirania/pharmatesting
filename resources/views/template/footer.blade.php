 <!--
    Function Description: footer starts here
    Author: Satish K
    Last Edited:
-->
 <footer class="copyright-footer container-fluid pl-0">
     <p>Copyright © 2021 Pharma Solutions USA, Inc. All rights reserved. ATLAS-v1.9.5.2</p>
 </footer>

 </div>
 <!--
    Function Description: footer ends here
    Author: Satish K
    Last Edited: 
-->

 <!--
    Function Description: overlay spinner for processing... message
    Author: Satish K
    Last Edited: 
-->
 <div id="overlay">
     <div class="cv-spinner">
         <span class="spinner"></span>
         <br>
         <p id="spin-text"></p>
     </div>
 </div>

 </main>
 <div class="modal fade" id="modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
     <div class="modal-dialog" role="document" id="modal-content">

     </div>
 </div>

 <div class="modal fade" id="modal-preview" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
     <div class="modal-dialog" role="document" id="modal-content">

     </div>
 </div>

 <div class="second-modal">

 </div>


 <script>
      $(document).ready(function() {
        $('.modal-preview').draggable({
            handle: "#modal-preview",
            // containment: "window"
        });
    });

     // $(document).ready(function(){
     //     $('#modal-danger-ok').click(function(){
     //         alert('hii');
     //         //$('#modal-danger').modal('hide');
     //     });
     // });
 </script>
 </body>

 </html>
