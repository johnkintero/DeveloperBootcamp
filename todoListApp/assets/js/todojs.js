//Check Off Specific Todos By Clicking
$('ul').on('click', 'li', function(){
    $(this).toggleClass("completed");
});
//Click on X to delete Todo
$('ul').on('click', 'span', function(e){
    //el parent() se utiliza para que como se requiere quitar toda la
    //toda la linea y no solo el span
    //el fadaOut controla el desvanecimiento (tiempo, funcion)
    // el remove se coloca dentro del fade ya que si se deja fuera no
    // permite ver el efecto.
    $(this).parent().fadeOut(500,function() {
        $(this).remove();
    });
    //stopPropagation evita que se ejecuten mas listeners en los 
    //parents
    e.stopPropagation();
});
$('input[type="text"]').keypress(function(e){
    if(e.which === 13){
        //tomando el valor digitado en el input
        var todoText = $(this).val();
        $(this).val("");
        //creando el nuevo elemento en la lista
        $('ul').append("<li><span><i class='fa fa-trash'></i></span> " + todoText + "</li>");
    }
});

$('.fa-plus').click(function(){
    $("input[type='text']").fadeToggle();
});