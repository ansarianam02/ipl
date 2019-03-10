 //first Page
 var validMobileNumber = "Please Enter Valid Mobile Number .";
 var emptyMobileNumber = "Please Enter Mobile Number to continue";
 var termsError ="Please Agree to terms and condition";
 var emptyOtp = "Please Enter OTP ";
 var registMandatory = "Please fill All Mandatory fields";
 var ValidEmailError = "Please Enter Valid Email ID";
 var apiurl = "https://maazaqa.bigcitydays.com/v1/api/";
 var tokenVal = '';

// comment this for testing on desktop
var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
		if (isMobile) {
  			console.log("using mobile");
		} 
//comment the above for testing on desktop

//Initial call to get token val
 //initCall();
 function hideError(){
    $('.err-container').hide();
   }

   var validateotp =function(otpNumber){

var form = new FormData();
form.append("token", tokenVal);
form.append("otp", otpNumber);

var settings = {
  "async": true,
  "crossDomain": true,
  "url": apiurl+"validateotp",
  "method": "POST",
  "headers": {
    "cache-control": "no-cache",
    "postman-token": "33f15ab9-bef1-1aeb-da10-9a973d8fd501"
  },
  "processData": false,
  "contentType": false,
  "mimeType": "multipart/form-data",
  "data": form
}

  
$.ajax(settings).done(function (response) {
  
  var res =JSON.parse(response)
  if(res.status==0){
    // window.location = "intro.html";
//     showError(res.msg);
	  $('.errs-container').show();
      $('.errs-msg').html(res.msg);
  }
  else{
    //call checkl user
    var phoneVal = $('#phonenumber').val();
    checkuser(phoneVal);
    
    // show More detail section
    // $('.otpSection').hide();
    // $('.moreDetailSection').show();
    
  }

 });

}


function initCall(){
//readParameter and redirect
var tree=new URLSearchParams(window.location.search);
var packagecode = tree.get('packagecode');
var route ;
if(packagecode==null){
  console.log('Redirected !!');
    //check user route 
    route = localStorage.getItem('userRoute');

    tokenVal = localStorage.getItem('tokenVal');
  if(typeof route == 'undefined' || route==null || !route || route =='false'){
      $('.right-partition ').hide();
      $('.err-msg').html('Invalid packge code. Please access this using the right URL');
      $('.err-container').show()
    }
}
else{
  localStorage.setItem('userRoute',false);
  console.log('With token !!');
    var user = "muser1";
    var pass= "@122asdas9898";
    var form = new FormData();
    form.append("user", user );
    form.append("pass", pass);
    form.append("code", packagecode);

    var settings = {
      "async": true,
      "crossDomain": true,
      "url": "https://maazaqa.bigcitydays.com/v1/api/authenticate",
      "method": "POST",
      "headers": {
        "cache-control": "no-cache",
        "postman-token": "93ec2fb4-ae26-c071-8ac7-e2fdb1986372"
      },
      "processData": false,
      "contentType": false,
      "mimeType": "multipart/form-data",
      "data": form
    }

    $.ajax(settings).done(function (response) {
        //set token value
	    var response = JSON.parse(response);
         localStorage.setItem('tokenVal', response.token);
        localStorage.setItem('userRoute',true);

         window.location.href = "https://app-maaza.herokuapp.com/index.html";
    });
  }
}
var updateuser =function(name,email,age,gender,state){

var form = new FormData();
form.append("token", tokenVal);
form.append("name", name);
form.append("email", email);
form.append("age", age);
form.append("gender", gender);
form.append("state", state);

var settings = {
  "async": true,
  "crossDomain": true,
  "url": apiurl+"updateuser",
  "method": "POST",
  "headers": {
    "cache-control": "no-cache",
    "postman-token": "29bb3f58-fcb2-c17d-5114-48b4c5035200"
  },
  "processData": false,
  "contentType": false,
  "mimeType": "multipart/form-data",
  "data": form
}


//remove it later
window.location='intro.html';
$.ajax(settings).done(function (response) {
   var res =JSON.parse(response)
  if(res.status==1){
    window.location='intro.html';   
  }

});
}

  $(document).on('click','.btn-mobile-submit',function(e){
	  
	   
    var phoneVal = $('#phonenumber').val();
    $('#replacemob').html(phoneVal);
    function showError(errMsg) {
      $('.err-container').show();
      $('.err-msg').html(errMsg);
   }

   function hideError(){
    $('.err-container').hide();
   }
  	hideError();
    //e.preventDefault();
    var phoneVal = $('#phonenumber').val();
    var terms = $('#terms').is(":checked");

    if(phoneVal.length <=0 ){
    	showError(emptyMobileNumber);
    	return true;
    }

    var phonenumber = function (inputtxt){
  var phoneno = /^\d{10}$/;
  if(inputtxt.match(phoneno)){
          return true;
    }else{
        return false;
   }
 }

    var valid = phonenumber(phoneVal); 
    if(!valid){

      //show Error that mobile Number is not valid
      showError(validMobileNumber);
      return true;
    }else if(!terms){      
      //show terms Error
      showError(termsError);
      return false;
	}else{

    var registeruser =function(mobilenum){

var form = new FormData();
form.append("token", tokenVal);
form.append("mobilenum",mobilenum);

var settings = {
  "async": true,
  "crossDomain": true,
  "url": apiurl+"registeruser",
  "method": "POST",
  "headers": {
    "cache-control": "no-cache",
    "postman-token": "0307db79-5eec-1590-dade-133827dbc697"
  },
  "processData": false,
  "contentType": false,
  "mimeType": "multipart/form-data",
  "data": form
}

$.ajax(settings).done(function (response) {
  var res =JSON.parse(response)
    if(res.status==1){
       //show otp and hide Error
     $('.regSection').hide();
     $('.banner-container').remove();
     $('.otpSection').show();
     $('.err-container').hide();

    runTimer();

    }else{
	$('.err-container').show();
	    var errorMsg = res.msg;
	    $('.err-msg').html(errorMsg);

    }
    
});

}

	   registeruser(phoneVal);    	
	}	
    
  });
