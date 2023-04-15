window.onload = function(){
    document.getElementById('mnp').style.display = 'none';
    document.getElementById('inicioface').style.display = 'none';
};

$(document).ready(function(){


    $("#gogl").click(function(){
        $("#cont").hide();
        $("#inicioface").hide();
        $("#mnp").show()
    });

    
    $("#btn").click(function(){
        $("#mnp").hide();
        $("#inicioface").hide();
        $("#cont").show()
    });

});

//facebook api
window.fbAsyncInit = function() {
    FB.init({
      appId      : '666522178221854',
      cookie     : true,
      xfbml      : true,
      version    : 'v15.0'
    });
      
    FB.AppEvents.logPageView();   
      
  };

(function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "https://connect.facebook.net/es_LA/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

//validar si el usuario ha iniciado sesion o no y 
  $(document).ready(function(){
    $('#btn_init').click(function() {
      FB.login(function(response) {
        FB.api('/me', function(response){
          console.log(response);
          $('#infoN').html(response.name);
        });
          $("#inicioface").show();
          $("#cont").hide();
    
        $('#lb_msj').html('Sesión iniciada');
     });
    });
    

    $('#btn_out').click(function() {
      FB.logout(function(response) {
       // if (response.status === 'disconnected') {
          $("#inicioface").hide();
          $("#cont").show();
    
        $('#lb_msj').html('Sesión cerrada');
        /*} else {
          alert('No ha serrado sesión');
        }*/
     });
    });
  });

  function get_user_picture(){

		FB.getLoginStatus(function(response) {
			console.log(response.status);
		  if (response.status === 'connected') {
		  	
		  	FB.api('/'+ response.authResponse.userID+'/picture?redirect=false' , function(response2) {
		       		//$('#get_user_picture').html(response2.data.url); Revisa el enlace de Imagen Usuario
              document.getElementById("userPic").src=response2.data.url;
			});
		    
		  } else if (response.status === 'not_authorized') {
		    // the user is logged in to Facebook, 
		    // but has not authenticated your app
		  } else {
		    FB.login(function(response) {});
		  }
		});
	}

  function postStory(){
    FB.ui({
      method: 'share',
      display: 'popup',
      href: 'https://www.youtube.com',
      caption: 'tuturiales',
      description: 'canal de youtube'
    }, function(response){
      if(response && !response.error_message){
        $('#lbmsj').text('link posteado'+response.post_id);
      }
      else{
        $('#lbmsj').text('error...');
      }
    });
  }
