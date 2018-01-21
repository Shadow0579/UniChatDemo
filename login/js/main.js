var usernameDiv;
var data;

window.onload = function () {
  if (document.cookie.replace(/(?:(?:^|.*;\s*)unichat_uid2\s*\=\s*([^;]*).*$)|^.*$/, "$1") != "") {
    location.href = "https://legend-of-iphoenix.github.io/UniChatDemo/";
  }
  usernameDiv = document.getElementById("username");
  usernameDiv.oninput = function () {
    var value = usernameDiv.value;
    if (value) {
      usernameDiv.classList = "invalid";
      if (value.length >= 2 && value.length <= 32) {
        var match = value.match(/\w{2,32}/) ? value.match(/\w{2,32}/)[0] : null;
        if (match === value) {
          usernameDiv.classList = "valid";
        }
      }
    } else {
      usernameDiv.classList = "";
    }
  }
  document.getElementById("password").oninput = function () {
    var value = document.getElementById("password").value;
    if (value) {
      document.getElementById("password").classList = "invalid";
      if (value.length >= 2 && value.length <= 32) {
        var match = value.match(/.{8,64}/) ? value.match(/.{8,64}/)[0] : null;
        if (match === value) {
          document.getElementById("password").classList = "valid";
        }
      }
    } else {
      document.getElementById("password").classList = "";
    }
  }
}

function submit() {
  function contains(json, value) {
    let keyName = false;
    Object.keys(json).some(key => {
      if (json[key] === value) {
        keyName = key;
      }
      return keyName;
    });
    return keyName;
  }
  var value = usernameDiv.value;
  if (usernameDiv.classList[0] == "valid") {
    firebase.database().ref("uids/").once('value').then(function (snapshot) {
      var uid = contains(snapshot.val(), value);
      firebase.database().ref("pass/" + uid).set(btoa(document.getElementById("password").value)).then(function () {
        document.cookie = "unichat_uid2=" + uid + ";expires=" + new Date(Date.now() + 157784760000);
        location.href = "https://legend-of-iphoenix.github.io/UniChatDemo/";
      }).catch(function (error) {
        document.getElementById("messages").innerText = "Incorrect password!";
      });
    });
  }
}
