/*****************************************************************************
  PopCornSar AutoWhere AUTOSAR Ecu Configuration Editor JavaScript
  Design: Yunki Choi.
  Implementation: Yunki Choi.
  Last Update: 2016/04/05
 *****************************************************************************/


/*****************************************************************************
 Functionality : Hide and Show Ecuc Editor
  1. Hide/Show Container
    1.1. Param Container
    1.2. Choice Container
  2. Hide/Show Parameter & References
 *****************************************************************************/
// Hide/Show Ecuc Container from ModuleDef/Container
$(".EcucModuleConfig").on("click", ".ContainerShowButton", function(e) {
  var objContainer = $(this).next().nextAll();

  // Show/Hide Table
  if($(objContainer).hasClass("hidden")) {
    $(this).attr("value", "CLOSE");
    $(objContainer).removeClass("hidden").slideDown();
  } else {
    $(this).attr("value", "OPEN");
    $(objContainer).addClass("hidden").slideUp();
  }
});

// Hide/Show Ecuc Configuration Field
$(".EcucModuleConfig").on("click", ".ConfigureShowButton", function(e) {
  var objContainer = $(this).nextAll();

  // Show/Hide Table
  if($(objContainer).hasClass("hidden")) {
    $(this).attr("value", "CLOSE");
    $(objContainer).removeClass("hidden").slideDown();
  } else {
    $(this).attr("value", "OPEN");
    $(objContainer).addClass("hidden").slideUp();
  }
});

// Show/Hide Choice Container Contents (multiplicity *)
$(".EcucModuleConfig").on("click", ".ChoiceShowButtonMulti", function(e) {
  var numofBaseCont = $(this).next().next().nextAll().length;
  var objContainer = $(this).next().next().nextAll().eq(numofBaseCont - 1);

  // Show/Hide Table
  if($(objContainer).hasClass("hidden")) {
    $(this).attr("value", "CLOSE");
    $(objContainer).removeClass("hidden").slideDown();
  } else {
    $(this).attr("value", "OPEN");
    $(objContainer).addClass("hidden").slideUp();
  }
});

// Show/Hide Choice Container Contents (multiplicity 1)
$(".EcucModuleConfig").on("click", ".ChoiceShowButtonSingle", function(e) {
  var numofBaseCont = $(this).next().nextAll().length;
  var objContainer = $(this).next().nextAll().eq(numofBaseCont - 1);

  // Show/Hide Table
  if($(objContainer).hasClass("hidden")) {
    $(this).attr("value", "CLOSE");
    $(objContainer).removeClass("hidden").slideDown();
  } else {
    $(this).attr("value", "OPEN");
    $(objContainer).addClass("hidden").slideUp();
  }
});

// Hide/Show Ecuc Parameter from Container
$(".EcucModuleConfig").on("click", ".ParameterShowButtonMulti", function(e) {
  var objContainer = $(this).next().next().nextAll();

  // Show/Hide Table
  if($(objContainer).hasClass("hidden")) {
    $(this).attr("value", "CLOSE");
    $(objContainer).removeClass("hidden").slideDown();
  } else {
    $(this).attr("value", "OPEN");
    $(objContainer).addClass("hidden").slideUp();
  }
});

// Hide/Show Ecuc Parameter from Container
$(".EcucModuleConfig").on("click", ".ParameterShowButtonSingle", function(e) {
  var objContainer = $(this).next().nextAll();

  // Show/Hide Table
  if($(objContainer).hasClass("hidden")) {
    $(this).attr("value", "CLOSE");
    $(objContainer).removeClass("hidden").slideDown();
  } else {
    $(this).attr("value", "OPEN");
    $(objContainer).addClass("hidden").slideUp();
  }
});


/*****************************************************************************
 Functionality : Display Module Name along the user input
  1. Display Input ShortName of Module. eg. Os -> Os_0
 *****************************************************************************/
$(".EcucModuleConfig").on("change", ".EcucModuleName", function(e) {
  // 1. Input Value in Text Field
  // 2. If change value, then any event occurs reflect the new value
  var $inputName = $(this).val();

  // Change Text Node to Input Name
  $(this).parent().contents().filter(function() {
    return this.nodeType == 3;
  }).remove().end().end().prepend($inputName);

  // Change Tag Attribute: ID
  $(this).parent().attr("id", $inputName);
});


