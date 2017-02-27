(function($){
  $.widget("JFormBuilder.formBuilder",{

    attributes: {},
    fields: {},

    options: {

    },

    // ====== Helper functions ======

    _create: function(){
      this._prepareAttributes();
      this._prepareFields();
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
        // Clone attribute object
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
        attributeType: "required",
        renderType: "checkbox",
        labelName: "Required",
        isActive: true
      };
      this.attributes.value = {
        attributeType: "value",
        renderType: "text",
        labelName: "Value",
        isActive: true
      };
      this.attributes.placeholder = {
        attributeType: "placeholder",
        renderType: "text",
        labelName: "Placeholder",
        isActive: true
      };
      this.attributes.maxlength = {
        attributeType: "maxlength",
        renderType: "number",
        labelName: "Max Length",
        isActive: true
      };
      this.attributes.max = {
        attributeType: "max",
        renderType: "number",
        labelName: "Max Number",
        isActive: true
      };
      this.attributes.min = {
        attributeType: "min",
        renderType: "number",
        labelName: "Min Number",
        isActive: true
      };
      this.attributes.help = {
        attributeType: "help",
        renderType: "text",
        labelName: "Help Text",
        isActive: true
      };
      this.attributes.options = {
        attributeType: "options",
        renderType: "list",
        labelName: "Options",
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
      this._initDefaultFields();
      var overriderFieldObj = {};
      if (this.options.hasOwnProperty("fields") && !this._isEmptyObject(this.options.fields)) {
        this.options.fields.forEach(function(fieldObj){
          overriderFieldObj[fieldObj.fieldType] = fieldObj;
        }, this);
        this._overrideFields(overriderFieldObj);
      }
    },

    _initDefaultFields: function(){
      this.fields.text = {
        fieldType: "text",
        labelName: "Text",
        attributes: {
          required: this._attributeFactory("required"),
          placeholder: this._attributeFactory("placeholder"),
          value: this._attributeFactory("value"),
          maxlength: this._attributeFactory("maxlength"),
        }
      };
      this.fields.dropdown = {
        fieldType: "dropdown",
        labelName: "Drop Down",
        attributes: {
          required: this._attributeFactory("required"),
          placeholder: this._attributeFactory("placeholder"),
          value: this._attributeFactory("value"),
          options: this._attributeFactory("options"),
        }
      };
      this._addCustomAttributesToFields();
    },

    _addCustomAttributesToFields: function(){
      for(var field in this.fields){
        for(var attributeType in this.attributes){
          if (!this._isDefaultAttribute(attributeType)) {
            this.fields[field].attributes[attributeType] = this._attributeFactory(attributeType);
          }
        }
      }
    },

    _overrideFields: function(overriderFieldObj){
      $.extend(true,this.fields,overriderFieldObj);
    },

    /**
      Detect whether attribute type is default type
      @param attributeType
    */
    _isDefaultAttribute: function(attributeType){
      if (attributeType === "required" || attributeType === "value" ||
          attributeType === "help" || attributeType === "placeholder"
          || attributeType === "maxlength" || attributeType === "max"
          || attributeType === "min" || attributeType === "options") {
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

    // ====== Helper functions end ======

  })
}(jQuery))
