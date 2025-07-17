export interface SVGProps {
  'id'?: string
  'class'?: string
  'style'?: string | Record<string, any>
  'fill'?: string
  'stroke'?: string
  'strokeWidth'?: string | number
  'strokeLinecap'?: 'butt' | 'round' | 'square'
  'strokeLinejoin'?: 'miter' | 'round' | 'bevel'
  'strokeDasharray'?: string | number
  'strokeDashoffset'?: string | number
  'opacity'?: string | number
  'fillOpacity'?: string | number
  'strokeOpacity'?: string | number
  'transform'?: string
  'viewBox'?: string
  'preserveAspectRatio'?: string
  'xmlns'?: string
  'xmlnsXlink'?: string
  'role'?: string
  'aria-label'?: string
  'aria-labelledby'?: string
  'aria-describedby'?: string
  'aria-hidden'?: boolean | 'true' | 'false'
  'tabindex'?: number
  'onClick'?: (event: MouseEvent) => void
  'onMouseenter'?: (event: MouseEvent) => void
  'onMouseleave'?: (event: MouseEvent) => void
  'onMousedown'?: (event: MouseEvent) => void
  'onMouseup'?: (event: MouseEvent) => void
  'onFocus'?: (event: FocusEvent) => void
  'onBlur'?: (event: FocusEvent) => void
  'onKeydown'?: (event: KeyboardEvent) => void
  'height'?: string | number
  'width'?: string | number
  'mirror'?: boolean
  'onKeyup'?: (event: KeyboardEvent) => void
}