/*****************************************************************************
 Functionality : Reflect to HTML Page on EcucContainer User Input Event
  1. Display Input ShortName of Container
  2. Config Status Check
   2.1. Over Multiplicity
   2.2. Indicate Number of Current Container
   2.3. Clear Config Process on [0..1], [1..1] Container
 *****************************************************************************/
$(".EcucModuleConfig").on("change", ".EcucContainerName", function(e) {
  var containerName = $(this).parent().parent().attr("id");

  // 1. Input Value in Text Field
  // 2. If change value, then any event occurs reflect the new value
  var $inputName = $(this).val(); // Input Value

  // Change Text Node to Input Name
  $(this).parent().contents().filter(function() {
    return this.nodeType == 3;
  }).remove().end().end().prepend(containerName + " \"" + $inputName + "\""); // example, OsCounter "USER INPUT"

  // Change Tag Attribute: ID
  //$(this).parent().attr("id", $inputName);
  var currentContLoc = $(this);
  // Validate about Container
  var inputValid = inputContValidation($inputName, currentContLoc);
  // if 1, [0..1] or [1..1] Container, else [0..*] or [1..*] Container
  var containerType = $(this).nextAll('input').length;
  var numofConfigContainer;

  if ($(this).parent().attr("data-category") === "EcucChoiceContainerDef") {
    containerType = 'choice'; // Choice Container
  }

  // E_NOTCONFIGURED
  if (inputValid === 'E_NOTCONFIGURED') {
    if (containerType == 1) { // Single Param Container
      $(this).next().next().next().remove();
      $(this).next().next().after(inputNotConfig);
      numofConfigContainer = $(this).parent().parent().children(".EcucContainer").length - 1;
    } else if (containerType === 'choice') { // Choice Container
      $(this).next().next().next().remove();
      $(this).next().next().after(inputNotConfig);
      numofConfigContainer = $(this).parent().parent().children(".EcucContainer").length - 1;
    } else { // Multiple Param Container
      $(this).next().next().next().next().remove();
      $(this).next().next().next().after(inputNotConfig);
      numofConfigContainer = $(this).parent().parent().children(".EcucContainer").length - 2;
    }
    // Indicate configured
    $(this).parent().attr("data-formtype", 'undefined');
    $(this).parent().attr("id", '');
  }
  // E_DUPLICATENAME
  else if (inputValid === 'E_DUPLICATENAME') {
    $(this).next().next().next().next().remove();
    $(this).next().next().next().after(inputDuplName);
    numofConfigContainer = $(this).parent().parent().children(".EcucContainer").length - 2;
    // Indicate configured
    $(this).parent().attr("data-formtype", 'undefined');
    $(this).parent().attr("id", '');
  }
  // E_OK
  else {
    if (containerType == 1) { // Single Param Container
      $(this).next().next().next().remove();
      $(this).next().next().after(inputCorrect);
      numofConfigContainer = $(this).parent().parent().children(".EcucContainer").length;
    } else if (containerType === 'choice') { // Choice Container
      $(this).next().next().next().remove();
      $(this).next().next().after(inputCorrect);
      numofConfigContainer = $(this).parent().parent().children(".EcucContainer").length;
    } else { // Multiple Param Container
      $(this).next().next().next().next().remove();
      $(this).next().next().next().after(inputCorrect);
      numofConfigContainer = $(this).parent().parent().children(".EcucContainer").length - 1; // -1, because hidden template for container
    }
    // Indicate configured
    $(this).parent().attr("data-formtype", 'userdefined');
    $(this).parent().attr("id", $inputName);
  }

  // Attach Number of Containers
  var indicatorforContainer = "<span class='ContConfigState'>" + numofConfigContainer + "</span>";
  $(this).parent().parent().children().eq(0).after(indicatorforContainer);
  $(this).parent().parent().children().eq(0).remove();
});

/*****************************************************************************
 Functionality : Check Container's Input Status
  1. Not Configure : Not set the container name or Delete the container name
 *****************************************************************************/
