const userData1 =
  '[{"arCustomerId":"","assignedIp":"","blockNotifCount":"","buAccessGroupLov":"BU_ACCESS_ALL","createdBy":"","creationDate":"","dateFormat":"","debugMode":"","email":"demodemo","firstName":"demo2","id":"1","invAccessGroupLov":"INV_ACCESS_ALL","lastName":"demodemo","lastUpdateDate":"","lastUpdatedBy":"","links":[{"href":"http://localhost:8085/api/config/RdSecUser(id=1)","kind":"item","name":"RdSecUser","rel":"self"}],"orgCodeLov":"ORG_CODE_ALL","password":"$2a$10$D/0pW6UGgJcfCJlsHn5tiO3zGM1fLLi5jrrjMpqlGS7FdnqEhJq/q","phone":"","status":"","userLanguage":"","username":"demo"},{"arCustomerId":"","assignedIp":"","blockNotifCount":"","buAccessGroupLov":"BU_ACCESS_ALL","createdBy":"","creationDate":"","dateFormat":"","debugMode":"","email":"","firstName":"fName","id":"2","invAccessGroupLov":"INV_ACCESS_ALL","lastName":"lName","lastUpdateDate":"","lastUpdatedBy":"","links":[{"href":"http://localhost:8085/api/config/RdSecUser(id=2)","kind":"item","name":"RdSecUser","rel":"self"}],"orgCodeLov":"ORG_CODE_ALL","password":"$2a$10$Tg9/n/WM2AdIaLVbZEuP8upGFaAyC1T1t1sG9PbS1tCD3zu4SfwEa","phone":"","status":"","userLanguage":"","username":"admin"},{"arCustomerId":"","assignedIp":"","blockNotifCount":"","buAccessGroupLov":"BU_ACCESS_ALL","createdBy":"","creationDate":"","dateFormat":"","debugMode":"","email":"","firstName":"","id":"3","invAccessGroupLov":"INV_ACCESS_ALL","lastName":"","lastUpdateDate":"","lastUpdatedBy":"","links":[{"href":"http://localhost:8085/api/config/RdSecUser(id=3)","kind":"item","name":"RdSecUser","rel":"self"}],"orgCodeLov":"ORG_CODE_ALL","password":"test04","phone":"","status":"","userLanguage":"","username":"demo2"},{"arCustomerId":"","assignedIp":"","blockNotifCount":"","buAccessGroupLov":"BU_ACCESS_ALL","createdBy":"","creationDate":"","dateFormat":"","debugMode":"","email":"","firstName":"eeee","id":"4","invAccessGroupLov":"INV_ACCESS_ALL","lastName":"","lastUpdateDate":"","lastUpdatedBy":"","links":[{"href":"http://localhost:8085/api/config/RdSecUser(id=4)","kind":"item","name":"RdSecUser","rel":"self"}],"orgCodeLov":"ORG_CODE_ALL","password":"","phone":"","status":"","userLanguage":"","username":"demo3"}]';

const restRequestType = {
  get: "get",
  post: "post",
  patch: "patch",
  delete: "delete",
};
Object.freeze(restRequestType);

function restRequest(inputData, type, newRequest) {
  let allData;
  if (typeof inputData === "string") {
    allData = JSON.parse(inputData);
  } else {
    allData = inputData;
  }

  let data = allData["data"];
  let requestData = allData["request"];
  if ("Authorization" in requestData) {
    newRequest["authorization"] = requestData["Authorization"];
  }
  consoleLog("restRequest 000000000000000000001 "+ type)
  printNestedObject(newRequest);
  
  let response;
  switch (type) {
     case restRequestType.post:
      response = restPost(newRequest);
      break;
    case restRequestType.patch:
      response = restPatch(newRequest);
      break;
    case restRequestType.delete:
      response = restDelete(newRequest);
      break;
    case restRequestType.get:
    default:
      response = restGet(newRequest);
      break;
  }

  let body = response.body;
  if (typeof body === "string") {
    body = JSON.parse(response);
  }

  if (Array.isArray(body)) {
    for (let i = 0; i < body.length; i++) {
      let e = body[i];
      consoleLog("patchRequest response row number : " + i);
      printNestedObject(e);
    }
  } else {
    printNestedObject(body);
  }
}

