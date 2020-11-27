let objForAllXMLHTTPRequest = {};

const submitButton = document.getElementById("submitButton");
let firstName = document.getElementById("firstName");
let lastName = document.getElementById("lastName");
let email = document.getElementById("email");
let phoneNumber = document.getElementById("phoneNumber");
let male = document.getElementById("male");
let femail = document.getElementById("femail");
let html = document.getElementById("html");
let css = document.getElementById("css");
let javascript = document.getElementById("javascript");
let ajax = document.getElementById("ajax");
let frontend = document.getElementById("frontend");
let sitecore = document.getElementById("sitecore");
let salesforce = document.getElementById("salesforce");
let sharepoint = document.getElementById("sharepoint");

function encodeAndJoinPair(pair) {
  return pair.join("=");
}

function convertArraytoString(element) {
  return element.join("|");
}

function createQueryString(objectParams) {
  return Object.entries(objectParams).map(encodeAndJoinPair).join("&");
}
submitButton.addEventListener("click", () => {
  if (firstName.value !== "") {
    objForAllXMLHTTPRequest.FName = firstName.value;
  }
  if (lastName.value !== "") {
    objForAllXMLHTTPRequest.LName = lastName.value;
  }
  if (email.value !== "") {
    objForAllXMLHTTPRequest.Email = email.value;
  }
  if (phoneNumber.value !== "") {
    objForAllXMLHTTPRequest.Phone = `+${phoneNumber.value}`;
  }

  if (male.checked) {
    objForAllXMLHTTPRequest.Sex = "Male";
  } else if (female.checked) {
    objForAllXMLHTTPRequest.Sex = "Femail";
  }

  if (html.checked || css.checked || javascript.checked || ajax.checked) {
    objForAllXMLHTTPRequest.Skills = [];
    if (html.checked) {
      objForAllXMLHTTPRequest.Skills.push("HTML");
    }
    if (css.checked) {
      objForAllXMLHTTPRequest.Skills.push("CSS");
    }
    if (javascript.checked) {
      objForAllXMLHTTPRequest.Skills.push("JavaScript");
    }
    if (ajax.checked) {
      objForAllXMLHTTPRequest.Skills.push("AJAX");
    }
  }

  if (
    frontend.selected ||
    sitecore.selected ||
    salesforce.selected ||
    sharepoint.selected
  ) {
    objForAllXMLHTTPRequest.Department = [];
    if (frontend.selected) {
      objForAllXMLHTTPRequest.Department.push("FrontEnd");
    }
    if (sitecore.selected) {
      objForAllXMLHTTPRequest.Department.push("SiteCore");
    }
    if (salesforce.selected) {
      objForAllXMLHTTPRequest.Department.push("SalesForse");
    }
    if (sharepoint.selected) {
      objForAllXMLHTTPRequest.Department.push("Sharepoint");
    }
  }

  console.log(objForAllXMLHTTPRequest);

  if (html.checked || css.checked || javascript.checked || ajax.checked) {
    objForAllXMLHTTPRequest.Skills = convertArraytoString(
      objForAllXMLHTTPRequest.Skills
    );
  }

  if (
    frontend.selected ||
    sitecore.selected ||
    salesforce.selected ||
    sharepoint.selected
  ) {
    objForAllXMLHTTPRequest.Department = convertArraytoString(
      objForAllXMLHTTPRequest.Department
    );
  }

  const url = createQueryString(objForAllXMLHTTPRequest);

  history.pushState(null, null, `file:///D:/js/Http/index.html?${url}`);
});

function parseUrlQuery() {
  var data = {};
  if (location.search) {
    var pair = location.search.substr(1).split("&");
    for (var i = 0; i < pair.length; i++) {
      var param = pair[i].split("=");
      data[param[0]] = param[1];
    }
  }
  if (data.FName != undefined) {
    firstName.value = data.FName;
  } else {
    firstName.value = "";
  }
  if (data.LName != undefined) {
    lastName.value = data.LName;
  } else {
    lastName.value = "";
  }
  if (data.Email != undefined) {
    email.value = data.Email;
  } else {
    email.value = "";
  }
  if (data.Phone != undefined) {
    phoneNumber.value = Number(data.Phone);
  } else {
    phoneNumber.value = "";
  }

  if (data.Sex == "Male") {
    male.setAttribute("checked", true);
  } else if (data.Sex == "Femail") {
    female.setAttribute("checked", true);
  }

  if (data.Skills != undefined) {
    data.Skills = data.Skills.split("|");

    if (data.Skills.includes("HTML")) {
      html.setAttribute("checked", true);
    }
    if (data.Skills.includes("CSS")) {
      css.setAttribute("checked", true);
    }
    if (data.Skills.includes("JavaScript")) {
      javascript.setAttribute("checked", true);
    }
    if (data.Skills.includes("AJAX")) {
      ajax.setAttribute("checked", true);
    }
  }

  if (data.Department != undefined) {
    data.Department = data.Department.split("|");

    if (data.Department.includes("Front End")) {
      frontend.setAttribute("selected", true);
    }
    if (data.Department.includes("SiteCore")) {
      sitecore.setAttribute("selected", true);
    }
    if (data.Department.includes("SalesForse")) {
      salesforce.setAttribute("selected", true);
    }
    if (data.Department.includes("Sharepoint")) {
      sharepoint.setAttribute("selected", true);
    }
  }
}

window.onLoad = parseUrlQuery();