function inputContValidation (userInputContName, containerLocation) {
  var errCode = 'E_OK';

  if (userInputContName == null || userInputContName == '') {
    errCode = 'E_NOTCONFIGURED';
    return errCode;
  } else {
    errCode = 'E_OK';
  }

  var isDupl = false;
  containerLocation.parent().parent().children().filter(".EcucContainer").each(function() {
    if ($(this).attr("data-formtype") !== 'defaultform') {
      if (userInputContName === $(this).attr("id")) {
        isDupl = true;
      }
    }
  });

  if (isDupl == true) {
    errCode = 'E_DUPLICATENAME';
    return errCode;
  } else {
    errCode = 'E_OK';
  }

  return errCode;
}


/*****************************************************************************
 Functionality : Reflect to HTML Page on EcucParameter User Input Event
  1. Display Input ShortName of Container
  2. Config Status Check
    2.1. Over Range of Value
    2.2. Configured or Not Configured
 *****************************************************************************/
// Image Tag for Config Validation
var inputCorrect = "<img src=\"hintcorrect.png\" style=\"display: inline\" align=\"middle\"/>Configured";
var inputWarning = "<img src=\"hintwarning.png\" style=\"display: inline\" align=\"middle\"/>Incorrect Value Range";
var inputNotConfig = "<img src=\"hintnotinput.png\" style=\"display: inline\" align=\"middle\"/>Not Configured";
var inputDuplName = "<img src=\"hintwarning.png\" style=\"display: inline\" align=\"middle\"/>ShortName is Duplicated";

// Reflect User Input: Parameter Value
$(".EcucModuleConfig").on("change", ".EcucParamInputField", function(e) {
  var parameterName = $(this).attr("id");
  var parameterDef = $(this).attr("data-definition");
  var parameterType = $(this).attr("data-category");
  var inputValue = $(this).val(); // Input Value

  // Record Data Attribute to <tr> Tag
  $(this).parent().parent().attr("data-form-stat", 'configured');
  $(this).parent().parent().attr("data-name", parameterName);
  $(this).parent().parent().attr("data-definition", parameterDef);
  $(this).parent().parent().attr("data-category", parameterType);
  $(this).parent().parent().attr("data-value", inputValue);

  // Data Setting for User Input Validation
  var parameterRange = $(this).attr("data-range");
  var inputValid = inputParamValidation(inputValue, parameterType, parameterRange);

  // Indicate Invalid Results
  // Config Correct
  if (inputValid === 'E_OK') {
    $(this).parent().contents().filter(function() {
      return this.nodeType == 3;
    }).remove();

    $(this).next().next().remove();
    $(this).next().after(inputCorrect);
  }
  // Invalid Range
  else if (inputValid === 'E_INVALIDRANGE') {
    $(this).parent().contents().filter(function() {
      return this.nodeType == 3;
    }).remove();

    $(this).next().next().remove();
    $(this).next().after(inputWarning);
  }
  // Not Config
  else if (inputValid === 'E_NOTCONFIGURED') {
    $(this).parent().contents().filter(function() {
      return this.nodeType == 3;
    }).remove();

    $(this).next().next().remove();
    $(this).next().after(inputNotConfig);
    $(this).parent().parent().attr("data-form-stat", 'notconfigured');
  }
});

// Reflect User Input: Parameter(Enum) Value
$(".EcucModuleConfig").on("change",".EnumSelector", function(e) {
  var parameterName = $(this).attr("id");
  var parameterDef = $(this).attr("data-definition");
  var parameterType = $(this).attr("data-category");
  var inputValue = $(this).val(); // Input Value

  // Record Data Attribute to <tr> Tag
  $(this).parent().parent().attr("data-form-stat", 'configured');
  $(this).parent().parent().attr("data-name", parameterName);
  $(this).parent().parent().attr("data-definition", parameterDef);
  $(this).parent().parent().attr("data-category", parameterType);
  $(this).parent().parent().attr("data-value", inputValue);

  // Data Setting for User Input Validation, But Enum is Temp // 2016-04-01
  //var parameterRange = $(this).attr("data-range");
  var inputValid = inputParamValidation(inputValue, parameterType);

  //console.log(inputValid);

  // Indicate Invalid Results
  // Config Correct
  if (inputValid === 'E_OK') {
    $(this).parent().contents().filter(function() {
      return this.nodeType == 3;
    }).remove();

    $(this).next().next().remove();
    $(this).next().after(inputCorrect);
  }
  // Not Config
  else if (inputValid === 'E_NOTCONFIGURED') {
    $(this).parent().contents().filter(function() {
      return this.nodeType == 3;
    }).remove();

    $(this).next().next().remove();
    $(this).next().after(inputNotConfig);
    $(this).parent().parent().attr("data-form-stat", 'notconfigured');
  }
});

