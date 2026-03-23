'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import usePikaso from './usePikaso'

export default function PikasoShowcase() {
  // One hook call per example — each returns [containerRef, editorInstance]
  const [ref1, editor1] = usePikaso({ width: 600, height: 300 })
  const [ref2, editor2] = usePikaso({ width: 600, height: 300 })
  const [ref3, editor3] = usePikaso({ width: 600, height: 300 })
  const [ref4, editor4] = usePikaso({ width: 600, height: 200 })
  const [ref5, editor5] = usePikaso({ width: 600, height: 300 })
  const [ref6, editor6] = usePikaso({ width: 600, height: 300 })
  const [ref7, editor7] = usePikaso({ width: 600, height: 300 })

  const [text1, setText1] = useState('Hello from Pikaso!')
  const [text2, setText2] = useState('Styled and positioned text')
  const [selectedInfo, setSelectedInfo] = useState<string>('None')
  const [layerOrder, setLayerOrder] = useState<string[]>([])
  const [canUndo, setCanUndo] = useState(false)
  const [canRedo, setCanRedo] = useState(false)

  // Example 1: Basic Shapes
  useEffect(() => {
    if (!editor1) return

    const rect = editor1.shapes.rect.insert({
      x: 50,
      y: 50,
      width: 100,
      height: 80,
      fill: '#4299e1',
      cornerRadius: 10,
      shadowBlur: 5,
      shadowColor: 'rgba(0,0,0,0.3)',
    })

    rect.node.on('mouseenter', () => rect.update({ fill: '#2b6cb0' }))
    rect.node.on('mouseleave', () => rect.update({ fill: '#4299e1' }))

    editor1.shapes.circle.insert({
      x: 250,
      y: 90,
      radius: 40,
      fill: '#48bb78',
      shadowBlur: 5,
      shadowColor: 'rgba(0,0,0,0.3)',
    })

    editor1.shapes.polygon.insert({
      x: 400,
      y: 90,
      sides: 5,
      radius: 40,
      fill: '#f6ad55',
      shadowBlur: 5,
      shadowColor: 'rgba(0,0,0,0.3)',
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor1])

  // Example 2: Draggable Elements
  useEffect(() => {
    if (!editor2) return

    editor2.shapes.text.insert({
      x: 70,
      y: 140,
      text: 'Drag me!',
      fontSize: 16,
      fill: '#2d3748',
    })

    editor2.shapes.circle.insert({
      x: 100,
      y: 200,
      radius: 50,
      fill: '#9f7aea',
      shadowBlur: 10,
      shadowColor: 'rgba(0,0,0,0.3)',
      draggable: true,
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor2])

  // Example 3: Rotation & Animation
  useEffect(() => {
    if (!editor3) return

    const star = editor3.shapes.polygon.insert({
      x: 300,
      y: 150,
      sides: 6,
      radius: 70,
      fill: '#ed8936',
      shadowBlur: 10,
      shadowColor: 'rgba(0,0,0,0.3)',
    })

    star.node.on('click tap', () => {
      star.node.to({ rotation: star.node.rotation() + 45, duration: 0.3 })
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor3])

  // Example 4: Text Rendering — seed shapes once
  useEffect(() => {
    if (!editor4) return

    editor4.shapes.text.insert({
      x: 50,
      y: 50,
      text: text1,
      fontSize: 32,
      fontFamily: 'Arial',
      fill: '#2d3748',
    })

    editor4.shapes.text.insert({
      x: 50,
      y: 110,
      text: text2,
      fontSize: 18,
      fontStyle: 'italic',
      fill: '#4299e1',
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor4])

  // Update text shapes when input values change
  useEffect(() => {
    if (!editor4) return
    const shapes = editor4.board.shapes
    if (shapes.length >= 1) shapes[0].update({ text: text1 })
    if (shapes.length >= 2) shapes[1].update({ text: text2 })
  }, [editor4, text1, text2])

  // Example 5: Transform with Handles
  useEffect(() => {
    if (!editor5) return

    editor5.shapes.rect.insert({
      x: 50, y: 50, width: 100, height: 80,
      fill: '#4299e1', name: 'rect1',
    })
    editor5.shapes.circle.insert({
      x: 250, y: 90, radius: 40,
      fill: '#48bb78', name: 'circle1',
    })
    editor5.shapes.polygon.insert({
      x: 400, y: 90, sides: 5, radius: 40,
      fill: '#f6ad55', name: 'polygon1',
    })

    editor5.events.on('selection:change', (e) => {
      const selected = e.shapes ?? []
      setSelectedInfo(
        selected.length > 0
          ? selected.map((s) => s.node.name()).join(', ')
          : 'None'
      )
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor5])

  // Example 6: Undo / Redo
  useEffect(() => {
    if (!editor6) return

    editor6.shapes.rect.insert({
      x: 50, y: 60, width: 120, height: 90,
      fill: '#4299e1', name: 'Blue Rect',
    })
    editor6.shapes.circle.insert({
      x: 280, y: 120, radius: 60,
      fill: '#48bb78', name: 'Green Circle',
    })
    editor6.shapes.polygon.insert({
      x: 460, y: 100, sides: 5, radius: 50,
      fill: '#f6ad55', name: 'Orange Polygon',
    })

    const syncState = () => {
      setLayerOrder(editor6.board.shapes.map((s) => s.node.name()))
      setCanUndo(editor6.history.getStep() > 0)
      setCanRedo(editor6.history.getStep() < editor6.history.getList().length - 1)
    }

    syncState()
    editor6.events.on('shape:create', syncState)
    editor6.events.on('history:undo', syncState)
    editor6.events.on('history:redo', syncState)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor6])

  // Example 7: Export
  useEffect(() => {
    if (!editor7) return

    editor7.shapes.rect.insert({
      x: 50, y: 50, width: 100, height: 80,
      fill: '#4299e1', cornerRadius: 10,
    })
    editor7.shapes.circle.insert({ x: 250, y: 90, radius: 40, fill: '#48bb78' })
    editor7.shapes.polygon.insert({ x: 400, y: 90, sides: 5, radius: 40, fill: '#f6ad55' })
    editor7.shapes.text.insert({
      x: 50, y: 200, text: 'Export me!', fontSize: 24, fill: '#2d3748',
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor7])

  const handleUndo = () => {
    editor6?.undo()
  }

  const handleRedo = () => {
    editor6?.redo()
  }

  const downloadImage = (dataUrl: string, fileName: string) => {
    const link = document.createElement('a')
    link.download = fileName
    link.href = dataUrl
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const exportForPreview = () => {
    if (!editor7) return
    downloadImage(editor7.export.toImage({ pixelRatio: 1 }), 'pikaso-preview.png')
  }

  const exportForPrint = () => {
    if (!editor7) return
    downloadImage(editor7.export.toImage({ pixelRatio: 3 }), 'pikaso-print.png')
  }

  return (
    <main className="container">
      <div className="header">
        <h1>Pikaso Showcase</h1>
        <p className="subtitle">Fully-typed canvas library built on top of Konva</p>
      </div>

      <section className="showcase-section">
        <h2>Overview</h2>
        <p>
          Pikaso is a seamless, fully-typed HTML5 canvas library built on top of Konva.
          It provides higher-level APIs that significantly reduce boilerplate while maintaining
          full TypeScript support and access to the underlying Konva primitives.
        </p>

        <div className="feature-list">
          <div className="feature-item">✅ Built on Konva — familiar mental model</div>
          <div className="feature-item">✅ Fully typed TypeScript API</div>
          <div className="feature-item">✅ Built-in undo/redo history management</div>
          <div className="feature-item">✅ Higher-level shape, selection and export APIs</div>
        </div>
      </section>

      <section className="showcase-section">
        <h2>Interactive Examples</h2>

        <div className="examples-grid">
          <div className="example">
            <h3>1. Basic Shapes</h3>
            <p>Rectangle, circle, and polygon with colors and shadows</p>
            <div className="canvas-container">
              <div ref={ref1} style={{ width: 600, height: 300 }} />
            </div>
            <p className="example-note">Hover over the blue rectangle to see color change</p>
          </div>

          <div className="example">
            <h3>2. Draggable Elements</h3>
            <p>Drag the circle to move it around the canvas</p>
            <div className="canvas-container">
              <div ref={ref2} style={{ width: 600, height: 300 }} />
            </div>
          </div>

          <div className="example">
            <h3>3. Rotation &amp; Animation</h3>
            <p>Click the polygon to rotate it with a smooth tween animation</p>
            <div className="canvas-container clickable">
              <div ref={ref3} style={{ width: 600, height: 300 }} />
            </div>
            <p className="example-note">Click the polygon to rotate +45° with animation</p>
          </div>

          <div className="example">
            <h3>4. Text Rendering</h3>
            <p>Pikaso supports text rendering with styling options. Edit the text below:</p>
            <div style={{ marginBottom: '1rem' }}>
              <div style={{ marginBottom: '0.5rem' }}>
                <label htmlFor="pikaso-text-1" className="text-input-label">First Text:</label>
                <input
                  id="pikaso-text-1"
                  type="text"
                  value={text1}
                  onChange={(e) => setText1(e.target.value)}
                  className="text-input"
                />
              </div>
              <div>
                <label htmlFor="pikaso-text-2" className="text-input-label">Second Text:</label>
                <input
                  id="pikaso-text-2"
                  type="text"
                  value={text2}
                  onChange={(e) => setText2(e.target.value)}
                  className="text-input"
                />
              </div>
            </div>
            <div className="canvas-container">
              <div ref={ref4} style={{ width: 600, height: 200 }} />
            </div>
          </div>
        </div>
      </section>

      <section className="showcase-section">
        <div className="examples-grid">
          <div className="example">
            <h3>5. Transform with Handles (Rotate &amp; Resize)</h3>
            <p>Click on a shape to select it, then use the handles to rotate and resize</p>
            <div className="canvas-container">
              <div ref={ref5} style={{ width: 600, height: 300 }} />
            </div>
            <p className="example-note">
              {selectedInfo !== 'None' ? `Selected: ${selectedInfo}` : 'Click on a shape to select it'}
            </p>
          </div>

          <div className="example">
            <h3>6. Layer Management (Undo / Redo)</h3>
            <p>Pikaso has built-in undo/redo history. Use the buttons to step through changes.</p>
            <div style={{ marginBottom: '1rem' }}>
              <div className="layer-controls">
                <button
                  className="layer-button"
                  onClick={handleUndo}
                  disabled={!canUndo}
                >
                  ↩ Undo
                </button>
                <button
                  className="layer-button"
                  onClick={handleRedo}
                  disabled={!canRedo}
                >
                  ↪ Redo
                </button>
              </div>
            </div>
            <div className="canvas-container">
              <div ref={ref6} style={{ width: 600, height: 300 }} />
            </div>
            <div style={{ background: '#f7fafc', padding: '1rem', borderRadius: '6px', marginTop: '1rem' }}>
              <strong>Layer Order (bottom to top):</strong>
              <ol style={{ marginTop: '0.5rem', paddingLeft: '2rem' }}>
                {layerOrder.map((name, index) => (
                  <li key={index} style={{ padding: '0.25rem 0' }}>{name}</li>
                ))}
              </ol>
            </div>
          </div>

          <div className="example">
            <h3>7. Export Canvas (Multiple Sizes)</h3>
            <p>Export the canvas at different resolutions for preview and print</p>
            <div className="canvas-container">
              <div ref={ref7} style={{ width: 600, height: 300 }} />
            </div>
            <div className="export-controls">
              <button className="export-button preview" onClick={exportForPreview}>
                📥 Export for Preview (1x)
                <span className="button-subtitle">For web display (600×300px)</span>
              </button>
              <button className="export-button print" onClick={exportForPrint}>
                🖨️ Export for Print (3x)
                <span className="button-subtitle">High resolution (1800×900px)</span>
              </button>
            </div>
            <p className="example-note">
              Preview export is at 1x scale (web quality), Print export is at 3x scale (high resolution)
            </p>
          </div>
        </div>
      </section>

      <section className="showcase-section">
        <h2>Evaluation Summary</h2>

        <div className="evaluation">
          <div className="eval-item">
            <h3>Usability</h3>
            <div className="rating">★★★★★</div>
            <p>Higher-level API removes boilerplate. TypeScript definitions are excellent and comprehensive.</p>
          </div>

          <div className="eval-item">
            <h3>Performance</h3>
            <div className="rating">★★★★☆</div>
            <p>Inherits Konva&apos;s canvas performance. Slight overhead from the abstraction layer, minimal in practice.</p>
          </div>

          <div className="eval-item">
            <h3>Features</h3>
            <div className="rating">★★★★★</div>
            <p>Built-in undo/redo, selection, export, cropping, filters, snap-to-grid — all out of the box.</p>
          </div>

          <div className="eval-item">
            <h3>Integration</h3>
            <div className="rating">★★★★☆</div>
            <p>Works seamlessly with Next.js via a local <code>usePikaso</code> hook built directly on the Pikaso v3 API. Full TypeScript support. No SSR support (client-side only).</p>
          </div>
        </div>
      </section>

      <section className="showcase-section">
        <h2>Use Cases</h2>
        <ul className="use-case-list">
          <li>Interactive design editors with undo/redo workflows</li>
          <li>Canvas-based drawing and annotation tools</li>
          <li>Photo editing with cropping and filters</li>
          <li>Diagramming and whiteboard applications</li>
          <li>Print-ready export tools requiring high-resolution output</li>
        </ul>
      </section>

      <div className="navigation">
        <Link href="/" className="nav-button">← Back to Home</Link>
      </div>
    </main>
  )
}
