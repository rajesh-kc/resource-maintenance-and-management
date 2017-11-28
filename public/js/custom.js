$(document).ready(function(){
    $('#example').dataTable();

    $('.date-picker').datepicker({
        orientation: "top auto",
        autoclose: true,
        format: 'yyyy-mm-dd'
    });


      $('#agency_id').on('change', function(e){

        //alert(JSON.stringify(agencies_info));
        var agency_id = $('#agency_id').val();
        $('#resource_id option').remove();
        $('#resource_id').append('<option value="">Select Resource</option>');
        if(agency_id){
          $.each(agencies_info, function(key, val){
            if(val.id == agency_id){
              //alert(JSON.stringify(val));
              var resources_filter = val.Resources;
              if(resources_filter.length > 0){
                  $.each(resources_filter, function(k, v){
                    $('#resource_id').append('<option value="'+v.id+'">'+v.equipment_name+'</option>')
                  })
              }

            }
          });
        } else {

        }

      });


      $('#service_id').on('change', function(e){
        var service_id = $(this).val();
        $('#duration option').remove();
        $('#amount').val('');
        $('#duration').append('<option value="">Select duration</option>');
        if(service_id){
          if(services_list.length > 0){
            //alert(JSON.stringify(services_list));
            $.each(services_list, function(key, service){
              if(service.id == service_id){
                for(var i=1;i<=5;i++){
                  $('#duration').append('<option value="'+i*service.duration+'">'+i+' * '+service.duration+' day(s) = '+i*service.duration+' day(s)'+'</option>');  
                }
                
              }
            });
          }
        }
      });

      $('#duration').on('change', function(e){
        var duration = $(this).val();
        var service_id = $('#service_id').val();
        $('#amount').val('');
        if(duration){
          $.each(services_list, function(key, service){
            if(service_id == service.id){
              var amount = (duration/service.duration)*service.price;
              $('#amount').val(amount);
            }
          });
        }
      });

});
