import testWithSpectron from "vue-cli-plugin-electron-builder/lib/testWithSpectron";
import chai from "chai";
import chaiAsPromised from "chai-as-promised";

chai.should();
chai.use(chaiAsPromised);

describe("Application launch", function() {
  let app;
  let stopServe;

  beforeEach(function() {
    // TODO: THIS CALL IS BUGGED
    // BODY: Calling this function causes it to open as many windows as it can
    // BODY: until it times out
    // BODY: (pending nklayman/vue-cli-plugin-electron-builder#467)

    return testWithSpectron().then(instance => {
      app = instance.app;
      stopServe = instance.stopServe;
    });
  }, 30000);

  beforeEach(function() {
    chaiAsPromised.transferPromiseness = app.transferPromiseness;
  });

  afterEach(function() {
    if (app && app.isRunning()) {
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
