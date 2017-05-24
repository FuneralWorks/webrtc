'use strict';

describe('Service: custom', function () {

  // load the service's module
  beforeEach(module('webrtcYoApp'));

  // instantiate service
  var custom;
  beforeEach(inject(function (_custom_) {
    custom = _custom_;
  }));

  it('should do something', function () {
    expect(!!custom).toBe(true);
  });

});