function runTimer(){
   var timeleft = 30;
    var downloadTimer = setInterval(function(){
    timeleft--;
    document.getElementById("countdowntimer").textContent = timeleft;
    if(timeleft <= 0){        
        clearInterval(downloadTimer);
        $('.resendMsg').hide();
        document.getElementById("resendotp").classList.add("red-t");       
      }
    },1000);

}

  $(document).on('click','.validate-otp',function(e){
     //e.preventDefault();
     hideError();
    
     var isDisabled =  $('.validate-otp').hasClass('btn-disabled');
     if(isDisabled){
     	return true;
     }
     
    //otp empty
    var otpVal = $('#otpvalue').val();
    var phoneVal = $('#phonenumber').val();

    if(otpVal.length <=0 ){
    	showError(emptyOtp);
    	return true;
    }else{
    	//disable btn for 30 sec
		// $('.validate-otp').addClass('btn-disabled');
		//  //enable after 30 sec
  // 		setTimeout(function(){ $('.validate-otp').removeClass('btn-disabled'); }, 30000);
		validateotp(otpVal); 
      
    }
    
  });


  $(document).on('click','.btn-detail-submit',function(e){
    //e.preventDefault();
    hideError();
    
    var firstVal = $('#firstname').val();
    var emailVal = $('#email').val();
    var genderVal = $('#gender').val();
    var age =  $('#age').val();
    var stateVal = $('#state').val()
    var isEmailValid = isEmail(emailVal);
   
    if(firstVal.length <=0 || emailVal.length <=0  || isEmpty(stateVal) ) {
    	showError(registMandatory);
    	return true;
    }else if(!isEmailValid){
    	showError(ValidEmailError);
    	return true;
    }else{
    	//redirect to next Page
    	updateuser(firstVal,emailVal,age,genderVal,stateVal);
      
      //window.location='fill.html';	
    }

   }); 
  //resendotp
  var resendAttempt = 0 , resendMsg='';
  $(document).on('click','.otp-container',function(e){
    var isResendAvailable = $('#resendotp').hasClass('red-t');
    if(!isResendAvailable)
        return false;

    if(resendAttempt <= 3){ 
      //remove red-t active status from link     
      $('#resendotp').removeClass('red-t');

      resendAttempt++;
      resendotp();
      
    }
      
  });
  function isEmpty(value){
	  return (value == undefined || typeof value == undefined || value.length === 0);
	}
   function showError(errMsg) {
	  	$('.err-container').show();
	    $('.err-msg').html(errMsg);
   }

   function hideError(){
		$('.err-container').hide();
   }
   function isEmail(email) {
	  var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	  return regex.test(email);
	}



