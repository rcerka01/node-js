function setMouseOver(object, popup) {
    $(function() {
        $(object).click(function() {
            $(popup).toggle();
        });
    });
}
