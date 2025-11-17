import { mount, type VueWrapper } from '@vue/test-utils'
import type { Component } from 'vue'

/**
 * Helper to mount components with common global mocks and stubs
 */
export function mountWithMocks<T extends Component>(
  component: T,
  options: Parameters<typeof mount>[1] = {}
): VueWrapper {
  const mockT = (key: string) => key

  const defaultGlobal = {
    mocks: {
      $t: mockT,
    },
    provide: {},
    ...options.global,
  }

  return mount(component, {
    ...options,
    global: defaultGlobal,
  })
}

/**
 * Stub components for Nuxt UI
 */
export const nuxtUIStubs = {
  UFormGroup: {
    template: '<div class="u-form-group"><label>{{ label }}</label><slot /></div>',
    props: ['label'],
  },
  UCheckbox: {
    template:
      '<input type="checkbox" :checked="modelValue" @change="$emit(\'update:modelValue\', $event.target.checked)" />',
    props: ['modelValue', 'label'],
  },
  USelectMenu: {
    template: '<select multiple @change="handleChange"><slot /></select>',
    props: ['modelValue', 'options', 'multiple', 'searchable', 'placeholder'],
    methods: {
      handleChange(e: Event) {
        const target = e.target as HTMLSelectElement
        const values = Array.from(target.selectedOptions).map((opt) => opt.value)
        this.$emit('update:modelValue', values)
      },
    },
  },
  URadioGroup: {
    template: '<div class="radio-group"><slot /></div>',
    props: ['modelValue', 'options'],
  },
  UButton: {
    template: '<button @click="$emit(\'click\')"><slot /></button>',
    props: ['disabled', 'variant', 'color'],
  },
  UBadge: {
    template: '<span class="badge"><slot /></span>',
    props: ['color'],
  },
  UInput: {
    template: `
      <div class="u-input">
        <input
          :value="modelValue"
          v-bind="$attrs"
          @input="$emit('update:modelValue', $event.target.value)"
          ref="input"
        />
        <slot name="trailing" />
      </div>
    `,
    props: ['modelValue'],
  },
  UKbd: {
    template: '<kbd><slot /></kbd>',
  },
}
