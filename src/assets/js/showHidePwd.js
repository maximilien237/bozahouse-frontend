
  function showAndHidePassword() {
  let x = document.getElementById("pwd");
  if (x.type === "password"){
  x.type = "text";
}else {
  x.type = "password";
}
}

  function showAndHideConfPassword() {
    let x = document.getElementById("confPwd");
    if (x.type === "password"){
      x.type = "text";
    }else {
      x.type = "password";
    }
  }

/*  const togglePassword = document.querySelector(#togglePassword);
  const password = document.querySelector(#pwd);
  togglePassword.addEventListener('click', function (e){
    //toggle the type attribute
    const type = password.getAttribute('type') === 'password'?'text':'password';
    password.setAttribute('type',type);
    //toggle the eye slash icon
    this.classList.toggle('bi bi-eye-slash')
  })*/
