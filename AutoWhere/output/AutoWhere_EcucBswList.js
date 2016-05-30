$(document).ready(function() {
  calcLayerWidth();
  calcLayerHeight();
});

function calcLayerHeight() {
  var servLayerHeight = new Array();
  var ecalLayerHeight = new Array();
  var mcalLayerHeight = new Array();

  // Calculate Height of Service Layer
  servLayerHeight[0] = $(".SysServ").css("height").replace("px", "");
  servLayerHeight[1] = $(".MemServ").css("height").replace("px", "");
  servLayerHeight[2] = $(".ComServ").css("height").replace("px", "");
  servLayerHeight[3] = $(".IoAbstServ").css("height").replace("px", "");

  var maxServLayerMaxHeight = 0;
  for (var i = 0; i < 4; i++) {
    if (servLayerHeight[i] > maxServLayerMaxHeight) {
      maxServLayerMaxHeight = parseInt(servLayerHeight[i]);
    }
  }
  maxServLayerMaxHeight = maxServLayerMaxHeight + parseInt(15) + "px";
  $(".SysServ").css("height", maxServLayerMaxHeight);
  $(".MemServ").css("height", maxServLayerMaxHeight);
  $(".ComServ").css("height", maxServLayerMaxHeight);
  $(".IoAbstServ").css("height", maxServLayerMaxHeight);

  // Calculate Height of Ecu Abstraction Layer
  ecalLayerHeight[0] = $(".ObdAbst").css("height").replace("px", "");
  ecalLayerHeight[1] = $(".MemAbst").css("height").replace("px", "");
  ecalLayerHeight[2] = $(".ComAbst").css("height").replace("px", "");
  ecalLayerHeight[3] = $(".IoAbstAbst").css("height").replace("px", "");

  var maxEcalLayerMaxHeight = 0;
  for (var i = 0; i < 4; i++) {
    if (ecalLayerHeight[i] > maxEcalLayerMaxHeight) {
      maxEcalLayerMaxHeight = parseInt(ecalLayerHeight[i]);
    }
  }
  maxEcalLayerMaxHeight = maxEcalLayerMaxHeight + parseInt(15) + "px";
  $(".ObdAbst").css("height", maxEcalLayerMaxHeight);
  $(".MemAbst").css("height", maxEcalLayerMaxHeight);
  $(".ComAbst").css("height", maxEcalLayerMaxHeight);
  $(".IoAbstAbst").css("height", maxEcalLayerMaxHeight);

  // Calculate Height of Mcu Abstraction Layer
  mcalLayerHeight[0] = $(".McuDrvr").css("height").replace("px", "");
  mcalLayerHeight[1] = $(".MemDrvr").css("height").replace("px", "");
  mcalLayerHeight[2] = $(".ComDrvr").css("height").replace("px", "");
  mcalLayerHeight[3] = $(".IoDrvr").css("height").replace("px", "");

  var maxMcalLayerMaxHeight = 0;
  for (var i = 0; i < 4; i++) {
    if (mcalLayerHeight[i] > maxMcalLayerMaxHeight) {
      maxMcalLayerMaxHeight = parseInt(mcalLayerHeight[i]);
    }
  }
  maxMcalLayerMaxHeight = maxMcalLayerMaxHeight + parseInt(15) + "px";
  $(".McuDrvr").css("height", maxMcalLayerMaxHeight);
  $(".MemDrvr").css("height", maxMcalLayerMaxHeight);
  $(".ComDrvr").css("height", maxMcalLayerMaxHeight);
  $(".IoDrvr").css("height", maxMcalLayerMaxHeight);

  // Calculate Height of Cdd Layer
  var cddLayerMaxHeight = 0;
  cddLayerMaxHeight = parseInt(maxServLayerMaxHeight.replace("px", ""))
    + parseInt(maxEcalLayerMaxHeight.replace("px", ""))
    + parseInt(maxMcalLayerMaxHeight.replace("px", ""))
    + parseInt(4);
  $(".Cdd").css("height", cddLayerMaxHeight + "px");

  // Calculate Height of Library Layer
  var libLayerMaxHeight = 0;
  libLayerMaxHeight = parseInt($(".ApplicationLayer").css("height").replace("px", ""))
    + parseInt($(".Rte").css("height").replace("px", ""))
    + parseInt(cddLayerMaxHeight)
    + parseInt(4);
  $(".Libs").css("height", libLayerMaxHeight + "px");
}

