'use strict';

describe('Service: chameleonService', function () {

  // load the service's module
  beforeEach(module('webrtcYoApp'));

  // instantiate service
  var chameleonService;
  beforeEach(inject(function (_chameleonService_) {
    chameleonService = _chameleonService_;
  }));

  it('should do something', function () {
    expect(!!chameleonService).toBe(true);
  });

});
