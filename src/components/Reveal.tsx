import { useEffect, useRef, type ElementType, type ReactNode } from 'react'

let sharedObserver: IntersectionObserver | null = null

function getObserver(): IntersectionObserver | null {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return null
  if (!sharedObserver) {
    sharedObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            sharedObserver?.unobserve(entry.target)
          }
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -5% 0px' },
    )
  }
  return sharedObserver
}

type RevealFx = 'up' | 'fade' | 'scale' | 'left' | 'right' | 'clip' | 'curtain'

type RevealProps = {
  children: ReactNode
  as?: ElementType
  className?: string
  delay?: number
  /** Comportamento de entrada. Um sistema só, aplicado de forma consistente. */
  fx?: RevealFx
  style?: React.CSSProperties
} & Omit<React.HTMLAttributes<HTMLElement>, 'style' | 'children' | 'className'>

/**
 * Entrada discreta de seção, sempre pelo mesmo observador compartilhado.
 * A animação nunca é o protagonista: deslocamento pequeno, fade lento
 * e, quando faz sentido, uma revelação por cortina.
 */
export function Reveal({
  children,
  as: Tag = 'div',
  className = '',
  delay = 0,
  fx = 'up',
  style,
  ...rest
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    const observer = getObserver()
    if (!observer) {
      node.classList.add('is-visible')
      return
    }
    observer.observe(node)
    return () => observer.unobserve(node)
  }, [])

  return (
    <Tag
      ref={ref}
      data-fx={fx}
      className={`reveal ${className}`.trim()}
      style={{ '--reveal-delay': `${delay}ms`, ...style } as React.CSSProperties}
      {...rest}
    >
      {children}
    </Tag>
  )
}