function calcLayerWidth() {
  // Arrange Module px Size
  var layerPaddingPer = 0.02;
  var widthOfLayer = $(".SysServ").css("width").replace("px", ""); // datum point is SysServ Layer
  var layerPadding= widthOfLayer * layerPaddingPer;
  layerPadding = parseInt(layerPadding);

  // Generate Padding
  $(".SysServ").css("padding-left", layerPadding + 'px');
  $(".SysServ").css("padding-right", layerPadding + 'px');
  $(".MemServ").css("padding-left", layerPadding + 'px');
  $(".MemServ").css("padding-right", layerPadding + 'px');
  $(".ComServ").css("padding-left", layerPadding + 'px');
  $(".ComServ").css("padding-right", layerPadding + 'px');
  $(".IoAbstServ").css("padding-left", layerPadding + 'px');
  $(".IoAbstServ").css("padding-right", layerPadding + 'px');

  $(".ObdAbst").css("padding-left", layerPadding + 'px');
  $(".ObdAbst").css("padding-right", layerPadding + 'px');
  $(".MemAbst").css("padding-left", layerPadding + 'px');
  $(".MemAbst").css("padding-right", layerPadding + 'px');
  $(".ComAbst").css("padding-left", layerPadding + 'px');
  $(".ComAbst").css("padding-right", layerPadding + 'px');
  $(".IoAbstAbst").css("padding-left", layerPadding + 'px');
  $(".IoAbstAbst").css("padding-right", layerPadding + 'px')

  $(".McuDrvr").css("padding-left", layerPadding + 'px');
  $(".McuDrvr").css("padding-right", layerPadding + 'px');
  $(".MemDrvr").css("padding-left", layerPadding + 'px');
  $(".MemDrvr").css("padding-right", layerPadding + 'px');
  $(".ComDrvr").css("padding-left", layerPadding + 'px');
  $(".ComDrvr").css("padding-right", layerPadding + 'px');
  $(".IoDrvr").css("padding-left", layerPadding + 'px');
  $(".IoDrvr").css("padding-right", layerPadding + 'px');

  // Adopt Width of Single Module (if there is only one module in layer)
  var singleModuleWidth = (widthOfLayer - (layerPadding * 2));
  singleModuleWidth = (singleModuleWidth / widthOfLayer) * 100;
  $(".SingleModule").css("width", singleModuleWidth + '%');
  // Adopt Width of Zero Module (if there is no module in layer)
  var dummyModuleWidth = (widthOfLayer - (layerPadding * 2));
  dummyModuleWidth = (dummyModuleWidth / widthOfLayer) * 100;
  $(".SingleModule").css("width", dummyModuleWidth + '%');
  // Adopt Width of Dual Module (if there are only two module in layer)
  var dualModuleWidth = (widthOfLayer - (layerPadding * 2));
  dualModuleWidth = ((dualModuleWidth - layerPadding) / widthOfLayer) / 2 * 100;
  $(".DualModule").css("width", dualModuleWidth + '%');
  // Adopt Width of More Module (if there are more three module in layer)
  var moduleWidth = (widthOfLayer - (layerPadding * 3));
  moduleWidth = ((moduleWidth - layerPadding) / widthOfLayer) / 3 * 100;
  $(".Module").css("width", moduleWidth + '%');

  // Arrange Cdd Module px Size
  var cddLayerPaddingPer = 0.1;
  var widthOfCddLayer = $(".Cdd").css("width").replace("px", "");
  var cddLayerPadding = widthOfCddLayer * cddLayerPaddingPer;
  cddLayerPadding = parseInt(cddLayerPadding);

  $(".Cdd").css("padding-left", cddLayerPadding + 'px');
  $(".Cdd").css("padding-right", cddLayerPadding + 'px');

  // Arrange Library px Size
  var libLayerPaddingPer = 0.1;
  var widthOfLibLayer = $(".Libs").css("width").replace("px", "");
  var libLayerPadding = widthOfLibLayer * libLayerPaddingPer;
  libLayerPadding = parseInt(libLayerPadding);

  $(".Libs").css("padding-left", libLayerPadding + 'px');
  $(".Libs").css("padding-right", libLayerPadding + 'px');

  // Adopt Width of Library
  var libraryWidth = (widthOfLibLayer - (libLayerPadding * 2));
  libraryWidth = (libraryWidth / widthOfLibLayer) * 100;
  $(".Libs").css("width", libraryWidth + '%');
  
  // Adopt Width of Hardware
  var hwLayerWidth = parseInt($(".ModuleSelector").css("width").replace("px", "")) 
                     + parseInt($(".Libs").css("width").replace("px", ""))
                     + parseInt($(".Libs").css("padding-left").replace("px", ""))
                     + parseInt($(".Libs").css("padding-right").replace("px", ""))
                     + parseInt(2);
  $(".Hardware").css("width", hwLayerWidth + 'px');
  //console.log(hwLayerWidth);
}