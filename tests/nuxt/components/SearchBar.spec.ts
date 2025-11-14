import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { ref } from 'vue'
import { useDebounceFn, useMagicKeys } from '@vueuse/core'
import SearchBar from '~/app/components/SearchBar.vue'

// Mock VueUse composables
vi.mock('@vueuse/core', () => ({
  useDebounceFn: vi.fn((fn) => fn),
  useMagicKeys: vi.fn(() => ({ slash: ref(false) })),
}))

// Stub Nuxt UI components
const stubs = {
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
  UBadge: {
    template: '<span data-testid="result-count"><slot /></span>',
  },
  UButton: {
    template: '<button data-testid="clear-button" @click="$emit(\'click\')"><slot /></button>',
  },
  UKbd: {
    template: '<kbd><slot /></kbd>',
  },
}

describe('SearchBar', () => {
  let wrapper: ReturnType<typeof mount>

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render with default placeholder', () => {
    wrapper = mount(SearchBar, {
      props: {
        modelValue: '',
      },
      global: {
        stubs,
      },
    })

    const input = wrapper.find('input')
    expect(input.exists()).toBe(true)
    expect(input.attributes('placeholder')).toBe('Rechercher une question...')
  })

  it('should render with custom placeholder', () => {
    wrapper = mount(SearchBar, {
      props: {
        modelValue: '',
        placeholder: 'Custom placeholder',
      },
      global: {
        stubs,
      },
    })

    const input = wrapper.find('input')
    expect(input.attributes('placeholder')).toBe('Custom placeholder')
  })

  it('should emit update:modelValue when input changes', async () => {
    wrapper = mount(SearchBar, {
      props: {
        modelValue: '',
      },
      global: {
        stubs,
      },
    })

    const input = wrapper.find('input')
    await input.setValue('test query')

    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['test query'])
  })

  it('should update localValue when modelValue prop changes', async () => {
    wrapper = mount(SearchBar, {
      props: {
        modelValue: '',
      },
      global: {
        stubs,
      },
    })

    await wrapper.setProps({ modelValue: 'new value' })
    await wrapper.vm.$nextTick()
    const input = wrapper.find('input')
    expect(input.element.value).toBe('new value')
  })

  it('should show result count badge when searching and resultCount is provided', () => {
    wrapper = mount(SearchBar, {
      props: {
        modelValue: 'test',
        resultCount: 5,
      },
      global: {
        stubs,
      },
    })

    const badge = wrapper.find('[data-testid="result-count"]')
    expect(badge.exists()).toBe(true)
    expect(badge.text()).toContain('5')
  })

  it('should not show result count badge when modelValue is empty', () => {
    wrapper = mount(SearchBar, {
      props: {
        modelValue: '',
        resultCount: 5,
      },
      global: {
        stubs,
      },
    })

    const badge = wrapper.find('[data-testid="result-count"]')
    expect(badge.exists()).toBe(false)
  })

  it('should show clear button when input has value', () => {
    wrapper = mount(SearchBar, {
      props: {
        modelValue: 'test',
      },
      global: {
        stubs,
      },
    })

    const clearButton = wrapper.find('[data-testid="clear-button"]')
    expect(clearButton.exists()).toBe(true)
  })

  it('should show keyboard shortcut hint when input is empty', () => {
    wrapper = mount(SearchBar, {
      props: {
        modelValue: '',
      },
      global: {
        stubs,
      },
    })

    const kbd = wrapper.find('kbd')
    expect(kbd.exists()).toBe(true)
    expect(kbd.text()).toBe('/')
  })

  it('should clear search when clear button is clicked', async () => {
    wrapper = mount(SearchBar, {
      props: {
        modelValue: 'test query',
      },
      global: {
        stubs,
      },
    })

    const clearButton = wrapper.find('[data-testid="clear-button"]')
    await clearButton.trigger('click')

    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([''])
  })

  it('should call useDebounceFn with correct delay', () => {
    mount(SearchBar, {
      props: {
        modelValue: '',
      },
      global: {
        stubs,
      },
    })

    expect(useDebounceFn).toHaveBeenCalledWith(expect.any(Function), 300)
  })

  it('should call useMagicKeys on mount', () => {
    wrapper = mount(SearchBar, {
      props: {
        modelValue: '',
      },
      global: {
        stubs,
      },
    })

    // Verify that useMagicKeys was called to setup the slash key listener
    expect(useMagicKeys).toHaveBeenCalled()
  })
})
