function loginInv(){

  var data = new FormData();
  var url = window.location.origin + '/resetpassword.html';
  data.append('email', document.getElementById('email').value);
  data.append('url', `${url}`);
  

  $('.spinner').removeClass('disp-0');
  $('.submitbtn').addClass('disp-0');

  var config = {

    
    method: 'post',
    url: 'https://paysprint.ca/api/v1/investor/forgot-password',
    headers: { 
      'Authorization': 'Bearer base64:JFM+PJaWD/pBypX+NhXudDrAmianZdGYZ41qz4WhXL0='
    },
    data : data
  };

  
  axios(config)
  .then(function (response) {
    $('.spinner').addClass('disp-0');
    $('.submitbtn').removeClass('disp-0');

    // console.log(response);

    swal('Great!', response.data.message, 'success');
  })
  .catch(function (error) {
    $('.spinner').addClass('disp-0');
    $('.submitbtn').removeClass('disp-0');
    swal('Oops!', error.message, 'error')

    

    console.log(error);
  });

}

function resetPw(){
var data = new FormData();
var email = new URLSearchParams(window.location.search).get('id');
 data.append('email', email);
 data.append('newPassword', document.getElementById('password').value);
 data.append('confirmPassword', document.getElementById('confirm-password').value);


 $('.spinner').removeClass('disp-0');
 $('.submitbtn').addClass('disp-0');

var config = {
  method: 'post',
  url: 'https://paysprint.ca/api/v1/investor/reset-password',
  headers: { 
    'Authorization': ' Bearer base64:JFM+PJaWD/pBypX+NhXudDrAmianZdGYZ41qz4WhXL0=', 
   
  },
  data : data
};
axios(config)
.then(function (response) {
  $('.spinner').addClass('disp-0');
  $('.submitbtn').removeClass('disp-0');
  swal('Great!', response.data.message, 'success');

  setTimeout(() => {
    window.location.href = 'login.html';
    
    
  }, 2000);

  // 
})

.catch(function (error) {
 $('.spinner').addClass('disp-0');
  $('.submitbtn').removeClass('disp-0');

  if (error.response) {
    swal('Oops!', error.response.data.message, 'error');
  }
  else{
    swal('Oops!', error.message, 'error')
  }

  
});
}