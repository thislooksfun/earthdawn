import spectron from "spectron";
import testWithSpectron from "vue-cli-plugin-electron-builder/lib/testWithSpectron";
import chai from "chai";
import chaiAsPromised from "chai-as-promised";

chai.should();
chai.use(chaiAsPromised);

describe("Application launch", function() {
  let app;
  let stopServe;

  beforeEach(function() {
    return testWithSpectron(spectron).then(instance => {
      app = instance.app;
      stopServe = instance.stopServe;
    });
  }, 30000);

  beforeEach(function() {
    chaiAsPromised.transferPromiseness = app.transferPromiseness;
  });

  afterEach(function() {
    if (app && app.isRunning()) {
      // TODO: This call is also bugged
      // BODY: This is pending nklayman/vue-cli-plugin-electron-builder#647.
      // BODY: See https://github.com/thislooksfun/earthdawn/issues/154 for more
      // BODY: info.
      return stopServe();
    }
  });

  it("opens a window", function() {
    return app.client
      .getWindowCount()
      .should.eventually.have.at.least(1)
      .browserWindow.isMinimized()
      .should.eventually.be.false.browserWindow.isVisible()
      .should.eventually.be.true.browserWindow.getBounds()
      .should.eventually.have.property("width")
      .and.be.above(0)
      .browserWindow.getBounds()
      .should.eventually.have.property("height")
      .and.be.above(0);
  });
});
