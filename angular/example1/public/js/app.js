angular.module("TestApp", []);

angular.module("TestApp").controller("MainController", mainController);

function mainController() {
    this.message = "change me";

    this.people = [
        { name: "Ray" },
        { name: "Kevin" },
        { name: "Kva" }]
}
