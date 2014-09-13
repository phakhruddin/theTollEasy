var args = arguments[0] || {};

alert('geobg: service has been invoked once, and will now be stopped to release it from memory. ');
Ti.App.currentService.stop();

var listener = Ti.App.currentService.addEventListener('stop',function(){
  alert('geobg: Although the service has been stopped, it is still registered and will be executed again on next pause');
  alert('geobg: As all background services are automatically stopped on resume, it is not always necessary to explicitly stop a service');
});