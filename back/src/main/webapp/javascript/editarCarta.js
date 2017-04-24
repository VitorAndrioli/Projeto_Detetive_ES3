function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#card').attr('src', e.target.result);
        }
        reader.readAsDataURL(input.files[0]);
    }
}
$("#imgInp").change(function(){
    readURL(this);
});

$("#name").change('input', function (input) {
    $("#cardName").text(input.currentTarget.value);
})

$("#type").change('input', function (input) {
    switch (input.currentTarget.value){
        case "ARM": $("#cardType").text("Arma");
            break;
        case "PLACE": $("#cardType").text("Lugar");
            break;
        case "SUSPECT": $("#cardType").text("Suspeito");
    }
    ;
});
let val = $("#type").val();
debugger;
switch (val){
    case "ARM": $("#cardType").text("Arma");
        break;
    case "PLACE": $("#cardType").text("Lugar");
        break;
    case "SUSPECT": $("#cardType").text("Suspeito");
}
;