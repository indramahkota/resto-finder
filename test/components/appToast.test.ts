import TestUtils from "../utilities/CustomelementTestUtilities";

it('should render AppToast correctly', async () => {
    const root = await TestUtils.render('app-toast', {
        message: "Text Message"
    });
    expect(root.innerHTML.includes("Text Message")).toBeTruthy();
});