// Reflect User Input: Parameter(Boolean) Value
$(".EcucModuleConfig").on("click", ".EcucParamInputBoolean", function(e) {
  var parameterName = $(this).attr("id");
  var parameterDef = $(this).attr("data-definition");
  var parameterType = $(this).attr("data-category");
  var inputValue = $(this).children(":input:radio:checked").val();

  // Record Data Attribute to <tr> Tag
  $(this).parent().parent().attr("data-form-stat", 'configured');
  $(this).parent().parent().attr("data-name", parameterName);
  $(this).parent().parent().attr("data-definition", parameterDef);
  $(this).parent().parent().attr("data-category", parameterType);
  $(this).parent().parent().attr("data-value", inputValue);

  var inputValid = inputParamValidation(inputValue, parameterType);

  // Indicate Invalid Results
  // Config Correct
  if (inputValid === 'E_OK') {
    $(this).parent().contents().filter(function() {
      return this.nodeType == 3;
    }).remove();

    $(this).next().next().remove();
    $(this).next().after(inputCorrect);
  }
  // Not Config
  else if (inputValid === 'E_NOTCONFIGURED') {
    $(this).parent().contents().filter(function() {
      return this.nodeType == 3;
    }).remove();

    $(this).next().next().remove();
    $(this).next().after(inputNotConfig);
    $(this).parent().parent().attr("data-form-stat", 'notconfigured');
  }
});

// Validator : User Input for Parameter
function inputParamValidation (userInput, paramType, paramConst) {
  var minVal;
  var maxVal;
  var errCode = 'E_OK';

  if (userInput == null || userInput == '') {
    errCode = 'E_NOTCONFIGURED';
    return errCode;
  } else {
    errCode = 'E_OK';
  }

  if (paramConst != "Not Defined.") {
    // Case 0 : Numerical Validation - Range
    // Only apply for Integer/FloatParam
    if (paramType === "EcucIntegerParamDef" || paramType === "EcucFloatParamDef") {
      var tempArray = paramConst.split('..');
      minVal = tempArray[0];
      maxVal = tempArray[1];
    }
    if (Number(userInput) < Number(minVal) || Number(userInput) > Number(maxVal)) {
      errCode = 'E_INVALIDRANGE';
    } else {
      errCode = 'E_OK';
    }
  } else {
    errCode = 'E_OK';
  }

  return errCode;
};

// Reflect User Input: Reference Value
$(".EcucModuleConfig").on("change", ".EcucRefInputField", function(e) {
  var parameterName = $(this).attr("id");
  var parameterDef = $(this).attr("data-definition");
  var parameterType = $(this).attr("data-category");
  var inputValue = $(this).val(); // Input Value

  // Record Data Attribute to <tr> Tag
  $(this).parent().parent().attr("data-form-stat", 'configured');
  $(this).parent().parent().attr("data-name", parameterName);
  $(this).parent().parent().attr("data-definition", parameterDef);
  $(this).parent().parent().attr("data-category", parameterType);
  $(this).parent().parent().attr("data-value", inputValue);
});

// Add The New Container
$(".EcucModuleConfig").on("click", ".AddContainer", function(e) {
  var originalContainer = $(this).next().next();
  var addContLocation = $(this).parent();
  // Base Container Name
  var containerName = $(this).parent().attr("id");

  // New Container Data Generate
  var newContainer = originalContainer.clone().appendTo(addContLocation);

  // Set Container Name
  newContainer.contents().filter(function() {
    return this.nodeType == 3;
  }).remove().end().end().prepend(containerName);

  newContainer.show();
});


