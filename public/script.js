const container = document.querySelector(".container");
const action_btn = document.querySelector(".action_btn");
const message_box = document.querySelector(".message_box");

const name_field = document.querySelector("#name");
const email_field = document.querySelector("#email");
const password_field = document.querySelector("#password");
const confirm_pass_field = document.querySelector("#confirm_pass");

// console.log(btn);

const post_sign_in_details = async function () {
  try {
    const sign_in_data = {
      user: name_field.value,
      email: email_field.value,
      password: password_field.value,
      passwordConfirmed: confirm_pass_field.value,
    };
    const response = await fetch("/api/user/signIn", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(sign_in_data),
    });
    // console.log(response);
    const resp_data = await response.json();
    if (resp_data.status !== "Success") {
      //   console.log(resp_data);
      //   console.log(resp_data.message);
      throw new Error(resp_data.message);
    }
    message_box.innerText = `Success! ✅`;
    message_box.classList.add("slide-in");
  } catch (err) {
    // console.log(err.message);
    message_box.innerText = `${err.message}🛑`;
    message_box.classList.add("slide-in");
  }
};

const log_in_details = async function () {
  //   console.log("Logged In");
  console.log(email_field.value, password_field.value);
  try {
    const login_details = {
      email: email_field.value,
      password: password_field.value,
    };
    const resp = await fetch("/api/user/logIn", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(login_details),
    });
    // console.log(resp);
    const resp_data = await resp.json();
    if (resp_data.status !== "Success") {
      //   console.log(resp_data);
      //   console.log(resp_data.message);
      throw new Error(resp_data.message);
    }
    message_box.innerText = `Logged In ✅`;
    message_box.classList.add("slide-in");
  } catch (err) {
    message_box.innerText = `${err.message}🛑`;
    message_box.classList.add("slide-in");
  }
};

action_btn.addEventListener("click", function (e) {
  message_box.classList.remove("slide-in");
  e.preventDefault();
  const btn = e.target.closest(".btn");
  //   console.log(btn);
  if (!btn) return;
  else if (btn.classList.contains("sign_btn")) {
    // console.log("Signed In");
    post_sign_in_details();
  } else if (btn.classList.contains("login_btn")) {
    log_in_details();
  }
});
