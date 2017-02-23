(function($){
  $.widget("JFormBuilder.formBuilder",{
    options:{
      fields:["input","button"],
      attributes:[]
    },

    // ====== helper function ======

    _create: function(){
      console.log(this.options.newField);
      console.log(this.options.fields);
    },

    // ====== end helper function ======
  })
}(jQuery))
