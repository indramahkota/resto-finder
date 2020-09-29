import TestUtils from "../utilities/CustomelementTestUtilities";

it('should render AppToast correctly', async () => {
    const _root = await TestUtils.render('app-toast', {
        message: "Text Message"
    });
    expect(_root.innerHTML.includes("Text Message")).toBeTruthy();
});