function getRequest(inputData) {
  let newRequest = {
   //host: "http://localhost:8085/api/ierp/MdmTaxCode",
    host: "http://localhost:8085/api/ierp/Subinventory(subinventoryId=43)",
  };
  return restRequest(inputData, restRequestType.get, newRequest);
}

function patchRequest(inputData) {
  let content = {
    description: "Raw TestSub03 id 46",
  };
  let newRequest = {
    host: "http://localhost:8085/api/ierp/Subinventory(subinventoryId=46)",
    content: content,
  };
  return restRequest(inputData, restRequestType.patch, newRequest);
}

function deleteRequest(inputData) {
  let newRequest = {
    host: "http://localhost:8085/api/ierp/Subinventory(subinventoryId=47)"
    };
  return restRequest(inputData, restRequestType.delete, newRequest);
}

function postRequest(inputData) {
  let content = {
    "subinventory": "TestSub03",
    "description": "TestSub03 desc",
    "type": "RAW",
    "locatorControl": "DYNAMIC_ENTRY",
    "orgId": "6",
    "materialAcId": "2",
    "materialOhAcId": "3",
    "ospAcId": "4",
    "overheadAcId": "5",
    "resourceAcId": "6",
    "lastUpdateBy" : "34",
    "createdBy" : "34",
  };
  let newRequest = {
    host: "http://localhost:8085/api/ierp/Subinventory",
    content: content,
  };
  return restRequest(inputData, restRequestType.post, newRequest);
}

function xxxgetRequest(inputData) {
  let allData;
  if (typeof inputData === "string") {
    allData = JSON.parse(inputData);
  } else {
    allData = inputData;
  }

  newRequest = {
    host: "http://localhost:8085/api/ierp/MdmTaxCode",
  };

  let data = allData["data"];
  let requestData = allData["request"];
  if ("Authorization" in requestData) {
    newRequest["authorization"] = requestData["Authorization"];
    consoleLog("Input data in javascript getRequest 1 " + newRequest["authorization"]);
  }

  let response = get(newRequest);
  let body = response.body;

  consoleLog("Input data in javascript getRequest 2 " + body);

  consoleLog("type of body " + typeof body);
  if (typeof body === "string") {
    body = JSON.parse(response);
  }

  if (Array.isArray(body)) {
    for (let i = 0; i < body.length; i++) {
      let e = body[i];
      consoleLog("getRequest response row number : " + i);
      printNestedObject(e);
    }
  } else {
    printNestedObject(body);
  }
}

function xxpatchRequest(inputData) {
  let allData;
  if (typeof inputData === "string") {
    allData = JSON.parse(inputData);
  } else {
    allData = inputData;
  }

  let content = {
    description: "Raw 02 Description",
  };

  newRequest = {
    host: "http://localhost:8085/api/ierp/Subinventory(subinventoryId=2)",
    content: content,
  };

  let data = allData["data"];
  let requestData = allData["request"];
  if ("Authorization" in requestData) {
    newRequest["authorization"] = requestData["Authorization"];
    consoleLog(
      "authorization in javascript patchRequest 1 " +
        newRequest["authorization"]
    );
  }

  let response = patch(newRequest);
  let body = response.body;
  consoleLog("type of body " + typeof body);
  if (typeof body === "string") {
    body = JSON.parse(response);
  }

  if (Array.isArray(body)) {
    for (let i = 0; i < body.length; i++) {
      let e = body[i];
      consoleLog("patchRequest response row number : " + i);
      printNestedObject(e);
    }
  } else {
    printNestedObject(body);
  }
}

function sqlQueryTest(inputData) {
  request = {
    sql: "SELECT * from sys_value_group_header",
    dbType: "MySQL",
    connName: "password",
  };

  let response = sqlSelect(request);
  printNestedObject(response.data);
}

function sqlUpdateTest(inputData) {
  request = {
    sql: "UPDATE sys_value_group_header SET description = 'TEST Value Group03 With id 21' WHERE sys_value_group_header_id = '21' ",
    dbType: "MySQL",
    connName: "password",
  };

  let response = sqlUpdate(request);
  printNestedObject(response.data);
}