/*fill page script*/
var baseUrl =  'https://maazaqa.bigcitydays.com/api/';
/*
* authenticate($user, $pass) $result = [
'type' => 'ERROR', 'msg' => 'Authentication failed', 'status' => 10, ]; $result = [
'type' => 'ERROR', 'msg' => 'Session invalid', 'status' => 15, ]; $result = [
'type' => 'SUCCESS', 'msg' => 'Authentication successful', 'data' => [ $token => 'asd!@#!#ASDASED' ], 'status' => 1, ];
*
*/ 
var authenticate =function(){

var userVal = '';
var passVal = '';

/*$.ajax({
  type: "GET",
  url: baseUrl + "authenticate",
  data: {
	  	user: userVal ,
	  	pass :passVal
  	},
  cache: false,
  success: function(data){
     $("#resultarea").text(data);
  }
});*/



}


/*
* checkuser($token, $mobilenum) $result = [
'type' => 'SUCCESS', 'msg' => 'Valid User', 'status' => 1, ];
*
*****/
var checkuser =function(mobilenum){

var form = new FormData();
form.append("token", tokenVal);
form.append("mobilenum",mobilenum);

var settings = {
  "async": true,
  "crossDomain": true,
  "url": apiurl+"checkuser",
  "method": "POST",
  "headers": {
    "cache-control": "no-cache",
    "postman-token": "0307db79-5eec-1590-dade-133827dbc697"
  },
  "processData": false,
  "contentType": false,
  "mimeType": "multipart/form-data",
  "data": form
}

$.ajax(settings).done(function (response) {
	var res =JSON.parse(response)
    if(res.lastletter==0){
       //show otp and hide Error
	   // $('.regSection').hide();
	   // $('.banner-container').remove();
	   // $('.otpSection').show();
	   // $('.err-container').hide();
         $('.otpSection').hide();
    $('.moreDetailSection').show();
    }else{
    window.location = "intro.html";
    }
    
});



}


/*
registeruser($token, $mobilenum) $result = [
'type' => 'SUCCESS', 'msg' => 'User registered', 'status' => 1, ];
*/
var registeruser =function(mobilenum){

var form = new FormData();
form.append("token", tokenVal);
form.append("mobilenum",mobilenum);

var settings = {
  "async": true,
  "crossDomain": true,
  "url": apiurl+"registeruser",
  "method": "POST",
  "headers": {
    "cache-control": "no-cache",
    "postman-token": "0307db79-5eec-1590-dade-133827dbc697"
  },
  "processData": false,
  "contentType": false,
  "mimeType": "multipart/form-data",
  "data": form
}

$.ajax(settings).done(function (response) {
	var res =JSON.parse(response)
    if(res.status==1){
       //show otp and hide Error
	   $('.regSection').hide();
	   $('.banner-container').remove();
	   $('.otpSection').show();
	   $('.err-container').hide();

     var timeleft = 30;
    var downloadTimer = setInterval(function(){
    timeleft--;
    document.getElementById("countdowntimer").textContent = timeleft;
    if(timeleft <= 0){
        clearInterval(downloadTimer);
        document.getElementById("resendotp").classList.add("red-t");
      }
    },1000);

    }else{
	$('.err-container').show();
	    var errorMsg = res.msg;
	    $('.err-msg').html(errorMsg);
    }
    
});

}


/*
*validateotp($token, $otp) $result = [
'type' => 'SUCCESS', 'msg' => 'OTP OK', 'status' => 1, ]; $result = [
'type' => 'ERROR', 'msg' => 'OTP not valid’, 'status' => 0, ];
*/