/*****************************************************************************
 Functionality : Select Choice Container
  1. Check Selected Choice Container
  2. Remove Old Selected Choice Container
  3. Generate New Selected Choice Container
 *****************************************************************************/
// Select Choice Container, along the input of radio button, Generate Container
$(".EcucModuleConfig").on("click", ".SelectChoiceContainer", function(e) {
  var addContLocation = $(this).parent();
  var selectedContainer = $(this).children(":input:radio:checked").val(); // select value of radio

  // Copy from hidden Container / Copy to last location
  $(this).parent().children().filter(".EcucContConfig").each(function() {
    if (selectedContainer == this.id) {
      var currSelectCont = $(this).clone().appendTo(addContLocation); // Append container
      addContLocation.children().last().css('display', 'block'); // Show generated container
      addContLocation.children().last().prev().remove(); // Remove previous set container
      currSelectCont.attr("data-formtype", "userdefined");
    }
  });
});


/*****************************************************************************
 Functionality : Delete Container
 1. Check Remained Siblings Container
 2. Remove Selected Container
 *****************************************************************************/
// Delete Container
$(".EcucModuleConfig").on("click", ".DeleteButton", function(e) {
  // Case : Configured Container
  if ($(this).parent().attr("data-formtype", "userdefined")) {
    var numofConfigContainer = $(this).parent().parent().children(".EcucContainer[data-formtype='userdefined']").length - 1;
    var indicatorforContainer = "<span class='ContConfigState'>" + numofConfigContainer + "</span>";
    $(this).parent().parent().children().eq(0).after(indicatorforContainer);
    $(this).parent().parent().children().eq(0).remove();

    // Remove selected Container
    $(this).parent().remove();
  }
  // Case : Just Remove not configured Container
  else {
    // Remove selected Container
    $(this).parent().remove();
  }
});


/*****************************************************************************
 Functionality : Show Tooltip
 1. Mouse Over and Click Input Field
 2. Show the Tooltip
 *****************************************************************************/
// Make Tooltip for Description, Ecuc Parameter (Textual, Numerical)
$(".EcucModuleConfig").on("mouseover", ".EcucParamInputField", function(e) {
  $(this).click (function() {
    $(this).next().fadeIn();
  }).mouseout (function() {
    $(this).next().fadeOut();
  }).mousemove (function(e) {
    $("span").css({
      "top": e.pageY + 30 + "px",
      "left":e.pageX + 30 + "px"
    });
  });
});

// Make Tooltip for Description, Ecuc Parameter (MutlilineString)
$(".EcucModuleConfig").on("mouseover", ".EcucParamMultilineStr", function(e) {
  $(this).click (function() {
    $(this).next().fadeIn();
  }).mouseout (function() {
    $(this).next().fadeOut();
  }).mousemove (function(e) {
    $("span").css({
      "top": e.pageY + 30 + "px",
      "left":e.pageX + 30 + "px"
    });
  });
});

// Make Tooltip for Description, Ecuc Parameter (Enumeration Select Button)
$(".EcucModuleConfig").on("mouseover", ".EnumSelector", function(e) {
  $(this).click (function() {
    $(this).next().fadeIn();
  }).mouseout (function() {
    $(this).next().fadeOut();
  }).mousemove (function(e) {
    $("span").css({
      "top": e.pageY + 30 + "px",
      "left":e.pageX + 30 + "px"
    });
  });
});

// Make Tooltip for Description, Ecuc Parameter (Boolean Radio Button)
$(".EcucModuleConfig").on("mouseover", ".EcucParamInputBoolean", function(e) {
  $(this).click (function() {
    $(this).next().fadeIn();
  }).mouseout (function() {
    $(this).next().fadeOut();
  }).mousemove (function(e) {
    $("span").css({
      "top": e.pageY + 30 + "px",
      "left":e.pageX + 30 + "px"
    });
  });
});