function sqlInsertTest(inputData) {
  let sql =
    "INSERT INTO sys_value_group_header (value_group, description, access_level, validation_type, created_by,last_update_by) ";
  sql +=
    " VALUES ('TEST_VG04', 'TEST Value Group04', 'user', 'NONE', '1', '1' ) ";
  request = {
    sql: sql,
    dbType: "MySQL",
    connName: "password",
  };

  let response = sqlInsert(request);
  printNestedObject(response.data);
}

function sqlDeleteTest(inputData) {
  request = {
    sql: "DELETE FROM sys_value_group_header WHERE sys_value_group_header_id = '28' ",
    dbType: "MySQL",
    connName: "password",
  };

  let response = sqlDelete(request);
  printNestedObject(response.data);
}

function printNestedObject(obj) {
  if (typeof obj === "string") {
    consoleLog(obj);
  } else if (Object.keys(obj).length > 0) {
    let allKeys = Object.keys(obj);
    for (let i = 0; i < allKeys.length; i++) {
      const k = allKeys[i];
      consoleLog(k + " : " + obj[k]);
      if (typeof obj[k] === "object" && Object.keys(obj[k]).length > 0) {
        printNestedObject(obj[k]);
      }
    }
  }
}

function removePassword(inputData) {
  consoleLog("Input data in javascript 1 " + inputData);
  //let allData = getData("inputData");
  if (typeof inputData === "string") {
    allData = JSON.parse(inputData);
  } else {
    allData = inputData;
  }
  let data = allData["data"];
  let request = allData["request"];
  consoleLog("Input data in javascript 2 " + data);
  //sqlQueryTest(inputData);
  //sqlInsertTest(inputData);
  //sqlUpdateTest(inputData)
  sqlDeleteTest(inputData)
  //getRequest(inputData);
  //patchRequest(inputData);
  //postRequest(inputData);
  //deleteRequest(inputData)

  if (Array.isArray(data)) {
    let retData = new Array();
    for (let i = 0; i < data.length; i++) {
      let e = data[i];
      let newObj = new Object();
      for (var k in e) {
        if (k !== "password") {
          newObj[k] = e[k];
        }
      }
      retData.push(newObj);
    }
    return retData;
  } else {
    let newObj = new Object();
    for (var k in data) {
      if (k !== "password") {
        newObj[k] = data[k];
      }
    }
    return newObj;
  }
}

// consoleLog(removePassword(userData1))

function getRequestTest(data) {
  request = {
    host: "http://localhost:8085/api/ierp/MdmTaxCode",
  };
  //response = GET(request);
  response = result;
  // let body = response.body
  let body = JSON.parse(response);
  //consoleLog("getRequest response 2 " + JSON.stringify(body));
  consoleLog("type of body " + typeof body);

  if (Array.isArray(body)) {
    for (let i = 0; i < body.length; i++) {
      let e = body[i];
      consoleLog("getRequest response 2.1 : " + e);
      for (var k in e) {
        consoleLog(k + " : " + e[k]);
      }
    }
  } else {
    for (var k in body) {
      consoleLog(k + " : " + body[k]);
    }
  }
}

//getRequestTest();

function validatePassword(data) {
  try {
    if (data["password"] === data["confirmPassword"]) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return error;
  }
}

function returnDataExample() {
  let userData = {
    user1: "password1",
    user2: "password2",
    user3: 123,
  };
  let retData = {
    NextGoFunc: "HelloInGo",
    NextGoFuncData: userData,
    NextJsFunc: "HelloInGo",
    NextJsFuncData: userData,
  };
  return retData;
}

let userData = {
  user1: "password1",
  user2: "password2",
  user3: 123,
  fullName: function () {
    return "firstName" + " " + "lastName";
  },
};

function anotherExample() {
  let fName = userData.fullName();

  let retData = {
    NextGoFunc: "HelloInGo",
    NextGoFuncData: userData,
    NextJsFunc: "HelloInGo",
    NextJsFuncData: userData,
    fullName: fName,
  };
  return retData;
}