/*
* resendotp($token) $result = [
'type' => 'SUCCESS', 'msg' => 'OK', 'status' => 1, ]; $result = [
'type' => 'ERROR', 'msg' => 'Do check first’, 'status' => 0, ];
*/
var resendotp =function(){
  

var form = new FormData();
form.append("token", tokenVal);

var settings = {
  "async": true,
  "crossDomain": true,
  "url": "https://maazaqa.bigcitydays.com/v1/api/resendotp",
  "method": "POST",
  "headers": {
    "cache-control": "no-cache",
    "postman-token": "2438cbd2-b3fe-2cee-5322-d33648724e86"
  },
  "processData": false,
  "contentType": false,
  "mimeType": "multipart/form-data",
  "data": form
}

$.ajax(settings).done(function (response) {
  //run timer 
  runTimer();
  $('.resendMsg').show();
  console.log(response);
});

}



/*
*  updateuser($token, $name, $email, $city, $state) $result = [
'type' => 'SUCCESS', 'msg' => 'Updated OK', 'status' => 1, ]; $result = [
'type' => 'ERROR', 'msg' => 'Invalid ...’, 'status' => 0, ];
*/




/*
*  closegame($token, $iscomplete, $userchoice) $result = [
'type' => 'SUCCESS', 'msg' => 'OK', 'data' => [ $letterno => 1 ], 'status' => 1, ];
$result = [
'type' => 'ERROR', 'msg' => 'Game not eligible’, 'data' => [], 'status' => 0, ];
Iscomplete – true or false to indicate if game was successfully done
*
*/
var closegame =function(){
var mobilenumVal = $('#phonenumber').val();

$.ajax({
  type: "GET",
  url: baseUrl + "closegame",
  data: {
	  	token: tokenVal ,
	  	mobilenum : mobilenumVal
  	},
  cache: false,
  success: function(data){
     $("#resultarea").text(data);
  }
});

}



var phonenumber = function (inputtxt){
  var phoneno = /^\d{10}$/;
  if(inputtxt.match(phoneno)){
      		return true;
    }else{
        return false;
   }
 }




/*
API details 
authenticate($user, $pass) $result = [
'type' => 'ERROR', 'msg' => 'Authentication failed', 'status' => 10, ]; $result = [
'type' => 'ERROR', 'msg' => 'Session invalid', 'status' => 15, ]; $result = [
'type' => 'SUCCESS', 'msg' => 'Authentication successful', 'data' => [ $token => 'asd!@#!#ASDASED' ], 'status' => 1, ];
checkuser($token, $mobilenum) $result = [
'type' => 'SUCCESS', 'msg' => 'Valid User', 'status' => 1, ];
registeruser($token, $mobilenum) $result = [
'type' => 'SUCCESS', 'msg' => 'User registered', 'status' => 1, ];
validateotp($token, $otp) $result = [
'type' => 'SUCCESS', 'msg' => 'OTP OK', 'status' => 1, ]; $result = [
'type' => 'ERROR', 'msg' => 'OTP not valid’, 'status' => 0, ];
resendotp($token) $result = [
'type' => 'SUCCESS', 'msg' => 'OK', 'status' => 1, ]; $result = [
'type' => 'ERROR', 'msg' => 'Do check first’, 'status' => 0, ];
updateuser($token, $name, $email, $city, $state) $result = [
'type' => 'SUCCESS', 'msg' => 'Updated OK', 'status' => 1, ]; $result = [
'type' => 'ERROR', 'msg' => 'Invalid ...’, 'status' => 0, ];
getgame($token) $result = [
'type' => 'SUCCESS', 'msg' => 'OK', 'data' => [ $letterno => 1 ], 'status' => 1, ];
$result = [
'type' => 'ERROR', 'msg' => 'Game not eligible’, 'data' => [], 'status' => 0, ];
closegame($token, $iscomplete, $userchoice) $result = [
'type' => 'SUCCESS', 'msg' => 'OK', 'data' => [ $letterno => 1 ], 'status' => 1, ];
$result = [
'type' => 'ERROR', 'msg' => 'Game not eligible’, 'data' => [], 'status' => 0, ];
Iscomplete – true or false to indicate if game was successfully done
*/
