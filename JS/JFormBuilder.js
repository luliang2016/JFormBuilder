(function($){
  $.widget("JFormBuilder.formBuilder",{

    attributes: {},

    options: {

    },

    // ====== Helper functions ======

    _create: function(){
      this._prepareAttributes();
    },

    /**
      Seperate new attribute and overrided attribute
    */
    _prepareAttributes: function(){
      this._initDefaultAttributes();
      var overrideAttributeObj = {},addNewAttributeObj = {};
      if (typeof this.options.attributes !== undefined) {
        this.options.attributes.forEach(function(attributeObj){
          if (this._isDefaultAttribute(attributeObj.attributeType)) {
            overrideAttributeObj[attributeObj.attributeType] = attributeObj;
          }else {
            addNewAttributeObj[attributeObj.attributeType] = attributeObj;
          }
        }, this);
      }
      if (!this._isEmptyObject(overrideAttributeObj)) {
        this._overrideAttributes(overrideAttributeObj);
      }
      if (!this._isEmptyObject(addNewAttributeObj)) {
        this._initNewAttributes(addNewAttributeObj);
      }
    },

    /**
      Attribute factory
      @param attributeType
      @return A clone of attribute object
    */
    _attributeFactory: function(attributeType){
      if (this.attributes.hasOwnProperty(attributeType)) {
        return $.extend(true,{},this.attributes[attributeType]);
      }
      return null;
    },

    /**
      @param overrideAttributeObj Attribute that needs to be overrided
    */
    _overrideAttributes: function(overrideAttributeObj){
      $.extend(true,this.attributes,overrideAttributeObj);
    },

    _initDefaultAttributes: function(){
      this.attributes.required = {
        type: "required",
        renderType: "checkbox",
        labelName: "Required",
        isActive: true
      };
      this.attributes.value = {
        type: "value",
        renderType: "text",
        labelName: "Value",
        isActive: true
      };
      this.attributes.placeholder = {
        type: "placeholder",
        renderType: "text",
        labelName: "Placeholder",
        isActive: true
      };
      this.attributes.maxlength = {
        type: "maxlength",
        renderType: "number",
        labelName: "Max Length",
        isActive: true
      };
      this.attributes.max = {
        type: "max",
        renderType: "number",
        labelName: "Max Number",
        isActive: true
      };
      this.attributes.min = {
        type: "min",
        renderType: "number",
        labelName: "Min Number",
        isActive: true
      };
      this.attributes.help = {
        type: "help",
        renderType: "text",
        labelName: "Help Text",
        isActive: true
      };
    },

    /**
      @param addNewAttributeObj Attribute that needs to be added
    */
    _initNewAttributes: function(addNewAttributeObj){
      for(key in addNewAttributeObj){
        this.attributes[key] = { // Default setting of new attribute
          attributeType: key,
          renderType: "text",
          isActive: true
        };
      }
      $.extend(true,this.attributes,addNewAttributeObj);
    },

    /**
      Prepare fields
    */
    _prepareFields: function(){
      
    },

    // ====== Helper functions end ======



    // ====== General helper functions end ======

    /**
      Detect whether attribute type is default type
      @param attributeType
    */
    _isDefaultAttribute: function(attributeType){
      if (attributeType === "required" || attributeType === "value" ||
          attributeType === "help" || attributeType === "placeholder"
          || attributeType === "maxlength" || attributeType === "max"
          || attributeType === "min") {
        return true;
      }
      return false;
    },

    /**
      Check whether the object is empty
      @param obj Object to be checked
    */
    _isEmptyObject: function(obj){
      for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
      }
      return true;
    },

    // ====== General helper functions end ======
  })
}(jQuery))