// Make Tooltip for Description, Ecuc Reference
$(".EcucModuleConfig").on("mouseover", ".EcucRefInputField", function(e) {
  $(this).click (function() {
    $(this).next().fadeIn();
  }).mouseout (function() {
    $(this).next().fadeOut();
  }).mousemove (function(e) {
    $("span").css({
      "top": e.pageY + 30 + "px",
      "left":e.pageX + 30 + "px"
    });
  });
});

// Make Tooltip for Description, Ecuc Container
$(".EcucModuleConfig").on("mouseover", ".EcucContainerName", function(e) {
  $(this).click (function() {
    $(this).next().fadeIn();
  }).mouseout (function() {
    $(this).next().fadeOut();
  }).mousemove (function(e) {
    $("span").css({
      "top": e.pageY + 30 + "px",
      "left":e.pageX + 30 + "px"
    });
  });
});

// Make Tooltip for Description, Ecuc Module
$(".EcucModuleConfig").on("mouseover", ".EcucModuleName", function(e) {
  $(this).click (function() {
    $(this).next().fadeIn();
  }).mouseout (function() {
    $(this).next().fadeOut();
  }).mousemove (function(e) {
    $("span").css({
      "top": e.pageY + 30 + "px",
      "left":e.pageX + 30 + "px"
    });
  });
});


/*****************************************************************************
 Functionality : Document Ready Function
  1. Generate Choice Container Selector
  2. Hide the Containers
  3. Hide the Tooltip
 *****************************************************************************/
// Init Page for Open Page
$(document).ready(function() {
  // Generate Selector of ChoiceContainer
  var selectorFormTag = "<form class=\"SelectChoiceContainer\">";
  var radioButtonTagStart = "<input type=\"radio\"";
  var selectorFormEnd = "</form>"
  var dummyCont = "<div class=\"EcucContConfig dummy\"></div>";

  // Search Choice Container
  $(".EcucContainer[data-category=EcucChoiceContainerDef]").each(function() {
    var containerSelector = "";
    var selectorRadioName = "";
    var selectorRadioButton = "";
    var $buttonLen = $(this).children("input");

    var selectorName = this.id;
    // remove 'default' string
    //selectorName = selectorName.replace("default ", "");

    containerSelector += selectorFormTag;
    selectorRadioName = " name=\"" + selectorName + "\"";

    var sortSelector = 0;

    // Search SubContainer of Choice Container
    $(this).children().filter(".EcucContConfig").each(function() {
      selectorRadioButton = selectorRadioButton + radioButtonTagStart;
      selectorRadioButton = selectorRadioButton + selectorRadioName + " value=\"" + this.id + "\">" + this.id + "&nbsp; &nbsp; &nbsp;";
      sortSelector++;

      if (sortSelector % 5 == 0) {
        selectorRadioButton = selectorRadioButton + "<br>";
      }
    });
    containerSelector = containerSelector + selectorRadioButton + selectorFormEnd;

    // Attach Selector Tag below Choice Container
    // Case 1 : Multiple Choice Container / Case 2 : Single Choice Container
    if ($buttonLen.length >= 3) {
      $(this).children().eq(4).after(containerSelector); // eq(2)
      $(this).children().last().after(dummyCont);
      $(this).children().eq(5).nextAll().css('display', 'none'); // eq(3)
    } else {
      $(this).children().eq(3).after(containerSelector); // eq(1)
      $(this).children().last().after(dummyCont);
      $(this).children().eq(4).nextAll().css('display', 'none'); // eq(2)
    }
  });

  // Hide Contents of Containers
  $(".EcucContainer").hide();
  //$(".EcucChoiceContainer").hide();
  // Hide Tooltip
  $(".ContainerTooltip").css({
    opacity: "0.9",
    position: "absolute",
    display: "none"
  });
  $(".ChoiceContainerTooltip").css({
    opacity: "0.9",
    position: "absolute",
    display: "none"
  });
  $(".ParamTooltip").css({
    opacity: "0.9",
    position: "absolute",
    display: "none"
  });
  $(".RefTooltip").css({
    opacity: "0.9",
    position: "absolute",
    display: "none"
  });
  $(".BswModuleTooltip").css({
    opacity: "0.9",
    position: "absolute",
    display: "none"
  });
});
