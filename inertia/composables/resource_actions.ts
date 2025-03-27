import { FormDataConvertible } from '@inertiajs/core'
import { useForm } from '@inertiajs/vue3'
import { ref, UnwrapRef } from 'vue'

export function useResourceActions<Resource>() {
  return <Form extends Record<string, FormDataConvertible>>(defaultForm: Form) => {
    interface Actionable {
      isOpen: boolean
      resource?: Resource
    }

    interface Dialog extends Actionable {
      open(resource?: UnwrapRef<Resource>, data?: Form): void
    }

    interface Destroy extends Actionable {
      data: Record<string, any>
      open(resource: UnwrapRef<Resource>, data?: Record<string, any>): void
    }

    const form = useForm(defaultForm)

    const dialog = ref<Dialog>({
      isOpen: false,
      resource: undefined,
      open(resource?: UnwrapRef<Resource>, data: Form = {} as Form) {
        form.defaults({ ...defaultForm, ...data })
        form.reset()
        dialog.value.resource = resource
        dialog.value.isOpen = true
      },
    })

    const destroy = ref<Destroy>({
      isOpen: false,
      resource: undefined,
      data: {},
      open(resource: UnwrapRef<Resource>, data: Record<string, any> = {}) {
        destroy.value.resource = resource
        destroy.value.data = { ...data }
        destroy.value.isOpen = true
      },
    })

    function onSuccess() {
      dialog.value.isOpen = false
      dialog.value.resource = undefined
    }

    return {
      form,
      dialog,
      destroy,
      onSuccess,
    }
  }
}
