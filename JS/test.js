$(function(){
  var $myDiv = $("#myDiv");
  $myDiv.formBuilder({
    attributes: [
      {
        attributeType: "value",
        labelName: "Default Value",
        // renderType: "dropdown",
        // options: ["Allan, Lily, Mary, Tom"],
      },
      {
        attributeType: "data-color",
        labelName: "color",
        renderType: "dropdown",
        options: {
          red: 1,
          blue: 2,
          yellow: 3
        },
      },
    ],
    fields: [
      {
        fieldType: "dropdown",
        labelName: "Allan Drop Down",
        attributes: {
            "data-color": {
              attributeType: "data-color",
              labelName: "allan colore",
              renderType: "dropdown",
              options: {
                red: 1,
                blue: 2,
                yellow: 3
              },
            },
            value: {
              labelName: "allan casdfr",
              isActive: false,
            },
          },
        },
      // {
      //   fieldType: "allan field",
      //   labelName: "Allan Drop Down"
      // }
    ],
    authentication: {
      roles: {
        admin: 1,
        stuff: 2,
        parent: 3,
      },
      orgs: [
        "Site A", "Site B", "Site C"
      ],
    },
  });
  // var myFormBuilder = $myDiv.data("JFormBuilder-formBuilder");
});
