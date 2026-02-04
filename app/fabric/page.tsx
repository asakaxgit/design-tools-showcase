'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { Canvas, Rect, Circle, Polygon, Text, Shadow, FabricObject } from 'fabric'

interface Shape {
  id: string
  fabricObject: FabricObject
}

export default function FabricShowcase() {
  const BASE_CANVAS_WIDTH = 600
  const BASE_CANVAS_HEIGHT = 300
  const TEXT_CANVAS_HEIGHT = 200

  // Canvas refs
  const canvas1Ref = useRef<HTMLCanvasElement>(null)
  const canvas2Ref = useRef<HTMLCanvasElement>(null)
  const canvas3Ref = useRef<HTMLCanvasElement>(null)
  const canvas4Ref = useRef<HTMLCanvasElement>(null)
  const canvas5Ref = useRef<HTMLCanvasElement>(null)
  const canvas6Ref = useRef<HTMLCanvasElement>(null)
  const canvas7Ref = useRef<HTMLCanvasElement>(null)

  // Fabric canvas instances
  const fabricCanvas1 = useRef<Canvas | null>(null)
  const fabricCanvas2 = useRef<Canvas | null>(null)
  const fabricCanvas3 = useRef<Canvas | null>(null)
  const fabricCanvas4 = useRef<Canvas | null>(null)
  const fabricCanvas5 = useRef<Canvas | null>(null)
  const fabricCanvas6 = useRef<Canvas | null>(null)
  const fabricCanvas7 = useRef<Canvas | null>(null)

  const [rectColor, setRectColor] = useState('#4299e1')
  const [circlePos, setCirclePos] = useState({ x: 100, y: 200 })
  const [starRotation, setStarRotation] = useState(0)
  const [text1, setText1] = useState('Hello from Fabric.js!')
  const [text2, setText2] = useState('Styled and positioned text')
  const [selectedObject, setSelectedObject] = useState<FabricObject | null>(null)
  const [canvasScale, setCanvasScale] = useState(1)
  const firstExampleRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const updateScale = () => {
      const exampleWidth = firstExampleRef.current?.clientWidth
      if (!exampleWidth) return
      const availableWidth = exampleWidth - 32
      const scale = Math.min(1, Math.max(availableWidth / (BASE_CANVAS_WIDTH + 20), 0.25))
      setCanvasScale(scale)
    }

    updateScale()
    const observer = new ResizeObserver(updateScale)
    if (firstExampleRef.current) {
      observer.observe(firstExampleRef.current)
    }
    window.addEventListener('resize', updateScale)

    return () => {
      observer.disconnect()
      window.removeEventListener('resize', updateScale)
    }
  }, [])

  // Example 1: Basic Shapes
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (!canvas1Ref.current) return

    const canvas = new Canvas(canvas1Ref.current, {
      width: 600,
      height: 300,
      backgroundColor: '#ffffff'
    })
    fabricCanvas1.current = canvas

    const rect = new Rect({
      left: 50,
      top: 50,
      width: 100,
      height: 80,
      fill: rectColor,
      rx: 10,
      ry: 10,
      shadow: new Shadow({ blur: 5, color: 'rgba(0,0,0,0.3)' })
    })

    rect.on('mouseover', () => {
      setRectColor('#2b6cb0')
      rect.set('fill', '#2b6cb0')
      canvas.renderAll()
    })

    rect.on('mouseout', () => {
      setRectColor('#4299e1')
      rect.set('fill', '#4299e1')
      canvas.renderAll()
    })

    const circle = new Circle({
      left: 250,
      top: 90,
      radius: 40,
      fill: '#48bb78',
      originX: 'center',
      originY: 'center',
      shadow: new Shadow({ blur: 5, color: 'rgba(0,0,0,0.3)' })
    })

    const star = createStar(400, 90, 5, 40, 20, '#f6ad55')

    canvas.add(rect, circle, star)
    canvas.renderAll()

    return () => {
      canvas.dispose()
    }
  }, [])

  // Example 2: Draggable Elements
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (!canvas2Ref.current) return

    const canvas = new Canvas(canvas2Ref.current, {
      width: 600,
      height: 300,
      backgroundColor: '#ffffff'
    })
    fabricCanvas2.current = canvas

    const text = new Text('Drag me!', {
      left: circlePos.x - 30,
      top: circlePos.y - 60,
      fontSize: 16,
      fill: '#2d3748',
      selectable: false
    })

    const circle = new Circle({
      left: circlePos.x,
      top: circlePos.y,
      radius: 50,
      fill: '#9f7aea',
      originX: 'center',
      originY: 'center',
      shadow: new Shadow({ blur: 10, color: 'rgba(0,0,0,0.3)' })
    })

    circle.on('moving', () => {
      const pos = circle.getCenterPoint()
      text.set({
        left: pos.x - 30,
        top: pos.y - 60
      })
      setCirclePos({ x: pos.x, y: pos.y })
    })

    canvas.add(text, circle)
    canvas.renderAll()

    return () => {
      canvas.dispose()
    }
  }, [])

  // Example 3: Rotation & Animation
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (!canvas3Ref.current) return

    const canvas = new Canvas(canvas3Ref.current, {
      width: 600,
      height: 300,
      backgroundColor: '#ffffff',
      selection: false
    })
    fabricCanvas3.current = canvas

    const star = createStar(300, 150, 6, 70, 40, '#ed8936')
    star.set({
      angle: starRotation,
      shadow: new Shadow({ blur: 10, color: 'rgba(0,0,0,0.3)' })
    })

    star.on('mousedown', () => {
      const newRotation = starRotation + 45
      setStarRotation(newRotation)
      
      // Simple rotation animation using setInterval
      const startAngle = star.angle || 0
      const endAngle = newRotation
      const duration = 300
      const steps = 20
      const increment = (endAngle - startAngle) / steps
      let currentStep = 0
      
      const interval = setInterval(() => {
        if (currentStep < steps) {
          star.set('angle', startAngle + (increment * currentStep))
          canvas.renderAll()
          currentStep++
        } else {
          clearInterval(interval)
          star.set('angle', endAngle)
          canvas.renderAll()
        }
      }, duration / steps)
    })

    canvas.add(star)
    canvas.renderAll()

    return () => {
      canvas.dispose()
    }
  }, [starRotation])

  // Example 4: Text Rendering
  useEffect(() => {
    if (!canvas4Ref.current) return

    const canvas = new Canvas(canvas4Ref.current, {
      width: 600,
      height: 200,
      backgroundColor: '#ffffff',
      selection: false
    })
    fabricCanvas4.current = canvas

    const textObj1 = new Text(text1, {
      left: 50,
      top: 50,
      fontSize: 32,
      fontFamily: 'Arial',
      fill: '#2d3748',
      selectable: false
    })

    const textObj2 = new Text(text2, {
      left: 50,
      top: 100,
      fontSize: 18,
      fontStyle: 'italic',
      fill: '#4299e1',
      selectable: false
    })

    canvas.add(textObj1, textObj2)
    canvas.renderAll()

    return () => {
      canvas.dispose()
    }
  }, [text1, text2])

  // Example 5: Transform with Handles
  useEffect(() => {
    if (!canvas5Ref.current) return

    const canvas = new Canvas(canvas5Ref.current, {
      width: 600,
      height: 300,
      backgroundColor: '#ffffff'
    })
    fabricCanvas5.current = canvas

    const rect = new Rect({
      left: 50,
      top: 50,
      width: 100,
      height: 80,
      fill: '#4299e1'
    })

    const circle = new Circle({
      left: 250,
      top: 90,
      radius: 40,
      fill: '#48bb78'
    })

    const star = createStar(400, 90, 5, 40, 20, '#f6ad55')

    canvas.add(rect, circle, star)

    canvas.on('selection:created', (e) => {
      setSelectedObject(e.selected?.[0] || null)
    })

    canvas.on('selection:updated', (e) => {
      setSelectedObject(e.selected?.[0] || null)
    })

    canvas.on('selection:cleared', () => {
      setSelectedObject(null)
    })

    canvas.renderAll()

    return () => {
      canvas.dispose()
    }
  }, [])

  // Example 6: Layer Management
  useEffect(() => {
    if (!canvas6Ref.current) return

    const canvas = new Canvas(canvas6Ref.current, {
      width: 600,
      height: 300,
      backgroundColor: '#ffffff'
    })
    fabricCanvas6.current = canvas

    const rect = new Rect({
      left: 50,
      top: 50,
      width: 100,
      height: 80,
      fill: '#4299e1'
    })
    rect.set('id', 'rect1')

    const circle = new Circle({
      left: 250,
      top: 90,
      radius: 40,
      fill: '#48bb78'
    })
    circle.set('id', 'circle1')

    const star = createStar(400, 90, 5, 40, 20, '#f6ad55')
    star.set('id', 'star1')

    canvas.add(rect, circle, star)
    canvas.renderAll()

    return () => {
      canvas.dispose()
    }
  }, [])

  // Example 7: Export Canvas
  useEffect(() => {
    if (!canvas7Ref.current) return

    const canvas = new Canvas(canvas7Ref.current, {
      width: 600,
      height: 300,
      backgroundColor: '#ffffff'
    })
    fabricCanvas7.current = canvas

    const rect = new Rect({
      left: 50,
      top: 50,
      width: 100,
      height: 80,
      fill: '#4299e1'
    })

    const circle = new Circle({
      left: 250,
      top: 90,
      radius: 40,
      fill: '#48bb78'
    })

    const star = createStar(400, 90, 5, 40, 20, '#f6ad55')

    canvas.add(rect, circle, star)
    canvas.renderAll()

    return () => {
      canvas.dispose()
    }
  }, [])

  // Helper function to create a star
  function createStar(left: number, top: number, points: number, outerRadius: number, innerRadius: number, fill: string) {
    const starPoints = []
    for (let i = 0; i < points * 2; i++) {
      const radius = i % 2 === 0 ? outerRadius : innerRadius
      const angle = (Math.PI * i) / points
      starPoints.push({
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius
      })
    }

    return new Polygon(starPoints, {
      left,
      top,
      fill,
      originX: 'center',
      originY: 'center'
    })
  }

  // Layer management functions
  const moveToFront = () => {
    if (fabricCanvas6.current && selectedObject) {
      const canvas = fabricCanvas6.current
      canvas.bringObjectToFront(selectedObject)
      canvas.renderAll()
    }
  }

  const moveToBack = () => {
    if (fabricCanvas6.current && selectedObject) {
      const canvas = fabricCanvas6.current
      canvas.sendObjectToBack(selectedObject)
      canvas.renderAll()
    }
  }

  const moveUp = () => {
    if (fabricCanvas6.current && selectedObject) {
      const canvas = fabricCanvas6.current
      canvas.bringObjectForward(selectedObject)
      canvas.renderAll()
    }
  }

  const moveDown = () => {
    if (fabricCanvas6.current && selectedObject) {
      const canvas = fabricCanvas6.current
      canvas.sendObjectBackwards(selectedObject)
      canvas.renderAll()
    }
  }

  // Export functions
  const exportForPreview = () => {
    if (fabricCanvas7.current) {
      const dataURL = fabricCanvas7.current.toDataURL({
        format: 'png',
        quality: 1,
        multiplier: 1
      })
      downloadImage(dataURL, 'canvas-preview.png')
    }
  }

  const exportForPrint = () => {
    if (fabricCanvas7.current) {
      const dataURL = fabricCanvas7.current.toDataURL({
        format: 'png',
        quality: 1,
        multiplier: 3
      })
      downloadImage(dataURL, 'canvas-print.png')
    }
  }

  const downloadImage = (dataURL: string, filename: string) => {
    const link = document.createElement('a')
    link.download = filename
    link.href = dataURL
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  useEffect(() => {
    const applyScale = (canvas: Canvas | null, baseHeight: number) => {
      applyFabricResponsiveScale(canvas, canvasScale, BASE_CANVAS_WIDTH, baseHeight)
    }

    applyScale(fabricCanvas1.current, BASE_CANVAS_HEIGHT)
    applyScale(fabricCanvas2.current, BASE_CANVAS_HEIGHT)
    applyScale(fabricCanvas3.current, BASE_CANVAS_HEIGHT)
    applyScale(fabricCanvas4.current, TEXT_CANVAS_HEIGHT)
    applyScale(fabricCanvas5.current, BASE_CANVAS_HEIGHT)
    applyScale(fabricCanvas6.current, BASE_CANVAS_HEIGHT)
    applyScale(fabricCanvas7.current, BASE_CANVAS_HEIGHT)
  }, [canvasScale])

  return (
    <main className="container">
      <div className="header">
        <h1>Fabric.js Showcase</h1>
        <p className="subtitle">Powerful canvas library with interactive object model</p>
      </div>

      <section className="showcase-section">
        <h2>Overview</h2>
        <p>
          Fabric.js is a powerful and simple JavaScript canvas library that provides an interactive
          object model on top of canvas element. It&apos;s great for creating complex graphics with ease.
        </p>
        
        <div className="feature-list">
          <div className="feature-item">✅ Rich object model with inheritance</div>
          <div className="feature-item">✅ Built-in support for transformations</div>
          <div className="feature-item">✅ Event handling and animations</div>
          <div className="feature-item">✅ SVG-to-canvas and canvas-to-SVG conversion</div>
        </div>
      </section>

      <section className="showcase-section">
        <h2>Interactive Examples</h2>
        
        <div className="examples-grid">
          <div className="example" ref={firstExampleRef}>
            <h3>1. Basic Shapes</h3>
            <p>Rectangle, circle, and star with different colors and properties</p>
            <div className="canvas-container">
              <canvas ref={canvas1Ref} />
            </div>
            <p className="example-note">Hover over the blue rectangle to see color change</p>
          </div>

          <div className="example">
            <h3>2. Draggable Elements</h3>
            <p>Drag the circle to move it around the canvas</p>
            <div className="canvas-container">
              <canvas ref={canvas2Ref} />
            </div>
          </div>

          <div className="example">
            <h3>3. Rotation & Animation</h3>
            <p>Click the star to rotate it</p>
            <div className="canvas-container clickable">
              <canvas ref={canvas3Ref} />
            </div>
            <p className="example-note">Current rotation: {starRotation}°</p>
          </div>

          <div className="example">
            <h3>4. Text Rendering</h3>
            <p>Fabric.js supports text rendering with various styling options. Edit the text below:</p>
            <div style={{ marginBottom: '1rem' }}>
              <div style={{ marginBottom: '0.5rem' }}>
                <label htmlFor="text-input-1" className="text-input-label">First Text:</label>
                <input
                  id="text-input-1"
                  type="text"
                  value={text1}
                  onChange={(e) => setText1(e.target.value)}
                  className="text-input"
                />
              </div>
              <div>
                <label htmlFor="text-input-2" className="text-input-label">Second Text:</label>
                <input
                  id="text-input-2"
                  type="text"
                  value={text2}
                  onChange={(e) => setText2(e.target.value)}
                  className="text-input"
                />
              </div>
            </div>
            <div className="canvas-container">
              <canvas ref={canvas4Ref} />
            </div>
          </div>
        </div>
      </section>

      <section className="showcase-section">
        <div className="examples-grid">
          <div className="example">
            <h3>5. Transform with Handles (Rotate & Resize)</h3>
            <p>Click on a shape to select it, then use the handles to rotate and resize</p>
            <div className="canvas-container">
              <canvas ref={canvas5Ref} />
            </div>
            <p className="example-note">
              {selectedObject ? `Selected object` : 'Click on a shape to select it'}
            </p>
          </div>

          <div className="example">
            <h3>6. Layer Management (Reordering)</h3>
            <p>Select a shape and control its stacking order with layer management controls</p>
            <div style={{ marginBottom: '1rem' }}>
              <div className="layer-controls">
                <button 
                  className="layer-button" 
                  onClick={moveToFront}
                  disabled={!selectedObject}
                >
                  ⬆️ To Front
                </button>
                <button 
                  className="layer-button" 
                  onClick={moveUp}
                  disabled={!selectedObject}
                >
                  ↑ Move Up
                </button>
                <button 
                  className="layer-button" 
                  onClick={moveDown}
                  disabled={!selectedObject}
                >
                  ↓ Move Down
                </button>
                <button 
                  className="layer-button" 
                  onClick={moveToBack}
                  disabled={!selectedObject}
                >
                  ⬇️ To Back
                </button>
              </div>
            </div>
            <div className="canvas-container">
              <canvas ref={canvas6Ref} />
            </div>
          </div>

          <div className="example">
            <h3>7. Export Canvas (Multiple Sizes)</h3>
            <p>Export the canvas at different resolutions for preview and print</p>
            <div className="export-controls">
              <button className="export-button preview" onClick={exportForPreview}>
                📥 Export for Preview (1x)
                <span className="button-subtitle">For web display (600x300px)</span>
              </button>
              <button className="export-button print" onClick={exportForPrint}>
                🖨️ Export for Print (3x)
                <span className="button-subtitle">High resolution (1800x900px)</span>
              </button>
            </div>
            <div className="canvas-container">
              <canvas ref={canvas7Ref} />
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
            <p>Excellent API design with intuitive object model. Extensive documentation and examples.</p>
          </div>

          <div className="eval-item">
            <h3>Performance</h3>
            <div className="rating">★★★★☆</div>
            <p>Good performance for most use cases. May slow down with hundreds of objects.</p>
          </div>

          <div className="eval-item">
            <h3>Features</h3>
            <div className="rating">★★★★★</div>
            <p>Rich feature set including SVG support, filters, gradients, and complex transformations.</p>
          </div>

          <div className="eval-item">
            <h3>Integration</h3>
            <div className="rating">★★★★☆</div>
            <p>Works well with React through refs. TypeScript support available but needs manual setup.</p>
          </div>
        </div>
      </section>

      <section className="showcase-section">
        <h2>Use Cases</h2>
        <ul className="use-case-list">
          <li>Image editing and manipulation tools</li>
          <li>Design and prototyping applications</li>
          <li>Interactive presentations and infographics</li>
          <li>Diagram and flowchart editors</li>
          <li>Canvas-based games with complex graphics</li>
        </ul>
      </section>

      <div className="navigation">
        <Link href="/" className="nav-button">← Back to Home</Link>
      </div>
    </main>
  )
}

function applyFabricResponsiveScale(
  canvas: Canvas | null,
  scale: number,
  baseWidth: number,
  baseHeight: number
) {
  if (!canvas) return

  const width = baseWidth * scale
  const height = baseHeight * scale

  canvas.setDimensions({ width, height })
  canvas.setViewportTransform([scale, 0, 0, scale, 0, 0])
  canvas.renderAll()
}
