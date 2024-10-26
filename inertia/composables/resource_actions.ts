import { useForm } from '@inertiajs/vue3'
import { ref, UnwrapRef } from 'vue'

export function useResourceActions<Resource>() {
  return <Form extends object>(defaultForm: Form) => {
    interface Dialog {
      isOpen: boolean
      resource?: Resource
      open(resource?: UnwrapRef<Resource>, data?: Form): void
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

    function onSuccess() {
      dialog.value.isOpen = false
      dialog.value.resource = undefined
    }

    return {
      form,
      dialog,
      onSuccess,
    }
  }
}
