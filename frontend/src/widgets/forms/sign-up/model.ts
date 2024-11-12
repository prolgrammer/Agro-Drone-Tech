import { createForm } from "effector-forms"

export const $$form = createForm({
  fields: {
    name: {
      init: ""
    },
    surname: {
      init: ""
    },
    fatherName: {
      init: ""
    },
    fhoneNumber:{
      init: ""
    },
    email:{
      init: ""
    },
    login:{
      init: ""
    },
    password:{
      init: ""
    },
    passwordCoppy:{
      init: ""
    },
    passwordAdmin:{
      init: ""
    },
  }
})