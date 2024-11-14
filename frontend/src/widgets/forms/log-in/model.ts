import { createForm } from "effector-forms"

export const $$form = createForm({
  fields: {
    login: {
      init: ""
    },
    password: {
      init: ""
    }
  }
})