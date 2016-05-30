$('#Controller').submit(function() {
  // Buffer for Configured Information
  var ecucConfiguration = [];

  // EcucModuleConfigurationValue
  var ecucModuleConfigVal = {};
  ecucModuleConfigVal.Definition = $(".EcucModuleConfig").attr("data-definition");
  ecucModuleConfigVal.Category = "EcucModuleConfigurationValues"; //$(".EcucModuleConfig").attr("data-category");
  ecucModuleConfigVal.UserInput = $(".EcucModuleConfig").attr("id");
  ecucModuleConfigVal.EcucPath = "/" + ecucModuleConfigVal.UserInput;
  ecucConfiguration.push(ecucModuleConfigVal);

  // Search Configured Information
  // and Make Objects
  // Examples JSON Code :
  // {
  //    "Category": "EcucNumericalParamValue"
  //    "Definition": "/AUTOSAR/EcucDefs/Os/OsTask/OsTaskActivation
  //    "UserInput": "10"
  //    "EcucPath": "/Os/OsMainTask"
  // }

  $(".EcucContConfig").each(function() {
    // Search Configured Container
    $(this).children().filter(".EcucContainer").each(function() {
      var currentState = $(this).attr("data-formtype");
      // Search Configured Container
      if (currentState == 'userdefined') {
        var configuredCont = {};

        // Set the path of configured data for xml
        // Parent Container:  $(this).parent().parent().attr("id");
        var ecucPath = ecucModuleConfigVal.EcucPath;
        var pathSeq = $(this).parents(".EcucContainer").length;
        for (var i = 0; i < pathSeq; i++) {
          ecucPath += "/" + $(this).parents(".EcucContainer").eq(pathSeq - 1 - i).attr("id");
        }
        // Generate JSON Data of Containers
        configuredCont.Definition = $(this).attr("data-definition");
        configuredCont.Category = "EcucContainerValue"; //$(this).attr("data-category");
        configuredCont.UserInput = $(this).attr("id");
        configuredCont.EcucPath = ecucPath + "/" + configuredCont.UserInput;
        ecucConfiguration.push(configuredCont);

        // Search Configured Parameter
        $(this).children().children().children().filter(".EcucParameter").each(function() {
          var currentConfigState = $(this).attr("data-form-stat");

          if (currentConfigState == 'configured') {
            var configuredParamVal = {};

            var parameterCategory = $(this).attr("data-category");
            var parameterType = '';

            // Define Type of Parameter Value
            if (parameterCategory === "EcucBooleanParamDef" || parameterCategory === "EcucIntegerParamDef" || parameterCategory === "EcucFloatParamDef") {
              parameterType = "EcucNumericalParamValue";
            } else if (parameterCategory === "EcucEnumerationParamDef" || parameterCategory === "EcucStringParamDef" ||
                       parameterCategory === "EcucFunctionNameDef" || parameterCategory === "EcucLinkerSymbolDef" ||
                       parameterCategory === "EcucMultilineStringParamDef") {
              parameterType = "EcucTextualParamValue";
            } else if (parameterCategory === "EcucAddInfoParamDef") {
              parameterType = "EcucAddInfoParamValue";
            }

            // Generate JSON Data of Parameters
            configuredParamVal.Definition = $(this).attr("data-definition");
            configuredParamVal.Category = parameterType;
            configuredParamVal.UserInput = $(this).attr("data-value");
            configuredParamVal.EcucPath = configuredCont.EcucPath;
            ecucConfiguration.push(configuredParamVal);
          }
        });

        // Search Configured Reference
        $(this).children().children().children().filter(".EcucReference").each(function() {
          var currentConfigState = $(this).attr("data-form-stat");

          if (currentConfigState == 'configured') {
            var configuredParamVal = {};

            var referenceCategory = $(this).attr("data-category");
            var referenceType = '';

            // Define Type of Reference Value
            if (referenceCategory === "EcucReferenceDef" || referenceCategory === "EcucChoiceReferenceDef" ||
                referenceCategory === "EcucForeignReferenceDef" || referenceCategory === "EcucSymbolicNameReferenceDef") {
              referenceType = "EcucReferenceValue";
            } else if (referenceCategory === "EcucInstanceReferenceDef") {
              referenceType = "EcucInstanceReferenceValue";
            }

            // Generate JSON Data of References
            configuredParamVal.Definition = $(this).attr("data-definition");
            configuredParamVal.Category = referenceType;
            configuredParamVal.UserInput = $(this).attr("data-value");
            configuredParamVal.EcucPath = configuredCont.EcucPath;
            ecucConfiguration.push(configuredParamVal);
          }
        });
      }
    });

  });

  // Test Code : Store Configured Information(Array) JSON Format
  var jsonStr = JSON.stringify(ecucConfiguration, null, " ");
  $("#JsonResult").text(jsonStr);

  // Tree Example
  //ecucTree(ecucConfiguration);
  //$('#result').text(JSON.stringify(ecucTree(ecucConfiguration, null, 'UserInput')));

  return false;
});

//function ecucTree (list) {
//  var childrenAttr = 'sub-container';
//  var treeList = [];
//  var lookupTable = {};
//
//  list.forEach (function(obj) {
//    lookupTable[obj['UserInput']] = obj;
//    obj[childrenAttr] = [];
//  });
//
//  list.forEach (function(obj) {
//    if (obj['Owner'] != null) {
//      lookupTable[obj['Owner']][childrenAttr].push(obj);
//    } else {
//      treeList.push(obj);
//    }
//  });
//
//  return treeList;
//}

