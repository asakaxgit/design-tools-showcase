import { useEffect, useRef, useState } from 'react'
import type { RefObject } from 'react'
import type PikasoType from 'pikaso'
import type { Settings } from 'pikaso'

export default function usePikaso(
  options?: Partial<Settings>
): [RefObject<HTMLDivElement | null>, PikasoType | null] {
  const containerRef = useRef<HTMLDivElement>(null)
  const editorRef = useRef<PikasoType | null>(null)
  const [editor, setEditor] = useState<PikasoType | null>(null)

  useEffect(() => {
    if (!containerRef.current) return

    let cancelled = false

    import('pikaso').then(({ default: Pikaso }) => {
      if (cancelled || !containerRef.current) return

      const instance = new Pikaso({
        container: containerRef.current,
        ...options,
      })

      editorRef.current = instance
      setEditor(instance)
    })

    return () => {
      cancelled = true
      if (editorRef.current) {
        editorRef.current.board.stage.destroy()
        editorRef.current = null
        setEditor(null)
      }
    }
    // options are passed as a literal at call-site and never change;
    // the editor is intentionally created only once per mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return [containerRef, editor]
}
